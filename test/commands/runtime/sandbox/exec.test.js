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

const { stdout, stderr } = require('stdout-stderr')
beforeEach(() => { stdout.start(); stderr.start() })
afterEach(() => { stdout.stop(); stderr.stop() })
const TheCommand = require('../../../../src/commands/runtime/sandbox/exec.js')
const RuntimeBaseCommand = require('../../../../src/RuntimeBaseCommand.js')
const { Sandbox } = require('@adobe/aio-lib-sandbox')
const { logPolicy, logPreviewUrls } = require('../../../../src/sandbox-helpers')

/**
 * Build a fake `Sandbox` object suitable for stubbing Sandbox.create resolutions.
 *
 * @param {object} [overrides] override individual fields
 * @returns {object} fake sandbox
 */
function fakeSandbox (overrides = {}) {
  return {
    id: 'sandbox-123',
    exec: jest.fn().mockResolvedValue({ stdout: 'ok\n', stderr: '', exitCode: 0 }),
    getUrl: jest.fn(port => Promise.resolve(`https://sandbox-${port}.example.net`)),
    destroy: jest.fn().mockResolvedValue({ status: 'destroyed' }),
    ...overrides
  }
}

test('exports', async () => {
  expect(typeof TheCommand).toEqual('function')
  expect(TheCommand.prototype instanceof RuntimeBaseCommand).toBeTruthy()
})

test('description', async () => {
  expect(TheCommand.description).toBeDefined()
  expect(TheCommand.description).toMatch(/non-interactively/)
})

test('aliases', async () => {
  expect(TheCommand.aliases).toContain('rt:sandbox:exec')
})

test('examples', async () => {
  expect(TheCommand.examples).toBeInstanceOf(Array)
  expect(TheCommand.examples.length).toBeGreaterThan(0)
})

test('flags', async () => {
  // shared with run
  expect(TheCommand.flags.name.char).toBe('n')
  expect(TheCommand.flags.name.default).toBe('aio-sandbox')
  expect(TheCommand.flags.egress.char).toBe('e')
  expect(TheCommand.flags.egress.multiple).toBe(true)
  expect(TheCommand.flags.port.char).toBe('p')
  expect(TheCommand.flags.port.multiple).toBe(true)
  expect(TheCommand.flags['max-lifetime'].default).toBe(3600)
  // exec-specific: --command-timeout is the per-command cap, default 30s
  expect(TheCommand.flags['command-timeout'].default).toBe(30000)
  expect(TheCommand.flags['fail-fast']).toBeDefined()
  // inherits base flags
  expect(TheCommand.flags.apihost).toBeDefined()
})

describe('_readStdin', () => {
  test('collects piped chunks until end', async () => {
    const command = new TheCommand([])
    const promise = command._readStdin()
    process.stdin.emit('data', Buffer.from('echo one\n'))
    process.stdin.emit('data', Buffer.from('echo two\n'))
    process.stdin.emit('end')
    await expect(promise).resolves.toBe('echo one\necho two\n')
    process.stdin.removeAllListeners('data')
    process.stdin.removeAllListeners('end')
    process.stdin.removeAllListeners('error')
  })

  test('rejects on stdin error', async () => {
    const command = new TheCommand([])
    const promise = command._readStdin()
    process.stdin.emit('error', new Error('stdin boom'))
    await expect(promise).rejects.toThrow('stdin boom')
    process.stdin.removeAllListeners('data')
    process.stdin.removeAllListeners('end')
    process.stdin.removeAllListeners('error')
  })
})

describe('buildCommandList', () => {
  test('one-shot only', () => {
    expect(TheCommand.buildCommandList('node --version', '')).toEqual(['node --version'])
  })

  test('one-shot command is passed verbatim', () => {
    expect(TheCommand.buildCommandList('echo "a b"', '')).toEqual(['echo "a b"'])
  })

  test('piped only, newline-split, blanks dropped', () => {
    expect(TheCommand.buildCommandList(undefined, 'a\n\nb\n')).toEqual(['a', 'b'])
  })

  test('piped lines are passed verbatim', () => {
    expect(TheCommand.buildCommandList(undefined, 'cd app && npm install\n')).toEqual(['cd app && npm install'])
  })

  test('one-shot runs first, then piped', () => {
    expect(TheCommand.buildCommandList('node --version', 'a\nb')).toEqual(['node --version', 'a', 'b'])
  })

  test('empty when nothing provided', () => {
    expect(TheCommand.buildCommandList(undefined, '')).toEqual([])
  })
})

describe('logPolicy', () => {
  test('logs default-deny when no policy', () => {
    const log = jest.fn()
    logPolicy(undefined, log)
    expect(log).toHaveBeenCalledWith('Network policy: default-deny (DNS + NATS only)')
  })

  test('logs allow-all egress', () => {
    const log = jest.fn()
    logPolicy({ network: { egress: 'allow-all' } }, log)
    expect(log).toHaveBeenCalledWith('Network policy: allow-all egress')
  })

  test('logs custom egress rules', () => {
    const log = jest.fn()
    logPolicy({
      network: {
        egress: [
          { host: 'pypi.org', port: 443 },
          { host: 'api.github.com', port: 443, rules: [{ methods: ['GET'], pathPattern: '/repos/**' }] }
        ]
      }
    }, log)
    expect(log).toHaveBeenCalledWith('Network policy: custom egress')
    expect(log).toHaveBeenCalledWith('  - pypi.org:443 (TCP)')
    expect(log).toHaveBeenCalledWith('  - api.github.com:443 (TCP) GET:/repos/**')
  })
})

describe('logPreviewUrls', () => {
  test('does nothing when no ports', async () => {
    const log = jest.fn()
    const sandbox = { getUrl: jest.fn() }
    await logPreviewUrls(sandbox, undefined, log)
    expect(log).not.toHaveBeenCalled()
    expect(sandbox.getUrl).not.toHaveBeenCalled()
  })

  test('logs a preview URL per port', async () => {
    const log = jest.fn()
    const sandbox = { getUrl: jest.fn(port => Promise.resolve(`https://sandbox-${port}.example.net`)) }
    await logPreviewUrls(sandbox, [3000, 8080], log)
    expect(log).toHaveBeenCalledWith('Preview URLs:')
    expect(log).toHaveBeenCalledWith('  - 3000: https://sandbox-3000.example.net')
    expect(log).toHaveBeenCalledWith('  - 8080: https://sandbox-8080.example.net')
  })
})

describe('run', () => {
  let command
  let handleError
  let sandbox
  const originalStdinIsTTY = process.stdin.isTTY
  const originalExitCode = process.exitCode

  beforeEach(async () => {
    command = new TheCommand([])
    handleError = jest.spyOn(command, 'handleError').mockResolvedValue(undefined)
    sandbox = fakeSandbox()
    Sandbox.create.mockReset()
    Sandbox.create.mockResolvedValue(sandbox)
    jest.spyOn(command, '_readStdin').mockResolvedValue('')
    Object.defineProperty(process.stdin, 'isTTY', { value: false, configurable: true })
  })

  afterEach(() => {
    process.exitCode = originalExitCode
    Object.defineProperty(process.stdin, 'isTTY', { value: originalStdinIsTTY, configurable: true })
  })

  test('runs a single one-shot command and destroys', async () => {
    command.argv = ['node --version']
    command._readStdin.mockResolvedValue('')
    sandbox.exec.mockResolvedValueOnce({ stdout: 'v25.9.0\n', stderr: '', exitCode: 0 })

    await command.run()

    expect(sandbox.exec).toHaveBeenCalledWith('node --version', { timeout: 30000 })
    expect(stdout.output).toMatch('v25.9.0')
    expect(stdout.output).toMatch('[exit: 0]')
    expect(sandbox.destroy).toHaveBeenCalled()
  })

  test('runs piped commands in order', async () => {
    command.argv = []
    command._readStdin.mockResolvedValue('echo one\necho two\n')

    await command.run()

    expect(sandbox.exec).toHaveBeenNthCalledWith(1, 'echo one', { timeout: 30000 })
    expect(sandbox.exec).toHaveBeenNthCalledWith(2, 'echo two', { timeout: 30000 })
  })

  test('one-shot runs before piped commands', async () => {
    command.argv = ['node --version']
    command._readStdin.mockResolvedValue('echo after\n')

    await command.run()

    expect(sandbox.exec).toHaveBeenNthCalledWith(1, 'node --version', { timeout: 30000 })
    expect(sandbox.exec).toHaveBeenNthCalledWith(2, 'echo after', { timeout: 30000 })
  })

  test('does not read stdin on a TTY', async () => {
    Object.defineProperty(process.stdin, 'isTTY', { value: true, configurable: true })
    command.argv = ['true']

    await command.run()

    expect(command._readStdin).not.toHaveBeenCalled()
    expect(sandbox.exec).toHaveBeenCalledWith('true', { timeout: 30000 })
  })

  test('defaults the per-command timeout to 30s when --command-timeout is omitted', async () => {
    command.argv = ['true']

    await command.run()

    expect(sandbox.exec).toHaveBeenCalledWith('true', { timeout: 30000 })
  })

  test('--command-timeout overrides the per-command default', async () => {
    command.argv = ['--command-timeout', '5000', 'true']

    await command.run()

    expect(sandbox.exec).toHaveBeenCalledWith('true', { timeout: 5000 })
  })

  test('--fail-fast stops on first non-zero exit and sets exit code', async () => {
    command.argv = ['--fail-fast']
    command._readStdin.mockResolvedValue('bad\ngood\n')
    sandbox.exec.mockResolvedValueOnce({ stdout: '', stderr: 'nope\n', exitCode: 1 })

    await command.run()

    expect(sandbox.exec).toHaveBeenCalledTimes(1)
    expect(sandbox.exec).toHaveBeenCalledWith('bad', { timeout: 30000 })
    expect(process.exitCode).toBe(1)
    expect(sandbox.destroy).toHaveBeenCalled()
  })

  test('without --fail-fast runs all and exits with last non-zero code', async () => {
    command.argv = []
    command._readStdin.mockResolvedValue('first\nsecond\nthird\n')
    sandbox.exec
      .mockResolvedValueOnce({ stdout: '', stderr: 'e1\n', exitCode: 3 })
      .mockResolvedValueOnce({ stdout: 'ok\n', stderr: '', exitCode: 0 })
      .mockResolvedValueOnce({ stdout: '', stderr: 'e2\n', exitCode: 5 })

    await command.run()

    expect(sandbox.exec).toHaveBeenCalledTimes(3)
    expect(process.exitCode).toBe(5)
  })

  test('exits 0 when all commands succeed', async () => {
    command.argv = []
    command._readStdin.mockResolvedValue('a\nb\n')
    process.exitCode = 0

    await command.run()

    expect(sandbox.exec).toHaveBeenCalledTimes(2)
    expect(process.exitCode).toBe(0)
  })

  test('errors when no command is provided on a TTY', async () => {
    Object.defineProperty(process.stdin, 'isTTY', { value: true, configurable: true })
    command.argv = []
    command._readStdin.mockResolvedValue('')

    await command.run()

    expect(stderr.output).toMatch(/no commands/i)
    expect(stderr.output).toMatch(/sandbox run/)
    expect(process.exitCode).toBe(2)
    expect(Sandbox.create).not.toHaveBeenCalled()
    expect(sandbox.destroy).not.toHaveBeenCalled()
  })

  test('forwards name, egress, port, max-lifetime to Sandbox.create', async () => {
    command.argv = ['-n', 'mybox', '--max-lifetime', '600', '-e', 'allow-all', '-p', '5173', 'true']

    await command.run()

    expect(Sandbox.create).toHaveBeenCalledWith(expect.objectContaining({
      name: 'mybox',
      maxLifetime: 600,
      ports: [5173],
      policy: { network: { egress: 'allow-all' } }
    }))
    expect(sandbox.getUrl).toHaveBeenCalledWith(5173)
  })

  test('logs custom egress rules', async () => {
    command.argv = ['-e', 'pypi.org:443', '-e', 'api.github.com:443|GET:/repos/**', 'true']

    await command.run()

    expect(stdout.output).toMatch('Network policy: custom egress')
    expect(stdout.output).toMatch('pypi.org:443 (TCP)')
    expect(stdout.output).toMatch('api.github.com:443 (TCP) GET:/repos/**')
  })

  test('logs default-deny policy when no egress', async () => {
    command.argv = ['true']

    await command.run()

    expect(stdout.output).toMatch('Network policy: default-deny')
  })

  test('reports command stderr', async () => {
    command.argv = ['cat missing']
    sandbox.exec.mockResolvedValueOnce({ stdout: '', stderr: 'no such file\n', exitCode: 1 })

    await command.run()

    expect(stderr.output).toMatch('no such file')
    expect(stdout.output).toMatch('[exit: 1]')
  })

  test('routes create errors through handleError and skips destroy', async () => {
    Sandbox.create.mockRejectedValue(new Error('boom'))
    command.argv = ['true']

    await command.run()

    expect(handleError).toHaveBeenCalledWith('failed to exec in sandbox', expect.objectContaining({ message: 'boom' }))
    expect(sandbox.destroy).not.toHaveBeenCalled()
  })

  test('logs a message when destroy fails', async () => {
    sandbox.destroy.mockRejectedValue(new Error('destroy failed'))
    command.argv = ['true']

    await command.run()

    expect(stdout.output).toMatch('failed to destroy sandbox: destroy failed')
  })

  test('logs a stringified value when destroy rejects without .message', async () => {
    sandbox.destroy.mockRejectedValue('plain reason')
    command.argv = ['true']

    await command.run()

    expect(stdout.output).toMatch('failed to destroy sandbox: plain reason')
  })
})
