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

const RuntimeBaseCommand = require('../../../../RuntimeBaseCommand')

class ErrorsCommand extends RuntimeBaseCommand {
  async run () {
    const ow = await this.wsk()
    try {
      const res = await ow.logForwarding.getErrors()
      const destinationMessage = res.configured_forwarder !== undefined ? ` for the last configured destination '${res.configured_forwarder}'` : ''
      if (res.errors && res.errors.length > 0) {
        this.logJSON(`Log forwarding errors${destinationMessage}:\n`, res.errors)
      } else {
        this.log(`No log forwarding errors${destinationMessage}`)
      }
    } catch (e) {
      this.handleError('Failed to get log forwarding errors', e)
    }
  }
}

ErrorsCommand.description = 'Get log forwarding errors'

ErrorsCommand.flags = {
  ...RuntimeBaseCommand.flags
}

ErrorsCommand.aliases = [
  'runtime:ns:log-forwarding:errors',
  'runtime:ns:lf:errors',
  'runtime:namespace:lf:errors',
  'rt:namespace:log-forwarding:errors',
  'rt:namespace:lf:errors',
  'rt:ns:log-forwarding:errors',
  'rt:ns:lf:errors'
]

module.exports = ErrorsCommand
