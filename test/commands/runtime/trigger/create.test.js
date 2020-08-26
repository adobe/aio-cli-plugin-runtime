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

const TheCommand = require('../../../../src/commands/runtime/trigger/create.js')
const RuntimeBaseCommand = require('../../../../src/RuntimeBaseCommand.js')
const RuntimeLib = require('@adobe/aio-lib-runtime')
const rtUtils = RuntimeLib.utils
const { stdout } = require('stdout-stderr')
const rtAction = 'triggers.create'

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

// eslint-disable-next-line jest/expect-expect
test('base flags included in command flags',
  createTestBaseFlagsFunction(TheCommand, RuntimeBaseCommand)
)

test('flags', async () => {
  const flags = TheCommand.flags
  expect(flags).toBeDefined()

  expect(flags.param).toBeDefined()
  expect(flags.param.char).toEqual('p')
  expect(flags.param.multiple).toEqual(true)
  expect(flags.param.description).toBeDefined()

  expect(flags['param-file']).toBeDefined()
  expect(flags['param-file'].char).toEqual('P')
  expect(flags['param-file'].multiple).toEqual(false)
  expect(flags['param-file'].description).toBeDefined()

  expect(flags.annotation).toBeDefined()
  expect(flags.annotation.char).toEqual('a')
  expect(flags.annotation.multiple).toEqual(true)
  expect(flags.annotation.description).toBeDefined()

  expect(flags['annotation-file']).toBeDefined()
  expect(flags['annotation-file'].char).toEqual('A')
  expect(flags['annotation-file'].multiple).toEqual(false)
  expect(flags['annotation-file'].description).toBeDefined()
})

test('args', async () => {
  const triggerName = TheCommand.args[0]

  expect(triggerName).toBeDefined()
  expect(triggerName.name).toEqual('triggerName')
  expect(triggerName.required).toEqual(true)
  expect(triggerName.description).toBeDefined()
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

    test('create a simple trigger, no params or annotations', () => {
      const cmd = rtLib.mockResolved(rtAction, '')
      command.argv = ['trigger1']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({ name: 'trigger1', trigger: {} })
          expect(stdout.output).toMatch('')
        })
    })

    test('create a simple trigger, error', () => {
      return new Promise((resolve, reject) => {
        rtLib.mockRejected(rtAction, new Error('an error'))
        command.argv = ['trigger1']
        return command.run()
          .then(() => reject(new Error('does not throw error')))
          .catch(() => {
            expect(handleError).toHaveBeenLastCalledWith('failed to create the trigger', new Error('an error'))
            resolve()
          })
      })
    })

    test('create a simple trigger, use feed flag', () => {
      const cmd = rtLib.mockResolved(rtAction, '')
      command.argv = ['trigger1', '--feed', '/whisk.system/alarms/alarm', '--param', 'cron', '* * * * *']
      rtUtils.getKeyValueArrayFromMergedParameters.mockImplementation((k, file) => {
        if (k && k.includes('cron')) {
          return [{ key: 'fakeParam', value: 'aaa' }, { key: 'fakeParam2', value: 'bbb' }]
        }
      })
      return command.run()
        .then(() => {
          expect(rtUtils.getKeyValueArrayFromMergedParameters).toHaveBeenCalledWith(['cron', '* * * * *'], undefined)
          expect(cmd).toHaveBeenCalledWith({ name: 'trigger1',
            trigger: {
              feed: '/whisk.system/alarms/alarm',
              parameters: [{ key: 'fakeParam', value: 'aaa' }, { key: 'fakeParam2', value: 'bbb' }]
            } })
          expect(stdout.output).toMatch('')
        })
    })

    test('create a simple trigger, use feed flag - Error', () => {
      rtLib.mockRejected(rtAction, new Error('yo'))
      command.argv = ['trigger1', '--feed', '/whisk.system/alarms/alarm', '--param', 'cron', '* * * * *']
      return command.run()
        .then(() => { throw new Error('did not reject') })
        .catch(e => {
          expect(e).toEqual(new Error('failed to create the trigger: yo\n specify --verbose flag for more information'))
          expect(stdout.output).toMatch('')
        })
    })

    test('create a simple trigger, use param flag', () => {
      const cmd = rtLib.mockResolved(rtAction, '')
      command.argv = ['trigger1', '--param', 'a', 'b', '--param', 'c', 'd']
      rtUtils.getKeyValueArrayFromMergedParameters.mockImplementation(params => params && [{ key: 'fakeParam', value: 'aaa' }, { key: 'fakeParam2', value: 'bbb' }])
      return command.run()
        .then(() => {
          expect(rtUtils.getKeyValueArrayFromMergedParameters).toHaveBeenCalledWith(['a', 'b', 'c', 'd'], undefined)
          expect(cmd).toHaveBeenCalledWith({ name: 'trigger1',
            trigger: {
              parameters: [{ key: 'fakeParam', value: 'aaa' }, { key: 'fakeParam2', value: 'bbb' }]
            } })
          expect(stdout.output).toMatch('')
        })
    })

    test('create a simple trigger, use param-file flag', () => {
      const cmd = rtLib.mockResolved(rtAction, '')

      command.argv = ['trigger1', '--param-file', '/trigger/parameters.json']
      rtUtils.getKeyValueArrayFromMergedParameters.mockImplementation((k, file) => {
        if (file && file === '/trigger/parameters.json') {
          return [{ key: 'fakeParam', value: 'aaa' }, { key: 'fakeParam2', value: 'bbb' }]
        }
      })
      return command.run()
        .then(() => {
          expect(rtUtils.getKeyValueArrayFromMergedParameters).toHaveBeenCalledWith(undefined, '/trigger/parameters.json')
          expect(cmd).toHaveBeenCalledWith({ name: 'trigger1',
            trigger: {
              parameters: [{ key: 'fakeParam', value: 'aaa' }, { key: 'fakeParam2', value: 'bbb' }]
            } })
          expect(stdout.output).toMatch('')
        })
    })

    test('create a simple trigger, use annotation flag', () => {
      const cmd = rtLib.mockResolved(rtAction, '')
      command.argv = ['trigger1', '--annotation', 'a', 'b', '--annotation', 'c', 'd']
      rtUtils.getKeyValueArrayFromMergedParameters.mockImplementation(params => params && [{ key: 'fakeParam', value: 'aaa' }, { key: 'fakeParam2', value: 'bbb' }])
      return command.run()
        .then(() => {
          expect(rtUtils.getKeyValueArrayFromMergedParameters).toHaveBeenCalledWith(['a', 'b', 'c', 'd'], undefined)
          expect(cmd).toHaveBeenCalledWith({ name: 'trigger1',
            trigger: {
              annotations: [{ key: 'fakeParam', value: 'aaa' }, { key: 'fakeParam2', value: 'bbb' }]
            } })
          expect(stdout.output).toMatch('')
        })
    })

    test('create a simple trigger, use annotation-file flag', () => {
      const cmd = rtLib.mockResolved(rtAction, '')

      command.argv = ['trigger1', '--annotation-file', '/trigger/annotations.json']
      rtUtils.getKeyValueArrayFromMergedParameters.mockImplementation((k, file) => {
        if (file && file === '/trigger/annotations.json') {
          return [{ key: 'fakeParam', value: 'aaa' }, { key: 'fakeParam2', value: 'bbb' }]
        }
      })
      return command.run()
        .then(() => {
          expect(rtUtils.getKeyValueArrayFromMergedParameters).toHaveBeenCalledWith(undefined, '/trigger/annotations.json')
          expect(cmd).toHaveBeenCalledWith({ name: 'trigger1',
            trigger: {
              annotations: [{ key: 'fakeParam', value: 'aaa' }, { key: 'fakeParam2', value: 'bbb' }]
            } })
          expect(stdout.output).toMatch('')
        })
    })
  })
})
