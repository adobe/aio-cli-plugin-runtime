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

const { flags } = require('@oclif/command')
const { LogForwarding } = require('@adobe/aio-lib-runtime')
const RuntimeBaseCommand = require('../../../../../RuntimeBaseCommand')

class SplunkHecCommand extends RuntimeBaseCommand {
  async run () {
    const { flags } = this.parse(SplunkHecCommand)
    const options = await this.getOptions()
    const logForwarding = new LogForwarding(options.namespace, options.apihost, options.api_key)
    await logForwarding.setSplunkHec(
      flags.host,
      flags.port,
      flags.index,
      flags['hec-token']
    )
    this.log(`Log forwarding was set to splunk_hec for namespace '${options.namespace}'`)
  }
}

SplunkHecCommand.description = `Set log forwarding destination to Splunk HEC`

SplunkHecCommand.flags = {
  ...RuntimeBaseCommand.flags,
  host: flags.string({
    description: 'Host',
    required: true
  }),
  port: flags.string({
    description: 'Port',
    required: true
  }),
  index: flags.string({
    description: 'Index',
    required: true
  }),
  'hec-token': flags.string({
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
