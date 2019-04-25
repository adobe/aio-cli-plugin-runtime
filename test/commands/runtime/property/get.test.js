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

jest.mock('node-fetch')

test('exports', async () => {
  expect(typeof TheCommand).toEqual('function')
  expect(TheCommand.prototype instanceof RuntimeBaseCommand).toBeTruthy()
})

test('description', async () => {
  expect(TheCommand.description).toBeDefined()
})

test('aliases', async () => {
  expect(TheCommand.aliases).toEqual([])
})

test('args', async () => {
  expect(TheCommand.args).not.toBeDefined()
})

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
  let rp

  beforeEach(() => {
    rp = require('node-fetch')
    rp.mockImplementation(() => { return { json: () => fixtureJson('property/api.json') } })
    command = new TheCommand([])
  })

  describe('run', () => {
    test('exists', async () => {
      expect(command.run).toBeInstanceOf(Function)
    })

    // 38,41,52

    test('error exception, unknown flag', (done) => {
      command.argv = ['--unknown-flag']
      return command.run()
        .then(() => done.fail('this should not succeeed'))
        .catch((err) => {
          expect(err).toMatchObject(new Error('Unexpected argument: --unknown-flag\nSee more help with --help'))
          done()
        })
    })

    test('no flags', (done) => {
      // cli version
      command.config = fixtureJson('property/config.json')
      return command.run()
        .then(() => {
          expect(stdout.output).toMatchFixture('property/all.txt')
          done()
        })
    })

    test('no flags, api server unreachable', (done) => {
      // apibuild and apibuildno
      rp.mockImplementation(() => {
        throw new Error('no connection')
      })

      // cli version
      command.config = fixtureJson('property/config.json')
      return command.run()
        .then(() => {
          expect(stdout.output).toMatchFixture('property/all-server-error.txt')
          done()
        })
    })

    test('--all', (done) => {
      // cli version
      command.config = fixtureJson('property/config.json')
      // set flag
      command.argv = [ '--all' ]
      return command.run()
        .then(() => {
          expect(stdout.output).toMatchFixture('property/all.txt')
          done()
        })
    })

    test('--namespace', (done) => {
      // cli version
      command.config = fixtureJson('property/config.json')
      // set flag
      command.argv = [ '--namespace' ]
      return command.run()
        .then(() => {
          expect(stdout.output).toMatchFixture('property/namespace.txt')
          done()
        })
    })

    test('--auth', (done) => {
      // cli version
      command.config = fixtureJson('property/config.json')
      // set flag
      command.argv = [ '--auth' ]
      return command.run()
        .then(() => {
          expect(stdout.output).toMatchFixture('property/auth.txt')
          done()
        })
    })

    test('--apihost', (done) => {
      // cli version
      command.config = fixtureJson('property/config.json')
      // set flag
      command.argv = [ '--apihost' ]
      return command.run()
        .then(() => {
          expect(stdout.output).toMatchFixture('property/apihost.txt')
          done()
        })
    })

    test('--apiversion', (done) => {
      // cli version
      command.config = fixtureJson('property/config.json')
      // set flag
      command.argv = [ '--apiversion' ]
      return command.run()
        .then(() => {
          expect(stdout.output).toMatchFixture('property/apiversion.txt')
          done()
        })
    })

    test('--cliversion', (done) => {
      // cli version
      command.config = fixtureJson('property/config.json')
      // set flag
      command.argv = [ '--cliversion' ]
      return command.run()
        .then(() => {
          expect(stdout.output).toMatchFixture('property/cliversion.txt')
          done()
        })
    })

    test('--apibuild', (done) => {
      // cli version
      command.config = fixtureJson('property/config.json')
      // set flag
      command.argv = [ '--apibuild' ]
      return command.run()
        .then(() => {
          expect(stdout.output).toMatchFixture('property/apibuild.txt')
          done()
        })
    })

    test('--apibuildno', (done) => {
      // cli version
      command.config = fixtureJson('property/config.json')
      // set flag
      command.argv = [ '--apibuildno' ]
      return command.run()
        .then(() => {
          expect(stdout.output).toMatchFixture('property/apibuildno.txt')
          done()
        })
    })

    test('keys not found in .wskconfig, use defaults', (done) => {
      fakeFileSystem.reset({ emptyWskProps: true })

      // cli version
      command.config = fixtureJson('property/config.json')
      // set flag
      command.argv = [ '--all' ]
      return command.run()
        .then(() => {
          expect(stdout.output).toMatchFixture('property/all-empty-wskprops.txt')
          fakeFileSystem.reset()
          done()
        })
    })
  })
})
