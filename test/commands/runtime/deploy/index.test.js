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
const TheCommand = require('../../../../src/commands/runtime/deploy/index.js')
const RuntimeBaseCommand = require('../../../../src/RuntimeBaseCommand.js')
const RuntimeLib = require('@adobe/aio-lib-runtime')

const pkgNameVersion = 'aio-cli-plugin-runtime@' + require('../../../../package.json').version

const utils = RuntimeLib.utils

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

test('flags', async () => {
  expect(TheCommand.flags.manifest.char).toBe('m')
  expect(typeof TheCommand.flags.manifest).toBe('object')
  expect(TheCommand.flags.param.multiple).toBe(true)
  expect(typeof TheCommand.flags.param).toBe('object')
  expect(TheCommand.flags['param-file'].char).toBe('P')
  expect(typeof TheCommand.flags['param-file']).toBe('object')
})

// some expected fake values
const expectedEntities = { fake: 'entities' }
const expectedOWOptions = { api_key: 'some-gibberish-not-a-real-key', apihost: 'some.host', apiversion: 'v1', namespace: 'some_namespace' }
const expectedIMSOrg = 'fakeIMSOrg'
const expectedDepPackages = { fake: 'dep-packages' }
const expectedDepTriggers = [{ fake: 'dep-triggers' }]
const expectedPackages = { fake: 'packages' }

describe('instance methods', () => {
  let command, handleError, rtLib

  beforeEach(() => {
    RuntimeLib.mockReset()
    rtLib = RuntimeLib.init({ fake: 'stuff' })
    utils.getKeyValueObjectFromMergedParameters.mockReturnValue({}) // default return value
    utils.processPackage.mockReturnValue(expectedEntities)
    utils.setPaths.mockReturnValue({
      packages: expectedPackages,
      deploymentTriggers: expectedDepTriggers,
      deploymentPackages: expectedDepPackages,
      manifestPath: 'someFakePath',
      manifestContent: { fake: 'not useful' },
      projectName: 'fakeProjectName'
    })
    command = new TheCommand([])
    command.getImsOrgId = jest.fn().mockReturnValue(expectedIMSOrg)
    handleError = jest.spyOn(command, 'handleError')
  })

  describe('run', () => {
    test('exists', async () => {
      expect(command.run).toBeInstanceOf(Function)
    })

    test('run with no params', async () => {
      command.argv = []
      await command.run()
      expect(utils.setPaths).toHaveBeenCalledWith({ useragent: pkgNameVersion })
      expect(utils.getKeyValueObjectFromMergedParameters).toHaveBeenCalledWith(undefined, undefined)

      expect(utils.processPackage).toHaveBeenCalledWith(expectedPackages, expectedDepPackages, expectedDepTriggers, {}, false, expectedOWOptions)
      expect(utils.deployPackage).toHaveBeenCalledWith(expectedEntities, rtLib, command.log, expectedIMSOrg)

      expect(stdout.output).toMatch('')
      expect(handleError).not.toHaveBeenCalled()
    })

    test('run with --params', async () => {
      command.argv = ['--param', 'key', 'value']
      utils.getKeyValueObjectFromMergedParameters.mockReturnValue({ fake: 'params', fake2: 'params2' })
      await command.run()

      expect(utils.setPaths).toHaveBeenCalledWith({ param: ['key', 'value'], useragent: pkgNameVersion })
      expect(utils.getKeyValueObjectFromMergedParameters).toHaveBeenCalledWith(['key', 'value'], undefined)

      expect(utils.processPackage).toHaveBeenCalledWith(expectedPackages, expectedDepPackages, expectedDepTriggers, { fake: 'params', fake2: 'params2' }, false, expectedOWOptions)
      expect(utils.deployPackage).toHaveBeenCalledWith(expectedEntities, rtLib, command.log, expectedIMSOrg)

      expect(stdout.output).toMatch('')
      expect(handleError).not.toHaveBeenCalled()
    })

    test('run with multiple --params', async () => {
      command.argv = ['--param', 'key', 'value', '--param', 'key2', 'value2']
      utils.getKeyValueObjectFromMergedParameters.mockReturnValue({ fake: 'params', fake2: 'params2' })
      await command.run()

      expect(utils.setPaths).toHaveBeenCalledWith({ param: ['key', 'value', 'key2', 'value2'], useragent: pkgNameVersion })
      expect(utils.getKeyValueObjectFromMergedParameters).toHaveBeenCalledWith(['key', 'value', 'key2', 'value2'], undefined)

      expect(utils.processPackage).toHaveBeenCalledWith(expectedPackages, expectedDepPackages, expectedDepTriggers, { fake: 'params', fake2: 'params2' }, false, expectedOWOptions)
      expect(utils.deployPackage).toHaveBeenCalledWith(expectedEntities, rtLib, command.log, expectedIMSOrg)

      expect(stdout.output).toMatch('')
      expect(handleError).not.toHaveBeenCalled()
    })

    test('run with -P (param-file)', async () => {
      command.argv = ['-P', 'param-file.json']
      utils.getKeyValueObjectFromMergedParameters.mockReturnValue({ fake: 'params', fake2: 'params2' })
      await command.run()

      expect(utils.setPaths).toHaveBeenCalledWith({ 'param-file': 'param-file.json', useragent: pkgNameVersion })
      expect(utils.getKeyValueObjectFromMergedParameters).toHaveBeenCalledWith(undefined, 'param-file.json')

      expect(utils.processPackage).toHaveBeenCalledWith(expectedPackages, expectedDepPackages, expectedDepTriggers, { fake: 'params', fake2: 'params2' }, false, expectedOWOptions)
      expect(utils.deployPackage).toHaveBeenCalledWith(expectedEntities, rtLib, command.log, expectedIMSOrg)

      expect(stdout.output).toMatch('')
      expect(handleError).not.toHaveBeenCalled()
    })

    test('run with -P and --params', async () => {
      command.argv = ['-P', 'param-file.json', '--param', 'key', 'value', '--param', 'key2', 'value2']
      utils.getKeyValueObjectFromMergedParameters.mockReturnValue({ fake: 'params', fake2: 'params2' })
      await command.run()

      expect(utils.setPaths).toHaveBeenCalledWith({ 'param-file': 'param-file.json', param: ['key', 'value', 'key2', 'value2'], useragent: pkgNameVersion })
      expect(utils.getKeyValueObjectFromMergedParameters).toHaveBeenCalledWith(['key', 'value', 'key2', 'value2'], 'param-file.json')

      expect(utils.processPackage).toHaveBeenCalledWith(expectedPackages, expectedDepPackages, expectedDepTriggers, { fake: 'params', fake2: 'params2' }, false, expectedOWOptions)
      expect(utils.deployPackage).toHaveBeenCalledWith(expectedEntities, rtLib, command.log, expectedIMSOrg)

      expect(stdout.output).toMatch('')
      expect(handleError).not.toHaveBeenCalled()
    })

    test('run throws if utils.deployPackage throws', async () => {
      utils.deployPackage.mockImplementation(() => {
        throw new Error('errorrororor')
      })
      command.argv = ['-P', 'param-file']
      await expect(command.run()).rejects.toThrow('errorrororor')

      expect(stdout.output).toMatch('')
      expect(handleError).toHaveBeenCalled()
    })
  })
})
