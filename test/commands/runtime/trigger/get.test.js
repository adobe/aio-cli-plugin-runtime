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

const TheCommand = require('../../../../src/commands/runtime/trigger/get.js')
const RuntimeBaseCommand = require('../../../../src/RuntimeBaseCommand.js')
const RuntimeLib = require('@adobe/aio-lib-runtime')
const rtUtils = RuntimeLib.utils
const { stdout } = require('stdout-stderr')
const rtAction = 'triggers.get'

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

    test('simple trigger get', () => {
      return new Promise((resolve) => {
        const obj = {
          annotations: [],
          limits: {},
          name: 'trigger1',
          namespace: 'namespace1',
          parameters: [],
          publish: false,
          version: '0.0.1'
        }
        const cmd = rtLib.mockResolved(rtAction, obj)

        command.argv = ['trigger1']
        return command.run()
          .then(() => {
            expect(cmd).toHaveBeenCalledWith({ name: 'trigger1', namespace: null })
            expect(JSON.parse(stdout.output)).toMatchObject(obj)
            resolve()
          })
      })
    })

    test('simple trigger get with namespace in trigger name', () => {
      return new Promise((resolve) => {
        const obj = {
          annotations: [],
          limits: {},
          name: 'trigger1',
          namespace: 'MySpecifiedNamespace',
          parameters: [],
          publish: false,
          version: '0.0.1'
        }
        const cmd = rtLib.mockResolved(rtAction, obj)

        command.argv = ['/MySpecifiedNamespace/trigger1']
        return command.run()
          .then(() => {
            expect(cmd).toHaveBeenCalledWith({ name: 'trigger1', namespace: 'MySpecifiedNamespace' })
            expect(JSON.parse(stdout.output)).toMatchObject(obj)
            resolve()
          })
      })
    })

    test('trigger get, error', () => {
      return new Promise((resolve, reject) => {
         rtLib.mockRejected(rtAction, new Error('an error'))

        command.argv = ['trigger1']
        return command.run()
          .then(() => reject(new Error('does not throw error')))
          .catch(() => {
            expect(handleError).toHaveBeenLastCalledWith('Unable to get trigger \'trigger1\'', new Error('an error'))
            resolve()
          })
      })
    })
  })
})
