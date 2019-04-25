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
const dedent = require('dedent-js')
const { stdout } = require('stdout-stderr')
const owAction = 'routes.delete'
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
  expect(args.length).toEqual(3)

  expect(args[0].name).toEqual('basePathOrApiName')
  expect(args[0].required).toBeTruthy()
  expect(args[0].description).toBeDefined()

  expect(args[1].name).toEqual('relPath')
  expect(args[1].required).toBeFalsy()
  expect(args[1].description).toBeDefined()

  expect(args[2].name).toEqual('apiVerb')
  expect(args[2].required).toBeFalsy()
  expect(args[2].options).toMatchObject([ 'get', 'post', 'put', 'patch', 'delete', 'head', 'options' ])
  expect(args[2].description).toBeDefined()
})

test('base flags included in command flags',
  createTestBaseFlagsFunction(TheCommand, RuntimeBaseCommand)
)

describe('instance methods', () => {
  let command

  beforeEach(() => {
    command = new TheCommand([])
  })

  describe('run', () => {
    test('exists', async () => {
      expect(command.run).toBeInstanceOf(Function)
    })
  })

  test('no required args - throws exception', (done) => {
    return command.run()
      .then(() => done.fail('does not throw error'))
      .catch((err) => {
        expect(err).toMatchObject(new Error(dedent`
        Missing 1 required arg:
        basePathOrApiName  The base path or api name
        See more help with --help`))
        done()
      })
  })

  test('error, throws exception', (done) => {
    ow.mockRejected(owAction, new Error('route delete error'))
    command.argv = [ '/myapi' ]
    return command.run()
      .then(() => done.fail('should not succeed'))
      .catch((err) => {
        expect(err).toMatchObject(new Error('failed to delete the api: route delete error'))
        done()
      })
  })

  test('simple delete call', () => {
    let cmd = ow.mockResolved(owAction, '')
    command.argv = [ '/myapi', '/mypath', 'get' ]
    return command.run()
      .then(() => {
        expect(cmd).toHaveBeenCalledWith({ basepath: '/myapi', relpath: '/mypath', operation: 'get' })
        expect(stdout.output).toMatch('')
      })
  })
})
