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

const { stdout } = require('stdout-stderr')
const TheCommand = require('../../../../src/commands/runtime/action/invoke.js')
const RuntimeBaseCommand = require('../../../../src/RuntimeBaseCommand.js')
const ow = require('openwhisk')()
const owAction = 'actions.invoke'

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
  expect(TheCommand.flags.param.multiple).toBe(true)
  expect(TheCommand.flags.param.char).toBe('p')
  expect(typeof TheCommand.flags.param).toBe('object')
  expect(TheCommand.flags['param-file'].char).toBe('P')
  expect(typeof TheCommand.flags['param-file']).toBe('object')
  expect(TheCommand.flags.blocking.char).toBe('b')
  expect(TheCommand.flags.blocking.default).toBe(false)
  expect(typeof TheCommand.flags.blocking).toBe('object')
  expect(TheCommand.flags.result.char).toBe('r')
  expect(TheCommand.flags.result.default).toBe(false)
  expect(typeof TheCommand.flags.result).toBe('object')
})

test('args', async () => {
  const invokeName = TheCommand.args[0]
  expect(invokeName.name).toBeDefined()
  expect(invokeName.name).toEqual('actionName')
  expect(invokeName.required).toEqual(true)
})

describe('instance methods', () => {
  let command, handleError

  beforeEach(() => {
    command = new TheCommand([])
    handleError = jest.spyOn(command, 'handleError')
  })

  afterAll(() => {
    // reset back to normal
    fakeFileSystem.reset()
  })

  describe('run', () => {
    test('exists', async () => {
      expect(command.run).toBeInstanceOf(Function)
    })

    test('invokes an action only with action name', () => {
      const cmd = ow.mockResolved(owAction, '')
      command.argv = ['hello']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith(expect.objectContaining({
            name: 'hello',
            blocking: false,
            params: {},
            result: false
          }))
          expect(stdout.output).toMatch('')
        })
    })

    test('sets X-OW-EXTRA-LOGGING header when invoking an action', () => {
      const cmd = ow.mockResolved(owAction, '')
      command.argv = ['hello']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith(expect.objectContaining({
            headers: expect.objectContaining({ 'X-OW-EXTRA-LOGGING': 'on' })
          }))
          expect(stdout.output).toMatch('')
        })
    })

    test('invokes an action with action name and params', () => {
      const cmd = ow.mockResolved(owAction, '')
      command.argv = ['hello', '--param', 'a', 'b', 'c', 'd']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith(expect.objectContaining({
            name: 'hello',
            params: { a: 'b', c: 'd' },
            blocking: false,
            result: false
          }))
          expect(stdout.output).toMatch('')
        })
    })

    test('invokes an action with action name, params and blocking', () => {
      const cmd = ow.mockResolved(owAction, '')
      command.argv = ['hello', '--param', 'a', 'b', '--param', 'c', 'd', '--blocking']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith(expect.objectContaining({
            name: 'hello',
            params: { a: 'b', c: 'd' },
            blocking: true,
            result: false
          }))
          expect(stdout.output).toMatch('')
        })
    })

    test('invokes an action with action name, params and result. Should still block', () => {
      const cmd = ow.mockResolved(owAction, '')
      command.argv = ['hello', '--result']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith(expect.objectContaining({
            name: 'hello',
            blocking: true,
            params: {},
            result: true
          }))
          expect(stdout.output).toMatch('')
        })
    })

    test('invokes an action with action name, and gets an activation id', () => {
      const result = { activationId: '123456' }
      const cmd = ow.mockResolved(owAction, result)
      command.argv = ['hello']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith(expect.objectContaining({
            name: 'hello',
            blocking: false,
            params: {},
            result: false
          }))
          expect(stdout.output).toMatch(JSON.stringify(result, null, 2))
        })
    })

    test('invokes an action with action name and --blocking, and gets an activation record as the response', () => {
      const result = { activationId: '123456', response: { result: { msg: '123456' } } }
      const cmd = ow.mockResolved(owAction, result)
      command.argv = ['hello', '--blocking']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith(expect.objectContaining({
            name: 'hello',
            blocking: true,
            params: {},
            result: false
          }))
          expect(stdout.output).toMatch(JSON.stringify(result, null, 2))
        })
    })

    test('invokes an action with action name and --result, and gets an activation result as the response', () => {
      const result = { msg: '123456' }
      const cmd = ow.mockResolved(owAction, result)
      command.argv = ['hello', '--result']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith(expect.objectContaining({
            name: 'hello',
            blocking: true,
            params: {},
            result: true
          }))
          expect(stdout.output).toMatch(JSON.stringify(result, null, 2))
        })
    })

    test('invokes an action with action name and --blocking but activation is demoted to async', () => {
      // when the API returns with 202 it demoted the activation to async request, providing only an activation id
      const result = { activationId: '123456' }
      const cmd = ow.mockRejected(owAction, result)
      command.argv = ['hello', '--blocking']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith(expect.objectContaining({
            name: 'hello',
            blocking: true,
            params: {},
            result: false
          }))

          expect(stdout.output).toMatch(`activation took too long, use activation id 123456 to check for completion.`)
        })
    })

    test('invokes an action with action name and --result but activation is demoted to async', () => {
      // when the API returns with 202 it demoted the activation to async request, providing only an activation id
      const result = { activationId: '123456' }
      const cmd = ow.mockRejected(owAction, result)
      command.argv = ['hello', '--result']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith(expect.objectContaining({
            name: 'hello',
            blocking: true,
            params: {},
            result: true
          }))

          expect(stdout.output).toMatch(`activation took too long, use activation id 123456 to check for completion.`)
        })
    })

    test('invokes an action with action name and --blocking, and gets an activation record where the result is an error (API status code is 502)', () => {
      // when the API returns with 502 due to an application error in the function
      // the result is the entire activation wrapped in an error object
      const result = { activationId: '123456', response: { result: { error: 'oops' } } }
      const cmd = ow.mockRejected(owAction, { error: result })
      command.argv = ['hello', '--blocking']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith(expect.objectContaining({
            name: 'hello',
            blocking: true,
            params: {},
            result: false
          }))

          expect(stdout.output).toMatch(JSON.stringify(result, null, 2))
        })
    })

    test('invokes an action with action name and --result, and gets an activation record where the result is an error (API status code is 502)', () => {
      // npm openwhisk does a blocking invoke for "--result" and then projects the result
      // so when the API returns with 502 due to an application error in the function
      // the result is the entire activation wrapped in an error object
      const result = { activationId: '123456', response: { result: { error: 'oops' } } }
      const cmd = ow.mockRejected(owAction, { error: result })
      command.argv = ['hello', '--result']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith(expect.objectContaining({
            name: 'hello',
            blocking: true,
            params: {},
            result: true
          }))

          expect(stdout.output).toMatch(JSON.stringify(result.response.result, null, 2))
        })
    })

    test('invokes an action with all flags', () => {
      const cmd = ow.mockResolved(owAction, '')
      command.argv = ['hello', '--param', 'a', 'b', '--param', 'c', 'd', '--blocking', '--result']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith(expect.objectContaining({
            name: 'hello',
            params: { a: 'b', c: 'd' },
            blocking: true,
            result: true
          }))
          expect(stdout.output).toMatch('')
        })
    })

    test('invokes an action with all flags and --param-file', () => {
      const cmd = ow.mockResolved(owAction, '')
      const json = {
        'parameters.json': fixtureFile('trigger/parameters.json')
      }
      fakeFileSystem.addJson({
        '/action': json
      })
      command.argv = ['hello', '--param-file', '/action/parameters.json', '--blocking', '--result']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith(expect.objectContaining({
            name: 'hello',
            params: { param1: 'param1value', param2: 'param2value' },
            blocking: true,
            result: true
          }))
          expect(stdout.output).toMatch('')
        })
    })

    test('tests for incorrect parameters', () => {
      return new Promise((resolve, reject) => {
        ow.mockRejected(owAction, '')
        command.argv = ['hello', '--param', 'a', 'b', 'c', '--blocking']
        return command.run()
          .then(() => reject(new Error('does not throw error')))
          .catch(() => {
            expect(handleError).toHaveBeenLastCalledWith('failed to invoke the action', new Error('Please provide correct values for flags'))
            resolve()
          })
      })
    })

    test('errors out on api error', () => {
      return new Promise((resolve, reject) => {
        ow.mockRejected(owAction, new Error('an error'))
        command.argv = ['hello']
        return command.run()
          .then(() => reject(new Error('does not throw error')))
          .catch(() => {
            expect(handleError).toHaveBeenLastCalledWith('failed to invoke the action', new Error('an error'))
            resolve()
          })
      })
    })
  })
})
