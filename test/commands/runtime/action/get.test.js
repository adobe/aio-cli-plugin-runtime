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

const { stdout } = require('stdout-stderr')
const TheCommand = require('../../../../src/commands/runtime/action/get.js')
const RuntimeBaseCommand = require('../../../../src/RuntimeBaseCommand.js')
const ow = require('openwhisk')()
const owAction = 'actions.get'
const fs = require('fs')

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
  const getName = TheCommand.args[0]
  expect(getName.name).toBeDefined()
  expect(getName.name).toEqual('actionName')
  expect(getName.required).toEqual(true)
})

describe('instance methods', () => {
  let command

  beforeEach(() => {
    command = new TheCommand([])
  })

  describe('run', () => {
    test('exists', async () => {
      expect(command.run).toBeInstanceOf(Function)
    })

    test('retrieve an action', () => {
      let cmd = ow.mockResolvedFixture(owAction, 'action/get.json')
      command.argv = ['hello']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith('hello')
          expect(stdout.output).toMatch('')
        })
    })

    test('retrieve an action --url with web flags', () => {
      let cmd = ow.mockResolvedFixture(owAction, 'action/get.json')
      ow.mockResolved('actions.client.options', '')
      ow.actions.client.options = { api: 'api/', namespace: 'namespace' }
      command.argv = ['hello', '--url']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          expect(stdout.output).toMatch('api/web/namespace/default/hello')
        })
    })

    test('retrieve an action --url with web flags from package', () => {
      let cmd = ow.mockResolvedFixture(owAction, 'action/get.json')
      ow.mockResolved('actions.client.options', '')
      ow.actions.client.options = { api: 'api/', namespace: 'namespace' }
      command.argv = ['test/hello', '--url']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          expect(stdout.output).toMatch('api/web/namespace/test/hello')
        })
    })

    test('retrieve an action --url without web flags', () => {
      let cmd = ow.mockResolvedFixture(owAction, 'action/getWebFalse.json')
      ow.mockResolved('actions.client.options', '')
      ow.actions.client.options = { api: 'api/', namespace: 'namespace' }
      command.argv = ['hello', '--url']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          expect(stdout.output).toMatch('api/namespaces/namespace/actions/hello')
        })
    })

    test('retrieve an action --url when annotation array is absent', () => {
      let cmd = ow.mockResolvedFixture(owAction, 'action/get_NoWebFlag.json')
      ow.mockResolved('actions.client.options', '')
      ow.actions.client.options = { api: 'api/', namespace: 'namespace' }
      command.argv = ['hello', '--url']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          expect(stdout.output).toMatch('api/namespaces/namespace/actions/hello')
        })
    })

    test('retrieve an action --json', () => {
      let cmd = ow.mockResolvedFixture(owAction, 'action/get.json')
      command.argv = ['hello']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith('hello')
          expect(stdout.output).toMatch('') // TODO: json output
        })
    })

    test('errors out on api error', (done) => {
      ow.mockRejected(owAction, new Error('an error'))
      command.argv = ['hello']
      return command.run()
        .then(() => done.fail('does not throw error'))
        .catch((err) => {
          expect(err).toMatchObject(new Error('failed to retrieve the action: an error'))
          done()
        })
    })
  })

  describe('save and save-as flags', () => {
    let bufferData = Buffer.from('this is the code', 'base64')

    test('retrieve an action --save', () => {
      fs.writeFileSync = jest.fn()
      let cmd = ow.mockResolvedFixture(owAction, 'action/get.json')
      command.argv = ['hello', '--save']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith('hello')
          expect(fs.writeFileSync).toHaveBeenCalledWith('hello.js', 'this is the code')
          // expect(stdout.output).toMatch('api/web/namespace/default/hello')
        })
    })

    test('retrieve an action --save-as', () => {
      let cmd = ow.mockResolvedFixture(owAction, 'action/get.json')
      fs.writeFileSync = jest.fn()
      command.argv = ['hello', '--save-as', 'filename.js']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith('hello')
          expect(fs.writeFileSync).toHaveBeenCalledWith('filename.js', 'this is the code')
          // expect(stdout.output).toMatch('api/web/namespace/default/hello')
        })
    })

    test('retrieve an action --save (binary)', () => {
      let cmd = ow.mockResolvedFixture(owAction, 'action/get.binary.json')
      fs.writeFileSync = jest.fn()
      command.argv = ['hello', '--save']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith('hello')
          expect(fs.writeFileSync).toHaveBeenCalledWith('hello.zip',
            bufferData, 'buffer')
        })
    })

    test('retrieve an action --save-as (binary)', () => {
      let cmd = ow.mockResolvedFixture(owAction, 'action/get.binary.json')
      fs.writeFileSync = jest.fn()
      command.argv = ['hello', '--save-as', 'filename.zip']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith('hello')
          expect(fs.writeFileSync).toHaveBeenCalledWith('filename.zip',
            bufferData, 'buffer')
        })
    })
  })
})
