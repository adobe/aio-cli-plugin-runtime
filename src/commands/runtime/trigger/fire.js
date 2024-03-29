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
const { getKeyValueObjectFromMergedParameters } = require('@adobe/aio-lib-runtime').utils
const { Flags } = require('@oclif/core')

class TriggerFire extends RuntimeBaseCommand {
  async run () {
    const { args, flags } = await this.parse(TriggerFire)

    try {
      const triggerParams = getKeyValueObjectFromMergedParameters(flags.param, flags['param-file'])
      const options = {
        name: args.triggerName,
        params: triggerParams
      }

      const ow = await this.wsk()
      const result = await ow.triggers.invoke(options)
      this.logJSON('', result)
    } catch (err) {
      await this.handleError('failed to fire the trigger', err)
    }
  }
}

TriggerFire.args = [
  {
    name: 'triggerName',
    required: true,
    description: 'The name of the trigger'
  }
]

TriggerFire.flags = {
  ...RuntimeBaseCommand.flags,
  param: Flags.string({
    char: 'p',
    description: 'parameter values in KEY VALUE format', // help description for flag
    multiple: true // allow setting this flag multiple times
  }),
  'param-file': Flags.string({
    char: 'P',
    description: 'FILE containing parameter values in JSON format' // help description for flag
  })
}

TriggerFire.description = 'Fire a trigger for Adobe I/O Runtime'

TriggerFire.aliases = [
  'rt:trigger:fire'
]

module.exports = TriggerFire
