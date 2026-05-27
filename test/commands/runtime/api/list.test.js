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
          const parsed = JSON.parse(jsonOutput)
          const { apis } = expectedJson
          const gwApiUrl = apis[0].value.gwApiUrl
          // apidoc structure preserved
          expect(parsed.basePath).toEqual(apis[0].value.apidoc.basePath)
          expect(parsed.info).toMatchObject(apis[0].value.apidoc.info)
          expect(parsed.swagger).toEqual(apis[0].value.apidoc.swagger)
          // x-openwhisk.url updated with actual gateway URL (was "not-used")
          expect(parsed.paths['/mypath'].get['x-openwhisk'].url).toEqual(`${gwApiUrl}/mypath`)
        })
        .finally(() => {
          stdout.stop()
        })
    })

    test('--json flag, operation without x-openwhisk leaves url unchanged', () => {
      rtLib.mockResolved(rtAction, {
        apis: [{
          value: {
            gwApiUrl: 'https://example.com/api',
            apidoc: {
              basePath: '/test',
              info: { title: 'test', version: '1.0.0' },
              swagger: '2.0',
              paths: {
                '/mypath': {
                  get: {
                    operationId: 'testOp',
                    responses: { default: { description: 'Default response' } }
                    // no x-openwhisk field
                  }
                }
              }
            }
          }
        }]
      })
      stdout.stop()
      stdout.start()
      const cmd = new TheCommand(['--json'])
      return cmd.run()
        .then(() => {
          const output = stdout.output.trim()
          const jsonMatch = output.match(/\{[\s\S]*\}$/)
          const parsed = JSON.parse(jsonMatch ? jsonMatch[0] : output)
          // operation without x-openwhisk should be left intact
          expect(parsed.paths['/mypath'].get).not.toHaveProperty('x-openwhisk')
        })
        .finally(() => {
          stdout.stop()
        })
    })

    test('--json flag, result.apis is null returns {}', () => {
      rtLib.mockResolved(rtAction, { apis: null })
      stdout.stop()
      stdout.start()
      const cmd = new TheCommand(['--json'])
      return cmd.run()
        .then(() => {
          const output = stdout.output.trim()
          const jsonMatch = output.match(/\{[\s\S]*\}$/)
          const parsed = JSON.parse(jsonMatch ? jsonMatch[0] : output)
          expect(parsed).toEqual({})
        })
        .finally(() => {
          stdout.stop()
        })
    })

    test('--json flag, non-object operation value is skipped safely', () => {
      rtLib.mockResolved(rtAction, {
        apis: [{
          value: {
            gwApiUrl: 'https://example.com/api',
            apidoc: {
              basePath: '/test',
              paths: {
                '/mypath': {
                  get: true
                }
              }
            }
          }
        }]
      })
      stdout.stop()
      stdout.start()
      const cmd = new TheCommand(['--json'])
      return cmd.run()
        .then(() => {
          const output = stdout.output.trim()
          const jsonMatch = output.match(/\{[\s\S]*\}$/)
          const parsed = JSON.parse(jsonMatch ? jsonMatch[0] : output)
          expect(parsed.paths['/mypath'].get).toEqual(true)
        })
        .finally(() => {
          stdout.stop()
        })
    })

    test('--json flag, api.value.apidoc is missing returns {}', () => {
      rtLib.mockResolved(rtAction, { apis: [{ value: {} }] })
      stdout.stop()
      stdout.start()
      const cmd = new TheCommand(['--json'])
      return cmd.run()
        .then(() => {
          const output = stdout.output.trim()
          const jsonMatch = output.match(/\{[\s\S]*\}$/)
          const parsed = JSON.parse(jsonMatch ? jsonMatch[0] : output)
          expect(parsed).toEqual({})
        })
        .finally(() => {
          stdout.stop()
        })
    })

    test('--json flag, api.value.apidoc.paths is missing returns apidoc without paths', () => {
      rtLib.mockResolved(rtAction, { apis: [{ value: { gwApiUrl: 'https://example.com', apidoc: { basePath: '/test' } } }] })
      stdout.stop()
      stdout.start()
      const cmd = new TheCommand(['--json'])
      return cmd.run()
        .then(() => {
          const output = stdout.output.trim()
          const jsonMatch = output.match(/\{[\s\S]*\}$/)
          const parsed = JSON.parse(jsonMatch ? jsonMatch[0] : output)
          expect(parsed.basePath).toEqual('/test')
        })
        .finally(() => {
          stdout.stop()
        })
    })

    test('--json flag, empty result.apis returns {}', () => {
      rtLib.mockResolved(rtAction, { apis: [] })
      stdout.stop()
      stdout.start()
      const cmd = new TheCommand(['--json'])
      return cmd.run()
        .then(() => {
          const output = stdout.output.trim()
          const jsonMatch = output.match(/\{[\s\S]*\}$/)
          const parsed = JSON.parse(jsonMatch ? jsonMatch[0] : output)
          expect(parsed).toEqual({})
        })
        .finally(() => {
          stdout.stop()
        })
    })

    test('--json flag, does not mutate the SDK response object', () => {
      const fixture = fixtureJson('api/list.json')
      rtLib.mockResolved(rtAction, fixture)
      const originalUrl = fixture.apis[0].value.apidoc.paths['/mypath'].get['x-openwhisk'].url
      stdout.stop()
      stdout.start()
      const cmd = new TheCommand(['--json'])
      return cmd.run()
        .then(() => {
          expect(fixture.apis[0].value.apidoc.paths['/mypath'].get['x-openwhisk'].url).toEqual(originalUrl)
        })
        .finally(() => {
          stdout.stop()
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
