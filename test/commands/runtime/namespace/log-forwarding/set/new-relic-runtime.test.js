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
const TheCommand = require('../../../../../../src/commands/runtime/namespace/log-forwarding/set/new-relic')
const { stdout } = require('stdout-stderr')

let command, rtLib
beforeEach(async () => {
  command = new TheCommand([])
  rtLib = await RuntimeLib.init({ apihost: 'fakehost', api_key: 'fakekey' })
})

test('set log forwarding settings to new_relic', () => {
  return new Promise(resolve => {
    const setCall = jest.fn()
    rtLib.logForwarding.setDestination = setCall
    command.argv = ['--base-uri', 'uri1', '--license-key', 'key1']
    return command.run()
      .then(() => {
        expect(stdout.output).toMatch(/Log forwarding was set to new_relic for this namespace/)
        expect(setCall).toHaveBeenCalledTimes(1)
        expect(setCall).toHaveBeenCalledWith('new_relic', { base_uri: 'uri1', license_key: 'key1' })
        resolve()
      })
  })
})

test('failed to set log forwarding settings to new_relic', async () => {
  rtLib.logForwarding.setDestination = jest.fn().mockRejectedValue(new Error('mocked error'))
  command.argv = ['--base-uri', 'uri1', '--license-key', 'key1']
  await expect(command.run()).rejects.toThrow('failed to update log forwarding configuration: mocked error')
})
