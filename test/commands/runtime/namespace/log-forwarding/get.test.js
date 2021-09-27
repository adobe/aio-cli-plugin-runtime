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

const RuntimeLib = require('@adobe/aio-lib-runtime')
const TheCommand = require('../../../../../src/commands/runtime/namespace/log-forwarding/get')
const { stdout } = require('stdout-stderr')

let command, rtLib
beforeEach(async () => {
  command = new TheCommand([])
  rtLib = await RuntimeLib.init({ apihost: 'fakehost', api_key: 'fakekey' })
})

test('get log forwarding settings', () => {
  return new Promise(resolve => {
    rtLib.logForwarding.get = jest.fn().mockReturnValue(fixtureJson('namespace/log-forwarding/get-remote.json'))
    return command.run()
      .then(() => {
        expect(stdout.output).toMatchFixtureIgnoreWhite('namespace/log-forwarding/get-result.txt')
        resolve()
      })
  })
})

test('failed to get log forwarding settings', async () => {
  rtLib.logForwarding.get = jest.fn().mockRejectedValue(new Error('mocked error'))
  await expect(command.run()).rejects.toThrow('failed to get log forwarding configuration: mocked error')
})
