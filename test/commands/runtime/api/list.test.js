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

const TheCommand = require('../../../../src/commands/runtime/api/list.js')
const RuntimeBaseCommand = require('../../../../src/RuntimeBaseCommand.js')
const rtAction = 'routes.list'
const RuntimeLib = require('@adobe/aio-lib-runtime')
const { stdout } = require('stdout-stderr')

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
  const args = TheCommand.args
  expect(args).toBeDefined()
  expect(Object.keys(args).length).toEqual(3)

  expect(args.basePath).toBeDefined()
  expect(args.basePath.required).toBeFalsy()
  expect(args.basePath.description).toBeDefined()

  expect(args.relPath).toBeDefined()
  expect(args.relPath.required).toBeFalsy()
  expect(args.relPath.description).toBeDefined()

  expect(args.apiVerb).toBeDefined()
  expect(args.apiVerb.required).toBeFalsy()
  expect(args.apiVerb.options).toMatchObject(['get', 'post', 'put', 'patch', 'delete', 'head', 'options'])
  expect(args.apiVerb.description).toBeDefined()
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

  expect(flags.json).toBeDefined()
  expect(flags.json.description).toBeDefined()
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

    test('no required args (all are optional) - should not throw exception', () => {
      rtLib.mockResolvedFixture(rtAction, 'api/list.json')
      return expect(() => {
        return command.run()
      }).not.toThrow()
    })

    test('no required args (all are optional) - should not throw exception, --json flag', () => {
      rtLib.mockResolvedFixture(rtAction, 'api/list.json')
      stdout.stop()
      stdout.start()
      const cmd = new TheCommand(['--json'])
      return cmd.run()
        .then(() => {
          const expectedJson = fixtureJson('api/list.json')
          const output = stdout.output.trim()
          const jsonMatch = output.match(/\{[\s\S]*\}$/)
          const jsonOutput = jsonMatch ? jsonMatch[0] : output
          expect(JSON.parse(jsonOutput)).toMatchObject(expectedJson.apis[0].value.apidoc)
        })
        .finally(() => {
          stdout.stop()
        })
    })

    test('handles falsy argv gracefully', async () => {
      rtLib.mockResolvedFixture(rtAction, 'api/list.json')
      const cmd = new TheCommand([])
      const originalArgv = cmd.argv
      let argvAccessCount = 0
      Object.defineProperty(cmd, 'argv', {
        get: function () {
          argvAccessCount++
          return argvAccessCount === 1 ? undefined : originalArgv
        },
        configurable: true
      })
      return cmd.run()
        .then(() => {
          expect(argvAccessCount).toBeGreaterThan(0)
        })
    })

    test('error, throws exception', async () => {
      rtLib.mockRejected(rtAction, new Error('an error'))
      const error = ['failed to list the api', new Error('an error')]
      await expect(command.run()).rejects.toThrow()
      expect(handleError).toHaveBeenLastCalledWith(...error)
    })
  })
})
