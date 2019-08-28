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

const TheCommand = require('../../../../src/commands/runtime/namespace/get.js')
const RuntimeBaseCommand = require('../../../../src/RuntimeBaseCommand.js')
const ow = require('openwhisk')()
const { stdout } = require('stdout-stderr')
const owAction = 'namespaces.get'

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
  expect(TheCommand.args).not.toBeDefined()
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

    test('simple namespace get', (done) => {
      const expectedJson = fixtureJson('namespace/get.json')
      expectedJson.actions[0].publish = true // coverage
      const cmd = ow.mockResolved(owAction, expectedJson)

      ow.mockFn('rules.get')
        .mockImplementationOnce(() => {
          return fixtureJson('namespace/rule1.json')
        })
        .mockImplementationOnce(() => {
          return fixtureJson('namespace/rule2.json')
        })

      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          // todo: rewrite the following so it does not fail when different consoles
          // truncate text in different spots.
          // expect(stdout.output).toMatchFixture('namespace/get.txt')
          done()
        })
    })

    test('simple namespace get, --json flag', (done) => {
      const expectedJson = fixtureJson('namespace/get.json')
      const cmd = ow.mockResolved(owAction, expectedJson)

      ow.mockFn('rules.get')
        .mockImplementationOnce(() => {
          return fixtureJson('namespace/rule1.json')
        })
        .mockImplementationOnce(() => {
          return fixtureJson('namespace/rule2.json')
        })

      command.argv = ['--json']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          const actualJson = JSON.parse(stdout.output)
          expectedJson.rules[0] = fixtureJson('namespace/rule1.json')
          expectedJson.rules[1] = fixtureJson('namespace/rule2.json')
          expect(actualJson).toMatchObject(expectedJson)
          done()
        })
    })

    test('namespace list, error', (done) => {
      const namespaceError = new Error('an error')
      ow.mockRejected(owAction, namespaceError)
      return command.run()
        .then(() => done.fail('does not throw error'))
        .catch(() => {
          expect(handleError).toHaveBeenLastCalledWith('failed to get the data for a namespace', new Error('an error'))
          done()
        })
    })
  })
})
