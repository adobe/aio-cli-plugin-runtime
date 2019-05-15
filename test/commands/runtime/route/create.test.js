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

const TheCommand = require('../../../../src/commands/runtime/route/create.js')
const RuntimeBaseCommand = require('../../../../src/RuntimeBaseCommand.js')
const owAction = 'routes.create'
const { stdout } = require('stdout-stderr')
const ow = require('openwhisk')()

test('exports', async () => {
  expect(typeof TheCommand).toEqual('function')
  expect(TheCommand.prototype instanceof RuntimeBaseCommand).toBeTruthy()
})

test('description', async () => {
  expect(TheCommand.description).toBeDefined()
})

test('aliases', async () => {
  expect(TheCommand.aliases).toBeDefined()
})

test('args', async () => {
  const args = TheCommand.args
  expect(args).toBeDefined()
  expect(args.length).toEqual(4)

  expect(args[0].name).toEqual('basePath')
  expect(args[0].required).toBeTruthy()
  expect(args[0].description).toBeDefined()

  expect(args[1].name).toEqual('relPath')
  expect(args[1].required).toBeTruthy()
  expect(args[1].description).toBeDefined()

  expect(args[2].name).toEqual('apiVerb')
  expect(args[2].required).toBeTruthy()
  expect(args[2].options).toMatchObject([ 'get', 'post', 'put', 'patch', 'delete', 'head', 'options' ])
  expect(args[2].description).toBeDefined()

  expect(args[3].name).toEqual('action')
  expect(args[3].required).toBeTruthy()
  expect(args[3].description).toBeDefined()
})

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
  let command, handleError

  beforeEach(() => {
    command = new TheCommand([])
    handleError = jest.spyOn(command, 'handleError')
  })

  describe('run', () => {
    test('exists', async () => {
      expect(command.run).toBeInstanceOf(Function)
    })

    test('create a simple api, no flags', () => {
      const basepath = '/mybase'
      const relpath = '/myapi'
      let cmd = ow.mockResolved(owAction, { gwApiUrl: `http://myserver${basepath}` })
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

    test('create a simple api with --response-type and --apiname flags', () => {
      const basepath = '/mybase'
      const relpath = '/myapi'
      let cmd = ow.mockResolved(owAction, { gwApiUrl: `http://myserver${basepath}` })
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

    test('create a simple api, error', (done) => {
      ow.mockRejected(owAction, new Error('an error'))
      command.argv = ['/mybase', '/myapi', 'get', 'myaction']
      return command.run()
        .then(() => done.fail('does not throw error'))
        .catch(() => {
          expect(handleError).toHaveBeenLastCalledWith('failed to create the api', new Error('an error'))
          done()
        })
    })
  })
})
