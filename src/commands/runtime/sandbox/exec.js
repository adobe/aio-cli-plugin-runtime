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
const { Flags } = require('@oclif/core')
const RuntimeBaseCommand = require('../../../RuntimeBaseCommand')
const {
  buildNetworkPolicy,
  parsePortFlags,
  parseEgressFlags,
  splitArgvAtDoubleDash,
  buildCommandList,
  shellQuote
} = require('../../../sandbox-helpers')

const COMMAND_TIMEOUT_MS = 30000

class SandboxExec extends RuntimeBaseCommand {
  async init () {
    const rawArgv = [...this.argv]
    const { cliArgs } = splitArgvAtDoubleDash(rawArgv)

    await this.parse(SandboxExec, cliArgs)
    this.argv = rawArgv
  }

  async run () {
    const { cliArgs, commandArgs } = splitArgvAtDoubleDash(this.argv)
    const { flags } = await this.parse(SandboxExec, cliArgs)

    const stdinText = process.stdin.isTTY === true ? '' : await this._readStdin()
    const commands = buildCommandList(commandArgs, stdinText)

    if (commands.length === 0) {
      this._failUsage('No commands to run. Pass a command after "--" and/or pipe a newline-separated list on stdin. For an interactive session use "aio runtime sandbox run".')
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

      this._logPolicy(policy)
      await this._logPreviewUrls(sandbox, ports)

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
      process.stdin.on('data', chunk => chunks.push(chunk))
      process.stdin.on('end', () => resolve(Buffer.concat(chunks).toString()))
      process.stdin.on('error', reject)
    })
  }

  _failUsage (message) {
    process.stderr.write(`${message}\n`)
    process.exitCode = 2
  }

  _logPolicy (policy) {
    if (!policy) {
      this.log('Network policy: default-deny (DNS + NATS only)')
      return
    }
    if (policy.network.egress === 'allow-all') {
      this.log('Network policy: allow-all egress')
      return
    }
    this.log('Network policy: custom egress')
    policy.network.egress.forEach(rule => {
      const proto = rule.protocol || 'TCP'
      const l7 = rule.rules ? ' ' + rule.rules.map(r => `${r.methods.join(',')}:${r.pathPattern}`).join(' ') : ''
      this.log(`  - ${rule.host}:${rule.port} (${proto})${l7}`)
    })
  }

  async _logPreviewUrls (sandbox, ports) {
    if (!ports) {
      return
    }

    this.log('Preview URLs:')
    for (const port of ports) {
      this.log(`  - ${port}: ${await sandbox.getUrl(port)}`)
    }
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

Provide a one-shot command after "--" and/or pipe a newline-separated list of
commands on stdin. When both are given, the one-shot command runs first,
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
  }),
  'command-timeout': Flags.integer({
    description: 'per-command timeout in milliseconds',
    default: COMMAND_TIMEOUT_MS
  }),
  'fail-fast': Flags.boolean({
    description: 'stop execution when a command returns a non-zero exit code',
    default: false
  })
}

SandboxExec.examples = [
  '<%= config.bin %> <%= command.id %> -- node --version',
  '<%= config.bin %> <%= command.id %> < commands.txt',
  '<%= config.bin %> <%= command.id %> -- node --version < commands.txt',
  '<%= config.bin %> <%= command.id %> -e allow-all -p 5173 < commands.txt',
  '<%= config.bin %> <%= command.id %> --fail-fast --command-timeout 120000 < commands.txt'
]

SandboxExec.aliases = ['rt:sandbox:exec']

// exposed for testing
SandboxExec.parseEgressFlags = parseEgressFlags
SandboxExec.parsePortFlags = parsePortFlags
SandboxExec.buildNetworkPolicy = buildNetworkPolicy
SandboxExec.splitArgvAtDoubleDash = splitArgvAtDoubleDash
SandboxExec.buildCommandList = buildCommandList
SandboxExec.shellQuote = shellQuote

module.exports = SandboxExec
