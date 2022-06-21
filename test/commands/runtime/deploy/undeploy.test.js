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
const TheCommand = require('../../../../src/commands/runtime/deploy/undeploy.js')
const RuntimeBaseCommand = require('../../../../src/RuntimeBaseCommand.js')
const RuntimeLib = require('@adobe/aio-lib-runtime')
const utils = RuntimeLib.utils

const pkgNameVersion = 'aio-cli-plugin-runtime@' + require('../../../../package.json').version

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
  expect(typeof TheCommand.flags.projectname).toBe('object')
})
// some expected fake values
const expectedEntities = { fake: 'entities' }
const expectedEntitiesFromGet = { fakeGet: 'getentities' }
const expectedOWOptions = { api_key: 'some-gibberish-not-a-real-key', apihost: 'some.host', apiversion: 'v1', namespace: 'some_namespace' }
const expectedDepPackages = { fake: 'dep-packages' }
const expectedDepTriggers = [{ fake: 'dep-triggers' }]
const expectedPackages = { fake: 'packages' }

describe('instance methods', () => {
  let command, handleError, rtLib, mockedLog

  beforeEach(() => {
    command = new TheCommand([])
    mockedLog = jest.spyOn(command.log, 'bind')
    handleError = jest.spyOn(command, 'handleError')
    RuntimeLib.mockReset()
    rtLib = RuntimeLib.init({ fake: 1 })
    utils.processPackage.mockReturnValue(expectedEntities)
    utils.setPaths.mockReturnValue({
      packages: expectedPackages,
      deploymentTriggers: expectedDepTriggers, // not supported for now -> will always use {}
      deploymentPackages: expectedDepPackages, // not supported for now
      manifestPath: 'someFakePath',
      manifestContent: { fake: 'not useful' },
      projectName: 'fakeProjectName'
    })
    utils.getProjectEntities.mockReturnValue(expectedEntitiesFromGet)
  })

  describe('run', () => {
    test('exists', async () => {
      expect(command.run).toBeInstanceOf(Function)
    })

    test('run with no flags', async () => {
      command.argv = []
      await command.run()
      expect(utils.setPaths).toHaveBeenCalledWith({ useragent: pkgNameVersion })

      expect(utils.processPackage).toHaveBeenCalledWith(expectedPackages, {}, {}, {}, true, expectedOWOptions)
      expect(utils.getProjectEntities).not.toHaveBeenCalled()
      expect(utils.undeployPackage).toHaveBeenCalledWith(expectedEntities, rtLib, expect.any(Function))
      expect(stdout.output).toMatch('')
      expect(handleError).not.toHaveBeenCalled()
      expect(mockedLog).toHaveBeenCalled()
    })

    test('run with manifest flag', async () => {
      command.argv = ['-m', 'fake-manifest.yml']
      await command.run()
      expect(utils.setPaths).toHaveBeenCalledWith({ manifest: 'fake-manifest.yml', useragent: pkgNameVersion })

      expect(utils.processPackage).toHaveBeenCalledWith(expectedPackages, {}, {}, {}, true, expectedOWOptions)
      expect(utils.getProjectEntities).not.toHaveBeenCalled()
      expect(utils.undeployPackage).toHaveBeenCalledWith(expectedEntities, rtLib, expect.any(Function))
      expect(stdout.output).toMatch('')
      expect(handleError).not.toHaveBeenCalled()
      expect(mockedLog).toHaveBeenCalled()
    })

    test('run with project name flag', async () => {
      command.argv = ['--projectname', 'thedudesproject']
      const mockedLog = jest.spyOn(command.log, 'bind')
      await command.run()
      expect(utils.setPaths).not.toHaveBeenCalled()

      expect(utils.processPackage).not.toHaveBeenCalled()
      expect(utils.getProjectEntities).toHaveBeenCalledWith('thedudesproject', false, rtLib)
      expect(utils.undeployPackage).toHaveBeenCalledWith(expectedEntitiesFromGet, rtLib, expect.any(Function))
      expect(stdout.output).toMatch('')
      expect(mockedLog).toHaveBeenCalled()
      expect(handleError).not.toHaveBeenCalled()
    })

    test('run with project name and manifest flag', async () => {
      // ignores the manifest flag
      command.argv = ['-m', 'fake-manifest.yml', '--projectname', 'thedudesproject']
      const mockedLog = jest.spyOn(command.log, 'bind')
      await command.run()
      expect(utils.setPaths).not.toHaveBeenCalled()
      expect(utils.processPackage).not.toHaveBeenCalled()
      expect(utils.getProjectEntities).toHaveBeenCalledWith('thedudesproject', false, rtLib)
      expect(utils.undeployPackage).toHaveBeenCalledWith(expectedEntitiesFromGet, rtLib, expect.any(Function))
      expect(stdout.output).toMatch('')
      expect(mockedLog).toHaveBeenCalled()
      expect(handleError).not.toHaveBeenCalled()
    })

    test('run with project name and error on getProjectEntities', async () => {
      // ignores the manifest flag
      command.argv = ['--projectname', 'thedudesproject']
      utils.getProjectEntities.mockImplementation(() => { throw new Error('the get ERROR') })
      await expect(command.run()).rejects.toThrow('the get ERROR')
      expect(handleError).toHaveBeenCalled()
    })

    test('run with no flag and error on setPaths', async () => {
      // ignores the manifest flag
      command.argv = []
      utils.setPaths.mockImplementation(() => { throw new Error('the setPaths ERROR') })
      await expect(command.run()).rejects.toThrow('the setPaths ERROR')
      expect(handleError).toHaveBeenCalled()
    })
  })
})
