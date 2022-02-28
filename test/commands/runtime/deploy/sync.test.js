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

const TheCommand = require('../../../../src/commands/runtime/deploy/sync.js')
const RuntimeBaseCommand = require('../../../../src/RuntimeBaseCommand.js')
const { stdout } = require('stdout-stderr')
const RuntimeLib = require('@adobe/aio-lib-runtime')
const rtUtils = RuntimeLib.utils
const config = require('@adobe/aio-lib-core-config')

test('sync', async () => {
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

describe('instance methods', () => {
  let command, handleError

  let rtLib
  beforeEach(async () => {
    command = new TheCommand([])
    handleError = jest.spyOn(command, 'handleError')
    rtLib = await RuntimeLib.init({ apihost: 'fakeHost', api_key: 'fakeKey' })
  })

  describe('run', () => {
    test('exists', async () => {
      expect(command.run).toBeInstanceOf(Function)
    })

    test('sync a package', () => {
      command.argv = ['-m', '/deploy/deployment_actionMissingInputs.yaml']
      rtUtils.setPaths.mockReturnValue({
        packages: {},
        deploymentTriggers: { fake: 'dTriggers' },
        deploymentPackages: { fake: 'dPackages' },
        projectName: 'hello',
        manifestPath: 'fakePath',
        manifestContent: 'fakeContent'
      })
      rtUtils.processPackage.mockReturnValue({ fake: 'entities' })
      config.get.mockReturnValue('fakeIMSOrg')
      const mockedLog = jest.spyOn(command.log, 'bind')
      return command.run()
        .then(() => {
          expect(rtUtils.syncProject).toHaveBeenCalledWith(
            'hello',
            'fakePath',
            'fakeContent',
            { fake: 'entities' },
            rtLib,
            expect.any(Function),
            'fakeIMSOrg'
          )
          expect(stdout.output).toMatch('')
          expect(mockedLog).toHaveBeenCalled()
        })
    })

    test('sync with error', async () => {
      command.argv = ['-m', '/deploy/deployment_actionMissingInputs.yaml']
      rtUtils.setPaths.mockReturnValue({
        packages: {},
        deploymentTriggers: { fake: 'dTriggers' },
        deploymentPackages: { fake: 'dPackages' },
        projectName: 'hello',
        manifestPath: 'fakePath',
        manifestContent: 'fakeContent'
      })
      rtUtils.processPackage.mockReturnValue({ fake: 'entities' })
      config.get.mockReturnValue('fakeIMSOrg')
      rtUtils.syncProject.mockRejectedValue(new Error('broken!'))
      await expect(command.run()).rejects.toThrow()
      expect(handleError).toHaveBeenLastCalledWith('Failed to sync', new Error('broken!'))
    })

    test('sync with projectName=""', async () => {
      command.argv = ['-m', '/deploy/deployment_actionMissingInputs.yaml']
      rtUtils.setPaths.mockReturnValue({
        packages: {},
        deploymentTriggers: { fake: 'dTriggers' },
        deploymentPackages: { fake: 'dPackages' },
        projectName: '',
        manifestPath: 'fakePath',
        manifestContent: 'fakeContent'
      })
      rtUtils.processPackage.mockReturnValue({ fake: 'entities' })
      config.get.mockReturnValue('fakeIMSOrg')
      await expect(command.run()).rejects.toThrow()
      expect(handleError).toHaveBeenLastCalledWith('Failed to sync', new Error('The mandatory key [project name] is missing'))
    })
  })
})
