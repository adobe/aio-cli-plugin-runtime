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

class NewRelicCommand extends RuntimeBaseCommand {
  async run () {
    const { flags } = await this.parse(NewRelicCommand)
    const ow = await this.wsk()
    try {
      await ow.logForwarding.setDestination('new_relic', {
        base_uri: flags['base-uri'],
        license_key: flags['license-key']
      })
      this.log('Log forwarding was set to new_relic for this namespace')
    } catch (e) {
      await this.handleError('failed to update log forwarding configuration', e)
    }
  }
}

NewRelicCommand.description = 'Set log forwarding destination to New Relic'

NewRelicCommand.flags = {
  ...RuntimeBaseCommand.flags,
  'base-uri': Flags.string({
    description: 'Base URI',
    required: true
  }),
  'license-key': Flags.string({
    description: 'License Key',
    required: true
  })
}

NewRelicCommand.aliases = [
  'runtime:ns:log-forwarding:set:new-relic',
  'runtime:ns:lf:set:new-relic',
  'runtime:namespace:lf:set:new-relic',
  'rt:namespace:log-forwarding:set:new-relic',
  'rt:namespace:lf:set:new-relic',
  'rt:ns:log-forwarding:set:new-relic',
  'rt:ns:lf:set:new-relic'
]

module.exports = NewRelicCommand
