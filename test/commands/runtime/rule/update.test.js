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

const TheCommand = require('../../../../src/commands/runtime/rule/update.js')
const RuntimeBaseCommand = require('../../../../src/RuntimeBaseCommand.js')
const rtAction = 'rules.update'
const { stdout } = require('stdout-stderr')
const RuntimeLib = require('@adobe/aio-lib-runtime')
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

test('args', async () => {
  const args = TheCommand.args
  expect(args).toBeDefined()
  expect(args.length).toEqual(3)

  expect(args[0].name).toEqual('name')
  expect(args[0].required).toBeTruthy()
  expect(args[0].description).toBeDefined()

  expect(args[1].name).toEqual('trigger')
  expect(args[1].required).toBeTruthy()
  expect(args[1].description).toBeDefined()

  expect(args[2].name).toEqual('action')
  expect(args[2].required).toBeTruthy()
  expect(args[2].description).toBeDefined()
})

// eslint-disable-next-line jest/expect-expect
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

    test('errors out on api error', () => {
      return new Promise((resolve, reject) => {
         rtLib.mockRejected('rules.update', new Error('an error'))
        command.argv = ['nameFoo', 'triggerFoo', 'actionFoo']
        return command.run()
          .then(() => reject(new Error('does not throw error')))
          .catch(() => {
            expect(handleError).toHaveBeenLastCalledWith('failed to update rule', new Error('an error'))
            resolve()
          })
      })
    })
  })
})
