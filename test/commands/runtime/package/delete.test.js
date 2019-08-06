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
const TheCommand = require('../../../../src/commands/runtime/package/delete.js')
const RuntimeBaseCommand = require('../../../../src/RuntimeBaseCommand.js')
const ow = require('openwhisk')()
const owAction = 'packages.delete'

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
  const deleteName = TheCommand.args[0]
  expect(deleteName.name).toBeDefined()
  expect(deleteName.name).toEqual('packageName')
  expect(deleteName.required).toEqual(true)
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

    test('delete a package', () => {
      let cmd = ow.mockResolved(owAction, '')
      command.argv = ['packageName']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith('packageName')
          expect(stdout.output).toMatch('')
        })
    })

    test('delete a package --json', () => {
      let cmd = ow.mockResolved(owAction, '')
      command.argv = ['packageName', '--json']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith('packageName')
          expect(stdout.output).toMatch('')
        })
    })

    test('errors out on api error', (done) => {
      ow.mockRejected(owAction, new Error('an error'))
      command.argv = ['packageName']
      return command.run()
        .then(() => done.fail('does not throw error'))
        .catch(() => {
          expect(handleError).toHaveBeenLastCalledWith('failed to delete the package', new Error('an error'))
          done()
        })
    })
  })
})
