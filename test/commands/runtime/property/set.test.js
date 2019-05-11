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

const TheCommand = require('../../../../src/commands/runtime/property/set.js')
const RuntimeBaseCommand = require('../../../../src/RuntimeBaseCommand.js')
const { PropertyEnv, propertiesFile } = require('../../../../src/properties')

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

  expect(flags.namespace).toBeDefined()
  expect(flags.namespace.type).toEqual('option')

  // these flags have to be string (option)
  expect(flags.cert.type).toEqual('option')
  expect(flags.key.type).toEqual('option')
  expect(flags.apiversion.type).toEqual('option')
  expect(flags.apihost.type).toEqual('option')
  expect(flags.auth.type).toEqual('option')
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
  })

  test('--auth', (done) => {
    // set flag
    command.argv = [ '--auth', 'some-auth-key' ]
    return command.run()
      .then(() => {
        done()
      })
  })

  test('--apihost', (done) => {
    // set flag
    command.argv = [ '--apihost', 'http://myserver' ]
    return command.run()
      .then(() => {
        done()
      })
  })

  test('--apiversion', (done) => {
    // set flag
    command.argv = [ '--apiversion', 'v2' ]
    return command.run()
      .then(() => {
        done()
      })
  })

  test('--cert', (done) => {
    // set flag
    command.argv = [ '--cert', 'mycert=12512tsagZFSG' ]
    return command.run()
      .then(() => {
        done()
      })
  })

  test('--key', (done) => {
    // set flag
    command.argv = [ '--key', '7129asgas97195t9asgha' ]
    return command.run()
      .then(() => {
        done()
      })
  })

  test('--namespace', (done) => {
    // set flag
    command.argv = [ '--namespace', 'my-namespace' ]
    return command.run()
      .then(() => {
        done()
      })
  })

  test('namespace flag with env', async () => {
    const value = 'my-new-namespace'
    process.env[PropertyEnv.NAMESPACE] = value

    return command.run().then(() => {
      expect(propertiesFile().get('NAMESPACE')).toEqual(value)
      delete process.env[PropertyEnv.NAMESPACE]
    })
  })

  test('unknown flag', (done) => {
    command.argv = [ '--unknown-flag', 'some-value' ]
    return command.run()
      .then(() => done.fail('this should not succeed'))
      .catch(() => {
        expect(handleError).toHaveBeenLastCalledWith('failed to set the property', new Error('Unexpected arguments: --unknown-flag, some-value\nSee more help with --help'))
        done()
      })
  })
})
