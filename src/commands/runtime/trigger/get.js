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

const RuntimeBaseCommand = require('../../../RuntimeBaseCommand')
const { parsePathPattern } = require('@adobe/aio-lib-runtime').utils

class TriggerGet extends RuntimeBaseCommand {
  async run () {
    const { args } = this.parse(TriggerGet)
    const triggerPath = args.triggerPath
    const [, namespace, name] = parsePathPattern(triggerPath)

    try {
      const ow = await this.wsk()
      const obj = { namespace, name }
      const result = await ow.triggers.get(obj)
      this.logJSON('', result)
    } catch (err) {
      this.handleError(`Unable to get trigger '${triggerPath}'`, err)
    }
  }
}

TriggerGet.flags = {
  ...RuntimeBaseCommand.flags
}

TriggerGet.args = [
  {
    name: 'triggerPath',
    required: true,
    description: 'The name/path of the trigger, in the format /NAMESPACE/NAME'
  }
]

TriggerGet.description = 'Get a trigger for Adobe I/O Runtime'

TriggerGet.aliases = [
  'rt:trigger:get'
]

module.exports = TriggerGet
