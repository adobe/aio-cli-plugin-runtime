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

const TheCommand = require('../../../src/commands/runtime/index.js')
const RuntimeBaseCommand = require('../../../src/RuntimeBaseCommand.js')
const { Help } = require('@oclif/core')

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

test('flags', async () => {
  expect(Object.keys(TheCommand.flags)).toMatchObject(Object.keys(RuntimeBaseCommand.flags))
})

test('args', async () => {
  if (TheCommand.args === undefined) {
    expect(TheCommand.args).toBeUndefined()
  } else {
    expect(Object.keys(TheCommand.args).length).toEqual(0)
  }
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

    test('returns help file for runtime command', () => {
      const spy = jest.spyOn(Help.prototype, 'showHelp').mockReturnValue(true)
      command.config = {}
      command.id = 'runtime' // Set the command ID for the test
      return command.run().then(() => {
        expect(spy).toHaveBeenCalledWith(['runtime'])
      })
    })
  })
})
