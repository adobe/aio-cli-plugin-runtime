/*
Copyright 2019 Adobe Inc. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const TheCommand = require('../../../../src/commands/runtime/property/get.js')
const RuntimeBaseCommand = require('../../../../src/RuntimeBaseCommand.js')
const { stdout } = require('stdout-stderr')
const { PropertyEnv } = require('../../../../src/properties')

const mockFetch = jest.fn()
jest.mock('@adobe/aio-lib-core-networking', () => ({
  createFetch: jest.fn(() => mockFetch)
}))

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

test('args', async () => {
  expect(TheCommand.args).not.toBeDefined()
})

// eslint-disable-next-line jest/expect-expect
test('base flags included in command flags',
  createTestFlagsFunction(TheCommand, {
    ...RuntimeBaseCommand.flags
  })
)

test('flags', async () => {
  const flags = TheCommand.flags
  expect(TheCommand.flags).toBeDefined()

  expect(flags.all).toBeDefined()
  expect(flags.all.type).toEqual('boolean')

  expect(flags.apibuild).toBeDefined()
  expect(flags.apibuild.type).toEqual('boolean')

  expect(flags.apibuildno).toBeDefined()
  expect(flags.apibuildno.type).toEqual('boolean')

  expect(flags.cliversion).toBeDefined()
  expect(flags.cliversion.type).toEqual('boolean')

  expect(flags.namespace).toBeDefined()
  expect(flags.namespace.type).toEqual('boolean')

  // these flags have to be boolean
  expect(flags.cert.type).toEqual('boolean')
  expect(flags.key.type).toEqual('boolean')
  expect(flags.apiversion.type).toEqual('boolean')
  expect(flags.apihost.type).toEqual('boolean')
  expect(flags.auth.type).toEqual('boolean')
})

describe('instance methods', () => {
  let command

  beforeEach(() => {
    mockFetch.mockReset()
    mockFetch.mockResolvedValue({ json: () => fixtureJson('property/api.json') })
    command = new TheCommand([])
  })

  describe('run', () => {
    test('exists', async () => {
      expect(command.run).toBeInstanceOf(Function)
    })

    test('no flags', () => {
      // cli version
      command.config = fixtureJson('property/config.json')
      return command.run()
        .then(() => {
          expect(stdout.output).toMatchFixture('property/all.txt')
        })
    })

    test('no flags, api server unreachable', () => {
      // apibuild and apibuildno
      mockFetch.mockRejectedValue(new Error('no connection'))

      // cli version
      command.config = fixtureJson('property/config.json')
      return command.run()
        .then(() => {
          expect(stdout.output).toMatchFixture('property/all-server-error.txt')
        })
    })

    test('--all', () => {
      // cli version
      command.config = fixtureJson('property/config.json')
      // set flag
      command.argv = ['--all']
      return command.run()
        .then(() => {
          expect(stdout.output).toMatchFixture('property/all.txt')
        })
    })

    test('--namespace', () => {
      // cli version
      command.config = fixtureJson('property/config.json')
      // set flag
      command.argv = ['--namespace']
      return command.run()
        .then(() => {
          expect(stdout.output).toEqual(expect.stringContaining('whisk namespace some_namespace'))
        })
    })

    test('--auth', () => {
      // cli version
      command.config = fixtureJson('property/config.json')
      // set flag
      command.argv = ['--auth']
      return command.run()
        .then(() => {
          expect(stdout.output).toEqual(expect.stringContaining('whisk auth some-gibberish-not-a-real-key'))
        })
    })

    test('--apihost', () => {
      // cli version
      command.config = fixtureJson('property/config.json')
      // set flag
      command.argv = ['--apihost']
      return command.run()
        .then(() => {
          expect(stdout.output).toEqual(expect.stringContaining('whisk API host some.host'))
        })
    })

    test('--apiversion', () => {
      // cli version
      command.config = fixtureJson('property/config.json')
      // set flag
      command.argv = ['--apiversion']
      return command.run()
        .then(() => {
          expect(stdout.output).toEqual(expect.stringContaining('whisk API version v1'))
        })
    })

    test('--cliversion', () => {
      // cli version
      command.config = fixtureJson('property/config.json')
      // set flag
      command.argv = ['--cliversion']
      return command.run()
        .then(() => {
          expect(stdout.output).toEqual(expect.stringContaining('whisk CLI version 1.0'))
        })
    })

    test('--apibuild', () => {
      // cli version
      command.config = fixtureJson('property/config.json')
      // set flag
      command.argv = ['--apibuild']
      return command.run()
        .then(() => {
          expect(stdout.output).toEqual(expect.stringContaining('whisk API build version'))
          expect(stdout.output).toEqual(expect.stringContaining('2019-02-26'))
        })
    })

    test('--apibuildno', () => {
      // cli version
      command.config = fixtureJson('property/config.json')
      // set flag
      command.argv = ['--apibuildno']
      return command.run()
        .then(() => {
          expect(stdout.output).toEqual(expect.stringContaining('whisk API build number'))
        })
    })

    test('keys not found in .wskconfig, use defaults', () => {
      fakeFileSystem.reset({ emptyWskProps: true })

      // cli version
      command.config = fixtureJson('property/config.json')
      // set flag
      command.argv = ['--all']
      return command.run()
        .then(() => {
          expect(stdout.output).toMatchFixture('property/all-empty-wskprops.txt')
          fakeFileSystem.reset()
        })
    })

    test('ENV overrides', () => {
      fakeFileSystem.reset({ emptyWskProps: true })
      process.env[PropertyEnv.APIHOST] = 'https://google.com'
      process.env[PropertyEnv.AUTH] = 'foobar'
      process.env[PropertyEnv.APIVERSION] = 'v12.4'
      process.env[PropertyEnv.NAMESPACE] = '1234_5678'

      command.config = fixtureJson('property/config.json')
      // set flag
      command.argv = []
      return command.run()
        .then(() => {
          expect(stdout.output).toMatchFixture('property/cli-override-wskprops.txt')
        })
    })
  })
})
