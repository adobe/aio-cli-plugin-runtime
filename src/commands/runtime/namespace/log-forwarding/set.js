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
const RuntimeBaseCommand = require('../../../../RuntimeBaseCommand')

class SetCommand extends RuntimeBaseCommand {
  async run () {
    const responses = await inquirer.prompt([{
      name: 'type',
      message: 'select log forwarding destination',
      type: 'list',
      choices: [{ name: 'Adobe I/O Runtime', value: 'adobe_io_runtime' }, { name: 'Azure Log Analytics', value: 'azure_log_analytics' }, { name: 'Splunk HEC', value: 'splunk_hec' }]
    }])
    const type = responses.type
    if (this['set_' + type] === undefined) {
      throw new Error(`Unsupported destination type: '${type}'`)
    }
    const ow = await this.wsk()
    await this['set_' + type](ow.logForwarding)
    this.log(`Log forwarding was set to ${type} for this namespace`)
  }

  // eslint-disable-next-line camelcase
  async set_adobe_io_runtime (logForwarding) {
    await logForwarding.setAdobeIoRuntime()
  }

  // eslint-disable-next-line camelcase
  async set_azure_log_analytics (logForwarding) {
    const responses = await inquirer.prompt([
      {
        name: 'customer_id',
        message: 'customer ID'
      },
      {
        name: 'shared_key',
        message: 'shared key',
        type: 'password'
      },
      {
        name: 'log_type',
        message: 'log type'
      }
    ])

    await logForwarding.setAzureLogAnalytics(
      responses.customer_id,
      responses.shared_key,
      responses.log_type
    )
  }

  // eslint-disable-next-line camelcase
  async set_splunk_hec (logForwarding) {
    const responses = await inquirer.prompt([
      {
        name: 'host',
        message: 'host'
      },
      {
        name: 'port',
        message: 'port'
      },
      {
        name: 'index',
        message: 'index'
      },
      {
        name: 'hec_token',
        message: 'hec_token',
        type: 'password'
      }
    ])
    await logForwarding.setSplunkHec(
      responses.host,
      responses.port,
      responses.index,
      responses.hec_token
    )
  }
}

SetCommand.description = `Configure log forwarding destination (interactive)`

SetCommand.flags = {
  ...RuntimeBaseCommand.flags
}

SetCommand.aliases = [
  'runtime:ns:log-forwarding:set',
  'runtime:ns:lf:set',
  'runtime:namespace:lf:set',
  'rt:namespace:log-forwarding:set',
  'rt:namespace:lf:set',
  'rt:ns:log-forwarding:set',
  'rt:ns:lf:set'
]

module.exports = SetCommand
