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

class AzureLogAnalyticsCommand extends RuntimeBaseCommand {
  async run () {
    const { flags } = this.parse(AzureLogAnalyticsCommand)
    const options = await this.getOptions()
    const logForwarding = new LogForwarding(options.namespace, options.apihost, options.api_key)
    await logForwarding.setAzureLogAnalytics(
      flags['customer-id'],
      flags['shared-key'],
      flags['log-type']
    )
    this.log(`Log forwarding was set to azure_log_analytics for namespace '${options.namespace}'`)
  }
}

AzureLogAnalyticsCommand.description = `Set log forwarding destination to Azure Log Analytics`

AzureLogAnalyticsCommand.flags = {
  ...RuntimeBaseCommand.flags,
  'customer-id': flags.string({
    description: 'Customer ID',
    required: true
  }),
  'shared-key': flags.string({
    description: 'Shared key',
    required: true
  }),
  'log-type': flags.string({
    description: 'Log type',
    required: true
  })
}

AzureLogAnalyticsCommand.aliases = [
  'runtime:ns:log-forwarding:set:azure-log-analytics',
  'runtime:ns:lf:set:azure-log-analytics',
  'runtime:namespace:lf:set:azure-log-analytics',
  'rt:namespace:log-forwarding:set:azure-log-analytics',
  'rt:namespace:lf:set:azure-log-analytics',
  'rt:ns:log-forwarding:set:azure-log-analytics',
  'rt:ns:lf:set:azure-log-analytics'
]

module.exports = AzureLogAnalyticsCommand
