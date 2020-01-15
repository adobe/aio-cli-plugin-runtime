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
const TheCommand = require('../../../../src/commands/runtime/action/update.js')
const RuntimeBaseCommand = require('../../../../src/RuntimeBaseCommand.js')
const { createKeyValueArrayFromObject } = require('../../../../src/runtime-helpers.js')
const ow = require('openwhisk')()
const owAction = 'actions.update'

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
  expect(TheCommand.flags.web.options).toBeDefined()
  expect(typeof TheCommand.flags.web).toBe('object')
  expect(TheCommand.flags.timeout.char).toBe('t')
  expect(typeof TheCommand.flags.timeout).toBe('object')
  expect(TheCommand.flags.memory.char).toBe('m')
  expect(typeof TheCommand.flags.memory).toBe('object')
  expect(TheCommand.flags.logsize.char).toBe('l')
  expect(typeof TheCommand.flags.logsize).toBe('object')
  expect(typeof TheCommand.flags.kind).toBe('object')
  expect(TheCommand.flags.annotation.multiple).toBe(true)
  expect(TheCommand.flags.annotation.char).toBe('a')
  expect(typeof TheCommand.flags.annotation).toBe('object')
  expect(TheCommand.flags['annotation-file'].char).toBe('A')
  expect(typeof TheCommand.flags['annotation-file']).toBe('object')
  expect(typeof TheCommand.flags.sequence).toBe('object')
})

test('args', async () => {
  const actionName = TheCommand.args[0]
  expect(actionName.name).toBeDefined()
  expect(actionName.name).toEqual('actionName')
  expect(actionName.required).toEqual(true)
  const actionPath = TheCommand.args[1]
  expect(actionPath.name).toBeDefined()
  expect(actionPath.name).toEqual('actionPath')
})

describe('instance methods', () => {
  let command, handleError

  beforeEach(() => {
    command = new TheCommand([])
    handleError = jest.spyOn(command, 'handleError')
  })

  beforeAll(() => {
    const json = {
      'action/parameters.json': fixtureFile('trigger/parameters.json'),
      'action/actionFile.js': fixtureFile('action/actionFile.js'),
      'action/zipAction.zip': 'fakezipfile'
    }
    fakeFileSystem.addJson(json)
  })

  afterAll(() => {
    // reset back to normal
    fakeFileSystem.reset()
  })

  describe('run', () => {
    const jsFile = fixtureFile('action/actionFile.js')
    ow.mockResolved('actions.client.options', '')
    test('exists', async () => {
      expect(command.run).toBeInstanceOf(Function)
    })

    test('updates an action with action name only', () => {
      const name = 'hello'
      const cmd = ow.mockResolved(owAction, '')
      command.argv = [name]
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({ name, action: { name } })
          expect(stdout.output).toMatch('')
        })
    })

    test('updates an action with action name and action path', () => {
      const name = 'hello'
      const cmd = ow.mockResolved(owAction, '')
      command.argv = [name, '/action/actionFile.js']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({ name, action: { name, exec: { code: jsFile, kind: 'nodejs:default' } } })
          expect(stdout.output).toMatch('')
        })
    })

    test('updates an action with action name and action path --json', () => {
      const name = 'hello'
      const cmd = ow.mockResolved(owAction, '')
      command.argv = [name, '/action/actionFile.js', '--json']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({ name, action: { name, exec: { code: jsFile, kind: 'nodejs:default' } } })
          expect(stdout.output).toMatch('')
        })
    })

    test('updates an action with action name and action path to zip file', () => {
      const name = 'hello'
      const zipFile = Buffer.from('fakezipfile').toString('base64')
      const cmd = ow.mockResolved(owAction, '')
      command.argv = [name, '/action/zipAction.zip', '--kind', 'nodejs:10']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({ name, action: { name, exec: { code: zipFile, kind: 'nodejs:10' } } })
          expect(stdout.output).toMatch('')
        })
    })

    test('updates an action with action name, action path and --param flag', () => {
      const name = 'hello'
      const cmd = ow.mockResolved(owAction, '')
      command.argv = [name, '/action/actionFile.js', '--param', 'a', 'b', '--param', 'c', 'd']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name,
            action: {
              name,
              exec: {
                code: jsFile,
                kind: 'nodejs:default'
              },
              parameters: createKeyValueArrayFromObject({ a: 'b', c: 'd' })
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('updates an action --param flag', () => {
      const name = 'hello'
      const cmd = ow.mockResolved(owAction, '')
      command.argv = [name, '--param', 'a', 'b', '--param', 'c', 'd']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name,
            action: {
              name,
              parameters: createKeyValueArrayFromObject({ a: 'b', c: 'd' })
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('updates an action with action name and --sequence flag', () => {
      const name = 'hello'
      const cmd = ow.mockResolved(owAction, '')
      ow.actions.client.options = { namespace: 'ns' }
      command.argv = [name, '--sequence', 'a,p/b,ns/p/c,/ns2/p/d,/ns3/e']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name,
            action: {
              name,
              exec: {
                kind: 'sequence',
                components: ['/_/a', '/_/p/b', '/ns/p/c', '/ns2/p/d', '/ns3/e']
              }
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('updates an action with action name, action path and --param-file flag', () => {
      const name = 'hello'
      const cmd = ow.mockResolved(owAction, '')
      command.argv = [name, '/action/actionFile.js', '--param-file', '/action/parameters.json']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name,
            action: {
              name,
              exec: {
                code: jsFile,
                kind: 'nodejs:default'
              },
              parameters: createKeyValueArrayFromObject({ param1: 'param1value', param2: 'param2value' })
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('updates an action with action name and --param-file flag', () => {
      const name = 'hello'
      const cmd = ow.mockResolved(owAction, '')
      command.argv = [name, '--param-file', '/action/parameters.json']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name,
            action: {
              name,
              parameters: createKeyValueArrayFromObject({ param1: 'param1value', param2: 'param2value' })
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('updates an action with action name, action path, --params flag and limits', () => {
      const name = 'hello'
      const cmd = ow.mockResolved(owAction, '')
      command.argv = [name, '/action/actionFile.js', '--param', 'a', 'b', '--param', 'c', 'd', '--logsize', '8', '--memory', '128', '--timeout', '20000']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name,
            action: {
              name,
              exec: {
                code: jsFile,
                kind: 'nodejs:default'
              },
              parameters: createKeyValueArrayFromObject({ a: 'b', c: 'd' }),
              limits: {
                logs: 8,
                memory: 128,
                timeout: 20000
              }
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('updates an action with action name, --params flag and limits', () => {
      const name = 'hello'
      const cmd = ow.mockResolved(owAction, '')
      command.argv = [name, '--param', 'a', 'b', '--param', 'c', 'd', '--logsize', '8', '--memory', '128', '--timeout', '20000']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name,
            action: {
              name,
              parameters: createKeyValueArrayFromObject({ a: 'b', c: 'd' }),
              limits: {
                logs: 8,
                memory: 128,
                timeout: 20000
              }
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('updates an action with action name, --params flag and limits with shorter flag version', () => {
      const name = 'hello'
      const cmd = ow.mockResolved(owAction, '')
      command.argv = [name, '-p', 'a', 'b', '-p', 'c', 'd', '-l', '8', '-m', '128', '-t', '20000']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name,
            action: {
              name,
              parameters: createKeyValueArrayFromObject({ a: 'b', c: 'd' }),
              limits: {
                logs: 8,
                memory: 128,
                timeout: 20000
              }
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('updates an action with action name, action path, --params flag, limits and kind', () => {
      const name = 'hello'
      const cmd = ow.mockResolved(owAction, '')
      command.argv = [name, '/action/actionFile.js', '--param', 'a', 'b', '--param', 'c', 'd', '--logsize', '8', '--memory', '128', '--kind', 'nodejs:10']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name,
            action: {
              name,
              exec: {
                code: jsFile,
                kind: 'nodejs:10'
              },
              parameters: createKeyValueArrayFromObject({ a: 'b', c: 'd' }),
              limits: {
                logs: 8,
                memory: 128
              }
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('updates an action with action name, --params flag, limits', () => {
      const name = 'hello'
      const cmd = ow.mockResolved(owAction, '')
      command.argv = [name, '--param', 'a', 'b', '--param', 'c', 'd', '--logsize', '8', '--memory', '128']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name,
            action: {
              name,
              parameters: createKeyValueArrayFromObject({ a: 'b', c: 'd' }),
              limits: {
                logs: 8,
                memory: 128
              }
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('updates an action with action name and log limits', () => {
      const name = 'hello'
      const cmd = ow.mockResolved(owAction, '')
      command.argv = [name, '--logsize', '8']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name,
            action: {
              name,
              limits: {
                logs: 8
              }
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('updates an action with action name and memory limits', () => {
      const name = 'hello'
      const cmd = ow.mockResolved(owAction, '')
      command.argv = [name, '--memory', '128']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name,
            action: {
              name,
              limits: {
                memory: 128
              }
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('updates an action with action name and timeout limits', () => {
      const name = 'hello'
      const cmd = ow.mockResolved(owAction, '')
      command.argv = [name, '--timeout', '20000']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name,
            action: {
              name,
              limits: {
                timeout: 20000
              }
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('updates an action with action name, action path, --params flag and annotation flag', () => {
      const name = 'hello'
      const cmd = ow.mockResolved(owAction, '')
      command.argv = [name, '/action/actionFile.js', '--param', 'a', 'b', '--param', 'c', 'd', '--annotation', 'desc', 'Description']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name,
            action: {
              name,
              exec: {
                code: jsFile,
                kind: 'nodejs:default'
              },
              parameters: createKeyValueArrayFromObject({ a: 'b', c: 'd' }),
              annotations: createKeyValueArrayFromObject({ desc: 'Description' })
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('updates an action with action name, --params flag and annotation flag', () => {
      const name = 'hello'
      const cmd = ow.mockResolved(owAction, '')
      command.argv = [name, '--param', 'a', 'b', '--param', 'c', 'd', '--annotation', 'desc', 'Description']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name,
            action: {
              name,
              parameters: createKeyValueArrayFromObject({ a: 'b', c: 'd' }),
              annotations: createKeyValueArrayFromObject({ desc: 'Description' })
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('updates an action with action name, annotation flag', () => {
      const name = 'hello'
      const cmd = ow.mockResolved(owAction, '')
      command.argv = [name, '--annotation', 'desc', 'Description']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name,
            action: {
              name,
              annotations: createKeyValueArrayFromObject({ desc: 'Description' })
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('updates an action with action name, action path, --params flag and annotation-file flag', () => {
      const name = 'hello'
      const cmd = ow.mockResolved(owAction, '')
      command.argv = [name, '/action/actionFile.js', '-p', 'a', 'b', '-p', 'c', 'd', '-A', '/action/parameters.json']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name,
            action: {
              name,
              exec: {
                code: jsFile,
                kind: 'nodejs:default'
              },
              parameters: createKeyValueArrayFromObject({ a: 'b', c: 'd' }),
              annotations: createKeyValueArrayFromObject({ param1: 'param1value', param2: 'param2value' })
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('updates an action with action name, --params flag and annotation-file flag', () => {
      const name = 'hello'
      const cmd = ow.mockResolved(owAction, '')
      command.argv = [name, '-p', 'a', 'b', '-p', 'c', 'd', '-A', '/action/parameters.json']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name,
            action: {
              name,
              parameters: createKeyValueArrayFromObject({ a: 'b', c: 'd' }),
              annotations: createKeyValueArrayFromObject({ param1: 'param1value', param2: 'param2value' })
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('updates an action with action name and annotation-file flag', () => {
      const name = 'hello'
      const cmd = ow.mockResolved(owAction, '')
      command.argv = [name, '-A', '/action/parameters.json']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name,
            action: {
              name,
              annotations: createKeyValueArrayFromObject({ param1: 'param1value', param2: 'param2value' })
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('updates an action with action name, action path, --params flag and web flag as raw', () => {
      const name = 'hello'
      const cmd = ow.mockResolved(owAction, '')
      command.argv = [name, '/action/actionFile.js', '-p', 'a', 'b', '-p', 'c', 'd', '--web', 'raw']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name,
            action: {
              name,
              exec: {
                code: jsFile,
                kind: 'nodejs:default'
              },
              parameters: createKeyValueArrayFromObject({ a: 'b', c: 'd' }),
              annotations: createKeyValueArrayFromObject({ 'web-export': true, 'raw-http': true })
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('updates an action with action name, action path, --params flag and web flag as false', () => {
      const name = 'hello'
      const cmd = ow.mockResolved(owAction, '')
      command.argv = [name, '/action/actionFile.js', '-p', 'a', 'b', '-p', 'c', 'd', '--web', 'false']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name,
            action: {
              name,
              exec: {
                code: jsFile,
                kind: 'nodejs:default'
              },
              parameters: createKeyValueArrayFromObject({ a: 'b', c: 'd' }),
              annotations: createKeyValueArrayFromObject({ 'web-export': false })
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('updates an action with action name, action path, --params flag, annotations and web flag as true', () => {
      const name = 'hello'
      const cmd = ow.mockResolved(owAction, '')
      command.argv = [name, '/action/actionFile.js', '-p', 'a', 'b', '-p', 'c', 'd', '-a', 'desc', 'Description', '--web', 'true']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name,
            action: {
              name,
              exec: {
                code: jsFile,
                kind: 'nodejs:default'
              },
              parameters: createKeyValueArrayFromObject({ a: 'b', c: 'd' }),
              annotations: createKeyValueArrayFromObject({ desc: 'Description', 'web-export': true })
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('tests for incorrect --param flags', () => {
      return new Promise((resolve, reject) => {
        ow.mockRejected(owAction, '')
        command.argv = ['hello', '/action/actionFile.js', '--param', 'a', 'b', 'c']
        return command.run()
          .then(() => reject(new Error('does not throw error')))
          .catch(() => {
            expect(handleError).toHaveBeenLastCalledWith('failed to update the action', new Error('Please provide correct values for flags'))
            resolve()
          })
      })
    })

    test('tests for incorrect --annotation flags', () => {
      return new Promise((resolve, reject) => {
        ow.mockRejected(owAction, '')
        command.argv = ['hello', '/action/actionFile.js', '--annotation', 'a', 'b', 'c']
        return command.run()
          .then(() => reject(new Error('does not throw error')))
          .catch(() => {
            expect(handleError).toHaveBeenLastCalledWith('failed to update the action', new Error('Please provide correct values for flags'))
            resolve()
          })
      })
    })

    test('tests for incorrect --sequence flags', () => {
      return new Promise((resolve, reject) => {
        ow.mockRejected(owAction, '')
        command.argv = ['hello', '--sequence', ' ,a,b,c']
        return command.run()
          .then(() => reject(new Error('does not throw error')))
          .catch(() => {
            expect(handleError).toHaveBeenLastCalledWith('failed to update the action', new Error('Provide a valid sequence component'))
            resolve()
          })
      })
    })

    test('tests for incorrect action with --kind', () => {
      return new Promise((resolve, reject) => {
        ow.mockRejected(owAction, '')
        command.argv = ['hello', '--kind', 'nodejs:10']
        return command.run()
          .then(() => reject(new Error('does not throw error')))
          .catch(() => {
            expect(handleError).toHaveBeenLastCalledWith('failed to update the action', new Error('A kind can only be specified when you provide a code artifact'))
            resolve()
          })
      })
    })

    test('tests for incorrect action path', () => {
      return new Promise((resolve, reject) => {
        ow.mockRejected(owAction, '')
        command.argv = ['hello', '/action/file.js', '--kind', 'nodejs:10']
        return command.run()
          .then(() => reject(new Error('does not throw error')))
          .catch(() => {
            expect(handleError).toHaveBeenLastCalledWith('failed to update the action', new Error('Provide a valid path for ACTION'))
            resolve()
          })
      })
    })

    test('tests for incorrect action zip path', () => {
      return new Promise((resolve, reject) => {
        ow.mockRejected(owAction, '')
        command.argv = ['hello', '/action/file.zip', '--kind', 'nodejs:10']
        return command.run()
          .then(() => reject(new Error('does not throw error')))
          .catch(() => {
            expect(handleError).toHaveBeenLastCalledWith('failed to update the action', new Error('Provide a valid path for ACTION'))
            resolve()
          })
      })
    })

    test('error out if a zip file is deployed without the --kind flag', () => {
      return new Promise((resolve, reject) => {
        ow.mockRejected(owAction, '')
        command.argv = ['hello', '/action/zipAction.zip']
        return command.run()
          .then(() => reject(new Error('does not throw error')))
          .catch(() => {
            expect(handleError).toHaveBeenLastCalledWith('failed to update the action', new Error('Invalid argument(s). creating an action from a .zip artifact requires specifying the action kind explicitly'))
            resolve()
          })
      })
    })

    test('tests for incorrect update with --main flag', () => {
      return new Promise((resolve, reject) => {
        ow.mockRejected(owAction, '')
        command.argv = ['hello', '--main', 'maynard']
        return command.run()
          .then(() => reject(new Error('does not throw error')))
          .catch(() => {
            expect(handleError).toHaveBeenLastCalledWith('failed to update the action', new Error('The function handler can only be specified when you provide a code artifact'))
            resolve()
          })
      })
    })

    test('tests for incorrect update with --main flag and --sequence', () => {
      return new Promise((resolve, reject) => {
        ow.mockRejected(owAction, '')
        command.argv = ['hello', '--main', 'maynard', '--sequence', 'a,b,c']
        return command.run()
          .then(() => reject(new Error('does not throw error')))
          .catch(() => {
            expect(handleError).toHaveBeenLastCalledWith('failed to update the action', new Error('The function handler can only be specified when you provide a code artifact'))
            resolve()
          })
      })
    })

    test('tests for incorrect update with file artifact and --sequence', () => {
      return new Promise((resolve, reject) => {
        ow.mockRejected(owAction, '')
        command.argv = ['hello', '/action/actionFile.js', '--sequence', 'a,b,c']
        command.run()
          .then(() => reject(new Error('does not throw error')))
          .catch(() => {
            expect(handleError).toHaveBeenLastCalledWith('failed to update the action', new Error('Cannot specify sequence and a code artifact at the same time'))
            resolve()
          })
      })
    })

    test('tests for incorrect update with file artifact and --sequence and --main', () => {
      return new Promise((resolve, reject) => {
        ow.mockRejected(owAction, '')
        command.argv = ['hello', '/action/actionFile.js', '--main', 'maynard', '--sequence', 'a,b,c']
        command.run()
          .then(() => reject(new Error('does not throw error')))
          .catch(() => {
            expect(handleError).toHaveBeenLastCalledWith('failed to update the action', new Error('Cannot specify sequence and a code artifact at the same time'))
            resolve()
          })
      })
    })

    test('errors out on api error', () => {
      return new Promise((resolve, reject) => {
        ow.mockRejected(owAction, new Error('an error'))
        command.argv = ['hello', '/action/actionFile.js']
        return command.run()
          .then(() => reject(new Error('does not throw error')))
          .catch(() => {
            expect(handleError).toHaveBeenLastCalledWith('failed to update the action', new Error('an error'))
            resolve()
          })
      })
    })
  })
})
