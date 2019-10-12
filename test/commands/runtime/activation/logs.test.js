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
const ow = require('openwhisk')()
const owAction = 'activations.logs'

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
  expect(logName.name).toEqual('activationID')
  expect(logName.required).toEqual(false)
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
  let command, handleError

  beforeEach(() => {
    command = new TheCommand([])
    handleError = jest.spyOn(command, 'handleError')
  })

  describe('run', () => {
    test('exists', async () => {
      expect(command.run).toBeInstanceOf(Function)
    })

    test('retrieve logs of an activation - no-results', () => {
      const cmd = ow.mockResolved(owAction, '')
      command.argv = ['12345']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith('12345')
          expect(stdout.output).toMatch('')
        })
    })

    test('retrieve logs of an activation - with-results', () => {
      const cmd = ow.mockResolved(owAction, { logs: ['this is a log', 'so is this'] })
      command.argv = ['12345']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith('12345')
          expect(stdout.output).toMatch('this is a log')
        })
    })

    test('retrieve logs of an activation --strip', () => {
      const cmd = ow.mockResolved(owAction, { logs: ['line1', 'line2', '2019-10-11T19:08:57.298Z       stdout: login-success'] })
      command.argv = ['12345', '-r']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith('12345')
          expect(stdout.output).toMatch('line1\nline2\nstdout: login-success')
        })
    })

    test('errors out on api error', (done) => {
      ow.mockRejected(owAction, new Error('an error'))
      command.argv = ['12345']
      return command.run()
        .then(() => done.fail('does not throw error'))
        .catch(() => {
          expect(handleError).toHaveBeenLastCalledWith('failed to retrieve the logs', new Error('an error'))
          done()
        })
    })

    test('retrieve last log -l', () => {
      const listCmd = ow.mockResolved('activations.list', [{ activationId: '12345' }])
      const logCmd = ow.mockResolved(owAction, { logs: ['line1', 'line2', 'line3'] })
      command.argv = ['-l']
      return command.run()
        .then(() => {
          expect(listCmd).toHaveBeenCalledWith(expect.objectContaining({ limit: 1 }))
          expect(logCmd).toHaveBeenCalledWith('12345')
          expect(stdout.output).toMatch('line3')
        })
    })

    test('retrieve last log --last', () => {
      const listCmd = ow.mockResolved('activations.list', [{ activationId: '12345' }])
      const logCmd = ow.mockResolved(owAction, { logs: ['line1', 'line2', 'line3'] })
      command.argv = ['--last']
      return command.run()
        .then(() => {
          expect(listCmd).toHaveBeenCalledWith(expect.objectContaining({ limit: 1 }))
          expect(logCmd).toHaveBeenCalledWith('12345')
          expect(stdout.output).toMatch('line3')
        })
    })

    test('errors if np axId or --last flag', (done) => {
      command.argv = []
      const error = jest.spyOn(command, 'error')
      return command.run()
        .then(() => done.fail('does not throw error'))
        .catch(() => {
          expect(error).toHaveBeenLastCalledWith('Missing required arg: `activationID`')
          done()
        })
    })
  })
})
