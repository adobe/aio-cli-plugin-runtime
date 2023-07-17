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

const inquirer = require('inquirer')
const RuntimeLib = require('@adobe/aio-lib-runtime')
const TheCommand = require('../../../../../src/commands/runtime/namespace/log-forwarding/set')
const { stdout } = require('stdout-stderr')

jest.mock('inquirer')

const dataFixtures = [
  ['adobe_io_runtime', undefined],
  ['azure_log_analytics', {
    customer_id: 'customer1',
    shared_key: 'key1',
    log_type: 'mylog'
  }],
  ['splunk_hec', {
    host: 'host1',
    port: 'port1',
    index: 'index1',
    hec_token: 'token1'
  }],
  ['new_relic', {
    base_uri: 'uri1',
    license_key: 'key1'
  }]
]

let command, prompt, rtLib

beforeEach(async () => {
  command = new TheCommand([])
  prompt = jest.fn()
  inquirer.prompt = prompt
  rtLib = await RuntimeLib.init({ apihost: 'fakehost', api_key: 'fakekey' })
  rtLib.logForwarding.getSupportedDestinations = jest.fn().mockReturnValue([{ value: 'destination', name: 'Destination' }])
  rtLib.logForwarding.getDestinationSettings = jest.fn().mockReturnValue({ key: 'value' })
})

test('choices contain all supported log destinations', async () => {
  prompt.mockResolvedValueOnce({ type: 'something' })
  await expect(command.run()).rejects.toThrow()
  expect(prompt).toHaveBeenNthCalledWith(1, [{
    name: 'type',
    message: 'select log forwarding destination',
    type: 'list',
    choices: [{ name: 'Destination', value: 'destination' }]
  }])
})

test.each(dataFixtures)('set log forwarding settings to %s (interactive)', async (destination, input) => {
  return new Promise(resolve => {
    const setCall = jest.fn()
    mockSelectedDestination(destination, setCall)
    if (input !== undefined) {
      mockDestinationConfig(input)
    }
    return command.run()
      .then(() => {
        expect(stdout.output).toMatch(`Log forwarding was set to ${destination} for this namespace`)
        expect(setCall).toBeCalledTimes(1)
        expect(setCall).toHaveBeenCalledWith(destination, input)
        resolve()
      })
  })
})

test.each(dataFixtures)('failed to set log forwarding settings to %s (interactive)', async (destination, input) => {
  mockSelectedDestination(destination, jest.fn().mockRejectedValue(new Error(`mocked error for ${destination}`)))
  if (input !== undefined) {
    mockDestinationConfig(input)
  }
  await expect(command.run()).rejects.toThrow(`Failed to update log forwarding configuration: mocked error for ${destination}`)
})

/** @private */
function mockSelectedDestination (dstName, fnCallback) {
  prompt.mockResolvedValueOnce({ type: dstName })
  rtLib.logForwarding.setDestination = fnCallback
}

/** @private */
function mockDestinationConfig (config) {
  prompt.mockResolvedValueOnce(config)
}
