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

const { Sandbox } = require('@adobe/aio-lib-sandbox')
const { Args, Flags } = require('@oclif/core')
const RuntimeBaseCommand = require('../../../RuntimeBaseCommand')
const {
  buildNetworkPolicy,
  parsePortFlags,
  parseEgressFlags,
  buildCommandList,
  logPolicy,
  logPreviewUrls
} = require('../../../sandbox-helpers')

const DEFAULT_COMMAND_TIMEOUT_MS = 30000

class SandboxExec extends RuntimeBaseCommand {
  async run () {
    // Start reading piped stdin before the async parse below: on some platforms
    // (notably Windows PowerShell) the piped data and EOF arrive during the
    // parse, and attaching listeners afterwards would miss them.
    const stdinPromise = process.stdin.isTTY === true ? Promise.resolve('') : this._readStdin()
    // Avoid an unhandled rejection if parse rejects before we await this; a real
    // stdin read error still surfaces at the `await stdinPromise` below.
    stdinPromise.catch(() => {})

    const { args, flags } = await this.parse(SandboxExec)

    const stdinText = await stdinPromise
    const commands = buildCommandList(args.command, stdinText)

    if (commands.length === 0) {
      this._failUsage('No commands to run. Pass a quoted command (e.g. \'node --version\') and/or pipe a newline-separated list on stdin. For an interactive session use "aio runtime sandbox run".')
      return
    }

    let sandbox
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

      await this._runCommands(sandbox, commands, flags)
    } catch (err) {
      await this.handleError('failed to exec in sandbox', err)
    } finally {
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

  _readStdin () {
    return new Promise((resolve, reject) => {
      const chunks = []
      const onData = chunk => chunks.push(chunk)
      const onEnd = () => {
        teardown()
        resolve(Buffer.concat(chunks).toString())
      }
      const onError = err => {
        teardown()
        reject(err)
      }
      /**
       * Detach all stdin listeners so repeated calls don't leak handlers.
       */
      function teardown () {
        process.stdin.removeListener('data', onData)
        process.stdin.removeListener('end', onEnd)
        process.stdin.removeListener('error', onError)
      }
      process.stdin.on('data', onData)
      process.stdin.on('end', onEnd)
      process.stdin.on('error', onError)
    })
  }

  _failUsage (message) {
    process.stderr.write(`${message}\n`)
    process.exitCode = 2
  }

  async _runCommands (sandbox, commands, flags) {
    const timeout = flags['command-timeout']
    for (const cmd of commands) {
      this.log(`\n$ ${cmd}`)
      const result = await sandbox.exec(cmd, { timeout })
      if (result.stdout) process.stdout.write(result.stdout)
      if (result.stderr) process.stderr.write(result.stderr)
      this.log(`[exit: ${result.exitCode}]`)

      if (result.exitCode !== 0) {
        process.exitCode = result.exitCode
        if (flags['fail-fast']) {
          this.log('Stopping: command exited non-zero (--fail-fast).')
          return
        }
      }
    }
  }
}

SandboxExec.description = `
[Alpha] Sandboxes are in a closed alpha. Your namespace must have
sandboxes enabled before you can use this command; contact Adobe to request
access.

Create a sandbox and run one or more commands non-interactively, then destroy it.

Provide a one-shot command as a quoted argument and/or pipe a newline-separated
list of commands on stdin. When both are given, the one-shot command runs first,
followed by the piped commands in order.

Each command runs in a fresh process. Shell state (working directory, env
exports) does not persist between commands. Chain commands to work around
this: cd mydir && npm install

By default every command runs and the process exits with the last non-zero
exit code. Use --fail-fast to stop at the first failure. Each command is
capped at --command-timeout milliseconds (default 30000).

For an interactive session, use "aio runtime sandbox run" instead.`

SandboxExec.flags = {
  ...RuntimeBaseCommand.flags,
  name: Flags.string({
    char: 'n',
    description: 'sandbox name',
    default: 'aio-sandbox'
  }),
  egress: Flags.string({
    char: 'e',
    description: 'egress rule in host:port[:protocol][|METHOD:path] format, or "allow-all" (repeatable)',
    multiple: true,
    // non-greedy so a trailing positional command is not swallowed as an egress value
    multipleNonGreedy: true
  }),
  port: Flags.string({
    char: 'p',
    description: 'Port to expose via a preview URL (repeatable)',
    multiple: true,
    // non-greedy so a trailing positional command is not swallowed as a port value
    multipleNonGreedy: true
  }),
  'max-lifetime': Flags.integer({
    description: 'maximum sandbox lifetime in seconds',
    default: 3600
  }),
  'command-timeout': Flags.integer({
    description: 'per-command timeout in milliseconds',
    default: DEFAULT_COMMAND_TIMEOUT_MS
  }),
  'fail-fast': Flags.boolean({
    description: 'stop execution when a command returns a non-zero exit code',
    default: false
  })
}

SandboxExec.args = {
  command: Args.string({
    description: 'command to run in the sandbox (quote multi-word commands)',
    required: false
  })
}

SandboxExec.examples = [
  '<%= config.bin %> <%= command.id %> "node --version"',
  '<%= config.bin %> <%= command.id %> < commands.txt',
  '<%= config.bin %> <%= command.id %> "node --version" < commands.txt',
  '<%= config.bin %> <%= command.id %> -e allow-all -p 5173 < commands.txt',
  '<%= config.bin %> <%= command.id %> --fail-fast --command-timeout 120000 < commands.txt'
]

SandboxExec.aliases = ['rt:sandbox:exec']

// exposed for testing
SandboxExec.parseEgressFlags = parseEgressFlags
SandboxExec.parsePortFlags = parsePortFlags
SandboxExec.buildNetworkPolicy = buildNetworkPolicy
SandboxExec.buildCommandList = buildCommandList

module.exports = SandboxExec
