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

const TheCommand = require('../../../../src/commands/runtime/namespace/get.js')
const RuntimeBaseCommand = require('../../../../src/RuntimeBaseCommand.js')
const { stdout } = require('stdout-stderr')

const RuntimeLib = require('@adobe/aio-lib-runtime')
const rtAction = 'namespaces.get'

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
  expect(TheCommand.args).toEqual({})
})

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

    test('simple namespace get', () => {
      return new Promise((resolve) => {
        const expectedJson = fixtureJson('namespace/get.json')
        expectedJson.actions[0].publish = true // coverage
        const cmd = rtLib.mockResolved(rtAction, expectedJson)

        rtLib.mockFn('rules.get')
          .mockImplementationOnce(() => {
            return fixtureJson('namespace/rule1.json')
          })
          .mockImplementationOnce(() => {
            return fixtureJson('namespace/rule2.json')
          })

        return command.run()
          .then(() => {
            expect(cmd).toHaveBeenCalled()
            expect(stdout.output).toMatchFixtureIgnoreWhite('namespace/get.txt')
            resolve()
          })
      })
    })

    test('simple namespace get, --json flag', () => {
      return new Promise((resolve) => {
        const expectedJson = fixtureJson('namespace/get.json')
        const cmd = rtLib.mockResolved(rtAction, expectedJson)

        rtLib.mockFn('rules.get')
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
            resolve()
          })
      })
    })

    test('namespace list, error', async () => {
      const namespaceError = new Error('an error')
      rtLib.mockRejected(rtAction, namespaceError)
      await expect(command.run()).rejects.toThrow()
      expect(handleError).toHaveBeenLastCalledWith('failed to get the data for a namespace', new Error('an error'))
    })

    test('return list of actions, --name-sort flag', () => {
      return new Promise((resolve) => {
        const expectedJson = fixtureJson('namespace/get-name-sort.json')
        const cmd = rtLib.mockResolved(rtAction, expectedJson)
        rtLib.mockFn('rules.get')
          .mockImplementationOnce(() => {
            return fixtureJson('namespace/rule1.json')
          })
          .mockImplementationOnce(() => {
            return fixtureJson('namespace/rule2.json')
          })
        command.argv = ['--name']
        return command.run()
          .then(() => {
            expect(cmd).toHaveBeenCalled()
            expect(stdout.output).toMatchFixtureIgnoreWhite('namespace/get-name-sort.txt')
            resolve()
          })
      })
    })
  })
})
