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

const { Flags } = require('@oclif/core')
const RuntimeBaseCommand = require('../../../../../RuntimeBaseCommand')

class SplunkHecCommand extends RuntimeBaseCommand {
  async run () {
    const { flags } = await this.parse(SplunkHecCommand)
    const ow = await this.wsk()
    try {
      await ow.logForwarding.setDestination('splunk_hec', {
        host: flags.host,
        port: flags.port,
        index: flags.index,
        hec_token: flags['hec-token']
      })
      this.log('Log forwarding was set to splunk_hec for this namespace')
    } catch (e) {
      await this.handleError('failed to update log forwarding configuration', e)
    }
  }
}

SplunkHecCommand.description = 'Set log forwarding destination to Splunk HEC'

SplunkHecCommand.flags = {
  ...RuntimeBaseCommand.flags,
  host: Flags.string({
    description: 'Host',
    required: true
  }),
  port: Flags.string({
    description: 'Port',
    required: true
  }),
  index: Flags.string({
    description: 'Index',
    required: true
  }),
  'hec-token': Flags.string({
    description: 'HEC token',
    required: true
  })
}

SplunkHecCommand.aliases = [
  'runtime:ns:log-forwarding:set:splunk-hec',
  'runtime:ns:lf:set:splunk-hec',
  'runtime:namespace:lf:set:splunk-hec',
  'rt:namespace:log-forwarding:set:splunk-hec',
  'rt:namespace:lf:set:splunk-hec',
  'rt:ns:log-forwarding:set:splunk-hec',
  'rt:ns:lf:set:splunk-hec'
]

module.exports = SplunkHecCommand
