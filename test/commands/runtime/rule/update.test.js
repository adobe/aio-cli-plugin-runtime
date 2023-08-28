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

/* eslint jest/expect-expect: ["error", { "assertFunctionNames": ["expect", "createTestBaseFlagsFunction"] }] */

const TheCommand = require('../../../../src/commands/runtime/rule/update.js')
const RuntimeBaseCommand = require('../../../../src/RuntimeBaseCommand.js')
const rtAction = 'rules.update'
const { stdout } = require('stdout-stderr')
const RuntimeLib = require('@adobe/aio-lib-runtime')

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
  expect(TheCommand.args.name).toBeDefined()
  expect(TheCommand.args.name.required).toBeTruthy()
  expect(TheCommand.args.name.description).toBeDefined()

  expect(TheCommand.args.trigger).toBeDefined()
  expect(TheCommand.args.trigger.required).toBeTruthy()
  expect(TheCommand.args.trigger.description).toBeDefined()

  expect(TheCommand.args.action).toBeDefined()
  expect(TheCommand.args.action.required).toBeTruthy()
  expect(TheCommand.args.action.description).toBeDefined()
})

test('base flags included in command flags',
  createTestBaseFlagsFunction(TheCommand, RuntimeBaseCommand)
)

test('flags', async () => {
  const flags = TheCommand.flags
  expect(flags).toBeDefined()
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

    test('update simple rule', () => {
      const cmd = rtLib.mockResolved(rtAction, '')
      command.argv = ['nameFoo', 'triggerFoo', 'actionFoo']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name: 'nameFoo',
            action: 'actionFoo',
            trigger: 'triggerFoo'
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('update simple rule --json', () => {
      const cmd = rtLib.mockResolved(rtAction, '')
      command.argv = ['nameFoo', 'triggerFoo', 'actionFoo', '--json']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name: 'nameFoo',
            action: 'actionFoo',
            trigger: 'triggerFoo'
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('errors out on api error', async () => {
      rtLib.mockRejected('rules.update', new Error('an error'))
      command.argv = ['nameFoo', 'triggerFoo', 'actionFoo']
      const error = ['failed to update rule', new Error('an error')]
      await expect(command.run()).rejects.toThrow(...error)
      expect(handleError).toHaveBeenLastCalledWith(...error)
    })
  })
})
