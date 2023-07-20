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
const rtActionGet = 'actions.get'

test('exports', async () => {
  expect(typeof TheCommand).toEqual('function')
  expect(TheCommand.prototype instanceof RuntimeBaseCommand).toBeTruthy()
  expect(TheCommand.run).toBeInstanceOf(Function)
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
  expect(typeof TheCommand.flags.copy).toBe('object')
})

test('args', async () => {
  expect(TheCommand.args.actionName).toBeDefined()
  expect(TheCommand.args.actionName.required).toEqual(true)
  expect(TheCommand.args.actionPath).toBeDefined()
})

test('aliases', async () => {
  expect(TheCommand.aliases).toBeDefined()
  expect(TheCommand.aliases).toBeInstanceOf(Array)
  expect(TheCommand.aliases.length).toBeGreaterThan(0)
})

// ///////////////////////////////////////////

const JS_FILE = fixtureFile('action/actionFile.js')
const FILE_SYSTEM_JSON = {
  [WSK_PROPS_PATH]: 'AUTH=something',
  '/action/actionFile.js': fixtureFile('action/actionFile.js'),
  '/action/zipAction.zip': 'fakezipfile',
  '/action/zipAction.bin': 'fakezipfilebin',
  '/action/fileWithNoExt': 'fakefilewithnoext'
}

let command, handleError, rtLib
beforeEach(async () => {
  command = new TheCommand([])
  handleError = jest.spyOn(command, 'handleError')
  rtLib = await RuntimeLib.init({ apihost: 'fakehost', api_key: 'fakekey' })
  rtLib.mockResolved('actions.client.options', '')
  RuntimeLib.mockReset()
})

beforeAll(() => {
  createFileSystem(FILE_SYSTEM_JSON)
})

afterAll(() => {
  // reset back to normal
  clearMockedFs()
})

test('creates an action with action name and action path', () => {
  const name = 'hello'
  const cmd = rtLib.mockResolved(rtAction, { res: 'fake' })
  command.argv = [name, '/action/actionFile.js']
  return command.run()
    .then(() => {
      expect(cmd).toHaveBeenCalledWith({ name, action: { name, exec: { code: JS_FILE, kind: 'nodejs:default' } } })
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
          name
        },
        name
      })
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
            code: JS_FILE,
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
            code: JS_FILE,
            kind: 'nodejs:default'
          }
        }
      })
      expect(stdout.output).toMatch('') // TODO: json version
    })
})

test('creates an action with action name and action path to zip file', () => {
  const actionName = 'hello'
  const actionPath = '/action/zipAction.zip'

  const base64ZipFile = Buffer.from(FILE_SYSTEM_JSON[actionPath]).toString('base64')
  const cmd = rtLib.mockResolved(rtAction, { res: 'fake' })
  command.argv = [actionName, actionPath, '--kind', 'nodejs:8']
  return command.run()
    .then(() => {
      expect(cmd).toHaveBeenCalledWith({
        name: actionName,
        action: {
          name: actionName,
          exec: {
            code: base64ZipFile,
            kind: 'nodejs:8'
          }
        }
      })
      expect(stdout.output).toMatch('')
    })
})

test('creates an action with action name and action path to binary file', () => {
  const actionName = 'hello'
  const actionPath = '/action/zipAction.bin'

  const base64ZipFile = Buffer.from(FILE_SYSTEM_JSON[actionPath]).toString('base64')
  const cmd = rtLib.mockResolved(rtAction, { res: 'fake' })
  command.argv = [actionName, '/action/zipAction.bin', '--kind', 'nodejs:8', '--binary']
  return command.run()
    .then(() => {
      expect(cmd).toHaveBeenCalledWith({
        name: actionName,
        action: {
          name: actionName,
          exec: {
            code: base64ZipFile,
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
          exec: { code: JS_FILE, kind: 'nodejs:default' },
          name,
          parameters: [{ key: 'fakeParam', value: 'aaa' }, { key: 'fakeParam2', value: 'bbb' }]
        },
        name
      })
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
          exec: { code: JS_FILE, kind: 'nodejs:default' },
          name,
          parameters: [{ key: 'fakeParam', value: 'aaa' }, { key: 'fakeParam2', value: 'bbb' }]
        },
        name
      })
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
            code: JS_FILE,
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
            code: JS_FILE,
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
            code: JS_FILE,
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
            code: JS_FILE,
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
            code: JS_FILE,
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
            code: JS_FILE,
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
            code: JS_FILE,
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

test('creates an action with action name, action path and overlapping --env and --param keys', async () => {
  rtLib.mockRejected(rtAction, '')
  const name = 'hello'
  command.argv = [name, '/action/actionFile.js', '--env', 'a', 'b', '--param', 'a', 'd']
  rtUtils.getKeyValueArrayFromMergedParameters.mockImplementation((flags, file) => flags && [{ key: 'same', value: 'kv' }])
  rtUtils.createKeyValueArrayFromFlag.mockReturnValue([{ key: 'same', value: 'abc' }])
  const error = ['failed to create the action', new Error('Invalid argument(s). Environment variables and function parameters may not overlap')]
  await expect(command.run()).rejects.toThrow(...error)
  expect(handleError).toHaveBeenLastCalledWith(...error)
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
            code: JS_FILE,
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
            code: JS_FILE,
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
            code: JS_FILE,
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
            code: JS_FILE,
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
            code: JS_FILE,
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
            code: JS_FILE,
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
            code: JS_FILE,
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
            code: JS_FILE,
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
            code: JS_FILE,
            main: 'maynard',
            kind: 'nodejs:default'
          }
        }
      })
      expect(stdout.output).toMatch('')
    })
})

test('creates an action with code of unknown kind', async () => {
  rtLib.mockRejected(rtAction, '')
  command.argv = ['hello', '/action/fileWithNoExt']
  const error = ['failed to create the action', new Error('Cannot determine kind of action. Please use --kind to specify.')]
  await expect(command.run()).rejects.toThrow(...error)
  expect(handleError).toHaveBeenLastCalledWith(...error)
})

test('creates an action with code and --sequence', async () => {
  rtLib.mockRejected(rtAction, '')
  command.argv = ['hello', '/action/actionFile.js', '--sequence', 'a,b,c']
  const error = ['failed to create the action', new Error('Cannot specify sequence and a code artifact at the same time')]
  await expect(command.run()).rejects.toThrow(...error)
  expect(handleError).toHaveBeenLastCalledWith(...error)
})

test('tests for incorrect action with --main flag and --sequence', async () => {
  rtLib.mockRejected(rtAction, '')
  command.argv = ['hello', '--main', 'maynard', '--sequence', 'a,b,c']
  const error = ['failed to create the action', new Error('The function handler can only be specified when you provide a code artifact')]
  await expect(command.run()).rejects.toThrow(...error)
  expect(handleError).toHaveBeenLastCalledWith(...error)
})

test('creates an action with --docker and --sequence', async () => {
  rtLib.mockRejected(rtAction, '')
  command.argv = ['hello', '--docker', 'some-image', '--sequence', 'a,b,c']
  const error = ['failed to create the action', new Error('Cannot specify sequence and a container image at the same time')]
  await expect(command.run()).rejects.toThrow(...error)
  expect(handleError).toHaveBeenLastCalledWith(...error)
})

test('creates an action with --docker and --kind', async () => {
  rtLib.mockRejected(rtAction, '')
  command.argv = ['hello', '/action/actionFile.js', '--kind', 'nodejs:8', '--docker', 'some-image']
  const error = ['failed to create the action', new Error('Cannot specify a kind and a container image at the same time')]
  await expect(command.run()).rejects.toThrow(...error)
  expect(handleError).toHaveBeenLastCalledWith(...error)
})

test('tests for incorrect action create missing code and sequence', async () => {
  rtLib.mockRejected(rtAction, '')
  command.argv = ['hello']
  const error = ['failed to create the action', new Error('Must provide a code artifact, container image, or a sequence')]
  await expect(command.run()).rejects.toThrow(...error)
  expect(handleError).toHaveBeenLastCalledWith(...error)
})

test('tests for incorrect action with --kind flag and --sequence', async () => {
  rtLib.mockRejected(rtAction, '')
  command.argv = ['hello', '--kind', 'nodejs:10', '--sequence', 'a,b,c']
  const error = ['failed to create the action', new Error('A kind may not be specified for a sequence')]
  await expect(command.run()).rejects.toThrow(...error)
  expect(handleError).toHaveBeenLastCalledWith(...error)
})
test('tests for incorrect --sequence flags', async () => {
  rtLib.mockRejected(rtAction, '')
  command.argv = ['hello', '--sequence', ' ,a,b,c']
  const error = ['failed to create the action', new Error('Provide a valid sequence component')]
  await expect(command.run()).rejects.toThrow(...error)
  expect(handleError).toHaveBeenLastCalledWith(...error)
})

test('tests for incorrect action path', async () => {
  rtLib.mockRejected(rtAction, '')
  command.argv = ['hello', '/action/file.js', '--kind', 'nodejs:10']
  const error = ['failed to create the action', new Error('Provide a valid path for ACTION')]
  await expect(command.run()).rejects.toThrow(...error)
  expect(handleError).toHaveBeenLastCalledWith(...error)
})

test('tests for incorrect action zip path', async () => {
  rtLib.mockRejected(rtAction, '')
  command.argv = ['hello', '/action/file.zip', '--kind', 'nodejs:10']
  const error = ['failed to create the action', new Error('Provide a valid path for ACTION')]
  await expect(command.run()).rejects.toThrow(...error)
  expect(handleError).toHaveBeenLastCalledWith(...error)
})

test('errors out on api error', async () => {
  rtLib.mockRejected(rtAction, new Error('an error'))
  command.argv = ['hello', '/action/actionFile.js']
  const error = ['failed to create the action', new Error('an error')]
  await expect(command.run()).rejects.toThrow(...error)
  expect(handleError).toHaveBeenLastCalledWith(...error)
})

test('errors out on create with timeout below min', async () => {
  const flag = '--timeout'
  const invalidValue = '99'
  command.argv = [flag, invalidValue]
  await expect(command.run()).rejects.toThrow(`Parsing ${flag} \n\tExpected an integer greater than or equal to 100 but received: ${invalidValue}\nSee more help with --help`)
})

test('errors out on create with timeout above max', async () => {
  const flag = '--timeout'
  const invalidValue = '3600001'
  command.argv = [flag, invalidValue]
  await expect(command.run()).rejects.toThrow(`Parsing ${flag} \n\tExpected an integer less than or equal to 3600000 but received: ${invalidValue}\nSee more help with --help`)
})

test('errors out on create with memory below min', async () => {
  const flag = '--memory'
  const invalidValue = '127'
  command.argv = [flag, invalidValue]
  await expect(command.run()).rejects.toThrow(`Parsing ${flag} \n\tExpected an integer greater than or equal to 128 but received: ${invalidValue}\nSee more help with --help`)
})

test('errors out on create with memory above max', async () => {
  const flag = '--memory'
  const invalidValue = '4097'
  command.argv = [flag, invalidValue]
  await expect(command.run()).rejects.toThrow(`Parsing ${flag} \n\tExpected an integer less than or equal to 4096 but received: ${invalidValue}\nSee more help with --help`)
})

test('errors out on create with logsize below min', async () => {
  const flag = '--logsize'
  const invalidValue = '-1'
  command.argv = [flag, invalidValue]
  await expect(command.run()).rejects.toThrow(`Parsing ${flag} \n\tExpected an integer greater than or equal to 0 but received: ${invalidValue}\nSee more help with --help`)
})

test('errors out on create with logsize above max', async () => {
  const flag = '--logsize'
  const invalidValue = '11'
  command.argv = [flag, invalidValue]
  await expect(command.run()).rejects.toThrow(`Parsing ${flag} \n\tExpected an integer less than or equal to 10 but received: ${invalidValue}\nSee more help with --help`)
})

test('errors on --web-secure with --web false flag', async () => {
  rtLib.mockRejected(rtAction, '')
  command.argv = ['hello', '/action/fileWithNoExt', '--web-secure', 'true', '--web', 'false']
  const error = ['failed to create the action', new Error(TheCommand.errorMessages.websecure)]
  await expect(command.run()).rejects.toThrow(...error)
  expect(handleError).toHaveBeenLastCalledWith(...error)
})

test('aio runtime:action:create newAction --copy oldAction', () => {
  const oldActionJson = require('../../../__fixtures__/action/get.json')
  const cmdGet = rtLib.mockResolvedFixture(rtActionGet, 'action/get.json')
  const cmdCreate = rtLib.mockResolved(rtAction, { fake: '' })
  const name = 'oldAction'
  const newAction = 'newAction'
  command.argv = [newAction, '--copy', name]
  return command.run()
    .then(() => {
      expect(cmdGet).toHaveBeenCalledWith(name)
      expect(cmdCreate).toHaveBeenCalledWith({ name: newAction, action: oldActionJson })
      expect(stdout.output).toMatch('')
    })
})
