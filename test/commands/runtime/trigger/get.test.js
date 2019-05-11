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
const ow = require('openwhisk')()
const { stdout } = require('stdout-stderr')
const owAction = 'triggers.get'

test('exports', async () => {
  expect(typeof TheCommand).toEqual('function')
  expect(TheCommand.prototype instanceof RuntimeBaseCommand).toBeTruthy()
})

test('description', async () => {
  expect(TheCommand.description).toBeDefined()
})

test('aliases', async () => {
  expect(TheCommand.aliases).toEqual([])
})

test('args', async () => {
  const triggerPath = TheCommand.args[0]

  expect(triggerPath).toBeDefined()
  expect(triggerPath.name).toEqual('triggerPath')
  expect(triggerPath.required).toEqual(true)
  expect(triggerPath.description).toBeDefined()
})

test('base flags included in command flags',
  createTestBaseFlagsFunction(TheCommand, RuntimeBaseCommand)
)

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

    test('simple trigger get', (done) => {
      let obj = {
        'annotations': [],
        'limits': {},
        'name': 'trigger1',
        'namespace': 'namespace1',
        'parameters': [],
        'publish': false,
        'version': '0.0.1'
      }
      let cmd = ow.mockResolved(owAction, obj)

      command.argv = ['trigger1']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({ 'name': 'trigger1', 'namespace': null })
          expect(JSON.parse(stdout.output)).toMatchObject(obj)
          done()
        })
    })

    test('simple trigger get with namespace in trigger name', (done) => {
      let obj = {
        'annotations': [],
        'limits': {},
        'name': 'trigger1',
        'namespace': 'MySpecifiedNamespace',
        'parameters': [],
        'publish': false,
        'version': '0.0.1'
      }
      let cmd = ow.mockResolved(owAction, obj)

      command.argv = ['/MySpecifiedNamespace/trigger1']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({ 'name': 'trigger1', 'namespace': 'MySpecifiedNamespace' })
          expect(JSON.parse(stdout.output)).toMatchObject(obj)
          done()
        })
    })

    test('trigger get, error', (done) => {
      let err = new Error('an error')
      err.error = new Error('another error')
      err.error.code = 42
      ow.mockRejected(owAction, err)

      command.argv = ['trigger1']
      return command.run()
        .then(() => done.fail('does not throw error'))
        .catch(() => {
          expect(handleError).toHaveBeenLastCalledWith('Unable to get trigger \'trigger1\': undefined (code 42)')
          done()
        })
    })
  })
})
