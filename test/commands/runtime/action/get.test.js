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
const fs = require('fs')
const TheCommand = require('../../../../src/commands/runtime/action/get.js')
const RuntimeBaseCommand = require('../../../../src/RuntimeBaseCommand.js')
const RuntimeLib = require('@adobe/aio-lib-runtime')
const rtAction = 'actions.get'

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
  const getName = TheCommand.args[0]
  expect(getName.name).toBeDefined()
  expect(getName.name).toEqual('actionName')
  expect(getName.required).toEqual(true)
})

describe('instance methods', () => {
  let command, handleError, rtLib

  beforeEach(async () => {
    command = new TheCommand([])
    handleError = jest.spyOn(command, 'handleError')
    handleError = jest.spyOn(command, 'handleError')
    rtLib = await RuntimeLib.init({ apihost: 'fakehost', api_key: 'fakekey' })
    rtLib.mockResolved('actions.client.options', '')
    RuntimeLib.mockReset()
  })

  describe('run', () => {
    test('exists', async () => {
      expect(command.run).toBeInstanceOf(Function)
    })

    test('retrieve an action', () => {
      const cmd = rtLib.mockResolvedFixture(rtAction, 'action/get.json')
      command.argv = ['hello']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith('hello')
          expect(stdout.output).toMatch('')
        })
    })

    test('retrieve an action --url with web flags', () => {
      const cmd = rtLib.mockResolvedFixture(rtAction, 'action/get.json')
      rtLib.mockResolved('actions.client.options', '')
      rtLib.actions.client.options = { api: 'api/' }
      command.argv = ['hello', '--url']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          expect(stdout.output).toMatch('api/web/53444_41603/default/hello')
        })
    })

    test('retrieve an action --url with web flags from package', () => {
      const cmd = rtLib.mockResolvedFixture(rtAction, 'action/get-package.json')
      rtLib.mockResolved('actions.client.options', '')
      rtLib.actions.client.options = { api: 'api/' }
      command.argv = ['test/hello', '--url']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          expect(stdout.output).toMatch('api/web/53444_41603/test/hello')
        })
    })

    test('retrieve an action --url with web flags from fully qualified name with implicit namespace and no package', () => {
      const cmd = rtLib.mockResolvedFixture(rtAction, 'action/get.json')
      rtLib.mockResolved('actions.client.options', '')
      rtLib.actions.client.options = { api: 'api/' }
      command.argv = ['/_/hello', '--url']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          expect(stdout.output).toMatch('api/web/53444_41603/default/hello')
        })
    })

    test('retrieve an action --url with web flags from fully qualified name using explicit namespace and no package', () => {
      const cmd = rtLib.mockResolvedFixture(rtAction, 'action/get.json')
      rtLib.mockResolved('actions.client.options', '')
      rtLib.actions.client.options = { api: 'api/' }
      command.argv = ['/_/hello', '--url']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          expect(stdout.output).toMatch('api/web/53444_41603/default/hello')
        })
    })

    test('retrieve an action --url with web flags from fully qualified name with implicit namespace', () => {
      const cmd = rtLib.mockResolvedFixture(rtAction, 'action/get-package.json')
      rtLib.mockResolved('actions.client.options', '')
      rtLib.actions.client.options = { api: 'api/' }
      command.argv = ['/_/test/hello', '--url']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          expect(stdout.output).toMatch('api/web/53444_41603/test/hello')
        })
    })

    test('retrieve an action --url with web flags from fully qualified name using explicit namespace', () => {
      const cmd = rtLib.mockResolvedFixture(rtAction, 'action/get-package.json')
      rtLib.mockResolved('actions.client.options', '')
      rtLib.actions.client.options = { api: 'api/' }
      command.argv = ['/_/test/hello', '--url']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          expect(stdout.output).toMatch('api/web/53444_41603/test/hello')
        })
    })

    test('retrieve an action --url without web flags', () => {
      const cmd = rtLib.mockResolvedFixture(rtAction, 'action/getWebFalse.json')
      rtLib.mockResolved('actions.client.options', '')
      rtLib.actions.client.options = { api: 'api/' }
      command.argv = ['hello', '--url']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          expect(stdout.output).toMatch('api/namespaces/53444_41603/actions/hello')
        })
    })

    test('retrieve an action --url in package without web flags', () => {
      const cmd = rtLib.mockResolvedFixture(rtAction, 'action/getWebFalse-package.json')
      rtLib.mockResolved('actions.client.options', '')
      rtLib.actions.client.options = { api: 'api/' }
      command.argv = ['hello', '--url']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          expect(stdout.output).toMatch('api/namespaces/53444_41603/actions/test/hello')
        })
    })

    test('retrieve an action --url when annotation array is absent', () => {
      const cmd = rtLib.mockResolvedFixture(rtAction, 'action/get_NoWebFlag.json')
      rtLib.mockResolved('actions.client.options', '')
      rtLib.actions.client.options = { api: 'api/' }
      command.argv = ['hello', '--url']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          expect(stdout.output).toMatch('api/namespaces/53444_41603/actions/hello')
        })
    })

    test('retrieve an action --json', () => {
      const cmd = rtLib.mockResolvedFixture(rtAction, 'action/get.json')
      command.argv = ['hello']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith('hello')
          expect(stdout.output).toMatch('') // TODO: json output
        })
    })

    test('errors out on api error', () => {
      return new Promise((resolve, reject) => {
        rtLib.mockRejected(rtAction, new Error('an error'))
        command.argv = ['hello']
        return command.run()
          .then(() => reject(new Error('does not throw error')))
          .catch(() => {
            expect(handleError).toHaveBeenLastCalledWith('failed to retrieve the action', new Error('an error'))
            resolve()
          })
      })
    })
  })

  describe('save and save-as flags', () => {
    const bufferData = Buffer.from('this is the code', 'base64')

    test('retrieve an action --save', () => {
      fs.writeFileSync = jest.fn()
      const cmd = rtLib.mockResolvedFixture(rtAction, 'action/get.json')
      command.argv = ['hello', '--save']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith('hello')
          expect(fs.writeFileSync).toHaveBeenCalledWith('hello.js', 'this is the code')
        })
    })

    test('retrieve an action in a package --save', () => {
      fs.writeFileSync = jest.fn()
      const cmd = rtLib.mockResolvedFixture(rtAction, 'action/getpackage.json')
      command.argv = ['pkg/hello', '--save']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith('pkg/hello')
          expect(fs.writeFileSync).toHaveBeenCalledWith('hello.js', 'this is the code')
        })
    })

    test('retrieve an action --save-as', () => {
      const cmd = rtLib.mockResolvedFixture(rtAction, 'action/get.json')
      fs.writeFileSync = jest.fn()
      command.argv = ['hello', '--save-as', 'filename.js']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith('hello')
          expect(fs.writeFileSync).toHaveBeenCalledWith('filename.js', 'this is the code')
        })
    })

    test('retrieve an action --save (binary)', () => {
      const cmd = rtLib.mockResolvedFixture(rtAction, 'action/get.binary.json')
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
      const cmd = rtLib.mockResolvedFixture(rtAction, 'action/get.binary.json')
      fs.writeFileSync = jest.fn()
      command.argv = ['hello', '--save-as', 'filename.zip']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith('hello')
          expect(fs.writeFileSync).toHaveBeenCalledWith('filename.zip',
            bufferData, 'buffer')
        })
    })

    test('retrieve an action and do not omit code', () => {
      TheCommand.fullGet = true
      const cmd = rtLib.mockResolvedFixture(rtAction, 'action/get.json')
      command.argv = ['hello']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith('hello')
          const result = JSON.parse(stdout.output)
          delete result.date
          expect(`${JSON.stringify(result, null, 2)}\n`).toMatchFixture('action/get.json')
        })
        .finally(() => { TheCommand.fullGet = false })
    })

    test('show action code --code', () => {
      const cmd = rtLib.mockResolvedFixture(rtAction, 'action/get.json')
      command.argv = ['hello', '--code']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith('hello')
          expect(stdout.output).toMatch('this is the code')
        })
    })

    test('report error for show binary action code --code', () => {
      return new Promise((resolve, reject) => {
        rtLib.mockResolvedFixture(rtAction, 'action/get.binary.json')
        command.argv = ['hello', '--code']
        return command.run()
          .then(() => reject(new Error('does not throw error')))
          .catch(() => {
            expect(handleError).toHaveBeenLastCalledWith(TheCommand.codeNotText)
            resolve()
          })
      })
    })
  })
})
