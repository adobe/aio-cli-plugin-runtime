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

const TheCommand = require('../../../../src/commands/runtime/trigger/fire.js')
const RuntimeBaseCommand = require('../../../../src/RuntimeBaseCommand.js')
const RuntimeLib = require('@adobe/aio-lib-runtime')
const rtUtils = RuntimeLib.utils
const { stdout } = require('stdout-stderr')
const rtAction = 'triggers.invoke'

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
  const args = TheCommand.args
  expect(args).toBeDefined()
  expect(args.triggerName).toBeDefined()
  expect(args.triggerName.required).toEqual(true)
  expect(args.triggerName.description).toBeDefined()
})

// eslint-disable-next-line jest/expect-expect
test('base flags included in command flags',
  createTestBaseFlagsFunction(TheCommand, RuntimeBaseCommand)
)

test('flags', () => {
  const flags = TheCommand.flags
  expect(flags).toBeDefined()

  expect(flags.param).toBeDefined()
  expect(flags.param.char).toEqual('p')
  expect(flags.param.multiple).toEqual(true)
  expect(flags.param.description).toBeDefined()

  expect(flags['param-file']).toBeDefined()
  expect(flags['param-file'].char).toEqual('P')
  expect(flags['param-file'].multiple).toEqual(false)
  expect(flags['param-file'].description).toBeDefined()
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

    test('fire a simple trigger', () => {
      const cmd = rtLib.mockResolved(rtAction, '')
      rtUtils.getKeyValueObjectFromMergedParameters.mockReturnValue({})
      command.argv = ['trigger1']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({ name: 'trigger1', params: {} })
          expect(stdout.output).toMatch('')
        })
    })

    test('fire a simple trigger, error', async () => {
      rtLib.mockRejected(rtAction, new Error('an error'))
      command.argv = ['trigger1']
      const error = ['failed to fire the trigger', new Error('an error')]
      await expect(command.run()).rejects.toThrow(...error)
      expect(handleError).toHaveBeenLastCalledWith(...error)
    })

    test('fire a simple trigger, use param flag', () => {
      const cmd = rtLib.mockResolved(rtAction, '')
      command.argv = ['trigger1', '--param', 'a', 'b', '--param', 'c', 'd']
      rtUtils.getKeyValueObjectFromMergedParameters.mockReturnValue({ a: 'b', c: 'd' })
      return command.run()
        .then(() => {
          expect(rtUtils.getKeyValueObjectFromMergedParameters).toHaveBeenCalledWith(['a', 'b', 'c', 'd'], undefined)
          expect(cmd).toHaveBeenCalledWith({
            name: 'trigger1',
            params: { a: 'b', c: 'd' }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('fire a simple trigger, use param-file flag', () => {
      const cmd = rtLib.mockResolved(rtAction, '')

      command.argv = ['trigger1', '--param-file', '/trigger/parameters.json']
      rtUtils.getKeyValueObjectFromMergedParameters.mockReturnValue({ a: 'b', c: 'd' })
      return command.run()
        .then(() => {
          expect(rtUtils.getKeyValueObjectFromMergedParameters).toHaveBeenCalledWith(undefined, '/trigger/parameters.json')
          expect(cmd).toHaveBeenCalledWith({
            name: 'trigger1',
            params: { a: 'b', c: 'd' }
          })
          expect(stdout.output).toMatch('')
        })
    })
  })
})
