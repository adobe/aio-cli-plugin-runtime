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

const TheCommand = require('../../../../src/commands/runtime/trigger/fire.js')
const RuntimeBaseCommand = require('../../../../src/RuntimeBaseCommand.js')
const ow = require('openwhisk')()
const { stdout } = require('stdout-stderr')
const owAction = 'triggers.invoke'

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
  const triggerName = TheCommand.args[0]

  expect(triggerName).toBeDefined()
  expect(triggerName.name).toEqual('triggerName')
  expect(triggerName.required).toEqual(true)
  expect(triggerName.description).toBeDefined()
})

test('base flags included in command flags',
  createTestBaseFlagsFunction(TheCommand, RuntimeBaseCommand)
)

test('flags', () => {
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
})

describe('instance methods', () => {
  let command

  beforeAll(() => {
    const fsJson = {
      'trigger/parameters.json': fixtureFile('trigger/parameters.json')
    }
    // merge the global fakeFileSystem with our new
    fakeFileSystem.addJson(fsJson)
  })

  afterAll(() => {
    // reset back to normal
    fakeFileSystem.reset()
  })

  beforeEach(() => {
    command = new TheCommand([])
  })

  describe('run', () => {
    test('exists', async () => {
      expect(command.run).toBeInstanceOf(Function)
    })

    test('no args - throws exception', (done) => {
      return command.run()
        .then(() => done.fail('does not throw error'))
        .catch((err) => {
          expect(err).toMatchObject(new Error('Missing 1 required arg:\ntriggerName  The name of the trigger\nSee more help with --help'))
          done()
        })
    })

    test('fire a simple trigger', () => {
      let cmd = ow.mockResolved(owAction, '')
      command.argv = ['trigger1']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({ 'name': 'trigger1', 'trigger': {} })
          expect(stdout.output).toMatch('')
        })
    })

    test('fire a simple trigger, error', (done) => {
      ow.mockRejected(owAction, new Error('some error'))
      command.argv = ['trigger1']
      return command.run()
        .then(() => done.fail('does not throw error'))
        .catch((err) => {
          expect(err).toMatchObject(new Error('failed to fire the trigger: some error'))
          done()
        })
    })

    test('fire a simple trigger, use param flag', () => {
      let cmd = ow.mockResolved(owAction, '')
      command.argv = ['trigger1', '--param', 'a', 'b', '--param', 'c', 'd']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({ 'name': 'trigger1',
            'trigger': {
              'parameters': [
                {
                  'key': 'a',
                  'value': 'b'
                },
                {
                  'key': 'c',
                  'value': 'd'
                }

              ]
            } })
          expect(stdout.output).toMatch('')
        })
    })

    test('fire a simple trigger, use param-file flag', () => {
      let cmd = ow.mockResolved(owAction, '')

      command.argv = ['trigger1', '--param-file', '/trigger/parameters.json']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({ 'name': 'trigger1',
            'trigger': {
              'parameters': [
                {
                  'key': 'param1',
                  'value': 'param1value'
                },
                {
                  'key': 'param2',
                  'value': 'param2value'
                }

              ]
            } })
          expect(stdout.output).toMatch('')
        })
    })
  })
})
