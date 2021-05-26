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
const RuntimeLib = require('@adobe/aio-lib-runtime')
const rtAction = 'packages.list'

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
  expect(TheCommand.flags.limit.char).toBe('l')
  expect(typeof TheCommand.flags.limit).toBe('object')
  expect(TheCommand.flags.skip.char).toBe('s')
  expect(typeof TheCommand.flags.skip).toBe('object')
})

test('args', async () => {
  const listName = TheCommand.args[0]
  expect(listName.name).toBeDefined()
  expect(listName.name).toEqual('namespace')
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

    test('return list of packages', () => {
      const cmd = rtLib.mockResolvedFixture(rtAction, 'package/list.json')
      command.argv = []
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          expect(stdout.output).toMatch('')
        })
    })

    test('return list of packages - no data exception', () => {
      return new Promise((resolve, reject) => {
        rtLib.mockResolved(rtAction, '')
        command.argv = []
        return command.run()
          .then(() => reject(new Error('does not throw error')))
          .catch((err) => {
            expect(err).toBeDefined()
            resolve()
          })
      })
    })

    test('return list of packages --json', () => {
      const cmd = rtLib.mockResolved(rtAction, '')
      command.argv = ['--json']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          expect(stdout.output).toMatch('')
        })
    })

    test('return list of packages with limits', () => {
      const cmd = rtLib.mockResolvedFixture(rtAction, 'package/list.json')
      command.argv = ['--limit', '1']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({ limit: 1 })
          expect(stdout.output).toMatch('')
        })
    })

    test('return list of packages with namespace', () => {
      const cmd = rtLib.mockResolvedFixture(rtAction, 'package/list.json')
      command.argv = ['nameSpaceName']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({ namespace: 'nameSpaceName' })
          expect(stdout.output).toMatch('')
        })
    })

    test('return list of packages with skip (no actions)', () => {
      const cmd = rtLib.mockResolvedFixture(rtAction, 'package/list.json')
      command.argv = ['--skip', '3']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({ skip: 3 })
          expect(stdout.output).toMatch('')
        })
    })

    test('errors out on api error', () => {
      return new Promise((resolve, reject) => {
        rtLib.mockRejected(rtAction, new Error('an error'))
        return command.run()
          .then(() => reject(new Error('does not throw error')))
          .catch(() => {
            expect(handleError).toHaveBeenLastCalledWith('failed to list the packages', new Error('an error'))
            resolve()
          })
      })
    })

    test('return list of packages, --name-sort flag', () => {
      const cmd = rtLib.mockResolvedFixture(rtAction, 'package/list.json')
      command.argv = ['--name-sort']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          const dates = JSON.parse(fixtureFile('package/list.json')).map(_ => _.updated)
          expect(stdout.output).toMatch(fixtureFileWithTimeZoneAdjustment('package/list-name-sort-output.txt', dates))
        })
    })

    test('return packages count == 0', () => {
      rtLib.mockResolved(rtAction, Promise.resolve({ packages: 0 }))
      command.argv = ['--count']
      return command.run()
        .then(() => {
          expect(stdout.output).toEqual('You have 0 packages in this namespace.\n')
        })
    })

    test('return package count', () => {
      rtLib.mockResolved(rtAction, Promise.resolve({ packages: 1 }))
      command.argv = ['--count']
      return command.run()
        .then(() => {
          expect(stdout.output).toEqual('You have 1 package in this namespace.\n')
        })
    })

    test('return packages count', () => {
      rtLib.mockResolved(rtAction, Promise.resolve({ packages: 2 }))
      command.argv = ['--count']
      return command.run()
        .then(() => {
          expect(stdout.output).toEqual('You have 2 packages in this namespace.\n')
        })
    })

    test('return package count --json', () => {
      rtLib.mockResolved(rtAction, Promise.resolve({ packages: 2 }))
      command.argv = ['--count', '--json']
      return command.run()
        .then(() => {
          expect(JSON.parse(stdout.output)).toEqual({ packages: 2 })
        })
    })
  })
})
