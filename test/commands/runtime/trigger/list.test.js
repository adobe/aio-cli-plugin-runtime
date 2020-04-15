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

const TheCommand = require('../../../../src/commands/runtime/trigger/list.js')
const RuntimeBaseCommand = require('../../../../src/RuntimeBaseCommand.js')
const RuntimeLib = require('@adobe/aio-lib-runtime')
const { stdout } = require('stdout-stderr')
const rtAction = 'triggers.list'

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
  expect(TheCommand.args).not.toBeDefined()
})

// eslint-disable-next-line jest/expect-expect
test('base flags included in command flags',
  createTestBaseFlagsFunction(TheCommand, RuntimeBaseCommand)
)

test('flags', async () => {
  const flags = TheCommand.flags
  expect(flags).toBeDefined()

  expect(flags.limit).toBeDefined()
  expect(flags.limit.char).toEqual('l')
  expect(flags.limit.default).toEqual(30)
  expect(flags.limit.type).toEqual('option')
  expect(flags.limit.description).toBeDefined()

  expect(flags.skip).toBeDefined()
  expect(flags.skip.char).toEqual('s')
  expect(flags.skip.type).toEqual('option')
  expect(flags.skip.description).toBeDefined()
})

describe('instance methods', () => {
  const triggerDate = 1606487719405
  let command, handleError, rtLib
  beforeEach(async () => {
    command = new TheCommand([])
    handleError = jest.spyOn(command, 'handleError')
    rtLib = await RuntimeLib.init({ apihost: 'fakehost', api_key: 'fakekey' })
    rtLib.triggers.get = (name) => {
      const response = {
        annotations: [],
        limits: {},
        name,
        namespace: 'namespace1',
        parameters: [],
        publish: false,
        rules: {
          'namespace1/rule1': {
            action: {
              name: 'action1',
              path: 'namespace1'
            },
            status: name === 'trigger1' ? 'active' : 'inactive'
          }
        },
        updated: triggerDate,
        version: '0.0.1'
      }
      if (name === 'trigger1') {
        response.rules['namespace1/rule2'] = {
          action: {
            name: 'action2',
            path: 'namespace1'
          },
          status: 'active'
        }
      }
      if (name === 'trigger3') {
        delete response.rules
      }
      return Promise.resolve(response)
    }
    rtLib.mockResolved('actions.client.options', '')
    RuntimeLib.mockReset()
  })

  describe('run', () => {
    test('exists', async () => {
      expect(command.run).toBeInstanceOf(Function)
    })

    test('--limit flag (no triggers)', () => {
      const cmd = rtLib.mockResolved('triggers.list', [])
      command.argv = ['--limit', '10']
      return command.run()
        .then(() => {
          const cmdArg0 = cmd.mock.calls[0][0]
          expect(cmdArg0).toHaveProperty('limit', 10)
          expect(cmdArg0).not.toHaveProperty('skip')
          expect(stdout.output).toMatch('')
        })
    })

    test('--skip flag (no triggers)', () => {
      const cmd = rtLib.mockResolved(rtAction, [])
      command.argv = ['--skip', '5']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({ skip: 5, limit: 30 })
          expect(stdout.output).toMatch('')
        })
    })

    test('simple trigger list', () => {
      const cmd = rtLib.mockResolved(rtAction, [
        { name: 'trigger1', namespace: 'namespace1', publish: false },
        { name: 'trigger2', namespace: 'namespace1', publish: false },
        { name: 'trigger3', namespace: 'namespace1', publish: false }
      ])
      return command.run()
        .then(() => {
          const cmdArg0 = cmd.mock.calls[0][0]
          expect(cmdArg0).toHaveProperty('limit', 30)
          expect(cmdArg0).not.toHaveProperty('skip')
          expect(stdout.output).toMatch(fixtureFileWithTimeZoneAdjustment('trigger/list.txt', triggerDate))
        })
    })

    test('simple trigger list, --json flag', () => {
      const json = [
        { name: 'trigger1', namespace: 'namespace1', publish: false },
        { name: 'trigger2', namespace: 'namespace1', publish: false }
      ]

      const cmd = rtLib.mockResolved(rtAction, json)
      command.argv = ['--json']
      return command.run()
        .then(() => {
          const cmdArg0 = cmd.mock.calls[0][0]
          expect(cmdArg0).toHaveProperty('limit', 30)
          expect(cmdArg0).not.toHaveProperty('skip')
          expect(JSON.parse(stdout.output)).toMatchObject([{
            annotations: [],
            limits: {},
            name: 'trigger1',
            namespace: 'namespace1',
            parameters: [],
            publish: false,
            rules: {
              'namespace1/rule1': {
                action: {
                  name: 'action1',
                  path: 'namespace1'
                },
                status: 'active'
              },
              'namespace1/rule2': {
                action: {
                  name: 'action2',
                  path: 'namespace1'
                },
                status: 'active'
              }
            },
            updated: triggerDate,
            version: '0.0.1'
          },
          {
            annotations: [],
            limits: {},
            name: 'trigger2',
            namespace: 'namespace1',
            parameters: [],
            publish: false,
            rules: {
              'namespace1/rule1': {
                action: {
                  name: 'action1',
                  path: 'namespace1'
                },
                status: 'inactive'
              }
            },
            updated: triggerDate,
            version: '0.0.1'
          }
          ])
        })
    })

    test('trigger list, error', () => {
      return new Promise((resolve, reject) => {
        rtLib.mockRejected('triggers.list', new Error('an error'))
        return command.run()
          .then(() => reject(new Error('does not throw error')))
          .catch(() => {
            expect(handleError).toHaveBeenLastCalledWith('failed to list triggers', new Error('an error'))
            resolve()
          })
      })
    })

    test('return list of triggers, --name-sort flag', () => {
      const cmd = rtLib.mockResolvedFixture(rtAction, 'trigger/list-name-sort.json')
      command.argv = ['--name']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          expect(stdout.output).toMatch(fixtureFileWithTimeZoneAdjustment('trigger/list-name-sort-output.txt', triggerDate))
        })
    })

    test('return triggers count == 0', () => {
      rtLib.mockResolved(rtAction, Promise.resolve({ triggers: 0 }))
      command.argv = ['--count']
      return command.run()
        .then(() => {
          expect(stdout.output).toEqual('You have 0 triggers in this namespace.\n')
        })
    })

    test('return trigger count', () => {
      rtLib.mockResolved(rtAction, Promise.resolve({ triggers: 1 }))
      command.argv = ['--count']
      return command.run()
        .then(() => {
          expect(stdout.output).toEqual('You have 1 trigger in this namespace.\n')
        })
    })

    test('return triggers count', () => {
      rtLib.mockResolved(rtAction, Promise.resolve({ triggers: 2 }))
      command.argv = ['--count']
      return command.run()
        .then(() => {
          expect(stdout.output).toEqual('You have 2 triggers in this namespace.\n')
        })
    })

    test('return trigger count --json', () => {
      rtLib.mockResolved(rtAction, Promise.resolve({ triggers: 2 }))
      command.argv = ['--count', '--json']
      return command.run()
        .then(() => {
          expect(JSON.parse(stdout.output)).toEqual({ triggers: 2 })
        })
    })
  })
})
