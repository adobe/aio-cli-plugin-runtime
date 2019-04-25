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

const TheCommand = require('../../../../src/commands/runtime/rule/status.js')
const RuntimeBaseCommand = require('../../../../src/RuntimeBaseCommand.js')
const dedent = require('dedent-js')
const owAction = 'rules.get'
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

test('args', async () => {
  const args = TheCommand.args
  expect(args).toBeDefined()
  expect(args.length).toEqual(1)

  expect(args[0].name).toEqual('name')
  expect(args[0].required).toBeTruthy()
  expect(args[0].description).toBeDefined()
})

test('base flags included in command flags',
  createTestBaseFlagsFunction(TheCommand, RuntimeBaseCommand)
)

test('flags', async () => {
  const flags = TheCommand.flags
  expect(flags).toBeDefined()
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

    test('no required args - throws exception', (done) => {
      return command.run()
        .then(() => done.fail('does not throw error'))
        .catch((err) => {
          expect(err).toMatchObject(new Error(dedent`
          Missing 1 required arg:
          name  Name of the rule
          See more help with --help`))
          done()
        })
    })

    test('get simple rule status', () => {
      let cmd = ow.mockResolvedFixture(owAction, 'rule/get.json')
      command.argv = ['nameFoo']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name: 'nameFoo'
          })
          expect(stdout.output).toMatch('active')
        })
    })

    test('errors out on api error', (done) => {
      ow.mockRejected('rules.get', new Error('an error'))
      command.argv = ['nameFoo']
      return command.run()
        .then(() => done.fail('does not throw error'))
        .catch((err) => {
          expect(err).toMatchObject(new Error('failed to retrieve rule: an error'))
          done()
        })
    })
  })
})
