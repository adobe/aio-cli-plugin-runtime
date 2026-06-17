/*
Copyright 2026 Adobe Inc. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const readline = require('node:readline')
const { Sandbox } = require('@adobe/aio-lib-sandbox')
const { Flags } = require('@oclif/core')
const RuntimeBaseCommand = require('../../../RuntimeBaseCommand')
const {
  buildNetworkPolicy,
  parsePortFlags,
  parseEgressFlags,
  splitArgvAtDoubleDash,
  logPolicy,
  logPreviewUrls
} = require('../../../sandbox-helpers')

const EXEC_TIMEOUT_MS = 30000
const REPL_PROMPT = 'Enter command to run on sandbox: '

/**
 * Write live command output to the matching local stream.
 *
 * @param {string|Buffer} data output chunk
 * @param {string} stream stream name from the sandbox SDK
 */
function streamOutput (data, stream) {
  const sink = stream === 'stderr' ? process.stderr : process.stdout
  sink.write(data)
}

/**
 * Write detached command output without permanently displacing the REPL prompt.
 *
 * @param {object} rl readline interface
 * @returns {Function} output handler
 */
function streamOutputWithPromptRedraw (rl) {
  return (data, stream) => {
    readline.clearLine(process.stdout, 0)
    readline.cursorTo(process.stdout, 0)

    streamOutput(data, stream)

    const text = Buffer.isBuffer(data) ? data.toString() : String(data)
    if (text && !text.endsWith('\n')) {
      const sink = stream === 'stderr' ? process.stderr : process.stdout
      sink.write('\n')
    }

    rl.prompt(true)
  }
}

class SandboxRun extends RuntimeBaseCommand {
  async init () {
    const rawArgv = [...this.argv]
    const { cliArgs } = splitArgvAtDoubleDash(rawArgv)

    await this.parse(SandboxRun, cliArgs)
    this.argv = rawArgv
  }

  async run () {
    const { cliArgs, commandArgs } = splitArgvAtDoubleDash(this.argv)
    const { flags } = await this.parse(SandboxRun, cliArgs)

    if (commandArgs.length > 0) {
      this._failUsage('This command only supports interactive use. Type commands when prompted, or use "aio runtime sandbox exec" for one-shot or scripted commands.')
      return
    }

    if (process.stdin.isTTY !== true) {
      this._failUsage('This command requires an interactive terminal. Piped stdin is not supported; use "aio runtime sandbox exec" to run a piped list of commands.')
      return
    }

    let sandbox
    let rl
    try {
      const policy = buildNetworkPolicy(flags.egress)
      const ports = parsePortFlags(flags.port)
      const options = await this.getOptions()

      this.log('\nCreating sandbox...')
      sandbox = await Sandbox.create({
        apiHost: options.apihost,
        namespace: options.namespace,
        auth: options.api_key,
        name: flags.name,
        maxLifetime: flags['max-lifetime'],
        envs: {},
        ...(ports && { ports }),
        ...(policy && { policy })
      })
      this.log(`Created: ${sandbox.id}`)

      logPolicy(policy, msg => this.log(msg))
      await logPreviewUrls(sandbox, ports, msg => this.log(msg))

      this.log('\nSandbox ready. Type "exit" to destroy and quit.\n')

      rl = readline.createInterface({ input: process.stdin, output: process.stdout })
      rl.setPrompt(REPL_PROMPT)
      await this._repl(rl, sandbox)
    } catch (err) {
      await this.handleError('failed to run sandbox', err)
    } finally {
      if (rl) {
        rl.close()
      }
      if (sandbox) {
        try {
          await sandbox.destroy()
          this.log('Sandbox destroyed.')
        } catch (destroyErr) {
          this.log(`failed to destroy sandbox: ${destroyErr.message || destroyErr}`)
        }
      }
    }
  }

  _failUsage (message) {
    process.stderr.write(`${message}\n`)
    process.exitCode = 2
  }

  async _repl (rl, sandbox) {
    while (true) {
      const cmd = await this._ask(rl)
      const trimmed = (cmd || '').trim()
      if (trimmed === 'exit' || trimmed === 'quit') {
        break
      }
      if (!trimmed) {
        continue
      }

      try {
        if (trimmed.startsWith('.detached')) {
          await this._handleDetached(sandbox, trimmed, rl)
        } else if (trimmed.includes(' <<< ')) {
          await this._handleHereString(sandbox, trimmed)
        } else {
          await this._handleExec(sandbox, trimmed)
        }
      } catch (err) {
        const msg = err.message || String(err)
        const hint = msg.includes('exceeded timeout') ? ' (use .detached for long-running commands)' : ''
        this.log(`exec error: ${msg}${hint}`)
      }
    }
  }

  _ask (rl) {
    return new Promise(resolve => rl.question(REPL_PROMPT, resolve))
  }

  async _handleExec (sandbox, cmd) {
    const result = await sandbox.exec(cmd, { timeout: EXEC_TIMEOUT_MS })
    if (result.stdout) process.stdout.write(result.stdout)
    if (result.stderr) process.stderr.write(result.stderr)
    this.log(`[exit: ${result.exitCode}]`)
  }

  async _handleDetached (sandbox, input, rl) {
    const commandText = input.slice('.detached'.length).trim()
    if (!commandText) {
      this.log('Usage: .detached <command>')
      return
    }

    const command = await sandbox.exec(commandText, { detached: true, onOutput: streamOutputWithPromptRedraw(rl) })
    this.log(`[detached: ${command.execId} pid: ${command.pid || 'unknown'}]`)
  }

  async _handleHereString (sandbox, input) {
    const idx = input.indexOf(' <<< ')
    const command = input.slice(0, idx).trim()
    let text = input.slice(idx + 5).trim()
    if ((text.startsWith('"') && text.endsWith('"')) || (text.startsWith("'") && text.endsWith("'"))) {
      text = text.slice(1, -1)
    }
    text += '\n'

    this.log(`(sending ${text.length} bytes to stdin)`)
    const result = await sandbox.exec(command, { timeout: EXEC_TIMEOUT_MS, stdin: text })
    const hasOutput = result.stdout || result.stderr
    if (hasOutput) {
      this.log('<output>')
      if (result.stdout) process.stdout.write(result.stdout)
      if (result.stderr) process.stderr.write(result.stderr)
      this.log('</output>')
    }
    this.log(`[exit: ${result.exitCode}]\n`)
  }
}

SandboxRun.description = `
[Alpha] Sandboxes are in a closed alpha. Your namespace must have
sandboxes enabled before you can use this command; contact Adobe to request
access.

Create a sandbox and run commands against it interactively.

Each command you enter runs in a fresh process. Shell state (working directory,
env exports) does not persist between prompts. Chain commands to work
around this: cd mydir && npm install

During interactive sessions: 
- Send text to stdin with the here-string operator:
  command <<< "text"
- Start a background command and stream its output with:
  .detached <command>
- Type exit or quit to destroy the sandbox.`

SandboxRun.flags = {
  ...RuntimeBaseCommand.flags,
  name: Flags.string({
    char: 'n',
    description: 'sandbox name',
    default: 'aio-sandbox'
  }),
  egress: Flags.string({
    char: 'e',
    description: 'egress rule in host:port[:protocol][|METHOD:path] format, or "allow-all" (repeatable)',
    multiple: true
  }),
  port: Flags.string({
    char: 'p',
    description: 'Port to expose via a preview URL (repeatable)',
    multiple: true
  }),
  'max-lifetime': Flags.integer({
    description: 'maximum sandbox lifetime in seconds',
    default: 3600
  })
}

SandboxRun.examples = [
  '<%= config.bin %> <%= command.id %>',
  '<%= config.bin %> <%= command.id %> -n my-sandbox',
  '<%= config.bin %> <%= command.id %> -p 3000 -p 8080',
  '<%= config.bin %> <%= command.id %> -e allow-all',
  '<%= config.bin %> <%= command.id %> -e "pypi.org:443" -e "api.github.com:443|GET:/repos/**"'
]

SandboxRun.aliases = ['rt:sandbox:run']

// exposed for testing
SandboxRun.parseEgressFlags = parseEgressFlags
SandboxRun.parsePortFlags = parsePortFlags
SandboxRun.buildNetworkPolicy = buildNetworkPolicy
SandboxRun.splitArgvAtDoubleDash = splitArgvAtDoubleDash

module.exports = SandboxRun
