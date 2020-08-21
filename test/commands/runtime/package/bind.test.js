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
const TheCommand = require('../../../../src/commands/runtime/package/bind.js')
const RuntimeBaseCommand = require('../../../../src/RuntimeBaseCommand.js')
const RuntimeLib = require('@adobe/aio-lib-runtime')
const rtUtils = RuntimeLib.utils
const rtAction = 'packages.create'

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
  expect(TheCommand.flags.annotation.multiple).toBe(true)
  expect(TheCommand.flags.annotation.char).toBe('a')
  expect(typeof TheCommand.flags.annotation).toBe('object')
  expect(TheCommand.flags['annotation-file'].char).toBe('A')
  expect(typeof TheCommand.flags['annotation-file']).toBe('object')
})

test('args', async () => {
  const packageName = TheCommand.args[0]
  expect(packageName.name).toBeDefined()
  expect(packageName.name).toEqual('packageName')
  expect(packageName.required).toEqual(true)
  const bindPackageName = TheCommand.args[1]
  expect(bindPackageName.name).toBeDefined()
  expect(bindPackageName.name).toEqual('bindPackageName')
  expect(bindPackageName.required).toEqual(true)
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
    fakeFileSystem.reset()
  })

  describe('run', () => {
    test('exists', async () => {
      expect(command.run).toBeInstanceOf(Function)
    })

    test('binds a package with package name param flag', () => {
      const cmd = rtLib.mockResolved(rtAction, { res: 'fake' })
      command.argv = ['packageName', 'bindPackageName', '--param', 'a', 'b', '--param', 'c', 'd']
      rtUtils.createKeyValueArrayFromFlag.mockReturnValue([{ key: 'fakeParam', value: 'aaa' }, { key: 'fakeParam2', value: 'bbb' }])
      rtUtils.parsePackageName.mockReturnValue({ name: 'fakeName', namespace: '-' })
      return command.run()
        .then(() => {
          expect(rtUtils.parsePackageName).toHaveBeenCalledWith('packageName')
          expect(rtUtils.createKeyValueArrayFromFlag).toHaveBeenCalledWith(['a', 'b', 'c', 'd'])
          expect(cmd).toHaveBeenCalledWith({
            name: 'bindPackageName',
            package: {
              annotations: [],
              binding: { name: 'fakeName', namespace: '-' },
              parameters: [{ key: 'fakeParam', value: 'aaa' }, { key: 'fakeParam2', value: 'bbb' }]
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('binds a package with package name /ns param flag', () => {
      const cmd = rtLib.mockResolved(rtAction, { fake: 'res' })
      command.argv = ['/ns/packageName', 'bindPackageName', '--param', 'a', 'b', '--param', 'c', 'd']
      rtUtils.createKeyValueArrayFromFlag.mockReturnValue([{ key: 'fakeParam', value: 'aaa' }, { key: 'fakeParam2', value: 'bbb' }])
      rtUtils.parsePackageName.mockReturnValue({ name: 'fakeName', namespace: 'fakeNs' })
      return command.run()
        .then(() => {
          expect(rtUtils.parsePackageName).toHaveBeenCalledWith('/ns/packageName')
          expect(rtUtils.createKeyValueArrayFromFlag).toHaveBeenCalledWith(['a', 'b', 'c', 'd'])
          expect(cmd).toHaveBeenCalledWith({
            name: 'bindPackageName',
            package: {
              annotations: [],
              binding: { name: 'fakeName', namespace: 'fakeNs' },
              parameters: [{ key: 'fakeParam', value: 'aaa' }, { key: 'fakeParam2', value: 'bbb' }]
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('binds a package with package name param flag --json', () => {
      const cmd = rtLib.mockResolved(rtAction, { fake: 'res' })
      command.argv = ['packageName', 'bindPackageName', '--param', 'a', 'b', '--param', 'c', 'd', '--json']
      rtUtils.createKeyValueArrayFromFlag.mockReturnValue([{ key: 'fakeParam', value: 'aaa' }, { key: 'fakeParam2', value: 'bbb' }])
      rtUtils.parsePackageName.mockReturnValue({ name: 'fakeName', namespace: '-' })
      return command.run()
        .then(() => {
          expect(rtUtils.parsePackageName).toHaveBeenCalledWith('packageName')
          expect(rtUtils.createKeyValueArrayFromFlag).toHaveBeenCalledWith(['a', 'b', 'c', 'd'])
          expect(cmd).toHaveBeenCalledWith({
            name: 'bindPackageName',
            package: {
              annotations: [],
              binding: { name: 'fakeName', namespace: '-' },
              parameters: [{ key: 'fakeParam', value: 'aaa' }, { key: 'fakeParam2', value: 'bbb' }]
            }
          })
          expect(stdout.output).toMatch(JSON.stringify({ fake: 'res' }, null, 2))
        })
    })

    test('binds a package with only packageName and bindPackageName', () => {
      const cmd = rtLib.mockResolved(rtAction, { res: 'fake' })
      rtUtils.parsePackageName.mockReturnValue({ name: 'fakeName', namespace: 'fakeNs' })
      command.argv = ['ns/packageName', 'bindPackageName']
      return command.run()
        .then(() => {
          expect(rtUtils.parsePackageName).toHaveBeenCalledWith('ns/packageName')
          expect(cmd).toHaveBeenCalledWith({
            name: 'bindPackageName',
            package: {
              annotations: [],
              binding: { name: 'fakeName', namespace: 'fakeNs' },
              parameters: []
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('binds a package with packageName, bindPackageName and param-file flag', () => {
      const cmd = rtLib.mockResolved(rtAction, { res: 'fake' })
      command.argv = ['ns/packageName', 'bindPackageName', '--param-file', '/action/parameters.json']
      rtUtils.createKeyValueArrayFromFile.mockReturnValue([{ key: 'fakeParam', value: 'aaa' }, { key: 'fakeParam2', value: 'bbb' }])
      rtUtils.parsePackageName.mockReturnValue({ name: 'fakeName', namespace: 'fakeNs' })
      return command.run()
        .then(() => {
          expect(rtUtils.parsePackageName).toHaveBeenCalledWith('ns/packageName')
          expect(rtUtils.createKeyValueArrayFromFile).toHaveBeenCalledWith('/action/parameters.json')
          expect(cmd).toHaveBeenCalledWith({
            name: 'bindPackageName',
            package: {
              annotations: [],
              binding: {
                name: 'fakeName',
                namespace: 'fakeNs'
              },
              parameters: [{ key: 'fakeParam', value: 'aaa' }, { key: 'fakeParam2', value: 'bbb' }]
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('binds a package with packageName, bindPackageName and annotation-file flag', () => {
      const cmd = rtLib.mockResolved(rtAction, { res: 'fake' })
      command.argv = ['ns/packageName', 'bindPackageName', '--annotation-file', '/action/parameters.json']
      rtUtils.createKeyValueArrayFromFile.mockReturnValue([{ key: 'fakeAnnot', value: 'aaa' }])
      rtUtils.parsePackageName.mockReturnValue({ name: 'fakeName', namespace: 'fakeNs' })
      return command.run()
        .then(() => {
          expect(rtUtils.parsePackageName).toHaveBeenCalledWith('ns/packageName')
          expect(rtUtils.createKeyValueArrayFromFile).toHaveBeenCalledWith('/action/parameters.json')
          expect(cmd).toHaveBeenCalledWith({
            name: 'bindPackageName',
            package: {
              annotations: [{ key: 'fakeAnnot', value: 'aaa' }],
              binding: {
                name: 'fakeName',
                namespace: 'fakeNs'
              },
              parameters: []
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('binds a package with packageName, bindPackageName and annotation and param flags', () => {
      const cmd = rtLib.mockResolved(rtAction, { res: 'fake' })
      command.argv = ['/ns/packageName', 'bindPackageName', '--annotation', 'a', 'b', '--annotation', 'c', 'd', '--param', 'p1', 'p2']
      rtUtils.createKeyValueArrayFromFlag.mockImplementation(arr => {
        if (arr.includes('p1')) {
          return [{ key: 'fakeParam', value: 'aaa' }, { key: 'fakeParam2', value: 'bbb' }]
        }
        return [{ key: 'fakeAnnot', value: 'aaa' }]
      })
      rtUtils.parsePackageName.mockReturnValue({ name: 'fakeName', namespace: 'fakeNs' })
      return command.run()
        .then(() => {
          expect(rtUtils.parsePackageName).toHaveBeenCalledWith('/ns/packageName')
          expect(rtUtils.createKeyValueArrayFromFlag).toHaveBeenCalledWith(['a', 'b', 'c', 'd'])
          expect(rtUtils.createKeyValueArrayFromFlag).toHaveBeenCalledWith(['p1', 'p2'])
          expect(cmd).toHaveBeenCalledWith({
            name: 'bindPackageName',
            package: {
              annotations: [{ key: 'fakeAnnot', value: 'aaa' }],
              binding: {
                name: 'fakeName',
                namespace: 'fakeNs'
              },
              parameters: [{ key: 'fakeParam', value: 'aaa' }, { key: 'fakeParam2', value: 'bbb' }]
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('binds a package with packageName, bindPackageName and annotation and param flags with shorter flag version', () => {
      const cmd = rtLib.mockResolved(rtAction, { res: 'fake' })
      command.argv = ['/ns/packageName', 'bindPackageName', '-a', 'a', 'b', '-a', 'c', 'd', '-p', 'p1', 'p2']
      rtUtils.createKeyValueArrayFromFlag.mockImplementation(arr => {
        if (arr.includes('p1')) {
          return [{ key: 'fakeParam', value: 'aaa' }, { key: 'fakeParam2', value: 'bbb' }]
        }
        return [{ key: 'fakeAnnot', value: 'aaa' }]
      })
      rtUtils.parsePackageName.mockReturnValue({ name: 'fakeName', namespace: 'fakeNs' })
      return command.run()
        .then(() => {
          expect(rtUtils.parsePackageName).toHaveBeenCalledWith('/ns/packageName')
          expect(rtUtils.createKeyValueArrayFromFlag).toHaveBeenCalledWith(['a', 'b', 'c', 'd'])
          expect(rtUtils.createKeyValueArrayFromFlag).toHaveBeenCalledWith(['p1', 'p2'])
          expect(cmd).toHaveBeenCalledWith({
            name: 'bindPackageName',
            package: {
              annotations: [{ key: 'fakeAnnot', value: 'aaa' }],
              binding: {
                name: 'fakeName',
                namespace: 'fakeNs'
              },
              parameters: [{ key: 'fakeParam', value: 'aaa' }, { key: 'fakeParam2', value: 'bbb' }]
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('error on params flag parsing', () => {
      return new Promise((resolve, reject) => {
        rtLib.mockRejected(rtAction, '')
        command.argv = ['packageName', 'bindPackageName', '--param', 'a', 'b', 'c']
        rtUtils.createKeyValueArrayFromFlag.mockImplementation(() => { throw new Error('parse error') })
        return command.run()
          .then(() => reject(new Error('does not throw error')))
          .catch(() => {
            expect(handleError).toHaveBeenLastCalledWith('failed to bind the package', new Error('parse error'))
            resolve()
          })
      })
    })

    test('error on annotation flag parsing', () => {
      return new Promise((resolve, reject) => {
        rtLib.mockRejected(rtAction, '')
        command.argv = ['packageName', 'bindPackageName', '--annotation', 'a', 'b', 'c']
        rtUtils.createKeyValueArrayFromFlag.mockImplementation(() => { throw new Error('parse error') })
        return command.run()
          .then(() => reject(new Error('does not throw error')))
          .catch(() => {
            expect(handleError).toHaveBeenLastCalledWith('failed to bind the package', new Error('parse error'))
            resolve()
          })
      })
    })

    test('errors out on api error', () => {
      return new Promise((resolve, reject) => {
        rtLib.mockRejected(rtAction, new Error('an error'))
        command.argv = ['packageName', 'bindPackageName']
        return command.run()
          .then(() => reject(new Error('does not throw error')))
          .catch(() => {
            expect(handleError).toHaveBeenLastCalledWith('failed to bind the package', new Error('an error'))
            resolve()
          })
      })
    })
  })
})
