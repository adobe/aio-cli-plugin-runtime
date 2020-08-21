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
const TheCommand = require('../../../../src/commands/runtime/activation/logs.js')
const RuntimeBaseCommand = require('../../../../src/RuntimeBaseCommand.js')
const RuntimeLib = require('@adobe/aio-lib-runtime')
const rtUtils = RuntimeLib.utils
const rtAction = 'activations.logs'
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
  const logName = TheCommand.args[0]
  expect(logName.name).toBeDefined()
  expect(logName.name).toEqual('activationId')
})

test('flags', async () => {
  const lFlag = TheCommand.flags.last
  expect(lFlag).toBeDefined()
  expect(lFlag.description).toBeDefined()
  expect(lFlag.char).toBe('l')

  const sFlag = TheCommand.flags.strip
  expect(sFlag).toBeDefined()
  expect(sFlag.description).toBeDefined()
  expect(sFlag.char).toBe('r')
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

    test('retrieve logs of an activation - no-results', () => {
      const cmd = rtLib.mockResolved(rtAction, '')
      command.argv = ['12345']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith('12345')
          expect(stdout.output).toMatch('')
        })
    })

    test('retrieve logs of an activation - with-results', () => {
      const cmd = rtLib.mockResolved(rtAction, { logs: ['this is a log', 'so is this'] })
      command.argv = ['12345']
      return command.run()
        .then((res) => {
          expect(cmd).toHaveBeenCalledWith('12345')
          expect(rtUtils.printLogs).toHaveBeenCalledWith({ logs: ['this is a log', 'so is this'] }, undefined, command.log)
        })
    })

    test('retrieve logs of an activation --strip', () => {
      const cmd = rtLib.mockResolved(rtAction, { logs: ['line1', 'line2', '2019-10-11T19:08:57.298Z  stdout: login-success'] })
      command.argv = ['12345', '-r']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith('12345')
          expect(rtUtils.printLogs).toHaveBeenCalledWith({ logs: ['line1', 'line2', '2019-10-11T19:08:57.298Z  stdout: login-success'] }, true, command.log)
        })
    })

    test('throws error retrieve logs of an activation', () => {
      rtLib.mockResolved('activations.list', [{ activationId: '12345' }])
      const cmd = rtLib.mockRejected(rtAction, new Error('Async error'))
      command.argv = ['-l', '-c', '2']
      return command.run()
        .catch(() => {
          expect(cmd).toHaveBeenCalledWith('12345')
          expect(handleError).toHaveBeenCalledWith('failed to retrieve logs for activation', expect.any(Error))
        })
    })

    test('retrieve last log -l', () => {
      const listCmd = rtLib.mockResolved('activations.list', [{ activationId: '12345' }])
      const logCmd = rtLib.mockResolved(rtAction, { logs: ['line1', 'line2', 'line3'] })
      command.argv = ['-l']
      return command.run()
        .then(() => {
          expect(listCmd).toHaveBeenCalledWith(expect.objectContaining({ limit: 1 }))
          expect(logCmd).toHaveBeenCalledWith('12345')
          expect(rtUtils.printLogs).toHaveBeenCalledWith({ logs: ['line1', 'line2', 'line3'] }, undefined, command.log)
        })
    })

    test('retrieve last logs - no-results', () => {
      const cmd = rtLib.mockResolved('activations.list', [])
      command.argv = ['-l']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith(expect.objectContaining({ limit: 1 }))
          expect(stdout.output).toMatch('')
        })
    })

    test('retrieve last log --last', () => {
      const listCmd = rtLib.mockResolved('activations.list', [{ activationId: '12345' }])
      const logCmd = rtLib.mockResolved(rtAction, { logs: ['line1', 'line2', 'line3'] })
      command.argv = ['--last']
      return command.run()
        .then(() => {
          expect(listCmd).toHaveBeenCalledWith(expect.objectContaining({ limit: 1 }))
          expect(logCmd).toHaveBeenCalledWith('12345')
          expect(rtUtils.printLogs).toHaveBeenCalledWith({ logs: ['line1', 'line2', 'line3'] }, undefined, command.log)
        })
    })

    test('retrieve last -c logs', () => {
      const listCmd = rtLib.mockResolved('activations.list', [{ activationId: '12345' }, { activationId: '12346' }])
      const logCmd = rtLib.mockResolved(rtAction, { logs: ['line1', 'line2', 'line3'] })
      command.argv = ['-l', '-c', '2']
      return command.run()
        .then(() => {
          expect(listCmd).toHaveBeenCalledWith(expect.objectContaining({ limit: 2 }))
          expect(logCmd).toHaveBeenCalledWith('12345')
          expect(logCmd).toHaveBeenCalledWith('12346')
          expect(rtUtils.printLogs).toHaveBeenCalledWith({ logs: ['line1', 'line2', 'line3'] }, undefined, command.log)
        })
    })

    test('errors if np axId or --last flag', () => {
      return new Promise((resolve, reject) => {
        command.argv = []
        const error = jest.spyOn(command, 'error')
        return command.run()
          .then(() => reject(new Error('does not throw error')))
          .catch(() => {
            expect(error).toHaveBeenLastCalledWith('Missing required arg: `activationId`')
            resolve()
          })
      })
    })
  })
})
