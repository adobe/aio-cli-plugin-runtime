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
const ow = require('openwhisk')()
const { stdout } = require('stdout-stderr')
const owAction = 'triggers.list'

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

test('args', async () => {
  expect(TheCommand.args).not.toBeDefined()
})

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
  let command

  beforeEach(() => {
    command = new TheCommand([])
  })

  describe('run', () => {
    test('exists', async () => {
      expect(command.run).toBeInstanceOf(Function)
    })

    test('--limit flag (no triggers)', () => {
      let cmd = ow.mockResolved('triggers.list', [])
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
      let cmd = ow.mockResolved(owAction, [])
      command.argv = ['--skip', '5']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({ skip: 5, limit: 30 })
          expect(stdout.output).toMatch('')
        })
    })

    test('simple trigger list', () => {
      let cmd = ow.mockResolved(owAction, [
        { name: 'trigger1', namespace: 'namespace1', publish: false },
        { name: 'trigger2', namespace: 'namespace1', publish: true }
      ])
      return command.run()
        .then(() => {
          const cmdArg0 = cmd.mock.calls[0][0]
          expect(cmdArg0).toHaveProperty('limit', 30)
          expect(cmdArg0).not.toHaveProperty('skip')
          expect(stdout.output).toMatchFixture('trigger/list.txt')
        })
    })

    test('simple trigger list, --json flag', () => {
      const json = [
        { name: 'trigger1', namespace: 'namespace1', publish: false },
        { name: 'trigger2', namespace: 'namespace1', publish: true }
      ]

      let cmd = ow.mockResolved(owAction, json)
      command.argv = [ '--json' ]
      return command.run()
        .then(() => {
          const cmdArg0 = cmd.mock.calls[0][0]
          expect(cmdArg0).toHaveProperty('limit', 30)
          expect(cmdArg0).not.toHaveProperty('skip')
          expect(JSON.parse(stdout.output)).toMatchObject(json)
        })
    })

    test('trigger list, error', (done) => {
      ow.mockRejected('triggers.list', new Error('trigger error'))
      return command.run()
        .then(() => done.fail('does not throw error'))
        .catch((err) => {
          expect(err).toMatchObject(new Error('failed to list triggers: trigger error'))
          done()
        })
    })
  })
})
