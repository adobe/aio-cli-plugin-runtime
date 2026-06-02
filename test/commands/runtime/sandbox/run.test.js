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
const { Sandbox } = require('@adobe/aio-lib-sandbox')

/**
 * Build a fake `Sandbox` object suitable for stubbing Sandbox.create
 * resolutions from the mocked aio-lib-sandbox.
 *
 * @param {object} [overrides] override individual fields
 * @returns {object} fake sandbox
 */
function fakeSandbox (overrides = {}) {
  return {
    id: 'sandbox-123',
    exec: jest.fn(),
    getUrl: jest.fn(({ port }) => Promise.resolve(`https://sandbox-${port}.example.net`)),
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

test('examples', async () => {
  expect(TheCommand.examples).toBeDefined()
  expect(TheCommand.examples).toBeInstanceOf(Array)
  expect(TheCommand.examples.length).toBeGreaterThan(0)
  expect(TheCommand.examples).toContain('<%= config.bin %> <%= command.id %> -n my-sandbox -- node --version')
})

test('description includes REPL usage notes', async () => {
  expect(TheCommand.description).toMatch(/fresh process/)
  expect(TheCommand.description).toMatch(/<<</)
  expect(TheCommand.description).toMatch(/exit/)
  expect(TheCommand.description).toMatch(/-- <command>/)
  expect(TheCommand.description).toMatch(/\.detached <command>/)
})

describe('init', () => {
  test('ignores sandbox command args after -- during oclif parsing', async () => {
    const command = new TheCommand(['--', 'node', '--version'])

    await expect(command.init()).resolves.toBeUndefined()
    expect(command.argv).toEqual(['--', 'node', '--version'])
  })
})

test('flags', async () => {
  expect(typeof TheCommand.flags.name).toBe('object')
  expect(TheCommand.flags.name.char).toBe('n')
  expect(TheCommand.flags.name.default).toBe('aio-sandbox')
  expect(TheCommand.flags.type).toBeUndefined()
  expect(TheCommand.flags.size).toBeUndefined()
  expect(TheCommand.flags.egress.char).toBe('e')
  expect(TheCommand.flags.egress.multiple).toBe(true)
  expect(TheCommand.flags.port.char).toBe('p')
  expect(TheCommand.flags.port.multiple).toBe(true)
  expect(TheCommand.flags['max-lifetime'].default).toBe(3600)
  expect(TheCommand.flags.interactive).toBeUndefined()
  // inherits base flags
  expect(TheCommand.flags.apihost).toBeDefined()
  expect(TheCommand.flags.auth).toBeDefined()
})

describe('splitArgvAtDoubleDash', () => {
  test('returns all argv as cli args when there is no separator', () => {
    expect(TheCommand.splitArgvAtDoubleDash(['--name', 'box'])).toEqual({
      cliArgs: ['--name', 'box'],
      commandArgs: [],
      hasSeparator: false
    })
  })

  test('splits CLI args from one-shot command args', () => {
    expect(TheCommand.splitArgvAtDoubleDash(['--name', 'box', '--', 'node', '--version'])).toEqual({
      cliArgs: ['--name', 'box'],
      commandArgs: ['node', '--version'],
      hasSeparator: true
    })
  })
})

describe('buildSandboxCommand', () => {
  test('joins safe command args', () => {
    expect(TheCommand.buildSandboxCommand(['node', '--version'])).toBe('node --version')
  })

  test('preserves a single command string as-is', () => {
    expect(TheCommand.buildSandboxCommand(['npm test -- --watch'])).toBe('npm test -- --watch')
  })

  test('quotes command args that contain shell-sensitive characters', () => {
    expect(TheCommand.buildSandboxCommand(['node', '-e', 'console.log("hello world")'])).toBe('node -e \'console.log("hello world")\'')
  })
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

describe('parsePortFlags', () => {
  test('returns undefined when no port flags are provided', () => {
    expect(TheCommand.parsePortFlags(undefined)).toBeUndefined()
    expect(TheCommand.parsePortFlags([])).toBeUndefined()
  })

  test('parses repeatable port flags', () => {
    expect(TheCommand.parsePortFlags(['3000', '8080'])).toEqual([3000, 8080])
  })

  test('rejects non-numeric ports', () => {
    expect(() => TheCommand.parsePortFlags(['abc'])).toThrow(/Invalid port/)
  })

  test('rejects decimal ports', () => {
    expect(() => TheCommand.parsePortFlags(['3000.5'])).toThrow(/Invalid port/)
  })

  test('rejects out-of-range ports', () => {
    expect(() => TheCommand.parsePortFlags(['65536'])).toThrow(/Invalid port/)
  })
})

describe('buildNetworkPolicy', () => {
  test('returns undefined when no egress flags', () => {
    expect(TheCommand.buildNetworkPolicy(undefined)).toBeUndefined()
    expect(TheCommand.buildNetworkPolicy([])).toBeUndefined()
  })

  test('returns allow-all policy when sole value is allow-all', () => {
    expect(TheCommand.buildNetworkPolicy(['allow-all'])).toEqual({ network: { egress: 'allow-all' } })
  })

  test('throws when allow-all is mixed with other rules', () => {
    expect(() => TheCommand.buildNetworkPolicy(['allow-all', 'a.com:80'])).toThrow(/cannot be combined/)
  })

  test('returns parsed egress rules', () => {
    expect(TheCommand.buildNetworkPolicy(['a.com:80'])).toEqual({
      network: { egress: [{ host: 'a.com', port: 80 }] }
    })
  })
})

describe('run', () => {
  let command
  let handleError
  let sandbox

  beforeEach(async () => {
    command = new TheCommand([])
    handleError = jest.spyOn(command, 'handleError').mockResolvedValue(undefined)
    sandbox = fakeSandbox()
    Sandbox.create.mockReset()
    Sandbox.create.mockResolvedValue(sandbox)
    sandbox.exec.mockResolvedValue({ stdout: 'v20.0.0\n', stderr: '', exitCode: 0 })
    readline.createInterface.mockClear()
    readline.createInterface.mockReturnValue(makeRl(['exit']))
  })

  test('creates a sandbox with default flags and destroys on exit', async () => {
    command.argv = []
    await command.run()
    expect(Sandbox.create).toHaveBeenCalledWith(expect.objectContaining({
      apiHost: 'some.host',
      namespace: 'some_namespace',
      auth: 'some-gibberish-not-a-real-key',
      name: 'aio-sandbox',
      maxLifetime: 3600,
      envs: {}
    }))
    // default-deny policy log
    expect(stdout.output).toMatch('Network policy: default-deny')
    expect(stdout.output).toMatch('Created: sandbox-123')
    expect(stdout.output).toMatch('Sandbox destroyed.')
    expect(sandbox.destroy).toHaveBeenCalled()
  })

  test('runs command after -- once, prints output, and destroys sandbox', async () => {
    command.argv = ['--', 'node', '--version']
    await command.run()

    expect(readline.createInterface).not.toHaveBeenCalled()
    expect(sandbox.exec).toHaveBeenCalledWith('node --version', { timeout: 30000 })
    expect(stdout.output).toMatch('v20.0.0')
    expect(sandbox.destroy).toHaveBeenCalled()
  })

  test('one-shot command preserves argument boundaries', async () => {
    command.argv = ['--', 'node', '-e', 'console.log("hello world")']
    await command.run()

    expect(sandbox.exec).toHaveBeenCalledWith('node -e \'console.log("hello world")\'', { timeout: 30000 })
  })

  test('one-shot command writes stderr and sets process exitCode', async () => {
    const previousExitCode = process.exitCode
    sandbox.exec.mockResolvedValue({ stdout: '', stderr: 'boom\n', exitCode: 7 })

    command.argv = ['--', 'false']
    await command.run()

    expect(stderr.output).toMatch('boom')
    expect(process.exitCode).toBe(7)
    process.exitCode = previousExitCode
  })

  test('omitting a command enters the REPL', async () => {
    readline.createInterface.mockReturnValue(makeRl(['exit']))
    command.argv = []
    await command.run()

    expect(readline.createInterface).toHaveBeenCalled()
    expect(sandbox.exec).not.toHaveBeenCalled()
    expect(stdout.output).toMatch('Sandbox ready.')
  })

  test('bare -- without a command enters the REPL', async () => {
    readline.createInterface.mockReturnValue(makeRl(['exit']))
    command.argv = ['--']
    await command.run()

    expect(readline.createInterface).toHaveBeenCalled()
    expect(sandbox.exec).not.toHaveBeenCalled()
    expect(stdout.output).toMatch('Sandbox ready.')
    expect(sandbox.destroy).toHaveBeenCalled()
  })

  test('forwards --name and --max-lifetime', async () => {
    command.argv = ['--name', 'mybox', '--max-lifetime', '600']
    await command.run()
    expect(Sandbox.create).toHaveBeenCalledWith(expect.objectContaining({
      name: 'mybox',
      maxLifetime: 600
    }))
    expect(Sandbox.create).toHaveBeenCalledWith(expect.not.objectContaining({
      type: expect.anything(),
      size: expect.anything()
    }))
  })

  test('forwards -n when running a one-shot command', async () => {
    command.argv = ['-n', 'my-sandbox', '--', 'node', '--version']
    await command.run()

    expect(Sandbox.create).toHaveBeenCalledWith(expect.objectContaining({
      name: 'my-sandbox'
    }))
    expect(sandbox.exec).toHaveBeenCalledWith('node --version', { timeout: 30000 })
    expect(readline.createInterface).not.toHaveBeenCalled()
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
    expect(Sandbox.create).toHaveBeenCalledWith(expect.objectContaining({
      policy: { network: { egress: 'allow-all' } }
    }))
    expect(stdout.output).toMatch('Network policy: allow-all egress')
  })

  test('passes repeatable --port values through and logs preview URLs', async () => {
    command.argv = ['--port', '3000', '-p', '8080']
    await command.run()

    expect(Sandbox.create).toHaveBeenCalledWith(expect.objectContaining({
      ports: [3000, 8080]
    }))
    expect(sandbox.getUrl).toHaveBeenCalledWith({ port: 3000 })
    expect(sandbox.getUrl).toHaveBeenCalledWith({ port: 8080 })
    expect(stdout.output).toMatch('Preview URLs:')
    expect(stdout.output).toMatch('3000: https://sandbox-3000.example.net')
    expect(stdout.output).toMatch('8080: https://sandbox-8080.example.net')
  })

  test('rejects invalid --port before creating a sandbox', async () => {
    command.argv = ['--port', '0']
    await command.run()

    expect(handleError).toHaveBeenCalledWith('failed to run sandbox', expect.objectContaining({
      message: expect.stringMatching(/Invalid port/)
    }))
    expect(Sandbox.create).not.toHaveBeenCalled()
  })

  test('passes custom --egress rules through to policy and logs them', async () => {
    command.argv = ['--egress', 'pypi.org:443', '--egress', 'dns.google:53:UDP', '--egress', 'api.github.com:443|GET:/repos/**']
    await command.run()
    expect(Sandbox.create).toHaveBeenCalledWith(expect.objectContaining({
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
    expect(Sandbox.create).not.toHaveBeenCalled()
  })

  test('REPL: blank input is ignored and command runs exec', async () => {
    readline.createInterface.mockReturnValue(makeRl(['', 'ls -la', 'exit']))
    sandbox.exec.mockResolvedValueOnce({ stdout: 'total 0\n', stderr: '', exitCode: 0 })

    command.argv = []
    await command.run()

    expect(sandbox.exec).toHaveBeenCalledWith('ls -la', { timeout: 30000 })
    expect(stdout.output).toMatch('total 0')
    expect(stdout.output).toMatch('[exit: 0]')
  })

  test('REPL: command produces stderr', async () => {
    readline.createInterface.mockReturnValue(makeRl(['cat missing', 'exit']))
    sandbox.exec.mockResolvedValueOnce({ stdout: '', stderr: 'cat: missing: No such file\n', exitCode: 1 })

    command.argv = []
    await command.run()

    expect(stderr.output).toMatch('cat: missing: No such file')
    expect(stdout.output).toMatch('[exit: 1]')
  })

  test('REPL: exec errors are reported and do not break the loop', async () => {
    readline.createInterface.mockReturnValue(makeRl(['boom', 'exit']))
    sandbox.exec.mockRejectedValueOnce(new Error('exec failed'))

    command.argv = []
    await command.run()

    expect(stdout.output).toMatch('exec error: exec failed')
    expect(sandbox.destroy).toHaveBeenCalled()
  })

  test('REPL: exec errors without .message stringify the thrown value', async () => {
    readline.createInterface.mockReturnValue(makeRl(['boom', 'exit']))
    sandbox.exec.mockRejectedValueOnce('plain string error')

    command.argv = []
    await command.run()

    expect(stdout.output).toMatch('exec error: plain string error')
  })

  test('REPL: detached command starts in background and streams output', async () => {
    readline.createInterface.mockReturnValue(makeRl(['.detached npm run dev', 'exit']))
    sandbox.exec.mockImplementationOnce(async (cmd, options) => {
      options.onOutput('server ready\n', 'stdout')
      options.onOutput('debug line\n', 'stderr')
      return { execId: 'exec-abc', pid: 1234, detached: true }
    })

    command.argv = []
    await command.run()

    expect(sandbox.exec).toHaveBeenCalledWith('npm run dev', expect.objectContaining({
      detached: true,
      onOutput: expect.any(Function)
    }))
    expect(stdout.output).toMatch('server ready')
    expect(stderr.output).toMatch('debug line')
    expect(stdout.output).toMatch('[detached: exec-abc pid: 1234]')
    expect(stdout.output).not.toMatch('[exit:')
  })

  test('REPL: detached command without a command prints usage', async () => {
    readline.createInterface.mockReturnValue(makeRl(['.detached', 'exit']))

    command.argv = []
    await command.run()

    expect(sandbox.exec).not.toHaveBeenCalled()
    expect(stdout.output).toMatch('Usage: .detached <command>')
  })

  test('REPL: detached command handles missing pid', async () => {
    readline.createInterface.mockReturnValue(makeRl(['.detached npm run dev', 'exit']))
    sandbox.exec.mockResolvedValueOnce({ execId: 'exec-no-pid', detached: true })

    command.argv = []
    await command.run()

    expect(stdout.output).toMatch('[detached: exec-no-pid pid: unknown]')
  })

  test('REPL: here-string with double-quoted text strips quotes and sends stdin', async () => {
    readline.createInterface.mockReturnValue(makeRl(['cat -n <<< "hello"', 'exit']))
    sandbox.exec.mockResolvedValueOnce({ stdout: '     1\thello\n', stderr: '', exitCode: 0 })

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
    sandbox.exec.mockResolvedValueOnce({ stdout: 'world\n', stderr: '', exitCode: 0 })

    command.argv = []
    await command.run()

    expect(sandbox.exec).toHaveBeenLastCalledWith('cat', expect.objectContaining({
      stdin: 'world\n'
    }))
  })

  test('REPL: here-string with unquoted text passes through verbatim', async () => {
    readline.createInterface.mockReturnValue(makeRl(['wc -c <<< abc', 'exit']))
    sandbox.exec.mockResolvedValueOnce({ stdout: '4\n', stderr: '', exitCode: 0 })

    command.argv = []
    await command.run()

    expect(sandbox.exec).toHaveBeenLastCalledWith('wc -c', expect.objectContaining({
      stdin: 'abc\n'
    }))
  })

  test('REPL: here-string with stderr output is included in <output> block', async () => {
    readline.createInterface.mockReturnValue(makeRl(['cat - <<< "x"', 'exit']))
    sandbox.exec.mockResolvedValueOnce({ stdout: '', stderr: 'oops\n', exitCode: 1 })

    command.argv = []
    await command.run()

    expect(stdout.output).toMatch('<output>')
    expect(stderr.output).toMatch('oops')
  })

  test('REPL: here-string with no output skips <output> block', async () => {
    readline.createInterface.mockReturnValue(makeRl(['true <<< "x"', 'exit']))
    sandbox.exec.mockResolvedValueOnce({ stdout: '', stderr: '', exitCode: 0 })

    command.argv = []
    await command.run()

    // the second exec produced no output, so no <output> block this turn
    const after = stdout.output.split('Sandbox ready.').slice(1).join('Sandbox ready.')
    expect(after).not.toMatch('<output>')
    expect(after).toMatch('[exit: 0]')
  })

  test('REPL: command with no stdout still logs exit status', async () => {
    readline.createInterface.mockReturnValue(makeRl(['true', 'exit']))
    sandbox.exec.mockResolvedValueOnce({ stderr: '', exitCode: 0 })
    command.argv = []
    await command.run()
    expect(stdout.output).toMatch('[exit: 0]')
  })

  test('routes create errors through handleError and skips destroy', async () => {
    Sandbox.create.mockRejectedValue(new Error('boom'))
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
