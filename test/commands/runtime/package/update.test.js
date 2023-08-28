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
const TheCommand = require('../../../../src/commands/runtime/package/update.js')
const RuntimeBaseCommand = require('../../../../src/RuntimeBaseCommand.js')
const RuntimeLib = require('@adobe/aio-lib-runtime')
const rtUtils = RuntimeLib.utils
const rtAction = 'packages.update'

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
  expect(TheCommand.flags.param.multiple).toBe(true)
  expect(TheCommand.flags.param.char).toBe('p')
  expect(typeof TheCommand.flags.param).toBe('object')
  expect(TheCommand.flags['param-file'].char).toBe('P')
  expect(typeof TheCommand.flags['param-file']).toBe('object')
  expect(typeof TheCommand.flags.shared).toBe('object')
  expect(TheCommand.flags.annotation.multiple).toBe(true)
  expect(TheCommand.flags.annotation.char).toBe('a')
  expect(typeof TheCommand.flags.annotation).toBe('object')
  expect(TheCommand.flags['annotation-file'].char).toBe('A')
  expect(typeof TheCommand.flags['annotation-file']).toBe('object')
})

test('args', async () => {
  expect(TheCommand.args.packageName).toBeDefined()
  expect(TheCommand.args.packageName.required).toEqual(true)
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

  afterAll(() => {
    // reset back to normal
    clearMockedFs()
  })

  describe('run', () => {
    test('exists', async () => {
      expect(command.run).toBeInstanceOf(Function)
    })

    test('updates a package with package name param flag', () => {
      const cmd = rtLib.mockResolved(rtAction, '')
      command.argv = ['packageName', '--param', 'a', 'b', '--param', 'c', 'd']
      rtUtils.getKeyValueArrayFromMergedParameters.mockImplementation(params => params && [{ key: 'fakeParam', value: 'aaa' }, { key: 'fakeParam2', value: 'bbb' }])
      return command.run()
        .then(() => {
          expect(rtUtils.getKeyValueArrayFromMergedParameters).toHaveBeenCalledWith(['a', 'b', 'c', 'd'], undefined)
          expect(cmd).toHaveBeenCalledWith({
            name: 'packageName',
            package: {
              parameters: [
                { key: 'fakeParam', value: 'aaa' },
                { key: 'fakeParam2', value: 'bbb' }
              ]
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('updates a package with only package name', () => {
      const cmd = rtLib.mockResolved(rtAction, '')
      command.argv = ['packageName']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name: 'packageName'
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('updates a package with only package name --json', () => {
      const cmd = rtLib.mockResolved(rtAction, '')
      command.argv = ['packageName', '--json']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name: 'packageName'
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('updates a package with package name and param-file flag', () => {
      const cmd = rtLib.mockResolved(rtAction, '')
      command.argv = ['packageName', '--param-file', '/action/parameters.json']
      rtUtils.getKeyValueArrayFromMergedParameters.mockImplementation((flag, file) => file && [{ key: 'fakeParam', value: 'aaa' }, { key: 'fakeParam2', value: 'bbb' }])
      return command.run()
        .then(() => {
          expect(rtUtils.getKeyValueArrayFromMergedParameters).toHaveBeenCalledWith(undefined, '/action/parameters.json')
          expect(cmd).toHaveBeenCalledWith({
            name: 'packageName',
            package: {
              parameters: [
                { key: 'fakeParam', value: 'aaa' },
                { key: 'fakeParam2', value: 'bbb' }
              ]
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('update a package with package name and annotation-file flag', () => {
      const cmd = rtLib.mockResolved(rtAction, '')
      command.argv = ['packageName', '--annotation-file', '/action/parameters.json']
      rtUtils.getKeyValueArrayFromMergedParameters.mockImplementation((flag, file) => file && [{ key: 'fakeAnnot', value: 'aaa' }, { key: 'fakeAnnot2', value: 'bbb' }])
      return command.run()
        .then(() => {
          expect(rtUtils.getKeyValueArrayFromMergedParameters).toHaveBeenCalledWith(undefined, '/action/parameters.json')
          expect(cmd).toHaveBeenCalledWith({
            name: 'packageName',
            package: {
              annotations: [
                { key: 'fakeAnnot', value: 'aaa' },
                { key: 'fakeAnnot2', value: 'bbb' }
              ]
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('update a package with package name and annotation and param flags', () => {
      const cmd = rtLib.mockResolved(rtAction, '')
      command.argv = ['packageName', '--annotation', 'a', 'b', '--annotation', 'c', 'd', '--param', 'p1', 'p2']
      rtUtils.getKeyValueArrayFromMergedParameters.mockImplementation((flags, file) => {
        if (flags.includes('p1')) {
          return [{ key: 'fakeParam', value: 'aaa' }, { key: 'fakeParam2', value: 'bbb' }]
        }
        return [{ key: 'fakeAnnot', value: 'aaa' }, { key: 'fakeAnnot2', value: 'bbb' }]
      })
      return command.run()
        .then(() => {
          expect(rtUtils.getKeyValueArrayFromMergedParameters).toHaveBeenCalledWith(['a', 'b', 'c', 'd'], undefined)
          expect(rtUtils.getKeyValueArrayFromMergedParameters).toHaveBeenCalledWith(['p1', 'p2'], undefined)
          expect(cmd).toHaveBeenCalledWith({
            name: 'packageName',
            package: {
              parameters: [
                { key: 'fakeParam', value: 'aaa' },
                { key: 'fakeParam2', value: 'bbb' }
              ],
              annotations: [
                { key: 'fakeAnnot', value: 'aaa' },
                { key: 'fakeAnnot2', value: 'bbb' }
              ]
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('update a package with package name and annotation and param flags with shorter flag version', () => {
      const cmd = rtLib.mockResolved(rtAction, '')
      command.argv = ['packageName', '-a', 'a', 'b', '-a', 'c', 'd', '-p', 'p1', 'p2']
      rtUtils.getKeyValueArrayFromMergedParameters.mockImplementation((flags, file) => {
        if (flags.includes('p1')) {
          return [{ key: 'fakeParam', value: 'aaa' }, { key: 'fakeParam2', value: 'bbb' }]
        }
        return [{ key: 'fakeAnnot', value: 'aaa' }, { key: 'fakeAnnot2', value: 'bbb' }]
      })
      return command.run()
        .then(() => {
          expect(rtUtils.getKeyValueArrayFromMergedParameters).toHaveBeenCalledWith(['a', 'b', 'c', 'd'], undefined)
          expect(rtUtils.getKeyValueArrayFromMergedParameters).toHaveBeenCalledWith(['p1', 'p2'], undefined)
          expect(cmd).toHaveBeenCalledWith({
            name: 'packageName',
            package: {
              parameters: [
                { key: 'fakeParam', value: 'aaa' },
                { key: 'fakeParam2', value: 'bbb' }
              ],
              annotations: [
                { key: 'fakeAnnot', value: 'aaa' },
                { key: 'fakeAnnot2', value: 'bbb' }
              ]
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('update a package with package name and shared flag', () => {
      const cmd = rtLib.mockResolved(rtAction, '')
      command.argv = ['packageName', '--shared', 'true']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name: 'packageName',
            package: {
              publish: true
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('update a package with package name and shared flag as false', () => {
      const cmd = rtLib.mockResolved(rtAction, '')
      command.argv = ['packageName', '--shared', 'false']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name: 'packageName',
            package: {
              publish: false
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('error on params flag parsing', async () => {
      rtLib.mockRejected(rtAction, '')
      command.argv = ['packageName', '--param', 'a', 'b', 'c']
      rtUtils.getKeyValueArrayFromMergedParameters.mockImplementation(() => { throw new Error('parse error') })
      await expect(command.run()).rejects.toThrow()
      expect(handleError).toHaveBeenLastCalledWith('failed to update the package', new Error('parse error'))
    })

    test('error on annotation flag parsing', async () => {
      rtLib.mockRejected(rtAction, '')
      command.argv = ['packageName', '--annotation', 'a', 'b', 'c']
      rtUtils.getKeyValueArrayFromMergedParameters.mockImplementation(() => { throw new Error('parse error') })
      await expect(command.run()).rejects.toThrow()
      expect(handleError).toHaveBeenLastCalledWith('failed to update the package', new Error('parse error'))
    })

    test('errors out on api error', async () => {
      rtLib.mockRejected(rtAction, new Error('an error'))
      command.argv = ['packageName']
      await expect(command.run()).rejects.toThrow()
      expect(handleError).toHaveBeenLastCalledWith('failed to update the package', new Error('an error'))
    })
  })
})
