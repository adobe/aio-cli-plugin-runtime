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
const { Command } = require('@oclif/command')
const { PropertyEnv } = require('../src/properties')
const ow = require('openwhisk')

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
  expect(Object.keys(TheCommand.flags)).toEqual(['cert', 'key', 'apiversion', 'apihost', 'auth', 'insecure', 'debug', 'verbose', 'version', 'help'])
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
      fakeFileSystem.reset({ emptyWskProps: true })
      return command.wsk().then(() => {
        expect(ow).toHaveBeenCalledWith(
          { 'apihost': 'https://adobeioruntime.net', 'apiversion': 'v1' }
        )
        delete process.env[PropertyEnv.APIHOST]
      })
    })

    test('apihost flag with env', async () => {
      const value = 'http://my-server'
      process.env[PropertyEnv.APIHOST] = value

      return command.wsk().then(() => {
        expect(ow).toHaveBeenCalledWith(
          // the values are from the wsk.properties fixture
          {
            api_key: 'some-gibberish-not-a-real-key',
            namespace: 'some_namespace',
            apihost: value,
            apiversion: 'v1'
          }
        )
        delete process.env[PropertyEnv.APIHOST]
      })
    })

    test('auth flag with env', async () => {
      const value = 'a9329ekasgk01'
      process.env[PropertyEnv.AUTH] = value

      return command.wsk().then(() => {
        expect(ow).toHaveBeenCalledWith(
          // the values are from the wsk.properties fixture
          {
            api_key: value,
            namespace: 'some_namespace',
            apihost: 'some.host',
            apiversion: 'v1'
          }
        )
        delete process.env[PropertyEnv.AUTH]
      })
    })

    test('apiversion flag with env', async () => {
      const value = 'v2'
      process.env[PropertyEnv.APIVERSION] = value

      return command.wsk().then(() => {
        expect(ow).toHaveBeenCalledWith(
          // the values are from the wsk.properties fixture
          {
            api_key: 'some-gibberish-not-a-real-key',
            namespace: 'some_namespace',
            apihost: 'some.host',
            apiversion: value
          }
        )
        delete process.env[PropertyEnv.APIVERSION]
      })
    })

    test('verbose flag', async () => {
      const debug = require('debug')
      let spy = jest.spyOn(debug, 'enable').mockReturnValue()

      command.argv = ['--verbose']
      return command.init().then(() => {
        expect(spy).toHaveBeenCalledWith('*')
        spy.mockClear()
      })
    })

    test('debug flag', async () => {
      const debug = require('debug')
      let spy = jest.spyOn(debug, 'enable').mockReturnValue()

      command.argv = ['--debug', 'foo,bar']
      return command.init().then(() => {
        expect(spy).toHaveBeenCalledWith('foo,bar')
        spy.mockClear()
      })
    })

    test('init no flag', async () => {
      const debug = require('debug')
      let spy = jest.spyOn(debug, 'enable').mockReturnValue()

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

    test('no config file', (done) => {
      fakeFileSystem.clear()

      return command.wsk()
        .then(() => done.fail('does not throw error'))
        .catch((err) => {
          fakeFileSystem.reset()

          const wskprops = require('path').join(require('os').homedir(), '.wskprops')
          expect(err).toMatchObject(new Error(`OpenWhisk config file '${wskprops}' does not exist.`))
          done()
        })
    })
  })

  describe('handleError', () => {
    test('is a function', async () => {
      expect(command.handleError).toBeInstanceOf(Function)
    })

    test('calls error', () => {
      command.error = jest.fn()
      command.argv = ['--verbose']
      command.handleError('msg', new Error('an error'))
      expect(command.error).toHaveBeenCalledWith('msg: an error')
    })

    test('optional error object', () => {
      command.error = jest.fn()
      command.handleError('msg')
      expect(command.error).toHaveBeenCalledWith('msg')
    })

    test('with no arguments', () => {
      command.error = jest.fn()
      command.handleError()
      expect(command.error).toHaveBeenCalledWith('unknown error')
    })
  })
})
