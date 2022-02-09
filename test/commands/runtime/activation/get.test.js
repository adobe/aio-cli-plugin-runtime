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
const TheCommand = require('../../../../src/commands/runtime/activation/get.js')
const RuntimeBaseCommand = require('../../../../src/RuntimeBaseCommand.js')
const RuntimeLib = require('@adobe/aio-lib-runtime')
const rtUtils = RuntimeLib.utils
const rtAction = 'activations.get'

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
  const getName = TheCommand.args[0]
  expect(getName.name).toBeDefined()
  expect(getName.name).toEqual('activationID')
})

test('flags', async () => {
  const lastFlag = TheCommand.flags.last
  expect(lastFlag).toBeDefined()
  expect(lastFlag.description).toBeDefined()
  expect(lastFlag.char).toBe('l')

  const logsFlag = TheCommand.flags.logs
  expect(logsFlag).toBeDefined()
  expect(logsFlag.description).toBeDefined()
  expect(logsFlag.char).toBe('g')
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

  describe('run', () => {
    test('exists', async () => {
      expect(command.run).toBeInstanceOf(Function)
    })

    test('retrieve an activation', () => {
      const cmd = rtLib.mockResolved(rtAction, { res: 'fake' })
      command.argv = ['12345']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith('12345')
          expect(stdout.output).toMatch('')
        })
    })

    test('retrieve logs for an activation --logs', () => {
      // note: when we call with an id, and --logs, we never call `get`, just activations.logs(id)
      const cmd = rtLib.mockResolved('activations.logs', { logs: ['line1', 'line2', '2019-10-11T19:08:57.298Z  stdout: login-success'] })
      command.argv = ['12345', '--logs']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith('12345')
          expect(rtUtils.printLogs).toHaveBeenCalledWith({ logs: ['line1', 'line2', '2019-10-11T19:08:57.298Z  stdout: login-success'] }, true, command.log)
        })
    })

    test('retrieve last activation --last', () => {
      const axList = rtLib.mockResolved('activations.list', [{ activationId: '12345' }])
      const axGet = rtLib.mockResolved(rtAction, '')
      command.argv = ['--last']
      return command.run()
        .then(() => {
          expect(axList).toHaveBeenCalled()
          expect(axGet).toHaveBeenCalledWith('12345')
          expect(stdout.output).toMatch('')
        })
    })

    test('retrieve last activation logs --last --logs', () => {
      const axList = rtLib.mockResolved('activations.list', [{ activationId: '12345' }])
      const axGet = rtLib.mockResolved('activations.logs', { logs: ['line1', 'line2', '2019-10-11T19:08:57.298Z  stdout: login-success'] })
      command.argv = ['--last', '--logs']
      return command.run()
        .then(() => {
          expect(axList).toHaveBeenCalled()
          expect(axGet).toHaveBeenCalledWith('12345')
          expect(rtUtils.printLogs).toHaveBeenCalledWith({ logs: ['line1', 'line2', '2019-10-11T19:08:57.298Z  stdout: login-success'] }, true, command.log)
        })
    })

    test('retrieve last activation logs --last --logs : none returned', async () => {
      rtLib.mockResolved('activations.list', [])
      command.argv = ['--last', '--logs']
      const res = command.run()
      await expect(res).rejects.toThrow('no activations were returned')
    })

    test('should fail on get activation w/ noflag, no activationId', async () => {
      const runResult = command.run()
      await expect(runResult instanceof Promise).toBeTruthy()
      await expect(runResult).rejects.toThrow('failed to retrieve the activation')
    })

    test('errors out on api error', async () => {
      rtLib.mockRejected(rtAction, new Error('an error'))
      command.argv = ['12345']
      await expect(command.run()).rejects.toThrow()
      expect(handleError).toHaveBeenLastCalledWith('failed to retrieve the activation', new Error('an error'))
    })
  })
})
