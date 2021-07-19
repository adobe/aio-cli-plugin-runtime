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

const TheCommand = require('../../../../src/commands/runtime/namespace/list.js')
const RuntimeBaseCommand = require('../../../../src/RuntimeBaseCommand.js')
const { stdout } = require('stdout-stderr')
const RuntimeLib = require('@adobe/aio-lib-runtime')
const rtAction = 'namespaces.list'

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

    test('simple namespace list', () => {
      return new Promise((resolve) => {
        const cmd = rtLib.mockResolved(rtAction, fixtureFile('namespace/list.json'))

        return command.run()
          .then(() => {
            expect(cmd).toHaveBeenCalled()
            expect(stdout.output).toEqual(expect.stringContaining('Namespaces'))
            expect(stdout.output).toEqual(expect.stringContaining('12345_67890'))
            expect(stdout.output).toEqual(expect.stringContaining('99999_11111'))
            expect(stdout.output).toEqual(expect.stringContaining('88888_22222'))
            resolve()
          })
      })
    })

    test('simple namespace list, --json flag', () => {
      return new Promise((resolve) => {
        const cmd = rtLib.mockResolved(rtAction, fixtureFile('namespace/list.json'))

        command.argv = ['--json']
        return command.run()
          .then(() => {
            expect(cmd).toHaveBeenCalled()
            expect(JSON.parse(stdout.output)).toMatchFixtureJson('namespace/list.json')
            resolve()
          })
      })
    })

    test('namespace list, error', () => {
      return new Promise((resolve, reject) => {
        const namespaceError = new Error('an error')

        rtLib.mockRejected(rtAction, namespaceError)
        return command.run()
          .then(() => reject(new Error('does not throw error')))
          .catch(() => {
            expect(handleError).toHaveBeenLastCalledWith('failed to list namespaces', new Error('an error'))
            resolve()
          })
      })
    })
  })
})
