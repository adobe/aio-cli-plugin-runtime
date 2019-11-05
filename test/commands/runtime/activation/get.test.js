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
const ow = require('openwhisk')()
const owAction = 'activations.get'

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
  let command, handleError

  beforeEach(() => {
    command = new TheCommand([])
    handleError = jest.spyOn(command, 'handleError')
  })

  describe('run', () => {
    test('exists', async () => {
      expect(command.run).toBeInstanceOf(Function)
    })

    test('retrieve an activation', () => {
      const cmd = ow.mockResolved(owAction, '')
      command.argv = ['12345']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith('12345')
          expect(stdout.output).toMatch('')
        })
    })

    test('retrieve logs for an activation --logs', () => {
      // note: when we call with an id, and --logs, we never call `get`, just activations.logs(id)
      const cmd = ow.mockResolved('activations.logs', { logs: ['line1', 'line2', '2019-10-11T19:08:57.298Z  stdout: login-success'] })
      command.argv = ['12345', '--logs']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith('12345')
          expect(stdout.output).toMatch('line1\nline2\nlogin-success')
        })
    })

    test('retrieve last activation --last', () => {
      const axList = ow.mockResolved('activations.list', [{ activationId: '12345' }])
      const axGet = ow.mockResolved(owAction, '')
      command.argv = ['--last']
      return command.run()
        .then(() => {
          expect(axList).toHaveBeenCalled()
          expect(axGet).toHaveBeenCalledWith('12345')
          expect(stdout.output).toMatch('')
        })
    })

    test('retrieve last activation logs --last --logs', () => {
      const axList = ow.mockResolved('activations.list', [{ activationId: '12345' }])
      const axGet = ow.mockResolved('activations.logs', { logs: ['line1', 'line2', '2019-10-11T19:08:57.298Z   stdout: login-success'] })
      command.argv = ['--last', '--logs']
      return command.run()
        .then(() => {
          expect(axList).toHaveBeenCalled()
          expect(axGet).toHaveBeenCalledWith('12345')
          expect(stdout.output).toMatch('line1\nline2\nlogin-success')
        })
    })

    test('retrieve last activation logs --last --logs : none returned', async () => {
      ow.mockResolved('activations.list', [])
      command.argv = ['--last', '--logs']
      const res = command.run()
      await expect(res).rejects.toThrow('no activations were returned')
    })

    test('should fail on get activation w/ noflag, no activationId', async () => {
      const runResult = command.run()
      await expect(runResult instanceof Promise).toBeTruthy()
      await expect(runResult).rejects.toThrow('failed to retrieve the activation')
    })

    test('errors out on api error', () => {
      return new Promise((resolve, reject) => {
        ow.mockRejected(owAction, new Error('an error'))
        command.argv = ['12345']
        return command.run()
          .then(() => reject(new Error('does not throw error')))
          .catch(() => {
            expect(handleError).toHaveBeenLastCalledWith('failed to retrieve the activation', new Error('an error'))
            resolve()
          })
      })
    })
  })
})
