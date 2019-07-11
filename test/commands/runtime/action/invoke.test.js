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
const TheCommand = require('../../../../src/commands/runtime/action/invoke.js')
const RuntimeBaseCommand = require('../../../../src/RuntimeBaseCommand.js')
const ow = require('openwhisk')()
const owAction = 'actions.invoke'

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

test('flags', async () => {
  expect(TheCommand.flags.param.required).toBe(false)
  expect(TheCommand.flags.param.hidden).toBe(false)
  expect(TheCommand.flags.param.multiple).toBe(true)
  expect(TheCommand.flags.param.char).toBe('p')
  expect(typeof TheCommand.flags.param).toBe('object')
  expect(TheCommand.flags['param-file'].required).toBe(false)
  expect(TheCommand.flags['param-file'].hidden).toBe(false)
  expect(TheCommand.flags['param-file'].multiple).toBe(false)
  expect(TheCommand.flags['param-file'].char).toBe('P')
  expect(typeof TheCommand.flags['param-file']).toBe('object')
  expect(TheCommand.flags.blocking.required).toBe(false)
  expect(TheCommand.flags.blocking.hidden).toBe(false)
  expect(TheCommand.flags.blocking.multiple).toBe(false)
  expect(TheCommand.flags.blocking.char).toBe('b')
  expect(TheCommand.flags.blocking.default).toBe(false)
  expect(typeof TheCommand.flags.blocking).toBe('object')
  expect(TheCommand.flags.result.required).toBe(false)
  expect(TheCommand.flags.result.hidden).toBe(false)
  expect(TheCommand.flags.result.multiple).toBe(false)
  expect(TheCommand.flags.result.char).toBe('r')
  expect(TheCommand.flags.result.default).toBe(false)
  expect(typeof TheCommand.flags.result).toBe('object')
})

test('args', async () => {
  const invokeName = TheCommand.args[0]
  expect(invokeName.name).toBeDefined()
  expect(invokeName.name).toEqual('actionName')
  expect(invokeName.required).toEqual(true)
})

describe('instance methods', () => {
  let command

  beforeEach(() => {
    command = new TheCommand([])
  })

  afterAll(() => {
    // reset back to normal
    fakeFileSystem.reset()
  })

  describe('run', () => {
    test('exists', async () => {
      expect(command.run).toBeInstanceOf(Function)
    })

    test('invokes an action only with action name', () => {
      let cmd = ow.mockResolved(owAction, '')
      command.argv = ['hello']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            'name': 'hello',
            'blocking': false,
            'params': {},
            'result': false,
            'User-Agent': agentString
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('invokes an action with action name and params', () => {
      let cmd = ow.mockResolved(owAction, '')
      command.argv = ['hello', '--param', 'a', 'b', 'c', 'd']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name: 'hello',
            params: { a: 'b', c: 'd' },
            blocking: false,
            result: false,
            'User-Agent': agentString
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('invokes an action with action name, params and blocking', () => {
      let cmd = ow.mockResolved(owAction, '')
      command.argv = ['hello', '--param', 'a', 'b', '--param', 'c', 'd', '--blocking']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name: 'hello',
            params: { a: 'b', c: 'd' },
            blocking: true,
            result: false,
            'User-Agent': agentString
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('invokes an action with action name, params and result. Should still block', () => {
      let cmd = ow.mockResolved(owAction, '')
      command.argv = ['hello', '--result']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name: 'hello',
            blocking: true,
            params: {},
            result: true,
            'User-Agent': agentString
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('invokes an action with all flags', () => {
      let cmd = ow.mockResolved(owAction, '')
      command.argv = ['hello', '--param', 'a', 'b', '--param', 'c', 'd', '--blocking', '--result']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name: 'hello',
            params: { a: 'b', c: 'd' },
            blocking: true,
            result: true,
            'User-Agent': agentString
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('invokes an action with all flags and --param-file', () => {
      let cmd = ow.mockResolved(owAction, '')
      const json = {
        'parameters.json': fixtureFile('trigger/parameters.json')
      }
      fakeFileSystem.addJson({
        '/action': json
      })
      command.argv = ['hello', '--param-file', '/action/parameters.json', '--blocking', '--result']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name: 'hello',
            params: { param1: 'param1value', 'param2': 'param2value' },
            blocking: true,
            result: true,
            'User-Agent': agentString
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('tests for incorrect parameters', (done) => {
      ow.mockRejected(owAction, '')
      command.argv = ['hello', '--param', 'a', 'b', 'c', '--blocking']
      return command.run()
        .then(() => done.fail('does not throw error'))
        .catch((err) => {
          expect(err).toMatchObject(new Error('failed to invoke the action: Please provide correct values for flags'))
          done()
        })
    })

    test('errors out on api error', (done) => {
      ow.mockRejected(owAction, new Error('an error'))
      command.argv = ['hello']
      return command.run()
        .then(() => done.fail('does not throw error'))
        .catch((err) => {
          expect(err).toMatchObject(new Error('failed to invoke the action: an error'))
          done()
        })
    })
  })
})
