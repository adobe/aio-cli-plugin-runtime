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

const TheCommand = require('../../../../src/commands/runtime/api/create.js')
const RuntimeBaseCommand = require('../../../../src/RuntimeBaseCommand.js')
const rtAction = 'routes.create'
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
  const args = TheCommand.args
  expect(args).toBeDefined()
  expect(Object.keys(args).length).toEqual(4)

  expect(args.basePath).toBeDefined()
  expect(args.basePath.required).not.toBeTruthy()
  expect(args.basePath.description).toBeDefined()

  expect(args.relPath).toBeDefined()
  expect(args.relPath.required).not.toBeTruthy()
  expect(args.relPath.description).toBeDefined()

  expect(args.apiVerb).toBeDefined()
  expect(args.apiVerb.required).not.toBeTruthy()
  expect(args.apiVerb.options).toMatchObject(['get', 'post', 'put', 'patch', 'delete', 'head', 'options'])
  expect(args.apiVerb.description).toBeDefined()

  expect(args.action).toBeDefined()
  expect(args.action.required).not.toBeTruthy()
  expect(args.action.description).toBeDefined()
})

// eslint-disable-next-line jest/expect-expect
test('base flags included in command flags',
  createTestBaseFlagsFunction(TheCommand, RuntimeBaseCommand)
)

test('flags', async () => {
  const flags = TheCommand.flags
  expect(flags).toBeDefined()

  expect(flags.apiname).toBeDefined()
  expect(flags.apiname.char).toEqual('n')
  expect(flags.apiname.description).toBeDefined()

  expect(flags['response-type']).toBeDefined()
  expect(flags['response-type'].char).toEqual('r')
  expect(flags['response-type'].default).toEqual('json')
  expect(flags['response-type'].options).toMatchObject(['html', 'http', 'json', 'text', 'svg', 'json'])
  expect(flags['response-type'].description).toBeDefined()
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
  beforeAll(() => {
    const json = {
      'api/api_swagger.json': fixtureFile('api/api_swagger.json')
    }
    fakeFileSystem.addJson(json)
  })
  afterAll(() => {
    // reset back to normal
    fakeFileSystem.reset()
  })

  describe('run', () => {
    test('exists', async () => {
      expect(command.run).toBeInstanceOf(Function)
    })

    test('create a simple api, no flags', () => {
      const basepath = '/mybase'
      const relpath = '/myapi'
      const cmd = rtLib.mockResolved(rtAction, { gwApiUrl: `http://myserver${basepath}` })
      command.argv = ['/mybase', '/myapi', 'get', 'myaction']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            basepath: '/mybase',
            relpath: '/myapi',
            operation: 'get',
            responsetype: 'json', // the default
            action: 'myaction'
          })
          expect(stdout.output).toMatch(`http://myserver${basepath}${relpath}`)
        })
    })

    test('create api with --config-file', () => {
      const apiSwagger = fixtureFile('api/api_swagger.json')
      const cmd = rtLib.mockResolved(rtAction, { gwApiUrl: 'http://myserver' })
      command.argv = ['--config-file', '/api/api_swagger.json']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            swagger: apiSwagger
          })
          expect(stdout.output).toMatch('http://myserver')
        })
    })

    test('create a simple api with --response-type and --apiname flags', () => {
      const basepath = '/mybase'
      const relpath = '/myapi'
      const cmd = rtLib.mockResolved(rtAction, { gwApiUrl: `http://myserver${basepath}` })
      command.argv = ['/mybase', '/myapi', 'get', 'myaction', '--response-type', 'text', '--apiname', 'MyApiName']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            basepath: '/mybase',
            relpath: '/myapi',
            operation: 'get',
            action: 'myaction',
            responsetype: 'text',
            name: 'MyApiName'
          })
          expect(stdout.output).toMatch(`http://myserver${basepath}${relpath}`)
        })
    })

    test('create a simple api, error (no flags or args)', async () => {
      command.argv = []
      await expect(command.run()).rejects.toThrow()
      expect(handleError).toHaveBeenLastCalledWith('failed to create the api', new Error('either the config-file flag or the arguments basePath, relPath, apiVerb and action are required'))
    })

    test('create a simple api, error', async () => {
      rtLib.mockRejected(rtAction, new Error('an error'))
      command.argv = ['/mybase', '/myapi', 'get', 'myaction']
      await expect(command.run()).rejects.toThrow()
      expect(handleError).toHaveBeenLastCalledWith('failed to create the api', new Error('an error'))
    })
  })
})
