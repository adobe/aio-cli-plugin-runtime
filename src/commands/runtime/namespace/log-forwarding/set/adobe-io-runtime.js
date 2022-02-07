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

const RuntimeBaseCommand = require('../../../../../RuntimeBaseCommand')

class AdobeIoRuntimeCommand extends RuntimeBaseCommand {
  async run () {
    const ow = await this.wsk()
    try {
      await ow.logForwarding.setDestination('adobe_io_runtime', {})
      this.log('Log forwarding was set to adobe_io_runtime for this namespace')
    } catch (e) {
      this.handleError('failed to update log forwarding configuration', e)
    }
  }
}

AdobeIoRuntimeCommand.description = 'Set log forwarding destination to Adobe I/O Runtime (Logs will be accessible via aio CLI)'

AdobeIoRuntimeCommand.flags = {
  ...RuntimeBaseCommand.flags
}

AdobeIoRuntimeCommand.aliases = [
  'runtime:ns:log-forwarding:set:adobe-io-runtime',
  'runtime:ns:lf:set:adobe-io-runtime',
  'runtime:namespace:lf:set:adobe-io-runtime',
  'rt:namespace:log-forwarding:set:adobe-io-runtime',
  'rt:namespace:lf:set:adobe-io-runtime',
  'rt:ns:log-forwarding:set:adobe-io-runtime',
  'rt:ns:lf:set:adobe-io-runtime'
]

module.exports = AdobeIoRuntimeCommand
