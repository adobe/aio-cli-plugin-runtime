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

const TheCommand = require('../src/RuntimeBaseCommand.js')
const { Command } = require('@oclif/core')
const { PropertyEnv } = require('../src/properties')
const RuntimeLib = require('@adobe/aio-lib-runtime')
const OpenWhiskError = require('openwhisk/lib/openwhisk_error')
const { getToken, context } = require('@adobe/aio-lib-ims')
const { getCliEnv } = require('@adobe/aio-lib-env')

jest.mock('@adobe/aio-lib-ims', () => ({
  getToken: jest.fn(),
  context: {
    setCli: jest.fn()
  }
}))

jest.mock('@adobe/aio-lib-env', () => ({
  getCliEnv: jest.fn()
}))

jest.mock('@adobe/aio-lib-runtime', () => ({
  init: jest.fn()
}))

beforeEach(() => {
  fakeFileSystem.reset()
})

test('exports', async () => {
  expect(typeof TheCommand).toEqual('function')
  expect(TheCommand.prototype).toBeInstanceOf(Command)
})

test('description', async () => {
  expect(TheCommand.description).not.toBeDefined()
})

test('aliases', async () => {
  expect(TheCommand.aliases).toEqual([])
})

test('flags', async () => {
  expect(Object.keys(TheCommand.flags)).toEqual(expect.arrayContaining(
    ['cert', 'key', 'apiversion', 'apihost', 'auth', 'insecure', 'debug', 'verbose', 'version', 'help', 'useragent']))
})

test('args', async () => {
  expect(TheCommand.args).toBeUndefined()
})

describe('instance methods', () => {
  let command

  beforeEach(() => {
    command = new TheCommand([])
  })

  describe('init', () => {
    test('is a function', async () => {
      expect(command.init).toBeInstanceOf(Function)
    })

    test('apihost default', async () => {
      const files = {}
      files[require('path').join(require('os').homedir(), '.wskprops')] = 'AUTH=1234'
      fakeFileSystem.addJson(files)

      return command.wsk().then(() => {
        expect(RuntimeLib.init).toHaveBeenLastCalledWith(
          {
            apihost: 'https://adobeioruntime.net',
            api_key: 1234,
            apiversion: 'v1',
            auth_handler: expect.objectContaining({
              getAuthHeader: expect.any(Function)
            })
          }
        )
      })
    })

    test('empty APIHOST should throw', async () => {
      process.env[PropertyEnv.APIHOST] = '    '
      await expect(command.wsk()).rejects.toThrow(new Error('An API host must be specified'))
    })

    test('null AUTH should throw', async () => {
      delete process.env[PropertyEnv.APIHOST]
      delete process.env[PropertyEnv.AUTH]
      const files = {}
      files[require('path').join(require('os').homedir(), '.wskprops')] = ''
      fakeFileSystem.addJson(files)
      await expect(command.wsk()).rejects.toThrow(new Error('An AUTH key must be specified'))
    })

    test('empty AUTH should throw', async () => {
      process.env[PropertyEnv.AUTH] = '    '
      await expect(command.wsk()).rejects.toThrow(new Error('An AUTH key must be specified'))
      delete process.env[PropertyEnv.AUTH]
    })

    test('not string AUTH should not throw', async () => {
      const files = {}
      files[require('path').join(require('os').homedir(), '.wskprops')] = 'AUTH=1234'
      fakeFileSystem.addJson(files)

      return command.wsk().then(() => {
        expect(RuntimeLib.init).toHaveBeenLastCalledWith(
          {
            api_key: 1234,
            apihost: 'https://adobeioruntime.net',
            apiversion: 'v1',
            auth_handler: expect.objectContaining({
              getAuthHeader: expect.any(Function)
            })
          }
        )
        delete process.env[PropertyEnv.APIHOST]
      })
    })

    test('auth with inline comment should trim the comment', async () => {
      const files = {}
      files[require('path').join(require('os').homedir(), '.wskprops')] = 'AUTH=123 #inline-comment'
      fakeFileSystem.addJson(files)

      return command.wsk().then(() => {
        expect(RuntimeLib.init).toHaveBeenLastCalledWith(
          {
            api_key: 123,
            apihost: 'https://adobeioruntime.net',
            apiversion: 'v1',
            auth_handler: expect.objectContaining({
              getAuthHeader: expect.any(Function)
            })
          }
        )
        delete process.env[PropertyEnv.APIHOST]
      })
    })

    test('apihost flag with env', async () => {
      const value = 'http://my-server'
      process.env[PropertyEnv.APIHOST] = value

      return command.wsk().then(() => {
        expect(RuntimeLib.init).toHaveBeenLastCalledWith(
          // the values are from the wsk.properties fixture
          {
            api_key: 'some-gibberish-not-a-real-key',
            namespace: 'some_namespace',
            apihost: value,
            apiversion: 'v1',
            auth_handler: expect.objectContaining({
              getAuthHeader: expect.any(Function)
            })
          }
        )
        delete process.env[PropertyEnv.APIHOST]
      })
    })

    test('auth flag with env', async () => {
      const value = 'a9329ekasgk01'
      process.env[PropertyEnv.AUTH] = value

      return command.wsk().then(() => {
        expect(RuntimeLib.init).toHaveBeenLastCalledWith(
          // the values are from the wsk.properties fixture
          {
            api_key: value,
            namespace: 'some_namespace',
            apihost: 'some.host',
            apiversion: 'v1',
            auth_handler: expect.objectContaining({
              getAuthHeader: expect.any(Function)
            })
          }
        )
        delete process.env[PropertyEnv.AUTH]
      })
    })

    test('apiversion flag with env', async () => {
      const value = 'v2'
      process.env[PropertyEnv.APIVERSION] = value

      return command.wsk().then(() => {
        expect(RuntimeLib.init).toHaveBeenLastCalledWith(
          // the values are from the wsk.properties fixture
          {
            api_key: 'some-gibberish-not-a-real-key',
            namespace: 'some_namespace',
            apihost: 'some.host',
            apiversion: value,
            auth_handler: expect.objectContaining({
              getAuthHeader: expect.any(Function)
            })
          }
        )
        delete process.env[PropertyEnv.APIVERSION]
      })
    })

    test('verbose flag', async () => {
      const debug = require('debug')
      const spy = jest.spyOn(debug, 'enable').mockReturnValue()

      command.argv = ['--verbose']
      return command.init().then(() => {
        expect(spy).toHaveBeenLastCalledWith('*')
        spy.mockClear()
      })
    })

    test('debug flag', async () => {
      const debug = require('debug')
      const spy = jest.spyOn(debug, 'enable').mockReturnValue()

      command.argv = ['--debug', 'foo,bar']
      return command.init().then(() => {
        expect(spy).toHaveBeenLastCalledWith('foo,bar')
        spy.mockClear()
      })
    })

    test('init no flag', async () => {
      const debug = require('debug')
      const spy = jest.spyOn(debug, 'enable').mockReturnValue()

      command.argv = []
      return command.init().then(() => {
        expect(spy).not.toHaveBeenCalled()
        spy.mockClear()
      })
    })
  })

  describe('ow', () => {
    test('is a function', async () => {
      expect(command.wsk).toBeInstanceOf(Function)
    })

    test('returns a promise', () => {
      return command.wsk().then((ow) => {
        expect(ow).toBe(ow)
      })
    })

    // eslint-disable-next-line jest/expect-expect
    test('no config file, no problem', () => {
      fakeFileSystem.clear()
      process.env[PropertyEnv.AUTH] = '1234'

      return command.wsk().then(() => {
        delete process.env[PropertyEnv.AUTH]
      })
    })

    // eslint-disable-next-line jest/expect-expect
    test('should not throw if config file specified but doesnt exist', () => {
      fakeFileSystem.clear()
      process.env[PropertyEnv.CONFIG_FILE] = '/foo'
      process.env[PropertyEnv.AUTH] = '1234'

      return command.wsk().then(() => {
        delete process.env[PropertyEnv.CONFIG_FILE]
        delete process.env[PropertyEnv.AUTH]
      })
    })
  })

  describe('handleError', () => {
    const suffix = '\n specify --verbose flag for more information'
    test('is a function', async () => {
      expect(command.handleError).toBeInstanceOf(Function)
    })

    test('calls error', async () => {
      command.error = jest.fn()
      command.argv = ['--verbose']
      await command.handleError('msg', new Error('an error'))
      expect(command.error).toHaveBeenCalledWith('msg: an error' + suffix)
    })

    test('optional error object', async () => {
      command.error = jest.fn()
      await command.handleError('msg')
      expect(command.error).toHaveBeenCalledWith('msg')
    })

    test('with no arguments', async () => {
      command.error = jest.fn()
      await command.handleError()
      expect(command.error).toHaveBeenCalledWith('unknown error')
    })

    test('openwhisk error', async () => {
      command.error = jest.fn()
      await command.handleError('msg', new OpenWhiskError('an error'))
      expect(command.error).toHaveBeenCalledWith('msg: an error' + suffix)
    })

    test('openwhisk error, with internal error', async () => {
      command.error = jest.fn()
      const err = new Error('is')
      err.error = 'The real error'
      await command.handleError('msg', new OpenWhiskError('what', err))
      expect(command.error).toHaveBeenCalledWith('msg: the real error' + suffix)
    })

    test('openwhisk error, with internal error and statusCode', async () => {
      command.error = jest.fn()
      const err = new Error('is')
      err.error = 'The real error'
      await command.handleError('msg', new OpenWhiskError('what', err, 404))
      expect(command.error).toHaveBeenCalledWith('msg: the real error (404 Not Found)' + suffix)
    })

    test('openwhisk error, with internal error and code', async () => {
      command.error = jest.fn()
      const err = new Error('is')
      err.error = 'The real error'
      err.code = 12
      await command.handleError('msg', new OpenWhiskError('what', err))
      expect(command.error).toHaveBeenCalledWith('msg: the real error (12)' + suffix)
    })

    test('openwhisk error, with status code', async () => {
      command.error = jest.fn()
      const err = new Error('is')
      err.error = 'The real error'
      await command.handleError('msg', new OpenWhiskError('what', null, 401))
      expect(command.error).toHaveBeenCalledWith('msg: 401 Unauthorized' + suffix)
    })

    test('openwhisk error, with weird status code', async () => {
      command.error = jest.fn()
      const err = new Error('is')
      err.error = 'The real error'
      await command.handleError('msg', new OpenWhiskError('what', null, 999999))
      expect(command.error).toHaveBeenCalledWith('msg: 999999' + suffix)
    })

    test('with no message', async () => {
      command.error = jest.fn()
      await command.handleError('msg', new Error(''))
      expect(command.error).toHaveBeenCalledWith('msg' + suffix)
    })
  })

  describe('authHandler', () => {
    test('No Options : should return the correct Authorization header using getAuthHeader', async () => {
      const mockToken = 'mock-access-token'
      getToken.mockResolvedValue(mockToken)

      // Spy on runtimeLib.init to capture options before it's used
      let capturedOptions
      RuntimeLib.init.mockImplementation(async (options) => {
        capturedOptions = options // Store options for later verification
        return {} // Mock runtimeLib.init() return value
      })

      // Call wsk() which internally sets auth_handler
      await command.wsk()

      // Ensure options were captured
      expect(capturedOptions).toBeDefined()
      expect(capturedOptions.auth_handler).toBeDefined()
      expect(capturedOptions.apihost).toBeDefined()
      expect(capturedOptions.apihost).toBe('some.host')

      // Call getAuthHeader() from captured options
      const authHeader = await capturedOptions.auth_handler.getAuthHeader()

      expect(context.setCli).toHaveBeenCalledWith({ 'cli.bare-output': true }, false)
      expect(getCliEnv).toHaveBeenCalled()
      expect(getToken).toHaveBeenCalled()
      expect(authHeader).toBe(`Bearer ${mockToken}`)
    })

    test('With Options : should return the correct Authorization header using getAuthHeader', async () => {
      const mockToken = 'mock-access-token'
      getToken.mockResolvedValue(mockToken)

      const options = {
        auth_handler: {
          getAuthHeader: async () => `Bearer ${mockToken}`
        },
        apihost: 'https://custom-api.adobe.com'
      }

      await command.wsk(options) // Call wsk() with an existing options object

      expect(RuntimeLib.init).toHaveBeenCalledWith(options)
    })

    test('Default OW Host testing', async () => {
      delete process.env[PropertyEnv.APIHOST]

      const mockToken = 'mock-access-token'
      getToken.mockResolvedValue(mockToken)

      command.getOptions = jest.fn().mockResolvedValue({})

      // Mock runtimeLib.init to track its calls
      const mockInit = jest.fn().mockResolvedValue({})
      RuntimeLib.init = mockInit

      // Call wsk() without options
      await command.wsk()

      // Assertions
      expect(RuntimeLib.init).toHaveBeenCalled()

      // Verify the passed options contain the default apihost
      const optionsPassedToInit = mockInit.mock.calls[0][0] // Get the options passed to init
      expect(optionsPassedToInit.apihost).toBe('https://adobeioruntime.net')

      // Ensure the Authorization header is set correctly
      expect(optionsPassedToInit.auth_handler).toBeDefined()
      const authHeader = await optionsPassedToInit.auth_handler.getAuthHeader()
      expect(authHeader).toBe(`Bearer ${mockToken}`)
    })
  })
})
