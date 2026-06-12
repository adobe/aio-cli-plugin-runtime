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

const VALID_HTTP_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS']

/**
 * Parse a sandbox preview URL port value.
 *
 * @param {string|number} value raw port value
 * @returns {number} parsed port
 */
function parsePort (value) {
  const raw = String(value)
  if (!/^\d+$/.test(raw)) {
    throw new Error(`Invalid port "${value}". Port must be an integer between 1 and 65535`)
  }

  const port = Number(raw)
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(`Invalid port "${value}". Port must be an integer between 1 and 65535`)
  }
  return port
}

/**
 * Split oclif arguments at `--`. Everything after it belongs to the sandbox
 * command and must not be parsed as aio CLI flags.
 *
 * @param {string[]} argv raw command argv
 * @returns {{cliArgs: string[], commandArgs: string[], hasSeparator: boolean}} split argv
 */
function splitArgvAtDoubleDash (argv) {
  const separatorIndex = argv.indexOf('--')
  if (separatorIndex === -1) {
    return { cliArgs: argv, commandArgs: [], hasSeparator: false }
  }
  return {
    cliArgs: argv.slice(0, separatorIndex),
    commandArgs: argv.slice(separatorIndex + 1),
    hasSeparator: true
  }
}

/**
 * Parse repeatable `--port` flag values for sandbox preview URLs.
 *
 * @param {Array<string|number>} [portArgs] raw port flag values
 * @returns {number[]|undefined} parsed ports, or undefined when omitted
 */
function parsePortFlags (portArgs) {
  if (!portArgs || portArgs.length === 0) {
    return undefined
  }
  return portArgs.map(parsePort)
}

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
function buildNetworkPolicy (egressArgs) {
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

/**
 * Quote a single argv token so it survives re-parsing by the sandbox's shell.
 * Safe tokens are returned untouched; anything else is wrapped in single quotes
 * with embedded single quotes escaped, keeping spaces and shell metacharacters
 * literal.
 *
 * @param {string} arg argv token
 * @returns {string} shell-safe token
 */
function shellQuote (arg) {
  if (/^[A-Za-z0-9_./:=@%+,-]+$/.test(arg)) {
    return arg
  }
  return `'${arg.replace(/'/g, "'\\''")}'`
}

/**
 * Build the ordered list of commands for a non-interactive `exec` run. The
 * one-shot command (everything after `--`) runs first, followed by each
 * newline-separated command read from piped stdin; blank lines are dropped.
 * One-shot tokens are shell-quoted before joining so arguments with spaces or
 * metacharacters survive the round-trip to the sandbox's shell, while piped
 * lines are already complete command strings and are passed through verbatim.
 *
 * @param {string[]} commandArgs argv tokens after `--`
 * @param {string} stdinText raw piped stdin contents
 * @returns {string[]} ordered commands to execute
 */
function buildCommandList (commandArgs, stdinText) {
  const commands = []
  if (commandArgs && commandArgs.length > 0) {
    commands.push(commandArgs.map(shellQuote).join(' '))
  }
  if (stdinText) {
    for (const line of stdinText.split('\n')) {
      const trimmed = line.trim()
      if (trimmed) {
        commands.push(trimmed)
      }
    }
  }
  return commands
}

/**
 * Log a human-readable summary of the sandbox network policy.
 *
 * @param {object|undefined} policy sandbox policy, or undefined for default-deny
 * @param {Function} log logger called with each line
 */
function logPolicy (policy, log) {
  if (!policy) {
    log('Network policy: default-deny (DNS + NATS only)')
    return
  }
  if (policy.network.egress === 'allow-all') {
    log('Network policy: allow-all egress')
    return
  }
  log('Network policy: custom egress')
  policy.network.egress.forEach(rule => {
    const proto = rule.protocol || 'TCP'
    const l7 = rule.rules ? ' ' + rule.rules.map(r => `${r.methods.join(',')}:${r.pathPattern}`).join(' ') : ''
    log(`  - ${rule.host}:${rule.port} (${proto})${l7}`)
  })
}

/**
 * Log the preview URL for each exposed port, or nothing when no ports.
 *
 * @param {object} sandbox sandbox instance exposing getUrl(port)
 * @param {number[]|undefined} ports exposed ports
 * @param {Function} log logger called with each line
 * @returns {Promise<void>} resolves once all URLs are logged
 */
async function logPreviewUrls (sandbox, ports, log) {
  if (!ports) {
    return
  }

  log('Preview URLs:')
  for (const port of ports) {
    log(`  - ${port}: ${await sandbox.getUrl(port)}`)
  }
}

module.exports = {
  buildNetworkPolicy,
  parsePortFlags,
  parseEgressFlags,
  splitArgvAtDoubleDash,
  buildCommandList,
  shellQuote,
  logPolicy,
  logPreviewUrls
}
