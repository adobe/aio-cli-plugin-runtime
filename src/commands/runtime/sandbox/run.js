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
const { Flags } = require('@oclif/core')
const RuntimeBaseCommand = require('../../../RuntimeBaseCommand')

const VALID_HTTP_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS']
const EXEC_TIMEOUT_MS = 30000
const PROBE_TIMEOUT_MS = 10000

/**
 * Parse a list of `--egress` flag values into the `network.egress` rule array.
 * Throws on malformed input. The caller is responsible for handling the
 * `allow-all` shorthand separately.
 *
 * @param {string[]} egressArgs raw flag values
 * @returns {Array<object>} parsed egress rules
 */
function parseEgressFlags (egressArgs) {
  return egressArgs.map(arg => {
    // Split on | to separate L4 (host:port[:protocol]) from optional L7 (METHOD[,METHOD]:path)
    const pipeIdx = arg.indexOf('|')
    const l4Part = pipeIdx === -1 ? arg : arg.slice(0, pipeIdx)
    const l7Part = pipeIdx === -1 ? null : arg.slice(pipeIdx + 1)

    const parts = l4Part.split(':')
    if (parts.length < 2 || parts.length > 3) {
      throw new Error(`Invalid egress format: "${arg}". Expected host:port[:protocol][|METHOD:path]`)
    }
    const port = parseInt(parts[1], 10)
    if (Number.isNaN(port) || port < 1 || port > 65535) {
      throw new Error(`Invalid port in egress rule: "${arg}". Port must be 1-65535`)
    }
    const rule = { host: parts[0], port }
    if (parts[2]) {
      const proto = parts[2].toUpperCase()
      if (proto !== 'TCP' && proto !== 'UDP') {
        throw new Error(`Invalid protocol in egress rule: "${arg}". Must be TCP or UDP`)
      }
      rule.protocol = proto
    }

    if (l7Part) {
      const colonIdx = l7Part.indexOf(':')
      if (colonIdx === -1 || !l7Part.slice(colonIdx + 1).startsWith('/')) {
        throw new Error(`Invalid L7 rule: "${arg}". Expected METHOD[,METHOD]:/ after |`)
      }
      const methods = l7Part.slice(0, colonIdx).split(',').map(m => m.trim().toUpperCase())
      const pathPattern = l7Part.slice(colonIdx + 1)
      for (const method of methods) {
        if (!VALID_HTTP_METHODS.includes(method)) {
          throw new Error(`Invalid HTTP method "${method}" in "${arg}". Must be one of: ${VALID_HTTP_METHODS.join(', ')}`)
        }
      }
      rule.rules = [{ methods, pathPattern }]
    }

    return rule
  })
}

/**
 * Build the sandbox `policy` object from `--egress` flag values, or return
 * `undefined` if no egress flags were provided.
 *
 * @param {string[]} [egressArgs] raw `--egress` flag values
 * @returns {object|undefined} sandbox policy
 */
function buildPolicy (egressArgs) {
  if (!egressArgs || egressArgs.length === 0) {
    return undefined
  }
  if (egressArgs.length === 1 && egressArgs[0] === 'allow-all') {
    return { network: { egress: 'allow-all' } }
  }
  if (egressArgs.includes('allow-all')) {
    throw new Error('allow-all cannot be combined with other egress rules.')
  }
  return { network: { egress: parseEgressFlags(egressArgs) } }
}

class SandboxRun extends RuntimeBaseCommand {
  async run () {
    const { flags } = await this.parse(SandboxRun)

    let sandbox
    let rl
    try {
      const policy = buildPolicy(flags.egress)
      const ow = await this.wsk()

      this.log('\nCreating sandbox...')
      sandbox = await ow.compute.sandbox.create({
        name: flags.name,
        ...(flags.type && { type: flags.type }),
        ...(flags.size && { size: flags.size }),
        workspace: 'workspace',
        maxLifetime: flags['max-lifetime'],
        envs: {},
        ...(policy && { policy })
      })
      this.log(`Created: ${sandbox.id}`)

      this._logPolicy(policy)

      const probe = await sandbox.exec('node --version', { timeout: PROBE_TIMEOUT_MS })
      this.log(`Node version: ${(probe.stdout || '').trim()} | exit: ${probe.exitCode}`)

      this.log('\nSandbox ready. Type ".help" for commands, or "exit" to destroy and quit.\n')

      rl = readline.createInterface({ input: process.stdin, output: process.stdout })
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

  async _repl (rl, sandbox) {
    while (true) {
      const cmd = await this._ask(rl, 'Enter command to run on sandbox: ')
      const trimmed = (cmd || '').trim()
      if (trimmed === 'exit' || trimmed === 'quit') {
        break
      }
      if (!trimmed) {
        continue
      }

      try {
        if (trimmed.includes(' <<< ')) {
          await this._handleHereString(sandbox, trimmed)
        } else {
          await this._handleExec(sandbox, trimmed)
        }
      } catch (err) {
        this.log(`exec error: ${err.message || err}`)
      }
    }
  }

  _ask (rl, question) {
    return new Promise(resolve => rl.question(question, resolve))
  }

  async _handleExec (sandbox, cmd) {
    const result = await sandbox.exec(cmd, { timeout: EXEC_TIMEOUT_MS })
    if (result.stdout) process.stdout.write(result.stdout)
    if (result.stderr) process.stderr.write(result.stderr)
    this.log(`[exit: ${result.exitCode}]`)
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

SandboxRun.description = `Create a sandbox and run an interactive REPL against it.

Each command you enter runs in a fresh process; shell state (working directory,
environment exports) does not persist between prompts. Chain commands to work
around this: cd mydir && npm install

Send text to stdin with the here-string operator:
  command <<< "text"

Type exit or quit to destroy the sandbox and leave.`

SandboxRun.flags = {
  ...RuntimeBaseCommand.flags,
  name: Flags.string({
    description: 'sandbox name',
    default: 'aio-sandbox'
  }),
  type: Flags.string({
    char: 't',
    description: 'sandbox type (e.g. cpu:default, cpu:nodejs)'
  }),
  size: Flags.string({
    char: 's',
    description: 'sandbox size',
    options: ['SMALL', 'MEDIUM', 'LARGE', 'XLARGE']
  }),
  egress: Flags.string({
    char: 'e',
    description: 'egress rule in host:port[:protocol][|METHOD:path] format, or "allow-all" (repeatable)',
    multiple: true
  }),
  'max-lifetime': Flags.integer({
    description: 'maximum sandbox lifetime in seconds',
    default: 3600
  })
}

SandboxRun.examples = [
  '<%= config.bin %> <%= command.id %>',
  '<%= config.bin %> <%= command.id %> -e allow-all',
  '<%= config.bin %> <%= command.id %> -e "pypi.org:443" -e "api.github.com:443|GET:/repos/**"',
  '<%= config.bin %> <%= command.id %> --size LARGE --type cpu:nodejs'
]

SandboxRun.aliases = ['rt:sandbox:run']

// exposed for testing
SandboxRun.parseEgressFlags = parseEgressFlags
SandboxRun.buildPolicy = buildPolicy

module.exports = SandboxRun
