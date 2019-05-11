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
const TheCommand = require('../../../../src/commands/runtime/package/list.js')
const RuntimeBaseCommand = require('../../../../src/RuntimeBaseCommand.js')
const ow = require('openwhisk')()
const owAction = 'packages.list'

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
  expect(TheCommand.flags.limit.required).toBe(false)
  expect(TheCommand.flags.limit.hidden).toBe(false)
  expect(TheCommand.flags.limit.multiple).toBe(false)
  expect(TheCommand.flags.limit.char).toBe('l')
  expect(typeof TheCommand.flags.limit).toBe('object')
  expect(TheCommand.flags.skip.required).toBe(false)
  expect(TheCommand.flags.skip.multiple).toBe(false)
  expect(TheCommand.flags.skip.char).toBe('s')
  expect(typeof TheCommand.flags.skip).toBe('object')
})

test('args', async () => {
  const listName = TheCommand.args[0]
  expect(listName.name).toBeDefined()
  expect(listName.name).toEqual('namespace')
  expect(listName.required).toEqual(false)
})

describe('instance methods', () => {
  let command, handleError

  beforeEach(() => {
    command = new TheCommand([])
    handleError = jest.spyOn(command, 'handleError')
  })

  describe('run', () => {
    test('exists', async () => {
      expect(command.run).toBeInstanceOf(Function)
    })

    test('return list of packages', () => {
      let cmd = ow.mockResolvedFixture(owAction, 'package/list.json')
      command.argv = []
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          expect(stdout.output).toMatch('')
        })
    })

    test('return list of packages - no data exception', (done) => {
      ow.mockResolved(owAction, '')
      command.argv = []
      return command.run()
        .then(() => done.fail('does not throw error'))
        .catch((err) => {
          expect(err).toBeDefined()
          done()
        })
    })

    test('return list of packages --json', () => {
      let cmd = ow.mockResolved(owAction, '')
      command.argv = ['--json']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          expect(stdout.output).toMatch('')
        })
    })

    test('return list of packages with limits', () => {
      let cmd = ow.mockResolvedFixture(owAction, 'package/list.json')
      command.argv = ['--limit', '1']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({ 'limit': 1 })
          expect(stdout.output).toMatch('')
        })
    })

    test('return list of packages with namespace', () => {
      let cmd = ow.mockResolvedFixture(owAction, 'package/list.json')
      command.argv = ['nameSpaceName']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({ namespace: 'nameSpaceName' })
          expect(stdout.output).toMatch('')
        })
    })

    test('return list of packages with skip (no actions)', () => {
      let cmd = ow.mockResolvedFixture(owAction, 'package/list.json')
      command.argv = ['--skip', '3']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({ 'skip': 3 })
          expect(stdout.output).toMatch('')
        })
    })

    test('errors out on api error', (done) => {
      ow.mockRejected(owAction, new Error('an error'))
      return command.run()
        .then(() => done.fail('does not throw error'))
        .catch(() => {
          expect(handleError).toHaveBeenLastCalledWith('failed to list the packages', new Error('an error'))
          done()
        })
    })
  })
})
