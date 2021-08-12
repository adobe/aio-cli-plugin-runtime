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

const { LogForwarding } = require('@adobe/aio-lib-runtime')
const RuntimeBaseCommand = require('../../../../RuntimeBaseCommand')

class GetCommand extends RuntimeBaseCommand {
  async run () {
    const options = await this.getOptions()
    const logForwarding = new LogForwarding(options.namespace, options.apihost, options.api_key)
    const res = await logForwarding.get()
    this.logJSON(`Log forwarding configuration for namespace '${options.namespace}':\n`, res)
  }
}

GetCommand.description = `Get log forwarding destination configuration`

GetCommand.flags = {
  ...RuntimeBaseCommand.flags
}

GetCommand.aliases = [
  'runtime:ns:log-forwarding:get',
  'runtime:ns:lf:get',
  'runtime:namespace:lf:get',
  'rt:namespace:log-forwarding:get',
  'rt:namespace:lf:get',
  'rt:ns:log-forwarding:get',
  'rt:ns:lf:get'
]

module.exports = GetCommand
