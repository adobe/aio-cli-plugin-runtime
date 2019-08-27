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

const TheCommand = require('../../../../src/commands/runtime/property/unset.js')
const RuntimeBaseCommand = require('../../../../src/RuntimeBaseCommand.js')

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

test('base flags included in command flags',
  createTestFlagsFunction(TheCommand, {
    ...RuntimeBaseCommand.flags
  })
)

test('flags', async () => {
  const flags = TheCommand.flags
  expect(TheCommand.flags).toBeDefined()

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
  let command, handleError

  beforeEach(() => {
    command = new TheCommand([])
    handleError = jest.spyOn(command, 'handleError')
  })

  describe('run', () => {
    test('exists', async () => {
      expect(command.run).toBeInstanceOf(Function)
    })

    test('--auth', (done) => {
      // unset flag
      command.argv = [ '--auth' ]
      return command.run()
        .then(() => {
          done()
        })
    })

    test('--apihost', (done) => {
      // unset flag
      command.argv = [ '--apihost' ]
      return command.run()
        .then(() => {
          done()
        })
    })

    test('--apiversion', (done) => {
      // unset flag
      command.argv = [ '--apiversion' ]
      return command.run()
        .then(() => {
          done()
        })
    })

    test('--cert', (done) => {
      // unset flag
      command.argv = [ '--cert' ]
      return command.run()
        .then(() => {
          done()
        })
    })

    test('--key', (done) => {
      // unset flag
      command.argv = [ '--key' ]
      return command.run()
        .then(() => {
          done()
        })
    })

    test('--namespace', (done) => {
      // unset flag
      command.argv = [ '--namespace' ]
      return command.run()
        .then(() => {
          done()
        })
    })

    test('unknown flag', (done) => {
      command.argv = [ '--unknown-flag' ]
      return command.run()
        .then(() => done.fail('this should not succeed'))
        .catch(() => {
          expect(handleError).toHaveBeenLastCalledWith('failed to unset the property', new Error('Unexpected argument: --unknown-flag\nSee more help with --help'))
          done()
        })
    })
  })
})
