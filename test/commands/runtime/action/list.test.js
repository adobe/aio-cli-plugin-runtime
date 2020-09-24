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
const TheCommand = require('../../../../src/commands/runtime/action/list.js')
const RuntimeBaseCommand = require('../../../../src/RuntimeBaseCommand.js')
const RuntimeLib = require('@adobe/aio-lib-runtime')
const rtUtils = RuntimeLib.utils
const rtAction = 'actions.list'

describe('List command meta', () => {
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
    expect(TheCommand.flags).toMatchObject({
      limit: {
        char: 'l',
        description: expect.any(String)
      },
      skip: {
        char: 's',
        description: expect.any(String)
      }
    })
  })

  test('args', async () => {
    expect(TheCommand.args).toBeDefined()
  })
})

describe('instance methods', () => {
  let command, handleError, rtLib

  beforeEach(async () => {
    command = new TheCommand([])
    handleError = jest.spyOn(command, 'handleError')
    rtLib = await RuntimeLib.init({ apihost: 'fakehost', api_key: 'fakekey' })
    rtLib.mockResolved('actions.client.options', '')
    rtLib.namespaces.list = () => Promise.resolve(['53444_41603'])
    RuntimeLib.mockReset()
  })

  describe('run', () => {
    test('exists', async () => {
      expect(command.run).toBeInstanceOf(Function)
    })

    test('return list of actions with limits', () => {
      const cmd = rtLib.mockResolvedFixture(rtAction, 'action/list.json')
      command.argv = ['--limit', '1']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith(expect.objectContaining({ limit: 1 }))
          const dates = JSON.parse(fixtureFile('action/list.json')).map(_ => _.updated)
          expect(stdout.output).toMatch(fixtureFileWithTimeZoneAdjustment('action/list-output.txt', dates))
        })
    })

    test('return list of actions', () => {
      const cmd = rtLib.mockResolvedFixture(rtAction, 'action/list.json')
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          const dates = JSON.parse(fixtureFile('action/list.json')).map(_ => _.updated)
          expect(stdout.output).toMatch(fixtureFileWithTimeZoneAdjustment('action/list-output.txt', dates))
        })
    })

    test('return list of web actions', () => {
      const cmd = rtLib.mockResolvedFixture(rtAction, 'action/list3.json')
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          const dates = JSON.parse(fixtureFile('action/list3.json')).map(_ => _.updated)
          expect(stdout.output).toMatch(fixtureFileWithTimeZoneAdjustment('action/list-output-3.txt', dates))
        })
    })

    test('return list of actions in a package', () => {
      const cmd = rtLib.mockResolvedFixture(rtAction, 'action/list.json')
      command.argv = ['somepackage']
      rtUtils.parsePackageName.mockReturnValue({ name: 'hola', namespace: undefined })
      return command.run()
        .then(() => {
          expect(rtUtils.parsePackageName).toHaveBeenCalledWith('somepackage')
          expect(cmd).toHaveBeenCalledWith(expect.objectContaining({ id: 'hola/' }))
          const dates = JSON.parse(fixtureFile('action/list.json')).map(_ => _.updated)
          expect(stdout.output).toMatch(fixtureFileWithTimeZoneAdjustment('action/list-output.txt', dates))
        })
    })

    test('return list of actions in a /ns/pkg', () => {
      const cmd = rtLib.mockResolvedFixture(rtAction, 'action/list.json')
      command.argv = ['somepackage']
      rtUtils.parsePackageName.mockReturnValue({ name: 'hola', namespace: 'bonjour' })
      return command.run()
        .then(() => {
          expect(rtUtils.parsePackageName).toHaveBeenCalledWith('somepackage')
          expect(cmd).toHaveBeenCalledWith(expect.objectContaining({ id: 'hola/', namespace: 'bonjour' }))
          const dates = JSON.parse(fixtureFile('action/list.json')).map(_ => _.updated)
          expect(stdout.output).toMatch(fixtureFileWithTimeZoneAdjustment('action/list-output.txt', dates))
        })
    })

    test('return list of actions - coverage (public/private)', () => {
      const json = fixtureJson('action/list2.json')
      json[0].publish = true

      const cmd = rtLib.mockResolved(rtAction, json)
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          const dates = JSON.parse(fixtureFile('action/list2.json')).map(_ => _.updated)
          expect(stdout.output).toMatch(fixtureFileWithTimeZoneAdjustment('action/list-output-2.txt', dates))
        })
    })

    test('return list of actions, --json flag', () => {
      const cmd = rtLib.mockResolvedFixture(rtAction, 'action/list.json')
      command.argv = ['--json']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          expect(JSON.parse(stdout.output)).toMatchFixtureJson('action/list.json')
        })
    })

    test('return list of actions with skip (no actions)', () => {
      const cmd = rtLib.mockResolved(rtAction, [])
      command.argv = ['--skip', '3']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith(expect.objectContaining({ skip: 3 }))
          expect(stdout.output).toMatch('')
        })
    })

    test('reject invalid package name', () => {
      return new Promise((resolve, reject) => {
        command.argv = ['/']
        rtUtils.parsePackageName.mockImplementation(() => { throw new Error('parse error') })
        return command.run()
          .then(() => reject(new Error('does not throw error')))
          .catch(() => {
            expect(handleError).toHaveBeenLastCalledWith('failed to list the actions', new Error('parse error'))
            resolve()
          })
      })
    })
    test('errors out on api error', () => {
      return new Promise((resolve, reject) => {
        rtLib.mockRejected(rtAction, new Error('an error'))
        return command.run()
          .then(() => reject(new Error('does not throw error')))
          .catch(() => {
            expect(handleError).toHaveBeenLastCalledWith('failed to list the actions', new Error('an error'))
            resolve()
          })
      })
    })

    test('return list of actions with annotated kinds', () => {
      const data = [
        {
          annotations: [
            {
              key: 'web-export',
              value: true
            },
            {
              key: 'raw-http',
              value: true
            },
            {
              key: 'exec',
              value: 'nodejs:10-lambda'
            }
          ],
          exec: {
            binary: false
          },
          limits: {
            concurrency: 1,
            logs: 10,
            memory: 256,
            timeout: 60000
          },
          name: 'hello',
          namespace: '53444_41603',
          publish: false,
          updated: 1549408742750,
          version: '0.0.2'
        }
      ]
      rtLib.mockResolved(rtAction, data)
      return command.run()
        .then(() => {
          expect(stdout.output).toMatch(fixtureFileWithTimeZoneAdjustment('action/list-kind-output.txt', data[0].updated))
        })
    })

    test('return list of actions, --name-sort flag', () => {
      const cmd = rtLib.mockResolvedFixture(rtAction, 'action/list-name-sort.json')
      command.argv = ['--name']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          const dates = JSON.parse(fixtureFile('action/list-name-sort.json')).map(_ => _.updated)
          expect(stdout.output).toMatch(fixtureFileWithTimeZoneAdjustment('action/list-name-sort-output.txt', dates))
        })
    })

    test('return action count == 0', () => {
      rtLib.mockResolved(rtAction, Promise.resolve({ actions: 0 }))
      command.argv = ['--count']
      return command.run()
        .then(() => {
          expect(stdout.output).toEqual('You have 0 actions in this namespace.\n')
        })
    })

    test('return action count', () => {
      rtLib.mockResolved(rtAction, Promise.resolve({ actions: 1 }))
      command.argv = ['--count']
      return command.run()
        .then(() => {
          expect(stdout.output).toEqual('You have 1 action in this namespace.\n')
        })
    })

    test('return actions count', () => {
      rtLib.mockResolved(rtAction, Promise.resolve({ actions: 2 }))
      command.argv = ['--count']
      return command.run()
        .then(() => {
          expect(stdout.output).toEqual('You have 2 actions in this namespace.\n')
        })
    })

    test('return action count --json', () => {
      rtLib.mockResolved(rtAction, Promise.resolve({ actions: 2 }))
      command.argv = ['--count', '--json']
      return command.run()
        .then(() => {
          expect(JSON.parse(stdout.output)).toEqual({ actions: 2 })
        })
    })
  })
})
