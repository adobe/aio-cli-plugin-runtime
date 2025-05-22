/*
Copyright 2025 Adobe Inc. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const TheCommand = require('../src/DeployServiceCommand.js')
const { Command } = require('@oclif/core')
const { PropertyDefault } = require('../src/properties')
const RuntimeLib = require('@adobe/aio-lib-runtime')
const { getToken, context, CLI } = require('@adobe/aio-lib-ims')
const { getCliEnv } = require('@adobe/aio-lib-env')

jest.mock('@adobe/aio-lib-ims', () => ({
  getToken: jest.fn(),
  context: {
    getCurrent: jest.fn(),
    setCli: jest.fn(),
    get: jest.fn()
  },
  CLI: 'cli'
}))

jest.mock('@adobe/aio-lib-env', () => ({
  getCliEnv: jest.fn()
}))

jest.mock('@adobe/aio-lib-runtime', () => ({
  init: jest.fn()
}))

describe('DeployServiceCommand', () => {
  let command

  beforeEach(() => {
    command = new TheCommand([])
    jest.clearAllMocks()
  })

  test('exports', async () => {
    expect(typeof TheCommand).toEqual('function')
    expect(TheCommand.prototype).toBeInstanceOf(Command)
  })

  test('flags', async () => {
    expect(Object.keys(TheCommand.flags)).toEqual(expect.arrayContaining([
      'useRuntimeAuth'
    ]))
  })

  describe('getAccessToken', () => {
    const mockToken = 'mock-token'
    const mockEnv = 'prod'

    beforeEach(() => {
      getCliEnv.mockReturnValue(mockEnv)
    })

    test('should use CLI context by default', async () => {
      context.getCurrent.mockResolvedValue(CLI)
      getToken.mockResolvedValue(mockToken)

      const result = await command.getAccessToken()

      expect(context.getCurrent).toHaveBeenCalled()
      expect(context.setCli).toHaveBeenCalledWith({ 'cli.bare-output': true }, false)
      expect(getToken).toHaveBeenCalledWith(CLI)
      expect(result).toEqual({
        accessToken: mockToken,
        env: mockEnv
      })
    })

    test('should use custom context when available', async () => {
      const customContext = 'custom-context'
      context.getCurrent.mockResolvedValue(customContext)
      getToken.mockResolvedValue(mockToken)

      const result = await command.getAccessToken()

      expect(context.getCurrent).toHaveBeenCalled()
      expect(context.setCli).not.toHaveBeenCalled()
      expect(getToken).toHaveBeenCalledWith(customContext)
      expect(result).toEqual({
        accessToken: mockToken,
        env: mockEnv
      })
    })

    test('should use cached token when requested', async () => {
      context.getCurrent.mockResolvedValue(CLI)
      context.get.mockResolvedValue({
        access_token: { token: mockToken }
      })

      const result = await command.getAccessToken({ useCachedToken: true })

      expect(context.get).toHaveBeenCalledWith(CLI)
      expect(getToken).not.toHaveBeenCalled()
      expect(result).toEqual({
        accessToken: mockToken,
        env: mockEnv
      })
    })
  })

  describe('getAuthHandler', () => {
    test('should return auth handler with correct header', async () => {
      const mockToken = 'mock-token'
      const mockEnv = 'prod'
      getCliEnv.mockReturnValue(mockEnv)
      context.getCurrent.mockResolvedValue(CLI)
      getToken.mockResolvedValue(mockToken)

      const authHandler = command.getAuthHandler()
      const header = await authHandler.getAuthHeader()

      expect(header).toBe(`Bearer ${mockToken}`)
    })
  })

  describe('setRuntimeApiHostAndAuthHandler', () => {
    test('if options is not defined (set auth handler)', async () => {
      const mockOptions = null
      const result = await command.setRuntimeApiHostAndAuthHandler(mockOptions)

      expect(result.apihost).toBe(`${PropertyDefault.DEPLOYSERVICEURL}/runtime`)
      expect(result.auth_handler).toBeDefined()
    })

    test('should set runtime API host and auth handler when useRuntimeAuth is false', async () => {
      const mockOptions = { someOption: 'value' }
      const result = await command.setRuntimeApiHostAndAuthHandler(mockOptions)

      expect(result.apihost).toBe(`${PropertyDefault.DEPLOYSERVICEURL}/runtime`)
      expect(result.auth_handler).toBeDefined()
    })

    test('should not modify options when useRuntimeAuth is true', async () => {
      const mockOptions = { useRuntimeAuth: true, someOption: 'value' }
      const result = await command.setRuntimeApiHostAndAuthHandler(mockOptions)

      expect(result).toEqual(mockOptions)
    })

    test('should use custom deploy service URL from environment', async () => {
      const customUrl = 'https://custom-deploy-service.com'
      process.env.AIO_DEPLOY_SERVICE_URL = customUrl

      const mockOptions = { someOption: 'value' }
      const result = await command.setRuntimeApiHostAndAuthHandler(mockOptions)

      expect(result.apihost).toBe(`${customUrl}/runtime`)
      delete process.env.AIO_DEPLOY_SERVICE_URL
    })
  })

  describe('wsk', () => {
    test('should initialize runtime with correct options', async () => {
      const mockOptions = { someOption: 'value' }
      await command.wsk(mockOptions)

      expect(RuntimeLib.init).toHaveBeenCalled()
    })

    test('should get options from parent class when not provided', async () => {
      await command.wsk()

      expect(RuntimeLib.init).toHaveBeenCalled()
    })
  })
})
