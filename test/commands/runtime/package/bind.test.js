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
const ow = require('openwhisk')()
const owAction = 'packages.create'

test('exports', async () => {
  expect(typeof TheCommand).toEqual('function')
  expect(TheCommand.prototype instanceof RuntimeBaseCommand).toBeTruthy()
})

test('description', async () => {
  expect(TheCommand.description).toBeDefined()
})

test('aliases', async () => {
  expect(TheCommand.aliases).toEqual([])
})

test('flags', async () => {
  expect(TheCommand.flags.param.required).toBe(false)
  expect(TheCommand.flags.param.hidden).toBe(false)
  expect(TheCommand.flags.param.multiple).toBe(true)
  expect(TheCommand.flags.param.char).toBe('p')
  expect(typeof TheCommand.flags.param).toBe('object')
  expect(TheCommand.flags['param-file'].required).toBe(false)
  expect(TheCommand.flags['param-file'].hidden).toBe(false)
  expect(TheCommand.flags['param-file'].multiple).toBe(false)
  expect(TheCommand.flags['param-file'].char).toBe('P')
  expect(typeof TheCommand.flags['param-file']).toBe('object')
  expect(TheCommand.flags.annotation.required).toBe(false)
  expect(TheCommand.flags.annotation.hidden).toBe(false)
  expect(TheCommand.flags.annotation.multiple).toBe(true)
  expect(TheCommand.flags.annotation.char).toBe('a')
  expect(typeof TheCommand.flags.annotation).toBe('object')
  expect(TheCommand.flags['annotation-file'].required).toBe(false)
  expect(TheCommand.flags['annotation-file'].hidden).toBe(false)
  expect(TheCommand.flags['annotation-file'].multiple).toBe(false)
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
  let command, handleError

  beforeEach(() => {
    command = new TheCommand([])
    handleError = jest.spyOn(command, 'handleError')
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
      ow.mockResolved('packages.get', { namespace: 'ns' })
      let cmd = ow.mockResolved(owAction, '')
      command.argv = ['packageName', 'bindPackageName', '--param', 'a', 'b', '--param', 'c', 'd']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name: 'bindPackageName',
            package: {
              annotations: [],
              binding: {
                name: 'packageName',
                namespace: 'ns'
              },
              parameters: [
                {
                  key: 'a',
                  value: 'b'
                },
                {
                  key: 'c',
                  value: 'd'
                }
              ]
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('binds a package with package name param flag --json', () => {
      ow.mockResolved('packages.get', { namespace: 'ns' })
      let cmd = ow.mockResolved(owAction, '')
      command.argv = ['packageName', 'bindPackageName', '--param', 'a', 'b', '--param', 'c', 'd', '--json']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name: 'bindPackageName',
            package: {
              annotations: [],
              binding: {
                name: 'packageName',
                namespace: 'ns'
              },
              parameters: [
                {
                  key: 'a',
                  value: 'b'
                },
                {
                  key: 'c',
                  value: 'd'
                }
              ]
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('binds a package with only packageName and bindPackageName', () => {
      ow.mockResolved('packages.get', { namespace: 'ns' })
      let cmd = ow.mockResolved(owAction, '')
      command.argv = ['packageName', 'bindpackageName']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name: 'bindpackageName',
            package: {
              annotations: [],
              binding: {
                name: 'packageName',
                namespace: 'ns'
              },
              parameters: []
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('binds a package with packageName, bindPackageName and param-file flag', () => {
      const json = {
        'parameters.json': fixtureFile('trigger/parameters.json')
      }
      fakeFileSystem.addJson({
        '/action': json
      })
      ow.mockResolved('packages.get', { namespace: 'ns' })
      let cmd = ow.mockResolved(owAction, '')
      command.argv = ['packageName', 'bindPackageName', '--param-file', '/action/parameters.json']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name: 'bindPackageName',
            package: {
              annotations: [],
              binding: {
                name: 'packageName',
                namespace: 'ns'
              },
              parameters: [
                {
                  key: 'param1',
                  value: 'param1value'
                },
                {
                  key: 'param2',
                  value: 'param2value'
                }
              ]
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('binds a package with packageName, bindPackageName and annotation-file flag', () => {
      const json = {
        'parameters.json': fixtureFile('trigger/parameters.json')
      }
      fakeFileSystem.addJson({
        '/action': json
      })
      let cmd = ow.mockResolved(owAction, '')
      command.argv = ['packageName', 'bindPackageName', '--annotation-file', '/action/parameters.json']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name: 'bindPackageName',
            package: {
              parameters: [],
              binding: {
                name: 'packageName',
                namespace: 'ns'
              },
              annotations: [
                {
                  key: 'param1',
                  value: 'param1value'
                },
                {
                  key: 'param2',
                  value: 'param2value'
                }
              ]
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('binds a package with packageName, bindPackageName and annotation and param flags', () => {
      let cmd = ow.mockResolved(owAction, '')
      command.argv = ['packageName', 'bindPackageName', '--annotation', 'a', 'b', '--annotation', 'c', 'd', '--param', 'p1', 'p2']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name: 'bindPackageName',
            package: {
              parameters: [
                {
                  key: 'p1',
                  value: 'p2'
                }
              ],
              binding: {
                name: 'packageName',
                namespace: 'ns'
              },
              annotations: [
                {
                  key: 'a',
                  value: 'b'
                },
                {
                  key: 'c',
                  value: 'd'
                }
              ]
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('binds a package with packageName, bindPackageName and annotation and param flags with shorter flag version', () => {
      let cmd = ow.mockResolved(owAction, '')
      command.argv = ['packageName', 'bindPackageName', '-a', 'a', 'b', '-a', 'c', 'd', '-p', 'p1', 'p2']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name: 'bindPackageName',
            package: {
              parameters: [
                {
                  key: 'p1',
                  value: 'p2'
                }
              ],
              binding: {
                name: 'packageName',
                namespace: 'ns'
              },
              annotations: [
                {
                  key: 'a',
                  value: 'b'
                },
                {
                  key: 'c',
                  value: 'd'
                }
              ]
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('tests for incorrect --param flags', (done) => {
      ow.mockRejected(owAction, '')
      command.argv = ['packageName', 'bindPackageName', '--param', 'a', 'b', 'c']
      return command.run()
        .then(() => done.fail('does not throw error'))
        .catch(() => {
          expect(handleError).toHaveBeenLastCalledWith('failed to bind the package', new Error('Please provide correct values for flags'))
          done()
        })
    })

    test('tests for incorrect --annotation flags', (done) => {
      ow.mockRejected(owAction, '')
      command.argv = ['packageName', 'bindPackageName', '--annotation', 'a', 'b', 'c']
      return command.run()
        .then(() => done.fail('does not throw error'))
        .catch(() => {
          expect(handleError).toHaveBeenLastCalledWith('failed to bind the package', new Error('Please provide correct values for flags'))
          done()
        })
    })

    test('errors out on api error', (done) => {
      ow.mockRejected(owAction, new Error('an error'))
      command.argv = ['packageName', 'bindPackageName']
      return command.run()
        .then(() => done.fail('does not throw error'))
        .catch(() => {
          expect(handleError).toHaveBeenLastCalledWith('failed to bind the package', new Error('an error'))
          done()
        })
    })
  })
})
