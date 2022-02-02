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
const TheCommand = require('../../../../src/commands/runtime/package/delete.js')
const RuntimeBaseCommand = require('../../../../src/RuntimeBaseCommand.js')
const RuntimeLib = require('@adobe/aio-lib-runtime')
const rtUtils = RuntimeLib.utils
const rtAction = 'packages.delete'

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
  const deleteName = TheCommand.args[0]
  expect(deleteName.name).toBeDefined()
  expect(deleteName.name).toEqual('packageName')
  expect(deleteName.required).toEqual(true)
})

describe('instance methods', () => {
  let command, handleError, rtLib
  beforeEach(async () => {
    command = new TheCommand([])
    handleError = jest.spyOn(command, 'handleError')
    rtLib = await RuntimeLib.init({ apihost: 'fakehost', api_key: 'fakekey' })
    rtLib.mockResolved('actions.client.options', '')
    RuntimeLib.mockReset()
  })

  describe('run', () => {
    test('exists', async () => {
      expect(command.run).toBeInstanceOf(Function)
    })

    test('delete a package', () => {
      const cmd = rtLib.mockResolved(rtAction, { res: 'fake' })
      command.argv = ['packageName']
      rtUtils.parsePackageName.mockReturnValue({ name: 'fakeName', namespace: '-' })
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({ namespace: '-', name: 'fakeName' })
          expect(stdout.output).toMatch('')
        })
    })

    test('delete packages, --recursive', () => {
      const mockActionList = [
        { name: 'action1', namespace: 'namespace/package1' },
        { name: 'action2', namespace: 'namespace2' }
      ]
      const mockPackageList = [
        { namespace: 'namespace', name: 'package1' }
      ]
      const mockRulesList = [{
        name: 'rule1',
        action: {
          name: 'action1'
        },
        trigger: {
          name: 'trigger1',
          path: 'triggerPath'
        }
      }]
      rtUtils.parsePackageName.mockReturnValue({ name: 'package1', namespace: 'namespace' })
      const deleteAction = rtLib.mockResolved('actions.delete', 'Deleted Item')
      const deletePackage = rtLib.mockResolved('packages.delete', 'Deleted Item')
      const deleteRule = rtLib.mockResolved('rules.delete', 'Deleted Item')
      const deleteTrigger = rtLib.mockResolved('triggers.delete', 'Deleted Item')

      rtLib.mockResolved('actions.list', mockActionList)
      rtLib.mockResolved('packages.list', mockPackageList)
      rtLib.mockResolved('rules.list', mockRulesList)

      command.argv = ['packageName', '--recursive']
      return command.run()
        .then(() => {
          expect(deleteAction).toHaveBeenCalledWith(mockActionList[0])
          expect(deletePackage).toHaveBeenCalledWith(mockPackageList[0])
          expect(deleteRule).toHaveBeenCalledWith(mockRulesList[0].name)
          expect(deleteTrigger).toHaveBeenCalledWith({
            triggerName: mockRulesList[0].trigger.name,
            namespace: mockRulesList[0].trigger.path
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('delete package, --recursive, no actions', () => {
      const mockActionList = [
        { name: 'action1', namespace: 'namespace/somepackage' },
        { name: 'action2', namespace: 'namespace2/notmypackage' }
      ]
      const mockPackageList = [
        { namespace: 'namespace', name: 'package1' }
      ]
      rtUtils.parsePackageName.mockReturnValue({ name: 'package1', namespace: 'namespace' })
      const deleteAction = rtLib.mockResolved('actions.delete', 'Deleted Item')
      const deletePackage = rtLib.mockResolved('packages.delete', 'Deleted Item')
      rtLib.mockResolved('actions.list', mockActionList)
      rtLib.mockResolved('packages.list', mockPackageList)

      command.argv = ['packageName', '--recursive']
      return command.run()
        .then(() => {
          expect(deleteAction).not.toHaveBeenCalled()
          expect(deletePackage).toHaveBeenCalledWith(mockPackageList[0])
          expect(stdout.output).toMatch('')
        })
    })

    test('delete package, --recursive, no rules', () => {
      const mockActionList = [
        { name: 'action1', namespace: 'namespace/package1' },
        { name: 'action2', namespace: 'namespace2' }
      ]
      const mockPackageList = [
        { namespace: 'namespace', name: 'package1' }
      ]
      const mockRulesList = null
      rtUtils.parsePackageName.mockReturnValue({ name: 'package1', namespace: 'namespace' })
      const deleteAction = rtLib.mockResolved('actions.delete', 'Deleted Item')
      const deletePackage = rtLib.mockResolved('packages.delete', 'Deleted Item')
      const deleteRule = rtLib.mockResolved('rules.delete', 'Deleted Item')
      const deleteTrigger = rtLib.mockResolved('triggers.delete', 'Deleted Item')

      rtLib.mockResolved('actions.list', mockActionList)
      rtLib.mockResolved('packages.list', mockPackageList)
      rtLib.mockResolved('rules.list', mockRulesList)

      command.argv = ['packageName', '--recursive']
      return command.run()
        .then(() => {
          expect(deleteAction).toHaveBeenCalledWith(mockActionList[0])
          expect(deletePackage).toHaveBeenCalledWith(mockPackageList[0])
          expect(deleteRule).not.toHaveBeenCalled()
          expect(deleteTrigger).not.toHaveBeenCalled()
          expect(stdout.output).toMatch('')
        })
    })

    test('delete a package /ns', () => {
      const cmd = rtLib.mockResolved(rtAction, { res: 'fake' })
      command.argv = ['ns/packageName']
      rtUtils.parsePackageName.mockReturnValue({ name: 'fakeName', namespace: 'fakeNs' })
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({ namespace: 'fakeNs', name: 'fakeName' })
          expect(stdout.output).toMatch('')
        })
    })

    test('delete a package --json', () => {
      const cmd = rtLib.mockResolved(rtAction, { res: 'fake' })
      command.argv = ['packageName', '--json']
      rtUtils.parsePackageName.mockReturnValue({ name: 'fakeName', namespace: 'fakeNs' })
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({ namespace: 'fakeNs', name: 'fakeName' })
          expect(stdout.output).toMatch(JSON.stringify({ res: 'fake' }, null, 2))
        })
    })

    test('errors out on api error', () => {
      return new Promise((resolve, reject) => {
        rtLib.mockRejected(rtAction, new Error('an error'))
        command.argv = ['packageName']
        return command.run()
          .then(() => reject(new Error('does not throw error')))
          .catch(() => {
            expect(handleError).toHaveBeenLastCalledWith('failed to delete the package', new Error('an error'))
            resolve()
          })
      })
    })
  })
})
