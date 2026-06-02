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
 * Quote argv tokens so the remote shell receives the same argument boundaries
 * the local shell passed after `--`.
 *
 * @param {string} arg command argument
 * @returns {string} shell-safe argument
 */
function shellQuote (arg) {
  if (/^[A-Za-z0-9_./:=@%+,-]+$/.test(arg)) {
    return arg
  }
  return `'${arg.replace(/'/g, "'\\''")}'`
}

/**
 * Convert args after `--` to a command string for the sandbox executor.
 *
 * @param {string[]} commandArgs raw command args
 * @returns {string} command string
 */
function buildSandboxCommand (commandArgs) {
  if (commandArgs.length === 1) {
    return commandArgs[0]
  }
  return commandArgs.map(shellQuote).join(' ')
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

module.exports = {
  buildNetworkPolicy,
  buildSandboxCommand,
  parseEgressFlags,
  splitArgvAtDoubleDash
}
