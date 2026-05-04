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

jest.mock('node:readline')

const readline = require('node:readline')
const { stdout, stderr } = require('stdout-stderr')
beforeEach(() => stderr.start())
afterEach(() => stderr.stop())
const TheCommand = require('../../../../src/commands/runtime/sandbox/run.js')
const RuntimeBaseCommand = require('../../../../src/RuntimeBaseCommand.js')
const RuntimeLib = require('@adobe/aio-lib-runtime')

const rtCreate = 'compute.sandbox.create'

/**
 * Build a fake `Sandbox` object suitable for stubbing `compute.sandbox.create`
 * resolutions from the mocked aio-lib-runtime.
 *
 * @param {object} [overrides] override individual fields
 * @returns {object} fake sandbox
 */
function fakeSandbox (overrides = {}) {
  return {
    id: 'sandbox-123',
    exec: jest.fn(),
    destroy: jest.fn().mockResolvedValue({ status: 'destroyed' }),
    ...overrides
  }
}

/**
 * Build a fake readline interface that scripts the supplied user inputs.
 * Tests should always include a terminator (`exit`/`quit`) as the last entry,
 * otherwise the REPL loop will hang.
 *
 * @param {string[]} answers ordered REPL inputs
 * @returns {object} fake readline interface
 */
function makeRl (answers) {
  const queue = [...answers]
  return {
    question: jest.fn((q, cb) => {
      const next = queue.shift()
      // resolve asynchronously so any pending microtasks (e.g. exec promises)
      // can settle before the next prompt arrives
      setImmediate(() => cb(next))
    }),
    close: jest.fn()
  }
}

test('exports', async () => {
  expect(typeof TheCommand).toEqual('function')
  expect(TheCommand.prototype instanceof RuntimeBaseCommand).toBeTruthy()
})

test('description', async () => {
  expect(TheCommand.description).toBeDefined()
})

test('aliases', async () => {
  expect(TheCommand.aliases).toBeDefined()
  expect(TheCommand.aliases).toBeInstanceOf(Array)
  expect(TheCommand.aliases.length).toBeGreaterThan(0)
})

test('flags', async () => {
  expect(typeof TheCommand.flags.name).toBe('object')
  expect(TheCommand.flags.name.default).toBe('aio-sandbox')
  expect(TheCommand.flags.type.char).toBe('t')
  expect(TheCommand.flags.size.char).toBe('s')
  expect(TheCommand.flags.size.options).toEqual(['SMALL', 'MEDIUM', 'LARGE', 'XLARGE'])
  expect(TheCommand.flags.egress.char).toBe('e')
  expect(TheCommand.flags.egress.multiple).toBe(true)
  expect(TheCommand.flags['max-lifetime'].default).toBe(3600)
  // inherits base flags
  expect(TheCommand.flags.apihost).toBeDefined()
  expect(TheCommand.flags.auth).toBeDefined()
})

describe('parseEgressFlags', () => {
  test('parses single L4 rule', () => {
    expect(TheCommand.parseEgressFlags(['pypi.org:443'])).toEqual([
      { host: 'pypi.org', port: 443 }
    ])
  })

  test('parses L4 rule with TCP protocol', () => {
    expect(TheCommand.parseEgressFlags(['pypi.org:443:tcp'])).toEqual([
      { host: 'pypi.org', port: 443, protocol: 'TCP' }
    ])
  })

  test('parses L4 rule with UDP protocol', () => {
    expect(TheCommand.parseEgressFlags(['dns.google:53:udp'])).toEqual([
      { host: 'dns.google', port: 53, protocol: 'UDP' }
    ])
  })

  test('parses L4+L7 rule', () => {
    expect(TheCommand.parseEgressFlags(['api.github.com:443|GET,POST:/repos/**'])).toEqual([
      {
        host: 'api.github.com',
        port: 443,
        rules: [{ methods: ['GET', 'POST'], pathPattern: '/repos/**' }]
      }
    ])
  })

  test('parses multiple rules', () => {
    const result = TheCommand.parseEgressFlags(['a.com:80', 'b.com:443:TCP'])
    expect(result).toHaveLength(2)
  })

  test('rejects invalid format (too few parts)', () => {
    expect(() => TheCommand.parseEgressFlags(['bad'])).toThrow(/Invalid egress format/)
  })

  test('rejects invalid format (too many parts)', () => {
    expect(() => TheCommand.parseEgressFlags(['a:1:tcp:extra'])).toThrow(/Invalid egress format/)
  })

  test('rejects non-numeric port', () => {
    expect(() => TheCommand.parseEgressFlags(['a:nope'])).toThrow(/Invalid port/)
  })

  test('rejects out-of-range port', () => {
    expect(() => TheCommand.parseEgressFlags(['a:99999'])).toThrow(/Invalid port/)
  })

  test('rejects port below 1', () => {
    expect(() => TheCommand.parseEgressFlags(['a:0'])).toThrow(/Invalid port/)
  })

  test('rejects unknown protocol', () => {
    expect(() => TheCommand.parseEgressFlags(['a:80:sctp'])).toThrow(/Invalid protocol/)
  })

  test('rejects L7 rule without colon', () => {
    expect(() => TheCommand.parseEgressFlags(['a:80|GET'])).toThrow(/Invalid L7 rule/)
  })

  test('rejects L7 rule with non-slash path', () => {
    expect(() => TheCommand.parseEgressFlags(['a:80|GET:nope'])).toThrow(/Invalid L7 rule/)
  })

  test('rejects unknown HTTP method in L7 rule', () => {
    expect(() => TheCommand.parseEgressFlags(['a:80|FOO:/path'])).toThrow(/Invalid HTTP method/)
  })
})

describe('buildPolicy', () => {
  test('returns undefined when no egress flags', () => {
    expect(TheCommand.buildPolicy(undefined)).toBeUndefined()
    expect(TheCommand.buildPolicy([])).toBeUndefined()
  })

  test('returns allow-all policy when sole value is allow-all', () => {
    expect(TheCommand.buildPolicy(['allow-all'])).toEqual({ network: { egress: 'allow-all' } })
  })

  test('throws when allow-all is mixed with other rules', () => {
    expect(() => TheCommand.buildPolicy(['allow-all', 'a.com:80'])).toThrow(/cannot be combined/)
  })

  test('returns parsed egress rules', () => {
    expect(TheCommand.buildPolicy(['a.com:80'])).toEqual({
      network: { egress: [{ host: 'a.com', port: 80 }] }
    })
  })
})

describe('run', () => {
  let command
  let handleError
  let rtLib
  let sandbox

  beforeEach(async () => {
    command = new TheCommand([])
    handleError = jest.spyOn(command, 'handleError').mockResolvedValue(undefined)
    rtLib = await RuntimeLib.init({ apihost: 'fakehost', api_key: 'fakekey' })
    RuntimeLib.mockReset()
    sandbox = fakeSandbox()
    rtLib.mockResolved(rtCreate, sandbox)
    sandbox.exec.mockResolvedValue({ stdout: 'v20.0.0\n', stderr: '', exitCode: 0 })
    readline.createInterface.mockReturnValue(makeRl(['exit']))
  })

  test('creates a sandbox with default flags and destroys on exit', async () => {
    command.argv = []
    await command.run()
    expect(rtLib.compute.sandbox.create).toHaveBeenCalledWith(expect.objectContaining({
      name: 'aio-sandbox',
      workspace: 'workspace',
      maxLifetime: 3600,
      envs: {}
    }))
    // default-deny policy log
    expect(stdout.output).toMatch('Network policy: default-deny')
    expect(stdout.output).toMatch('Created: sandbox-123')
    expect(stdout.output).toMatch('Sandbox destroyed.')
    expect(sandbox.destroy).toHaveBeenCalled()
  })

  test('forwards --type, --size, --name, --max-lifetime', async () => {
    command.argv = ['--type', 'cpu:nodejs', '--size', 'LARGE', '--name', 'mybox', '--max-lifetime', '600']
    await command.run()
    expect(rtLib.compute.sandbox.create).toHaveBeenCalledWith(expect.objectContaining({
      name: 'mybox',
      type: 'cpu:nodejs',
      size: 'LARGE',
      maxLifetime: 600
    }))
  })

  test('quit also destroys the sandbox', async () => {
    readline.createInterface.mockReturnValue(makeRl(['quit']))
    command.argv = []
    await command.run()
    expect(sandbox.destroy).toHaveBeenCalled()
  })

  test('passes --egress allow-all through to policy', async () => {
    command.argv = ['--egress', 'allow-all']
    await command.run()
    expect(rtLib.compute.sandbox.create).toHaveBeenCalledWith(expect.objectContaining({
      policy: { network: { egress: 'allow-all' } }
    }))
    expect(stdout.output).toMatch('Network policy: allow-all egress')
  })

  test('passes custom --egress rules through to policy and logs them', async () => {
    command.argv = ['--egress', 'pypi.org:443', '--egress', 'dns.google:53:UDP', '--egress', 'api.github.com:443|GET:/repos/**']
    await command.run()
    expect(rtLib.compute.sandbox.create).toHaveBeenCalledWith(expect.objectContaining({
      policy: {
        network: {
          egress: [
            { host: 'pypi.org', port: 443 },
            { host: 'dns.google', port: 53, protocol: 'UDP' },
            { host: 'api.github.com', port: 443, rules: [{ methods: ['GET'], pathPattern: '/repos/**' }] }
          ]
        }
      }
    }))
    expect(stdout.output).toMatch('Network policy: custom egress')
    expect(stdout.output).toMatch('pypi.org:443 (TCP)')
    expect(stdout.output).toMatch('dns.google:53 (UDP)')
    expect(stdout.output).toMatch('api.github.com:443 (TCP) GET:/repos/**')
  })

  test('rejects --egress allow-all combined with other rules', async () => {
    command.argv = ['--egress', 'allow-all', '--egress', 'pypi.org:443']
    await command.run()
    expect(handleError).toHaveBeenCalledWith('failed to run sandbox', expect.objectContaining({
      message: expect.stringMatching(/cannot be combined/)
    }))
    // create was never called
    expect(rtLib.compute.sandbox.create).not.toHaveBeenCalled()
  })

  test('REPL: blank input is ignored, .help prints help, command runs exec', async () => {
    readline.createInterface.mockReturnValue(makeRl(['', '.help', 'ls -la', 'exit']))
    sandbox.exec
      .mockResolvedValueOnce({ stdout: 'v20.0.0\n', stderr: '', exitCode: 0 }) // probe
      .mockResolvedValueOnce({ stdout: 'total 0\n', stderr: '', exitCode: 0 }) // ls

    command.argv = []
    await command.run()

    expect(sandbox.exec).toHaveBeenCalledWith('ls -la', { timeout: 30000 })
    expect(stdout.output).toMatch('How it works:')
    expect(stdout.output).toMatch('total 0')
    expect(stdout.output).toMatch('[exit: 0]')
  })

  test('REPL: command produces stderr', async () => {
    readline.createInterface.mockReturnValue(makeRl(['cat missing', 'exit']))
    sandbox.exec
      .mockResolvedValueOnce({ stdout: 'v20.0.0\n', stderr: '', exitCode: 0 })
      .mockResolvedValueOnce({ stdout: '', stderr: 'cat: missing: No such file\n', exitCode: 1 })

    command.argv = []
    await command.run()

    expect(stderr.output).toMatch('cat: missing: No such file')
    expect(stdout.output).toMatch('[exit: 1]')
  })

  test('REPL: exec errors are reported and do not break the loop', async () => {
    readline.createInterface.mockReturnValue(makeRl(['boom', 'exit']))
    sandbox.exec
      .mockResolvedValueOnce({ stdout: 'v20.0.0\n', stderr: '', exitCode: 0 })
      .mockRejectedValueOnce(new Error('exec failed'))

    command.argv = []
    await command.run()

    expect(stdout.output).toMatch('exec error: exec failed')
    expect(sandbox.destroy).toHaveBeenCalled()
  })

  test('REPL: exec errors without .message stringify the thrown value', async () => {
    readline.createInterface.mockReturnValue(makeRl(['boom', 'exit']))
    sandbox.exec
      .mockResolvedValueOnce({ stdout: 'v20.0.0\n', stderr: '', exitCode: 0 })
      .mockRejectedValueOnce('plain string error')

    command.argv = []
    await command.run()

    expect(stdout.output).toMatch('exec error: plain string error')
  })

  test('REPL: here-string with double-quoted text strips quotes and sends stdin', async () => {
    readline.createInterface.mockReturnValue(makeRl(['cat -n <<< "hello"', 'exit']))
    sandbox.exec
      .mockResolvedValueOnce({ stdout: 'v20.0.0\n', stderr: '', exitCode: 0 })
      .mockResolvedValueOnce({ stdout: '     1\thello\n', stderr: '', exitCode: 0 })

    command.argv = []
    await command.run()

    expect(sandbox.exec).toHaveBeenLastCalledWith('cat -n', expect.objectContaining({
      stdin: 'hello\n',
      timeout: 30000
    }))
    expect(stdout.output).toMatch('<output>')
    expect(stdout.output).toMatch('</output>')
  })

  test('REPL: here-string with single-quoted text strips quotes', async () => {
    readline.createInterface.mockReturnValue(makeRl(["cat <<< 'world'", 'exit']))
    sandbox.exec
      .mockResolvedValueOnce({ stdout: 'v20.0.0\n', stderr: '', exitCode: 0 })
      .mockResolvedValueOnce({ stdout: 'world\n', stderr: '', exitCode: 0 })

    command.argv = []
    await command.run()

    expect(sandbox.exec).toHaveBeenLastCalledWith('cat', expect.objectContaining({
      stdin: 'world\n'
    }))
  })

  test('REPL: here-string with unquoted text passes through verbatim', async () => {
    readline.createInterface.mockReturnValue(makeRl(['wc -c <<< abc', 'exit']))
    sandbox.exec
      .mockResolvedValueOnce({ stdout: 'v20.0.0\n', stderr: '', exitCode: 0 })
      .mockResolvedValueOnce({ stdout: '4\n', stderr: '', exitCode: 0 })

    command.argv = []
    await command.run()

    expect(sandbox.exec).toHaveBeenLastCalledWith('wc -c', expect.objectContaining({
      stdin: 'abc\n'
    }))
  })

  test('REPL: here-string with stderr output is included in <output> block', async () => {
    readline.createInterface.mockReturnValue(makeRl(['cat - <<< "x"', 'exit']))
    sandbox.exec
      .mockResolvedValueOnce({ stdout: 'v20.0.0\n', stderr: '', exitCode: 0 })
      .mockResolvedValueOnce({ stdout: '', stderr: 'oops\n', exitCode: 1 })

    command.argv = []
    await command.run()

    expect(stdout.output).toMatch('<output>')
    expect(stderr.output).toMatch('oops')
  })

  test('REPL: here-string with no output skips <output> block', async () => {
    readline.createInterface.mockReturnValue(makeRl(['true <<< "x"', 'exit']))
    sandbox.exec
      .mockResolvedValueOnce({ stdout: 'v20.0.0\n', stderr: '', exitCode: 0 })
      .mockResolvedValueOnce({ stdout: '', stderr: '', exitCode: 0 })

    command.argv = []
    await command.run()

    // the second exec produced no output, so no <output> block this turn
    const after = stdout.output.split('Sandbox ready.').slice(1).join('Sandbox ready.')
    expect(after).not.toMatch('<output>')
    expect(after).toMatch('[exit: 0]')
  })

  test('handles probe with no stdout (exec result missing stdout)', async () => {
    sandbox.exec.mockResolvedValueOnce({ stderr: '', exitCode: 0 })
    command.argv = []
    await command.run()
    expect(stdout.output).toMatch('Node version:')
  })

  test('routes create errors through handleError and skips destroy', async () => {
    rtLib.mockRejected(rtCreate, new Error('boom'))
    command.argv = []
    await command.run()
    expect(handleError).toHaveBeenCalledWith('failed to run sandbox', expect.objectContaining({ message: 'boom' }))
    expect(sandbox.destroy).not.toHaveBeenCalled()
  })

  test('logs a message when destroy fails', async () => {
    sandbox.destroy.mockRejectedValue(new Error('destroy failed'))
    command.argv = []
    await command.run()
    expect(stdout.output).toMatch('failed to destroy sandbox: destroy failed')
  })

  test('logs a stringified value when destroy rejects without .message', async () => {
    sandbox.destroy.mockRejectedValue('plain reason')
    command.argv = []
    await command.run()
    expect(stdout.output).toMatch('failed to destroy sandbox: plain reason')
  })
})
