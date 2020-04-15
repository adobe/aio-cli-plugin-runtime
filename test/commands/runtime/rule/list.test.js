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

const TheCommand = require('../../../../src/commands/runtime/rule/list.js')
const RuntimeBaseCommand = require('../../../../src/RuntimeBaseCommand.js')
const rtAction = 'rules.list'
const { stdout } = require('stdout-stderr')
const RuntimeLib = require('@adobe/aio-lib-runtime')

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

  expect(flags.limit).toBeDefined()
  expect(flags.limit.char).toEqual('l')
  expect(flags.limit.description).toBeDefined()

  expect(flags.skip).toBeDefined()
  expect(flags.skip.char).toEqual('s')
  expect(flags.skip.description).toBeDefined()

  // TODO: does this api make any sense? it is not in the rest-api
  // expect(flags.count).toBeDefined()
  // expect(flags.count.char).toEqual('c')
  // expect(flags.count.description).toBeDefined()
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

    test('return list of rules with limits --json', () => {
      const cmd = rtLib.mockResolvedFixture(rtAction, 'rule/list.json')
      const cmd2 = rtLib.mockResolvedFixture('rules.get', 'rule/get.json')
      command.argv = ['--limit', '2', '--json']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith(expect.objectContaining({ limit: 2, json: true }))
          expect(cmd2).toHaveBeenCalled()
          expect(stdout.output).toMatchFixture('rule/list.json')
        })
    })

    test('return list of rules with no limits --json', () => {
      const cmd = rtLib.mockResolvedFixture(rtAction, 'rule/list.json')
      rtLib.mockResolvedFixture('rules.get', 'rule/get.json')
      command.argv = ['--json']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          expect(stdout.output).toMatchFixture('rule/list.json')
        })
    })

    test('return list of rules with skip (no rules) --json', () => {
      const cmd = rtLib.mockResolved(rtAction, [])
      command.argv = ['--skip', '3', '--json']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith(expect.objectContaining({ limit: 30, skip: 3, json: true }))
          expect(stdout.output).toMatch('[]')
        })
    })

    test('return list of rules with limits - tabular', () => {
      const cmd = rtLib.mockResolvedFixture(rtAction, 'rule/list.json')
      const cmd2 = rtLib.mockResolvedFixture('rules.get', 'rule/get.json')
      command.argv = ['--limit', '2']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith(expect.objectContaining({ limit: 2 }))
          expect(cmd2).toHaveBeenCalled()
          const dates = JSON.parse(fixtureFile('rule/list.json')).map(_ => _.updated)
          expect(stdout.output).toMatch(fixtureFileWithTimeZoneAdjustment('rule/list-output.txt', dates))
        })
    })

    test('return list of rules with limits - tabular not-active', () => {
      const cmd = rtLib.mockResolvedFixture(rtAction, 'rule/list.json')
      const cmd2 = rtLib.mockResolvedFixture('rules.get', 'rule/get-public.json')
      command.argv = ['--limit', '2']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith(expect.objectContaining({ limit: 2 }))
          expect(cmd2).toHaveBeenCalled()
          const dates = JSON.parse(fixtureFile('rule/list.json')).map(_ => _.updated)
          expect(stdout.output).toMatch(fixtureFileWithTimeZoneAdjustment('rule/list-output.txt', dates))
        })
    })

    test('return list of rules with no limits --json - tabular not-active', () => {
      const cmd = rtLib.mockResolvedFixture(rtAction, 'rule/list.json')
      rtLib.mockResolvedFixture('rules.get', 'rule/get-public.json')
      command.argv = ['--json']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          expect(stdout.output).toMatchFixture('rule/list-public.json')
        })
    })

    test('return list of rules, --name-sort flag', () => {
      const cmd = rtLib.mockResolvedFixture(rtAction, 'rule/list-name-sort.json')
      rtLib.mockResolvedFixtureMulitValue('rules.get', 'rule/get-name-sort.json')
      command.argv = ['--name']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          const dates = JSON.parse(fixtureFile('rule/get-name-sort.json')).map(_ => _.updated)
          expect(stdout.output).toMatch(fixtureFileWithTimeZoneAdjustment('rule/list-name-sort-output.txt', dates))
        })
    })

    // eslint-disable-next-line jest/no-commented-out-tests
    // test('return the number of rules with count flag', () => {
    //   let cmd = rtLib.mockResolved(rtAction, '2')
    //   command.argv = ['--count']
    //   return command.run()
    //     .then(() => {
    //       expect(cmd).toHaveBeenCalledWith({ 'count': true, 'limit': 30 })
    //       expect(stdout.output).toMatch('2')
    //     })
    // })

    test('return empty list of rules', () => {
      const cmd = rtLib.mockResolved(rtAction, [])
      command.argv = []
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          expect(stdout.output).toMatch('')
        })
    })

    test('return rules count == 0', () => {
      rtLib.mockResolved(rtAction, Promise.resolve({ rules: 0 }))
      command.argv = ['--count']
      return command.run()
        .then(() => {
          expect(stdout.output).toEqual('You have 0 rules in this namespace.\n')
        })
    })

    test('return rule count', () => {
      rtLib.mockResolved(rtAction, Promise.resolve({ rules: 1 }))
      command.argv = ['--count']
      return command.run()
        .then(() => {
          expect(stdout.output).toEqual('You have 1 rule in this namespace.\n')
        })
    })

    test('return rules count', () => {
      rtLib.mockResolved(rtAction, Promise.resolve({ rules: 2 }))
      command.argv = ['--count']
      return command.run()
        .then(() => {
          expect(stdout.output).toEqual('You have 2 rules in this namespace.\n')
        })
    })

    test('return rule count --json', () => {
      rtLib.mockResolved(rtAction, Promise.resolve({ rules: 2 }))
      command.argv = ['--count', '--json']
      return command.run()
        .then(() => {
          expect(JSON.parse(stdout.output)).toEqual({ rules: 2 })
        })
    })

    test('errors out on api error', () => {
      return new Promise((resolve, reject) => {
        rtLib.mockRejected('rules.list', new Error('an error'))
        return command.run()
          .then(() => reject(new Error('does not throw error')))
          .catch(() => {
            expect(handleError).toHaveBeenLastCalledWith('failed to list the rules', new Error('an error'))
            resolve()
          })
      })
    })
  })
})
