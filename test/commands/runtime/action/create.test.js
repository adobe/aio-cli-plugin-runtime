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
const TheCommand = require('../../../../src/commands/runtime/action/create.js')
const RuntimeBaseCommand = require('../../../../src/RuntimeBaseCommand.js')
const RuntimeLib = require('@adobe/aio-lib-runtime')
const rtUtils = RuntimeLib.utils
const rtAction = 'actions.create'

test('exports', async () => {
  expect(typeof TheCommand).toEqual('function')
  expect(TheCommand.prototype instanceof RuntimeBaseCommand).toBeTruthy()
})

test('description', async () => {
  expect(TheCommand.description).toBeDefined()
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

test('aliases', async () => {
  expect(TheCommand.aliases).toBeDefined()
  expect(TheCommand.aliases).toBeInstanceOf(Array)
  expect(TheCommand.aliases.length).toBeGreaterThan(0)
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

  beforeAll(() => {
    const json = {
      'action/actionFile.js': fixtureFile('action/actionFile.js'),
      'action/zipAction.zip': 'fakezipfile',
      'action/zipAction.bin': 'fakezipfile',
      'action/fileWithNoExt': 'fakefile'
    }
    fakeFileSystem.addJson(json)
  })

  afterAll(() => {
    // reset back to normal
    fakeFileSystem.reset()
  })

  describe('run', () => {
    const jsFile = fixtureFile('action/actionFile.js')
    test('exists', async () => {
      expect(command.run).toBeInstanceOf(Function)
    })

    test('creates an action with action name and action path', () => {
      const name = 'hello'
      const cmd = rtLib.mockResolved(rtAction, { res: 'fake' })
      command.argv = [name, '/action/actionFile.js']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({ name, action: { name, exec: { code: jsFile, kind: 'nodejs:default' } } })
          expect(stdout.output).toMatch('')
        })
    })

    test('creates an action with action name and --sequence flag', () => {
      const name = 'hello'
      const cmd = rtLib.mockResolved(rtAction, { res: 'fake' })
      command.argv = [name, '--sequence', 'a,p/b,ns/p/c,/ns2/p/d,/ns3/e']
      rtUtils.createComponentsfromSequence.mockReturnValue({ fake: 'value' })
      return command.run()
        .then(() => {
          expect(rtUtils.createComponentsfromSequence).toHaveBeenCalledWith(['a', 'p/b', 'ns/p/c', '/ns2/p/d', '/ns3/e'])
          expect(cmd).toHaveBeenCalledWith({
            action: {
              exec: { fake: 'value' },
              name },
            name })
          expect(stdout.output).toMatch('')
        })
    })

    test('creates an action with action name and --docker flag', () => {
      const name = 'hello'
      const cmd = rtLib.mockResolved(rtAction, { res: 'fake' })
      command.argv = [name, '--docker', 'some-image']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name,
            action: {
              name,
              exec: {
                kind: 'blackbox',
                image: 'some-image'
              }
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('creates an action with action name and action path and --docker flag', () => {
      const name = 'hello'
      const cmd = rtLib.mockResolved(rtAction, { res: 'fake' })
      command.argv = [name, '/action/actionFile.js', '--docker', 'some-image']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name,
            action: {
              name,
              exec: {
                code: jsFile,
                kind: 'blackbox',
                image: 'some-image'
              }
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('creates an action with action name and action path --json', () => {
      const name = 'hello'
      const cmd = rtLib.mockResolved(rtAction, { res: 'fake' })
      command.argv = [name, '/action/actionFile.js', '--json']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name,
            action: {
              name,
              exec: {
                code: jsFile,
                kind: 'nodejs:default'
              }
            }
          })
          expect(stdout.output).toMatch('') // TODO: json version
        })
    })

    test('creates an action with action name and action path to zip file', () => {
      const name = 'hello'
      const zipFile = Buffer.from('fakezipfile').toString('base64')
      const cmd = rtLib.mockResolved(rtAction, { res: 'fake' })
      command.argv = [name, '/action/zipAction.zip', '--kind', 'nodejs:8']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name,
            action: {
              name,
              exec: {
                code: zipFile,
                kind: 'nodejs:8'
              }
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('creates an action with action name and action path to binary file', () => {
      const name = 'hello'
      const zipFile = Buffer.from('fakezipfile').toString('base64')
      const cmd = rtLib.mockResolved(rtAction, { res: 'fake' })
      command.argv = [name, '/action/zipAction.bin', '--kind', 'nodejs:8', '--binary']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name,
            action: {
              name,
              exec: {
                code: zipFile,
                kind: 'nodejs:8'
              }
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('creates an action with action name, action path and --param flag', () => {
      const name = 'hello'
      const cmd = rtLib.mockResolved(rtAction, { res: 'fake' })
      command.argv = [name, '/action/actionFile.js', '--param', 'a', 'b', '--param', 'c', 'd']
      rtUtils.getKeyValueArrayFromMergedParameters.mockImplementation(params => params && [{ key: 'fakeParam', value: 'aaa' }, { key: 'fakeParam2', value: 'bbb' }])
      return command.run()
        .then(() => {
          expect(rtUtils.getKeyValueArrayFromMergedParameters).toHaveBeenCalledWith(['a', 'b', 'c', 'd'], undefined)
          expect(cmd).toHaveBeenCalledWith({
            action: {
              exec: {
                code: jsFile, kind: 'nodejs:default' },
              name,
              parameters: [{ key: 'fakeParam', value: 'aaa' }, { key: 'fakeParam2', value: 'bbb' }] },
            name })
          expect(stdout.output).toMatch('')
        })
    })

    test('creates an action with action name, action path and --param-file flag', () => {
      const name = 'hello'
      const cmd = rtLib.mockResolved(rtAction, { res: 'fake' })
      rtUtils.getKeyValueArrayFromMergedParameters.mockImplementation((flags, file) => file && [{ key: 'fakeParam', value: 'aaa' }, { key: 'fakeParam2', value: 'bbb' }])
      command.argv = [name, '/action/actionFile.js', '--param-file', '/action/parameters.json']
      return command.run()
        .then(() => {
          expect(rtUtils.getKeyValueArrayFromMergedParameters).toHaveBeenCalledWith(undefined, '/action/parameters.json')
          expect(cmd).toHaveBeenCalledWith({
            action: {
              exec: {
                code: jsFile, kind: 'nodejs:default' },
              name,
              parameters: [{ key: 'fakeParam', value: 'aaa' }, { key: 'fakeParam2', value: 'bbb' }] },
            name })
          expect(stdout.output).toMatch('')
        })
    })

    test('creates an action with action name, action path, --param-file and param flag (precedence)', () => {
      const name = 'hello'
      const cmd = rtLib.mockResolved(rtAction, '')
      command.argv = [name, '/action/actionFile.js', '--param', 'param1', 'fromcmdline1', '--param', 'cmdparam', 'fromcmdline2', '--param-file', '/action/parameters.json']
      rtUtils.getKeyValueArrayFromMergedParameters.mockImplementation((flags, file) => flags && file && [{ key: 'fakeParam', value: 'aaa' }, { key: 'fakeParam2', value: 'bbb' }])

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
              parameters: [{ key: 'fakeParam', value: 'aaa' }, { key: 'fakeParam2', value: 'bbb' }]
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('creates an action with action name, action path, --params flag and limits', () => {
      const name = 'hello'
      const cmd = rtLib.mockResolved(rtAction, { res: 'fake' })
      command.argv = [name, '/action/actionFile.js', '--param', 'a', 'b', '--param', 'c', 'd', '--logsize', '8', '--memory', '128', '--timeout', '20000']
      rtUtils.getKeyValueArrayFromMergedParameters.mockImplementation((flags, file) => flags && [{ key: 'fakeParam', value: 'aaa' }, { key: 'fakeParam2', value: 'bbb' }])
      return command.run()
        .then(() => {
          expect(rtUtils.getKeyValueArrayFromMergedParameters).toHaveBeenCalledWith(['a', 'b', 'c', 'd'], undefined)
          expect(cmd).toHaveBeenCalledWith({
            name,
            action: {
              name,
              exec: {
                code: jsFile,
                kind: 'nodejs:default'
              },
              parameters: [
                { key: 'fakeParam', value: 'aaa' },
                { key: 'fakeParam2', value: 'bbb' }
              ],
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

    test('creates an action with action name, action path, --params flag and limits with shorter flag version', () => {
      const name = 'hello'
      const cmd = rtLib.mockResolved(rtAction, { res: 'fake' })
      command.argv = [name, '/action/actionFile.js', '-p', 'a', 'b', '-p', 'c', 'd', '-l', '8', '-m', '128', '-t', '20000']
      rtUtils.getKeyValueArrayFromMergedParameters.mockImplementation((flags, file) => flags && [{ key: 'fakeParam', value: 'aaa' }, { key: 'fakeParam2', value: 'bbb' }])
      return command.run()
        .then(() => {
          expect(rtUtils.getKeyValueArrayFromMergedParameters).toHaveBeenCalledWith(['a', 'b', 'c', 'd'], undefined)
          expect(cmd).toHaveBeenCalledWith({
            name,
            action: {
              name,
              exec: {
                code: jsFile,
                kind: 'nodejs:default'
              },
              parameters: [
                { key: 'fakeParam', value: 'aaa' },
                { key: 'fakeParam2', value: 'bbb' }
              ],
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

    test('creates an action with action name, action path, --params flag, limits and kind', () => {
      const name = 'hello'
      const cmd = rtLib.mockResolved(rtAction, { res: 'fake' })
      command.argv = [name, '/action/actionFile.js', '--param', 'a', 'b', '--param', 'c', 'd', '--logsize', '8', '--memory', '128', '--kind', 'nodejs:10']
      rtUtils.getKeyValueArrayFromMergedParameters.mockImplementation((flags, file) => flags && ([{ key: 'fakeParam', value: 'aaa' }, { key: 'fakeParam2', value: 'bbb' }]))
      return command.run()
        .then(() => {
          expect(rtUtils.getKeyValueArrayFromMergedParameters).toHaveBeenCalledWith(['a', 'b', 'c', 'd'], undefined)
          expect(cmd).toHaveBeenCalledWith({
            name,
            action: {
              name,
              exec: {
                code: jsFile,
                kind: 'nodejs:10'
              },
              parameters: [
                { key: 'fakeParam', value: 'aaa' },
                { key: 'fakeParam2', value: 'bbb' }
              ],
              limits: {
                logs: 8,
                memory: 128
              }
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('creates an action with action name, action path and --env flag', () => {
      const name = 'hello'
      const cmd = rtLib.mockResolved(rtAction, { res: 'fake' })
      command.argv = [name, '/action/actionFile.js', '--env', 'a', 'b', '--env', 'c', 'd']
      rtUtils.createKeyValueArrayFromFlag.mockReturnValue([{ key: 'fakeEnv', value: 'abc' }])
      return command.run()
        .then(() => {
          expect(rtUtils.createKeyValueArrayFromFlag).toHaveBeenCalledWith(['a', 'b', 'c', 'd'])
          expect(cmd).toHaveBeenCalledWith({
            name,
            action: {
              name,
              exec: {
                code: jsFile,
                kind: 'nodejs:default'
              },
              parameters: [{
                key: 'fakeEnv',
                value: 'abc',
                init: true
              }]
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('creates an action with action name, action path and --e flag', () => {
      const name = 'hello'
      const cmd = rtLib.mockResolved(rtAction, { res: 'fake' })
      command.argv = [name, '/action/actionFile.js', '--env', 'a', 'b', '-e', 'c', 'd']
      rtUtils.createKeyValueArrayFromFlag.mockReturnValue([{ key: 'fakeEnv', value: 'abc' }])
      return command.run()
        .then(() => {
          expect(rtUtils.createKeyValueArrayFromFlag).toHaveBeenCalledWith(['a', 'b', 'c', 'd'])
          expect(cmd).toHaveBeenCalledWith({
            name,
            action: {
              name,
              exec: {
                code: jsFile,
                kind: 'nodejs:default'
              },
              parameters: [{
                key: 'fakeEnv',
                value: 'abc',
                init: true
              }]
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('creates an action with action name, action path and --env and --param flag', () => {
      const name = 'hello'
      const cmd = rtLib.mockResolved(rtAction, { res: 'fake' })
      command.argv = [name, '/action/actionFile.js', '--env', 'a', 'b', '--param', 'c', 'd']
      rtUtils.getKeyValueArrayFromMergedParameters.mockImplementation((flags, file) => flags && [{ key: 'fakeParam', value: 'aaa' }, { key: 'fakeParam2', value: 'bbb' }])
      rtUtils.createKeyValueArrayFromFlag.mockReturnValue([{ key: 'fakeEnv', value: 'abc' }])
      return command.run()
        .then(() => {
          expect(rtUtils.getKeyValueArrayFromMergedParameters).toHaveBeenCalledWith(['c', 'd'], undefined)
          expect(rtUtils.createKeyValueArrayFromFlag).toHaveBeenCalledWith(['a', 'b'])
          expect(cmd).toHaveBeenCalledWith({
            name,
            action: {
              name,
              exec: {
                code: jsFile,
                kind: 'nodejs:default'
              },
              parameters: [
                { key: 'fakeParam', value: 'aaa' },
                { key: 'fakeParam2', value: 'bbb' },
                { key: 'fakeEnv', value: 'abc', init: true }
              ]
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('creates an action with action name, action path and overlapping --env and --param keys', () => {
      return new Promise((resolve, reject) => {
        rtLib.mockRejected(rtAction, '')
        const name = 'hello'
        command.argv = [name, '/action/actionFile.js', '--env', 'a', 'b', '--param', 'a', 'd']
        rtUtils.getKeyValueArrayFromMergedParameters.mockImplementation((flags, file) => flags && [{ key: 'same', value: 'kv' }])
        rtUtils.createKeyValueArrayFromFlag.mockReturnValue([{ key: 'same', value: 'abc' }])
        return command.run()
          .then(() => reject(new Error('does not throw error')))
          .catch(() => {
            expect(handleError).toHaveBeenLastCalledWith('failed to create the action', new Error('Invalid argument(s). Environment variables and function parameters may not overlap'))
            resolve()
          })
      })
    })

    test('creates an action with action name, action path and --env-file flag', () => {
      const name = 'hello'
      const cmd = rtLib.mockResolved(rtAction, { res: 'fake' })
      command.argv = [name, '/action/actionFile.js', '--env-file', '/action/parameters.json']
      rtUtils.createKeyValueArrayFromFile.mockReturnValue([{ key: 'fakeEnv', value: 'abc' }])
      return command.run()
        .then(() => {
          expect(rtUtils.createKeyValueArrayFromFile).toHaveBeenCalledWith('/action/parameters.json')
          expect(cmd).toHaveBeenCalledWith({
            name,
            action: {
              name,
              exec: {
                code: jsFile,
                kind: 'nodejs:default'
              },
              parameters: [{
                key: 'fakeEnv',
                value: 'abc',
                init: true
              }]
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('creates an action with action name, action path, --params flag and annotation flag', () => {
      const name = 'hello'
      const cmd = rtLib.mockResolved(rtAction, { res: 'fake' })
      command.argv = [name, '/action/actionFile.js', '--param', 'a', 'b', '--param', 'c', 'd', '--annotation', 'desc', 'Description']
      rtUtils.getKeyValueArrayFromMergedParameters.mockImplementation((flags, file) => [{ key: 'fake', value: 'abc' }])
      return command.run()
        .then(() => {
          expect(rtUtils.getKeyValueArrayFromMergedParameters).toHaveBeenCalledWith(['a', 'b', 'c', 'd'], undefined)
          expect(rtUtils.getKeyValueArrayFromMergedParameters).toHaveBeenCalledWith(['desc', 'Description'], undefined)
          expect(cmd).toHaveBeenCalledWith({
            name,
            action: {
              name,
              exec: {
                code: jsFile,
                kind: 'nodejs:default'
              },
              parameters: [{
                key: 'fake',
                value: 'abc'
              }],
              annotations: [{
                key: 'fake',
                value: 'abc'
              }]
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('creates an action with action name, action path, --params flag and annotation-file flag', () => {
      const name = 'hello'
      const cmd = rtLib.mockResolved(rtAction, { res: 'fake' })
      command.argv = [name, '/action/actionFile.js', '-p', 'a', 'b', '-p', 'c', 'd', '-A', '/action/parameters.json']
      rtUtils.getKeyValueArrayFromMergedParameters.mockImplementation((flags, file) => (flags && [{ key: 'fake', value: 'abc' }]) || (file && [{ key: 'fakeAnno', value: 'tation' }]))
      return command.run()
        .then(() => {
          expect(rtUtils.getKeyValueArrayFromMergedParameters).toHaveBeenCalledWith(['a', 'b', 'c', 'd'], undefined)
          expect(rtUtils.getKeyValueArrayFromMergedParameters).toHaveBeenCalledWith(undefined, '/action/parameters.json')
          expect(cmd).toHaveBeenCalledWith({
            name,
            action: {
              name,
              exec: {
                code: jsFile,
                kind: 'nodejs:default'
              },
              parameters: [{
                key: 'fake',
                value: 'abc'
              }],
              annotations: [{
                key: 'fakeAnno',
                value: 'tation'
              }]
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('creates an action with action name, action path, --params flag web flag', () => {
      const name = 'hello'
      const cmd = rtLib.mockResolved(rtAction, { res: 'fake' })
      command.argv = [name, '/action/actionFile.js', '-p', 'a', 'b', '-p', 'c', 'd', '--web', 'raw']
      rtUtils.getKeyValueArrayFromMergedParameters.mockImplementation((flags, file) => (flags && [{ key: 'fake', value: 'abc' }]))
      return command.run()
        .then(() => {
          expect(rtUtils.getKeyValueArrayFromMergedParameters).toHaveBeenCalledWith(['a', 'b', 'c', 'd'], undefined)
          expect(cmd).toHaveBeenCalledWith({
            name,
            action: {
              name,
              exec: {
                code: jsFile,
                kind: 'nodejs:default'
              },
              parameters: [{
                key: 'fake',
                value: 'abc'
              }],
              annotations: [{ key: 'web-export', value: true }, { key: 'raw-http', value: true }, { key: 'final', value: true }]
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('creates an action with action name, action path, --params flag, annotations and web flag as true', () => {
      const name = 'hello'
      const cmd = rtLib.mockResolved(rtAction, { res: 'fake' })
      command.argv = [name, '/action/actionFile.js', '-p', 'a', 'b', '-p', 'c', 'd', '-a', 'desc', 'Description', '--web', 'true', '--web-secure', 'true']
      rtUtils.getKeyValueArrayFromMergedParameters.mockImplementation((flags, file) => (flags && [{ key: 'fake', value: 'abc' }]))
      return command.run()
        .then(() => {
          expect(rtUtils.getKeyValueArrayFromMergedParameters).toHaveBeenCalledWith(['a', 'b', 'c', 'd'], undefined)
          expect(rtUtils.getKeyValueArrayFromMergedParameters).toHaveBeenCalledWith(['desc', 'Description'], undefined)
          expect(cmd).toHaveBeenCalledWith({
            name,
            action: {
              name,
              exec: {
                code: jsFile,
                kind: 'nodejs:default'
              },
              parameters: [{
                key: 'fake',
                value: 'abc'
              }],
              annotations: [
                { key: 'fake', value: 'abc' },
                { key: 'web-export', value: true },
                { key: 'final', value: true },
                { key: 'require-whisk-auth', value: true }
              ]
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('creates an action with action name with --web-secure true', () => {
      const name = 'hello'
      const cmd = rtLib.mockResolved(rtAction, '')
      command.argv = [name, '/action/actionFile.js', '--web', 'true', '--web-secure', 'true']
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
              annotations: [
                { key: 'web-export', value: true },
                { key: 'final', value: true },
                { key: 'require-whisk-auth', value: true }
              ]
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('creates an action with action name with --web-secure false', () => {
      const name = 'hello'
      const cmd = rtLib.mockResolved(rtAction, '')
      command.argv = [name, '/action/actionFile.js', '--web', 'true', '--web-secure', 'false']
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
              annotations: [
                { key: 'web-export', value: true },
                { key: 'final', value: true },
                { key: 'require-whisk-auth', value: false }
              ]
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('creates an action with action name with --web-secure abcxyz', () => {
      const name = 'hello'
      const cmd = rtLib.mockResolved(rtAction, '')
      command.argv = [name, '/action/actionFile.js', '--web', 'true', '--web-secure', 'abcxyz']
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
              annotations: [
                { key: 'web-export', value: true },
                { key: 'final', value: true },
                { key: 'require-whisk-auth', value: 'abcxyz' }
              ]
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('creates an action with --main flag', () => {
      const name = 'hello'
      const cmd = rtLib.mockResolved(rtAction, { res: 'fake' })
      command.argv = [name, '/action/actionFile.js', '--main', 'maynard']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name,
            action: {
              name,
              exec: {
                code: jsFile,
                main: 'maynard',
                kind: 'nodejs:default'
              }
            }
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('creates an action with code of unknown kind', () => {
      return new Promise((resolve, reject) => {
        rtLib.mockRejected(rtAction, '')
        command.argv = ['hello', '/action/fileWithNoExt']
        return command.run()
          .then(() => reject(new Error('does not throw error')))
          .catch(() => {
            expect(handleError).toHaveBeenLastCalledWith('failed to create the action', new Error('Cannot determine kind of action. Please use --kind to specifiy.'))
            resolve()
          })
      })
    })

    test('creates an action with code and --sequence', () => {
      return new Promise((resolve, reject) => {
        rtLib.mockRejected(rtAction, '')
        command.argv = ['hello', '/action/actionFile.js', '--sequence', 'a,b,c']
        return command.run()
          .then(() => reject(new Error('does not throw error')))
          .catch(() => {
            expect(handleError).toHaveBeenLastCalledWith('failed to create the action', new Error('Cannot specify sequence and a code artifact at the same time'))
            resolve()
          })
      })
    })

    test('tests for incorrect action with --main flag and --sequence', () => {
      return new Promise((resolve, reject) => {
        rtLib.mockRejected(rtAction, '')
        command.argv = ['hello', '--main', 'maynard', '--sequence', 'a,b,c']
        return command.run()
          .then(() => reject(new Error('does not throw error')))
          .catch(() => {
            expect(handleError).toHaveBeenLastCalledWith('failed to create the action', new Error('The function handler can only be specified when you provide a code artifact'))
            resolve()
          })
      })
    })

    test('creates an action with --docker and --sequence', () => {
      return new Promise((resolve, reject) => {
        rtLib.mockRejected(rtAction, '')
        command.argv = ['hello', '--docker', 'some-image', '--sequence', 'a,b,c']
        return command.run()
          .then(() => reject(new Error('does not throw error')))
          .catch(() => {
            expect(handleError).toHaveBeenLastCalledWith('failed to create the action', new Error('Cannot specify sequence and a container image at the same time'))
            resolve()
          })
      })
    })

    test('creates an action with --docker and --kind', () => {
      return new Promise((resolve, reject) => {
        rtLib.mockRejected(rtAction, '')
        command.argv = ['hello', '/action/actionFile.js', '--kind', 'nodejs:8', '--docker', 'some-image']
        return command.run()
          .then(() => reject(new Error('does not throw error')))
          .catch(() => {
            expect(handleError).toHaveBeenLastCalledWith('failed to create the action', new Error('Cannot specify a kind and a container image at the same time'))
            resolve()
          })
      })
    })

    test('tests for incorrect action create missing code and sequence', () => {
      return new Promise((resolve, reject) => {
        rtLib.mockRejected(rtAction, '')
        command.argv = ['hello']
        return command.run()
          .then(() => reject(new Error('does not throw error')))
          .catch(() => {
            expect(handleError).toHaveBeenLastCalledWith('failed to create the action', new Error('Must provide a code artifact, container image, or a sequence'))
            resolve()
          })
      })
    })

    test('tests for incorrect action with --kind flag and --sequence', () => {
      return new Promise((resolve, reject) => {
        rtLib.mockRejected(rtAction, '')
        command.argv = ['hello', '--kind', 'nodejs:10', '--sequence', 'a,b,c']
        return command.run()
          .then(() => reject(new Error('does not throw error')))
          .catch(() => {
            expect(handleError).toHaveBeenLastCalledWith('failed to create the action', new Error('A kind may not be specified for a sequence'))
            resolve()
          })
      })
    })
    test('tests for incorrect --sequence flags', () => {
      return new Promise((resolve, reject) => {
        rtLib.mockRejected(rtAction, '')
        command.argv = ['hello', '--sequence', ' ,a,b,c']
        return command.run()
          .then(() => reject(new Error('does not throw error')))
          .catch(() => {
            expect(handleError).toHaveBeenLastCalledWith('failed to create the action', new Error('Provide a valid sequence component'))
            resolve()
          })
      })
    })

    test('tests for incorrect action path', () => {
      return new Promise((resolve, reject) => {
        rtLib.mockRejected(rtAction, '')
        command.argv = ['hello', '/action/file.js', '--kind', 'nodejs:10']
        return command.run()
          .then(() => reject(new Error('does not throw error')))
          .catch(() => {
            expect(handleError).toHaveBeenLastCalledWith('failed to create the action', new Error('Provide a valid path for ACTION'))
            resolve()
          })
      })
    })

    test('tests for incorrect action zip path', () => {
      return new Promise((resolve, reject) => {
        rtLib.mockRejected(rtAction, '')
        command.argv = ['hello', '/action/file.zip', '--kind', 'nodejs:10']
        return command.run()
          .then(() => reject(new Error('does not throw error')))
          .catch(() => {
            expect(handleError).toHaveBeenLastCalledWith('failed to create the action', new Error('Provide a valid path for ACTION'))
            resolve()
          })
      })
    })
    test('errors out on api error', () => {
      return new Promise((resolve, reject) => {
        rtLib.mockRejected(rtAction, new Error('an error'))
        command.argv = ['hello', '/action/actionFile.js']
        return command.run()
          .then(() => reject(new Error('does not throw error')))
          .catch(() => {
            expect(handleError).toHaveBeenLastCalledWith('failed to create the action', new Error('an error'))
            resolve()
          })
      })
    })
  })
})
