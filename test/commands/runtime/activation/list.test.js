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
const TheCommand = require('../../../../src/commands/runtime/activation/list.js')
const RuntimeBaseCommand = require('../../../../src/RuntimeBaseCommand.js')
const ow = require('openwhisk')()
const owAction = 'activations.list'

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
  expect(TheCommand.flags).toEqual(
    expect.objectContaining({
      'limit': expect.any(Object),
      'skip': expect.any(Object),
      'since': expect.any(Object),
      'upto': expect.any(Object)
    }))
})

test('args', async () => {
  const logName = TheCommand.args[0]
  expect(logName.name).toBeDefined()
  expect(logName.name).toEqual('activationID')
  expect(logName.required).toEqual(false)
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

    test('return list of activations with limits', () => {
      let cmd = ow.mockResolved(owAction, '')
      command.argv = ['--limit', '3']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            'limit': 3,
            'User-Agent': agentString
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('return list of activations with skip', () => {
      let cmd = ow.mockResolved(owAction, '')
      command.argv = ['--skip', '3']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            'skip': 3,
            'User-Agent': agentString
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('return list of activations with --since', () => {
      let cmd = ow.mockResolved(owAction, '')
      command.argv = ['--since', '3']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            'since': 3,
            'User-Agent': agentString
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('return list of activations with --upto', () => {
      let cmd = ow.mockResolved(owAction, '')
      command.argv = ['--upto', '3']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            'upto': 3,
            'User-Agent': agentString
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('return list of actions with activation id', () => {
      let cmd = ow.mockResolved(owAction, '')
      command.argv = ['12345']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            'name': '12345',
            'User-Agent': agentString
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('return list of actions with activation id, --full flag', () => {
      let cmd = ow.mockResolved(owAction, '')
      command.argv = ['12345', '--full']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name: '12345',
            docs: true,
            'User-Agent': agentString
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('return list of actions with activation id --json', () => {
      let cmd = ow.mockResolved(owAction, '')
      command.argv = ['12345', '--json']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            'name': '12345',
            'User-Agent': agentString
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('return list of actions with activation id + data (cold)', () => {
      const data = [
        {
          'activationId': '12345',
          'annotations': [
            { 'key': 'path', 'value': '8888_9999/foo' },
            { 'key': 'kind', 'value': 'nodejs:10' },
            { 'key': 'initTime', 'value': 20 }
          ],
          'duration': 23,
          'name': 'foo',
          'namespace': '8888_9999',
          'start': 1558507178861,
          'statusCode': 0,
          'version': '0.0.1'
        }]
      let cmd = ow.mockResolved(owAction, data)
      command.argv = ['12345']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            name: '12345',
            'User-Agent': agentString
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('return list of actions with activation id + data (warm)', () => {
      const data = [
        {
          'activationId': '12345',
          'annotations': [
            { 'key': 'path', 'value': '8888_9999/foo' },
            { 'key': 'kind', 'value': 'nodejs:10' }
          // no initTime key
          ],
          'duration': 23,
          'name': 'foo',
          'namespace': '8888_9999',
          'start': 1558507178861,
          'statusCode': 0,
          'version': '0.0.1'
        }]
      let cmd = ow.mockResolved(owAction, data)
      command.argv = ['12345']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({
            'name': '12345',
            'User-Agent': agentString
          })
          expect(stdout.output).toMatch('')
        })
    })

    test('errors out on api error', (done) => {
      ow.mockRejected(owAction, new Error('an error'))
      return command.run()
        .then(() => done.fail('does not throw error'))
        .catch(() => {
          expect(handleError).toHaveBeenLastCalledWith('failed to list the activations', new Error('an error'))
          done()
        })
    })
  })
})
