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
const TheCommand = require('../../../../src/commands/runtime/activation/list.js')
const RuntimeBaseCommand = require('../../../../src/RuntimeBaseCommand.js')
const RuntimeLib = require('@adobe/aio-lib-runtime')
const rtAction = 'activations.list'

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
  expect(TheCommand.flags.limit.char).toBe('l')
  expect(typeof TheCommand.flags.limit).toBe('object')
  expect(TheCommand.flags.skip.char).toBe('s')
  expect(typeof TheCommand.flags.skip).toBe('object')
  expect(typeof TheCommand.flags.since).toBe('object')
  expect(typeof TheCommand.flags.upto).toBe('object')
})

test('args', async () => {
  const logName = TheCommand.args[0]
  expect(logName.name).toBeDefined()
  expect(logName.name).toEqual('activation_name')
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

    test('return list of activations with limits', () => {
      const cmd = rtLib.mockResolved(rtAction, '')
      command.argv = ['--limit', '3']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({ limit: 3 })
          expect(stdout.output).toMatch('')
        })
    })

    test('return list of activations with skip', () => {
      const cmd = rtLib.mockResolved(rtAction, '')
      command.argv = ['--skip', '3']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({ skip: 3 })
          expect(stdout.output).toMatch('')
        })
    })

    test('return list of activations with --since', () => {
      const cmd = rtLib.mockResolved(rtAction, '')
      command.argv = ['--since', '3']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({ since: 3 })
          expect(stdout.output).toMatch('')
        })
    })

    test('return list of activations with --upto', () => {
      const cmd = rtLib.mockResolved(rtAction, '')
      command.argv = ['--upto', '3']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({ upto: 3 })
          expect(stdout.output).toMatch('')
        })
    })

    test('return list of actions with activation id', () => {
      const cmd = rtLib.mockResolved(rtAction, '')
      command.argv = ['12345']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({ name: '12345' })
          expect(stdout.output).toMatch('')
        })
    })

    test('return list of actions with activation id, --full flag', () => {
      const cmd = rtLib.mockResolved(rtAction, '')
      command.argv = ['12345', '--full']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({ name: '12345', docs: true })
          expect(stdout.output).toMatch('')
        })
    })

    test('return list of actions with activation id --json', () => {
      const cmd = rtLib.mockResolved(rtAction, '')
      command.argv = ['12345', '--json']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({ name: '12345' })
          expect(stdout.output).toMatch('')
        })
    })

    test('return list of actions with activation id + data (cold)', () => {
      const data = [
        {
          activationId: '12345',
          annotations: [
            { key: 'path', value: '8888_9999/foo' },
            { key: 'kind', value: 'nodejs:10' },
            { key: 'initTime', value: 20 }
          ],
          duration: 23,
          name: 'foo',
          namespace: '8888_9999',
          start: 1558507178861,
          statusCode: 0,
          version: '0.0.1'
        }]
      const cmd = rtLib.mockResolved(rtAction, data)
      command.argv = ['12345']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({ name: '12345' })
          expect(stdout.output).toMatch('')
        })
    })

    test('return list of actions with activation id + data (warm)', () => {
      const data = [
        {
          activationId: '12345',
          annotations: [
            { key: 'path', value: '8888_9999/foo' },
            { key: 'kind', value: 'nodejs:10' }
          // no initTime key
          ],
          duration: 23,
          name: 'foo',
          namespace: '8888_9999',
          start: 1558507178861,
          statusCode: 0,
          version: '0.0.1'
        }]
      const cmd = rtLib.mockResolved(rtAction, data)
      command.argv = ['12345']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({ name: '12345' })
          expect(stdout.output).toMatch('')
        })
    })

    test('return list of trigger activations', () => {
      const date = 1606487719405
      const data = [
        {
          activationId: 'a5e7fdaeaa2e4384a7fdaeaa2e438442',
          name: 'trigger',
          namespace: '8888_9999',
          start: date,
          statusCode: 0,
          version: '0.0.1'
        }]
      rtLib.mockResolved(rtAction, data)
      return command.run()
        .then(() => {
          const expDate = new Date(date)
          let expOutput = fixtureFile('activation/list-triggers-output.txt')
          expOutput = expOutput.replace('11/27/2020, 9:35:19 AM', expDate.toLocaleString())
          expect(stdout.output).toMatch(expOutput)
        })
    })

    test('errors out on api error', () => {
      return new Promise((resolve, reject) => {
        rtLib.mockRejected(rtAction, new Error('an error'))
        return command.run()
          .then(() => reject(new Error('does not throw error')))
          .catch(() => {
            expect(handleError).toHaveBeenLastCalledWith('failed to list the activations', new Error('an error'))
            resolve()
          })
      })
    })

    test('ignore activation without annotations', () => {
      const data = [
        {
          activationId: '12345',
          annotations: [
          ],
          duration: 23,
          name: 'foo',
          namespace: '8888_9999',
          start: 1558507178861,
          statusCode: 0,
          version: '0.0.1'
        }]
      const cmd = rtLib.mockResolved(rtAction, data)
      command.argv = ['12345']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({ name: '12345' })
          expect(stdout.output).toMatch('')
        })
    })
  })
})
