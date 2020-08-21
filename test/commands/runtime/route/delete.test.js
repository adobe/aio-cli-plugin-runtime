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

const TheCommand = require('../../../../src/commands/runtime/route/delete.js')
const RuntimeBaseCommand = require('../../../../src/RuntimeBaseCommand.js')
const { stdout } = require('stdout-stderr')
const rtAction = 'routes.delete'
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

  expect(args[0].name).toEqual('basePathOrApiName')
  expect(args[0].required).toBeTruthy()
  expect(args[0].description).toBeDefined()

  expect(args[1].name).toEqual('relPath')
  expect(args[1].required).toBeFalsy()
  expect(args[1].description).toBeDefined()

  expect(args[2].name).toEqual('apiVerb')
  expect(args[2].required).toBeFalsy()
  expect(args[2].options).toMatchObject(['get', 'post', 'put', 'patch', 'delete', 'head', 'options'])
  expect(args[2].description).toBeDefined()
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
  })

  test('error, throws exception', () => {
    return new Promise((resolve, reject) => {
       rtLib.mockRejected(rtAction, new Error('an error'))
      command.argv = ['/myapi']
      return command.run()
        .then(() => reject(new Error('should not succeed')))
        .catch(() => {
          expect(handleError).toHaveBeenLastCalledWith('failed to delete the api', new Error('an error'))
          resolve()
        })
    })
  })

  test('simple delete call', () => {
    const cmd = rtLib.mockResolved(rtAction, '')
    command.argv = ['/myapi', '/mypath', 'get']
    return command.run()
      .then(() => {
        expect(cmd).toHaveBeenCalledWith({ basepath: '/myapi', relpath: '/mypath', operation: 'get' })
        expect(stdout.output).toMatch('')
      })
  })
})
