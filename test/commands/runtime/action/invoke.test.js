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
const RuntimeLib = require('@adobe/aio-lib-runtime')
const rtAction = 'actions.invoke'
const rtUtils = RuntimeLib.utils

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
  let command, handleError, rtLib

  beforeEach(async () => {
    command = new TheCommand([])
    handleError = jest.spyOn(command, 'handleError')
    rtLib = await RuntimeLib.init({ apihost: 'fakehost', api_key: 'fakekey' })
    rtLib.mockResolved('actions.client.options', '')
    RuntimeLib.mockReset()
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
      const cmd = rtLib.mockResolved(rtAction, { res: 'fake' })
      command.argv = ['hello']
      rtUtils.getKeyValueObjectFromMergedParameters.mockReturnValue({})
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
      const cmd = rtLib.mockResolved(rtAction, { res: 'fake' })
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
      const cmd = rtLib.mockResolved(rtAction, { res: 'fake' })
      command.argv = ['hello', '--param', 'a', 'b', 'c', 'd']
      rtUtils.getKeyValueObjectFromMergedParameters.mockReturnValue({ fakeParam: 'aaa' })
      return command.run()
        .then(() => {
          expect(rtUtils.getKeyValueObjectFromMergedParameters).toHaveBeenCalledWith(['a', 'b', 'c', 'd'], undefined)
          expect(cmd).toHaveBeenCalledWith(expect.objectContaining({
            name: 'hello',
            params: { fakeParam: 'aaa' },
            blocking: false,
            result: false
          }))
          expect(stdout.output).toMatch('')
        })
    })

    test('invokes an action with action name, params and blocking', () => {
      const cmd = rtLib.mockResolved(rtAction, { res: 'fake' })
      command.argv = ['hello', '--param', 'a', 'b', '--param', 'c', 'd', '--blocking']
      rtUtils.getKeyValueObjectFromMergedParameters.mockReturnValue({ fakeParam: 'aaa' })
      return command.run()
        .then(() => {
          expect(rtUtils.getKeyValueObjectFromMergedParameters).toHaveBeenCalledWith(['a', 'b', 'c', 'd'], undefined)
          expect(cmd).toHaveBeenCalledWith(expect.objectContaining({
            name: 'hello',
            params: { fakeParam: 'aaa' },
            blocking: true,
            result: false
          }))
          expect(stdout.output).toMatch('')
        })
    })

    test('invokes an action with action name, params and result. Should still block', () => {
      const cmd = rtLib.mockResolved(rtAction, { res: 'fake' })
      command.argv = ['hello', '--result']
      rtUtils.getKeyValueObjectFromMergedParameters.mockReturnValue({})
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
      const cmd = rtLib.mockResolved(rtAction, result)
      command.argv = ['hello']
      rtUtils.getKeyValueObjectFromMergedParameters.mockReturnValue({})
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
      const cmd = rtLib.mockResolved(rtAction, result)
      command.argv = ['hello', '--blocking']
      rtUtils.getKeyValueObjectFromMergedParameters.mockReturnValue({})
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
      const cmd = rtLib.mockResolved(rtAction, result)
      command.argv = ['hello', '--result']
      rtUtils.getKeyValueObjectFromMergedParameters.mockReturnValue({})
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
      const cmd = rtLib.mockRejected(rtAction, result)
      command.argv = ['hello', '--blocking']
      rtUtils.getKeyValueObjectFromMergedParameters.mockReturnValue({})
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith(expect.objectContaining({
            name: 'hello',
            blocking: true,
            params: {},
            result: false
          }))

          expect(stdout.output).toMatch('activation took too long, use activation id 123456 to check for completion.')
        })
    })

    test('invokes an action with action name and --result but activation is demoted to async', () => {
      // when the API returns with 202 it demoted the activation to async request, providing only an activation id
      const result = { activationId: '123456' }
      const cmd = rtLib.mockRejected(rtAction, result)
      command.argv = ['hello', '--result']
      rtUtils.getKeyValueObjectFromMergedParameters.mockReturnValue({})
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith(expect.objectContaining({
            name: 'hello',
            blocking: true,
            params: {},
            result: true
          }))

          expect(stdout.output).toMatch('activation took too long, use activation id 123456 to check for completion.')
        })
    })

    test('invokes an action with action name and --blocking, and gets an activation record where the result is an error (API status code is 502)', () => {
      // when the API returns with 502 due to an application error in the function
      // the result is the entire activation wrapped in an error object
      const result = { activationId: '123456', response: { result: { error: 'oops' } } }
      const cmd = rtLib.mockRejected(rtAction, { error: result })
      command.argv = ['hello', '--blocking']
      rtUtils.getKeyValueObjectFromMergedParameters.mockReturnValue({})
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
      const cmd = rtLib.mockRejected(rtAction, { error: result })
      command.argv = ['hello', '--result']
      rtUtils.getKeyValueObjectFromMergedParameters.mockReturnValue({})
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
      const cmd = rtLib.mockResolved(rtAction, { res: 'fake' })
      command.argv = ['hello', '--param', 'a', 'b', '--param', 'c', 'd', '--blocking', '--result']
      rtUtils.getKeyValueObjectFromMergedParameters.mockReturnValue({ fakeParam: 'aaa' })
      return command.run()
        .then(() => {
          expect(rtUtils.getKeyValueObjectFromMergedParameters).toHaveBeenCalledWith(['a', 'b', 'c', 'd'], undefined)
          expect(cmd).toHaveBeenCalledWith(expect.objectContaining({
            name: 'hello',
            params: { fakeParam: 'aaa' },
            blocking: true,
            result: true
          }))
          expect(stdout.output).toMatch('')
        })
    })

    test('invokes an action with all flags and --param-file', () => {
      const cmd = rtLib.mockResolved(rtAction, { res: 'fake' })
      command.argv = ['hello', '--param-file', '/action/parameters.json', '--blocking', '--result']
      rtUtils.getKeyValueObjectFromMergedParameters.mockReturnValue({ fakeParam: 'aaa' })
      return command.run()
        .then(() => {
          expect(rtUtils.getKeyValueObjectFromMergedParameters).toHaveBeenCalledWith(undefined, '/action/parameters.json')
          expect(cmd).toHaveBeenCalledWith(expect.objectContaining({
            name: 'hello',
            params: { fakeParam: 'aaa' },
            blocking: true,
            result: true
          }))
          expect(stdout.output).toMatch('')
        })
    })

    test('tests for incorrect parameters', () => {
      return new Promise((resolve, reject) => {
        rtLib.mockRejected(rtAction, 'not that one')
        rtUtils.getKeyValueObjectFromMergedParameters.mockImplementation(() => { throw new Error('that is a parsing error') })
        command.argv = ['hello', '--param', 'a', 'b', 'c', '--blocking']
        return command.run()
          .then(() => reject(new Error('does not throw error')))
          .catch(() => {
            expect(handleError).toHaveBeenLastCalledWith('failed to invoke the action', new Error('that is a parsing error'))
            resolve()
          })
      })
    })

    test('errors out on api error', () => {
      return new Promise((resolve, reject) => {
        rtLib.mockRejected(rtAction, new Error('an error'))
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
