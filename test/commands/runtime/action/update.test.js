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

    test('updates an action with action name and action path', () => {
      const cmd = ow.mockResolved(owAction, '')
      command.argv = ['hello', '/action/actionFile.js']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({ name: 'hello', action: jsFile, annotations: {}, limits: {}, params: {} })
          expect(stdout.output).toMatch('')
        })
    })

    test('updates an action with action name and action path --json', () => {
      const cmd = ow.mockResolved(owAction, '')
      command.argv = ['hello', '/action/actionFile.js', '--json']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({ name: 'hello', action: jsFile, annotations: {}, limits: {}, params: {} })
          expect(stdout.output).toMatch('')
        })
    })

    test('updates an action with action name and action path to zip file', () => {
      const zipFile = Buffer.from('fakezipfile')
      const cmd = ow.mockResolved(owAction, '')
      command.argv = ['hello', '/action/zipAction.zip', '--kind', 'nodejs:10']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({ name: 'hello', action: zipFile, annotations: {}, kind: 'nodejs:10', limits: {}, params: {} })
          expect(stdout.output).toMatch('')
        })
    })

    test('updates an action with action name, action path and --param flag', () => {
      const cmd = ow.mockResolved(owAction, '')
      command.argv = ['hello', '/action/actionFile.js', '--param', 'a', 'b', '--param', 'c', 'd']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name: 'hello',
            params: { a: 'b', c: 'd' },
            action: jsFile,
            annotations: {},
            limits: {}
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('updates an action with action name and --sequence flag', () => {
      const cmd = ow.mockResolved(owAction, '')
      ow.actions.client.options = { namespace: 'ns' }
      command.argv = ['hello', '--sequence', 'a,b,c']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name: 'hello',
            action: '',
            annotations: {},
            limits: {},
            params: {},
            exec: {
              kind: 'sequence',
              components: ['/ns/a', '/ns/b', '/ns/c']
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('updates an action with --main flag', () => {
      const cmd = ow.mockResolved(owAction, '')
      command.argv = ['hello', '/action/actionFile.js', '--main', 'maynard']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name: 'hello',
            exec: { main: 'maynard' },
            params: {},
            action: jsFile,
            annotations: {},
            limits: {}
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('update an action with --main flag and --sequence', () => {
      const cmd = ow.mockResolved(owAction, '')
      command.argv = ['hello', '/action/actionFile.js', '--main', 'maynard', '--sequence', 'a,b,c']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name: 'hello',
            exec: {
              main: 'maynard',
              kind: 'sequence',
              components: ['/ns/a', '/ns/b', '/ns/c']
            },
            params: {},
            action: jsFile,
            annotations: {},
            limits: {}
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('updates an action with action name, action path and --param-file flag', () => {
      const cmd = ow.mockResolved(owAction, '')
      command.argv = ['hello', '/action/actionFile.js', '--param-file', '/action/parameters.json']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name: 'hello',
            params: { param1: 'param1value', param2: 'param2value' },
            action: jsFile,
            annotations: {},
            limits: {}
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('updates an action with action name, action path, --params flag and limits', () => {
      const cmd = ow.mockResolved(owAction, '')
      command.argv = ['hello', '/action/actionFile.js', '--param', 'a', 'b', '--param', 'c', 'd', '--logsize', '8', '--memory', '128', '--timeout', '20000']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name: 'hello',
            params: { a: 'b', c: 'd' },
            action: jsFile,
            annotations: {},
            limits: {
              logs: 8,
              memory: 128,
              timeout: 20000
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('updates an action with action name, action path, --params flag and limits with shorter flag version', () => {
      const cmd = ow.mockResolved(owAction, '')
      command.argv = ['hello', '/action/actionFile.js', '-p', 'a', 'b', '-p', 'c', 'd', '-l', '8', '-m', '128', '-t', '20000']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name: 'hello',
            params: { a: 'b', c: 'd' },
            action: jsFile,
            annotations: {},
            limits: {
              logs: 8,
              memory: 128,
              timeout: 20000
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('updates an action with action name, action path, --params flag ,limits and kind ', () => {
      const cmd = ow.mockResolved(owAction, '')
      command.argv = ['hello', '/action/actionFile.js', '--param', 'a', 'b', '--param', 'c', 'd', '--logsize', '8', '--memory', '128', '--kind', 'nodejs:default']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name: 'hello',
            params: { a: 'b', c: 'd' },
            action: jsFile,
            annotations: {},
            kind: 'nodejs:default',
            limits: {
              logs: 8,
              memory: 128
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('updates an action with action name, action path, --params flag and annotation flag ', () => {
      const cmd = ow.mockResolved(owAction, '')
      command.argv = ['hello', '/action/actionFile.js', '--param', 'a', 'b', '--param', 'c', 'd', '--annotation', 'desc', 'Description']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name: 'hello',
            params: { a: 'b', c: 'd' },
            action: jsFile,
            annotations: {
              desc: 'Description'
            },
            limits: {}
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('updates an action with action name, action path, --params flag and annotation-file flag ', () => {
      const cmd = ow.mockResolved(owAction, '')
      command.argv = ['hello', '/action/actionFile.js', '-p', 'a', 'b', '-p', 'c', 'd', '-A', '/action/parameters.json']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name: 'hello',
            params: { a: 'b', c: 'd' },
            action: jsFile,
            annotations: {
              param1: 'param1value',
              param2: 'param2value'
            },
            limits: {}
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('updates an action with action name, action path, --params flag and web flag as raw ', () => {
      const cmd = ow.mockResolved(owAction, '')
      command.argv = ['hello', '/action/actionFile.js', '-p', 'a', 'b', '-p', 'c', 'd', '--web', 'raw']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name: 'hello',
            params: { a: 'b', c: 'd' },
            action: jsFile,
            annotations: {
              'web-export': true,
              'raw-http': true
            },
            limits: {}
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('updates an action with action name, action path, --params flag and web flag as false ', () => {
      const cmd = ow.mockResolved(owAction, '')
      command.argv = ['hello', '/action/actionFile.js', '-p', 'a', 'b', '-p', 'c', 'd', '--web', 'false']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name: 'hello',
            params: { a: 'b', c: 'd' },
            action: jsFile,
            annotations: {
              'web-export': false
            },
            limits: {}
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('updates an action with action name, action path, --params flag, annotations and web flag as true ', () => {
      const cmd = ow.mockResolved(owAction, '')
      command.argv = ['hello', '/action/actionFile.js', '-p', 'a', 'b', '-p', 'c', 'd', '-a', 'desc', 'Description', '--web', 'true']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name: 'hello',
            params: { a: 'b', c: 'd' },
            action: jsFile,
            annotations: {
              'web-export': true,
              desc: 'Description'
            },
            limits: {}
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('tests for incorrect --param flags', (done) => {
      ow.mockRejected(owAction, '')
      command.argv = ['hello', '/action/actionFile.js', '--param', 'a', 'b', 'c']
      return command.run()
        .then(() => done.fail('does not throw error'))
        .catch(() => {
          expect(handleError).toHaveBeenLastCalledWith('failed to update the action', new Error('Please provide correct values for flags'))
          done()
        })
    })

    test('tests for incorrect --annotation flags', (done) => {
      ow.mockRejected(owAction, '')
      command.argv = ['hello', '/action/actionFile.js', '--annotation', 'a', 'b', 'c']
      return command.run()
        .then(() => done.fail('does not throw error'))
        .catch(() => {
          expect(handleError).toHaveBeenLastCalledWith('failed to update the action', new Error('Please provide correct values for flags'))
          done()
        })
    })

    test('tests for incorrect --sequence flags', (done) => {
      ow.mockRejected(owAction, '')
      command.argv = ['hello', '--sequence', ' ,a,b,c']
      return command.run()
        .then(() => done.fail('does not throw error'))
        .catch(() => {
          expect(handleError).toHaveBeenLastCalledWith('failed to update the action', new Error('Provide a valid sequence component'))
          done()
        })
    })

    test('tests for incorrect action path', (done) => {
      ow.mockRejected(owAction, '')
      command.argv = ['hello', '/action/file.js', '--kind', 'nodejs:10']
      return command.run()
        .then(() => done.fail('does not throw error'))
        .catch(() => {
          expect(handleError).toHaveBeenLastCalledWith('failed to update the action', new Error('Provide a valid path for ACTION'))
          done()
        })
    })

    test('tests for incorrect action zip path', (done) => {
      ow.mockRejected(owAction, '')
      command.argv = ['hello', '/action/file.zip', '--kind', 'nodejs:10']
      return command.run()
        .then(() => done.fail('does not throw error'))
        .catch(() => {
          expect(handleError).toHaveBeenLastCalledWith('failed to update the action', new Error('Provide a valid path for ACTION'))
          done()
        })
    })

    test('error out if a zip file is deployed without the --kind flag', (done) => {
      ow.mockRejected(owAction, '')
      command.argv = ['hello', '/action/zipAction.zip']
      return command.run()
        .then(() => done.fail('does not throw error'))
        .catch(() => {
          expect(handleError).toHaveBeenLastCalledWith('failed to update the action', new Error('Invalid argument(s). creating an action from a .zip artifact requires specifying the action kind explicitly'))
          done()
        })
    })

    test('errors out on api error', (done) => {
      ow.mockRejected(owAction, new Error('an error'))
      command.argv = ['hello', '/action/actionFile.js']
      return command.run()
        .then(() => done.fail('does not throw error'))
        .catch(() => {
          expect(handleError).toHaveBeenLastCalledWith('failed to update the action', new Error('an error'))
          done()
        })
    })
  })
})
