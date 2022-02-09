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
const TheCommand = require('../../../../src/commands/runtime/activation/logs.js')
const RuntimeBaseCommand = require('../../../../src/RuntimeBaseCommand.js')
const RuntimeLib = require('@adobe/aio-lib-runtime')
const rtUtils = RuntimeLib.utils
const rtAction = 'activations.logs'
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
  const logName = TheCommand.args[0]
  expect(logName.name).toBeDefined()
  expect(logName.name).toEqual('activationId')
})

test('flags', async () => {
  const lFlag = TheCommand.flags.last
  expect(lFlag).toBeDefined()
  expect(lFlag.description).toBeDefined()
  expect(lFlag.char).toBe('l')

  const sFlag = TheCommand.flags.strip
  expect(sFlag).toBeDefined()
  expect(sFlag.description).toBeDefined()
  expect(sFlag.char).toBe('r')
})

describe('instance methods', () => {
  let command, handleError, rtLib
  beforeEach(async () => {
    command = new TheCommand([])
    handleError = jest.spyOn(command, 'handleError')
    rtLib = await RuntimeLib.init({ apihost: 'fakehost', api_key: 'fakekey' })
    rtLib.mockResolved('actions.client.options', '')
    rtLib.mockResolved('logForwarding.get', { adobe_io_runtime: { } })
    RuntimeLib.mockReset()
    RuntimeLib.printActionLogs.mockReset()
  })

  describe('run', () => {
    test('exists', async () => {
      expect(command.run).toBeInstanceOf(Function)
    })

    test('retrieve logs of an activation - no-results', () => {
      const cmd = rtLib.mockResolved(rtAction, { res: 'fake' })
      command.argv = ['12345']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith('12345')
          expect(stdout.output).toMatch('')
        })
    })

    test('retrieve logs of an activation - with-results', () => {
      const cmd = rtLib.mockResolved(rtAction, { logs: ['this is a log', 'so is this'] })
      command.argv = ['12345']
      return command.run()
        .then((res) => {
          expect(cmd).toHaveBeenCalledWith('12345')
          expect(rtUtils.printLogs).toHaveBeenCalledWith({ logs: ['this is a log', 'so is this'] }, false, command.log)
        })
    })

    test('retrieve logs of an activation --strip', () => {
      const cmd = rtLib.mockResolved(rtAction, { logs: ['line1', 'line2', '2019-10-11T19:08:57.298Z  stdout: login-success'] })
      command.argv = ['12345', '-r']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith('12345')
          expect(rtUtils.printLogs).toHaveBeenCalledWith({ logs: ['line1', 'line2', '2019-10-11T19:08:57.298Z  stdout: login-success'] }, true, command.log)
        })
    })

    test('throws error retrieve logs of an activation', async () => {
      rtLib.mockResolved('activations.list', [{ activationId: '12345' }])
      const cmd = rtLib.mockRejected(rtAction, new Error('Async error'))
      command.argv = ['12345']
      await expect(command.run()).rejects.toThrow()
      expect(cmd).toHaveBeenCalledWith('12345')
      expect(handleError).toHaveBeenCalledWith('failed to retrieve logs for activation', expect.any(Error))
    })

    test('retrieve last log (default)', () => {
      command.argv = []
      return command.run()
        .then(() => {
          expect(RuntimeLib.printActionLogs).toHaveBeenCalledWith(expect.anything(), expect.anything(), 1, expect.anything(), expect.anything(), expect.anything())
        })
    })

    test('retrieve last log -l', () => {
      command.argv = ['-l']
      return command.run()
        .then(() => {
          expect(RuntimeLib.printActionLogs).toHaveBeenCalledWith(expect.anything(), expect.anything(), 1, expect.anything(), expect.anything(), expect.anything())
        })
    })

    test('retrieve last logs - no-results', () => {
      command.argv = ['-l']
      return command.run()
        .then(() => {
          expect(RuntimeLib.printActionLogs).toHaveBeenCalledWith(expect.anything(), expect.anything(), 1, expect.anything(), expect.anything(), expect.anything())
          expect(stdout.output).toMatch('')
        })
    })

    test('retrieve last log --last', () => {
      command.argv = ['--last']
      return command.run()
        .then(() => {
          expect(RuntimeLib.printActionLogs).toHaveBeenCalledWith(expect.anything(), expect.anything(), 1, expect.anything(), expect.anything(), expect.anything())
        })
    })

    test('retrieve last --limit logs', () => {
      command.argv = ['--limit', '2']
      return command.run()
        .then(() => {
          expect(RuntimeLib.printActionLogs).toHaveBeenLastCalledWith(expect.anything(), expect.anything(), 2, expect.anything(), expect.anything(), expect.anything())
        })
    })

    test('manifest logs', () => {
      RuntimeLib.utils.setPaths.mockResolvedValue({
        manifestContent: {
          packages: {
            pkg1: {
              actions: {
                hello: {}
              }
            },
            pkg2: {
              actions: {
                hello2: {}
              }
            }
          }
        }
      })
      command.argv = ['-m']
      return command.run()
        .then(() => {
          expect(RuntimeLib.printActionLogs).toHaveBeenLastCalledWith(expect.anything(), expect.anything(), 1, ['pkg1/hello', 'pkg2/hello2'], expect.anything(), expect.anything())
        })
    })

    test('package logs', () => {
      RuntimeLib.utils.setPaths.mockResolvedValue({
        manifestContent: {
          packages: {
            pkg1: {
              actions: {
                hello: {}
              }
            },
            pkg2: {
              actions: {
                hello2: {}
              }
            }
          }
        }
      })
      command.argv = ['-p', 'pkg1']
      return command.run()
        .then(() => {
          expect(RuntimeLib.printActionLogs).toHaveBeenLastCalledWith(expect.anything(), expect.anything(), 1, ['pkg1/hello'], expect.anything(), expect.anything())
        })
    })

    test('package logs (package does not exist)', async () => {
      RuntimeLib.utils.setPaths.mockResolvedValue({
        manifestContent: {
          packages: {
            pkg1: {
              actions: {
                hello: {}
              }
            },
            pkg2: {
              actions: {
                hello2: {}
              }
            }
          }
        }
      })
      command.argv = ['-p', 'invalidpkg']
      await expect(command.run()).rejects.toThrow()
      expect(handleError).toHaveBeenCalledWith('Could not find package invalidpkg in manifest')
    })

    test('package logs (--deployed)', () => {
      RuntimeLib.utils.setPaths.mockResolvedValue({
        manifestContent: {
          packages: {
            pkg1: {
              actions: {
                hello: {}
              }
            },
            pkg2: {
              actions: {
                hello2: {}
              }
            }
          }
        }
      })
      command.argv = ['-p', 'pkg1', '--deployed']
      return command.run()
        .then(() => {
          expect(RuntimeLib.printActionLogs).toHaveBeenLastCalledWith(expect.anything(), expect.anything(), 1, ['pkg1/'], expect.anything(), expect.anything())
        })
    })

    test('action logs', () => {
      RuntimeLib.utils.setPaths.mockResolvedValue({
        manifestContent: {
          packages: {
            pkg1: {
              actions: {
                hello: {}
              }
            },
            pkg2: {
              actions: {
                hello2: {}
              }
            }
          }
        }
      })
      command.argv = ['-a', 'hello']
      return command.run()
        .then(() => {
          expect(RuntimeLib.printActionLogs).toHaveBeenLastCalledWith(expect.anything(), expect.anything(), 1, ['hello'], expect.anything(), expect.anything())
        })
    })

    test('retrieve last log - custom log forwarding setup', () => {
      rtLib.mockResolved('logForwarding.get', { custom_destination: { field: 'value' } })
      command.argv = []
      return command.run()
        .then(() => {
          expect(RuntimeLib.printActionLogs).not.toHaveBeenCalled()
          expect(stdout.output).toEqual(
            "Namespace is configured with custom log forwarding destination: 'custom_destination'. " +
            'Please use corresponding logging platform to view logs.\n'
          )
        })
    })

    test.each([
      [
        'multiple destinations',
        { custom_destination1: { field: 'value' }, custom_destination2: { field: 'value' } }
      ],
      [
        'empty',
        { }
      ],
      [
        'null',
        null
      ],
      [
        'array',
        []
      ],
      [
        'string',
        'result'
      ]
    ])('retrieve last log - wrong response (%s) for custom log forwarding', (test, serverResponse) => {
      rtLib.mockResolved('logForwarding.get', serverResponse)
      command.argv = []
      return command.run()
        .then(() => {
          expect(RuntimeLib.printActionLogs).toHaveBeenCalledTimes(1)
        })
    })
  })
})
