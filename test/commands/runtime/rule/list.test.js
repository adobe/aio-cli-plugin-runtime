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
const owAction = 'rules.list'
const { stdout } = require('stdout-stderr')
const ow = require('openwhisk')()

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
  let command

  beforeEach(() => {
    command = new TheCommand([])
  })

  describe('run', () => {
    test('exists', async () => {
      expect(command.run).toBeInstanceOf(Function)
    })

    test('return list of rules with limits --json', () => {
      let cmd = ow.mockResolvedFixture(owAction, 'rule/list.json')
      let cmd2 = ow.mockResolvedFixture('rules.get', 'rule/get.json')
      command.argv = ['--limit', '2', '--json']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            'limit': 2,
            'User-Agent': agentString
          })
          expect(cmd2).toHaveBeenCalled()
          expect(stdout.output).toMatchFixture('rule/list.json')
        })
    })

    test('return list of rules with no limits --json', () => {
      let cmd = ow.mockResolvedFixture(owAction, 'rule/list.json')
      ow.mockResolvedFixture('rules.get', 'rule/get.json')
      command.argv = ['--json']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          expect(stdout.output).toMatchFixture('rule/list.json')
        })
    })

    test('return list of rules with skip (no rules) --json', () => {
      let cmd = ow.mockResolved(owAction, [])
      command.argv = ['--skip', '3', '--json']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            'limit': 30,
            'skip': 3,
            'User-Agent': agentString
          })
          expect(stdout.output).toMatch('[]')
        })
    })

    test('return list of rules with limits - tabular', () => {
      let cmd = ow.mockResolvedFixture(owAction, 'rule/list.json')
      let cmd2 = ow.mockResolvedFixture('rules.get', 'rule/get.json')
      command.argv = ['--limit', '2']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            'limit': 2,
            'User-Agent': agentString
          })
          expect(cmd2).toHaveBeenCalled()
          expect(stdout.output.replace(/\s/g, '')).toMatchFixture('rule/list-output.txt')
        })
    })

    test('return list of rules with limits - tabular not-active', () => {
      let cmd = ow.mockResolvedFixture(owAction, 'rule/list.json')
      let cmd2 = ow.mockResolvedFixture('rules.get', 'rule/get-public.json')
      command.argv = ['--limit', '2']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            'limit': 2,
            'User-Agent': agentString
          })
          expect(cmd2).toHaveBeenCalled()
          expect(stdout.output.replace(/\s/g, '')).toMatchFixture('rule/list-output-public.txt')
        })
    })

    test('return list of rules with no limits --json - tabular not-active', () => {
      let cmd = ow.mockResolvedFixture(owAction, 'rule/list.json')
      ow.mockResolvedFixture('rules.get', 'rule/get-public.json')
      command.argv = ['--json']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          expect(stdout.output).toMatchFixture('rule/list-public.json')
        })
    })

    // test('return the number of rules with count flag', () => {
    //   let cmd = ow.mockResolved(owAction, '2')
    //   command.argv = ['--count']
    //   return command.run()
    //     .then(() => {
    //       expect(cmd).toHaveBeenCalledWith({ 'count': true, 'limit': 30 })
    //       expect(stdout.output).toMatch('2')
    //     })
    // })

    test('errors out on api error', (done) => {
      ow.mockRejected('rules.list', new Error('an error'))
      return command.run()
        .then(() => done.fail('does not throw error'))
        .catch((err) => {
          expect(err).toMatchObject(new Error('failed to list the rules: an error'))
          done()
        })
    })
  })
})
