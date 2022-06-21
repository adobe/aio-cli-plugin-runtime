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
const TheCommand = require('../../../../src/commands/runtime/action/delete.js')
const RuntimeBaseCommand = require('../../../../src/RuntimeBaseCommand.js')
const RuntimeLib = require('@adobe/aio-lib-runtime')
const rtAction = 'actions.delete'

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
  const deleteName = TheCommand.args[0]
  expect(deleteName.name).toBeDefined()
  expect(deleteName.name).toEqual('actionName')
  expect(deleteName.required).toEqual(true)
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

    test('delete an action', () => {
      const cmd = rtLib.mockResolvedFixture(rtAction, 'action/list.json')
      command.argv = ['hello']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith('hello')
          expect(stdout.output).toMatch('')
        })
    })

    test('delete an action --json', () => {
      const cmd = rtLib.mockResolvedFixture(rtAction, 'action/list.json')
      command.argv = ['hello', '--json']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith('hello')
          expect(JSON.parse(stdout.output)).toEqual(expect.any(Object))
        })
    })

    test('errors out on api error', async () => {
      rtLib.mockRejected(rtAction, new Error('an error'))
      command.argv = ['doesnotexist']
      const error = ['failed to delete the action', new Error('an error')]
      await expect(command.run()).rejects.toThrow(error[0])
      expect(handleError).toHaveBeenLastCalledWith(...error)
    })
  })
})
