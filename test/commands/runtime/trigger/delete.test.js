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

const TheCommand = require('../../../../src/commands/runtime/trigger/delete.js')
const RuntimeBaseCommand = require('../../../../src/RuntimeBaseCommand.js')
const RuntimeLib = require('@adobe/aio-lib-runtime')
const rtUtils = RuntimeLib.utils
const { stdout } = require('stdout-stderr')
const rtAction = 'triggers.delete'

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
  const triggerPath = TheCommand.args[0]

  expect(triggerPath).toBeDefined()
  expect(triggerPath.name).toEqual('triggerPath')
  expect(triggerPath.required).toEqual(true)
  expect(triggerPath.description).toBeDefined()
})

// eslint-disable-next-line jest/expect-expect
test('base flags included in command flags',
  createTestBaseFlagsFunction(TheCommand, RuntimeBaseCommand)
)

describe('instance methods', () => {
  let command, rtLib
  beforeEach(async () => {
    command = new TheCommand([])
    rtLib = await RuntimeLib.init({ apihost: 'fakehost', api_key: 'fakekey' })
    rtLib.mockResolved('actions.client.options', '')
    RuntimeLib.mockReset()
  })

  describe('run', () => {
    test('exists', async () => {
      expect(command.run).toBeInstanceOf(Function)
    })

    test('simple trigger delete', () => {
      return new Promise((resolve) => {
        const cmd = rtLib.mockResolved(rtAction, '')
        rtLib.mockResolved('triggers.get', {})
        command.argv = ['trigger1']
        rtUtils.parsePathPattern.mockReturnValue([null, null, 'trigger1'])
        return command.run()
          .then(() => {
            expect(cmd).toHaveBeenCalledWith({ name: 'trigger1', namespace: null })
            expect(stdout.output).toMatch('')
            resolve()
          })
      })
    })

    test('simple trigger delete with namespace in trigger name', () => {
      return new Promise((resolve) => {
        const cmd = rtLib.mockResolved(rtAction, '')
        rtLib.mockResolved('triggers.get', {})
        command.argv = ['/MySpecifiedNamespace/trigger1']
        rtUtils.parsePathPattern.mockReturnValue([null, 'MySpecifiedNamespaceRet', 'trigger1Ret'])
        return command.run()
          .then(() => {
            expect(cmd).toHaveBeenCalledWith({ name: 'trigger1Ret', namespace: 'MySpecifiedNamespaceRet' })
            expect(stdout.output).toMatch('')
            resolve()
          })
      })
    })

    test('trigger delete, error', async () => {
      const err = new Error('an error')
      rtLib.mockRejected(rtAction, err)
      command.argv = ['trigger1']
      rtUtils.parsePathPattern.mockReturnValue([null, 'MySpecifiedNamespaceRet', 'trigger1Ret'])
      const error = ["Unable to delete trigger 'trigger1': " + err.message]
      await expect(command.run()).rejects.toThrow(...error)
    })
  })
})
