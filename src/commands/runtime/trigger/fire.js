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
const { createKeyValueArrayFromFlag, createKeyValueArrayFromFile } = require('@adobe/aio-lib-runtime').utils
const { flags } = require('@oclif/command')

class TriggerFire extends RuntimeBaseCommand {
  async run () {
    const { args, flags } = this.parse(TriggerFire)

    try {
      let triggerPackage = []
      if (flags.param) {
      // each --param flag expects two values ( a key and a value ). Multiple --param flags can be passed
      // For example : aio runtime:package:create --param name "foo" --param city "bar"
        triggerPackage = createKeyValueArrayFromFlag(flags.param)
      } else if (flags['param-file']) {
        triggerPackage = createKeyValueArrayFromFile(flags['param-file'])
      }

      // triggerParams.parameters is expected to be passed as an array of key value pairs
      // For example : [{key : 'Your key 1' , value: 'Your value 1'}, {key : 'Your key 2' , value: 'Your value 2'} ]
      const triggerParams = {}
      if (triggerPackage.length) {
        triggerParams.parameters = triggerPackage
      }

      const options = {
        name: args.triggerName,
        params: triggerParams
      }

      const ow = await this.wsk()
      const result = await ow.triggers.invoke(options)
      this.logJSON('', result)
    } catch (err) {
      this.handleError('failed to fire the trigger', err)
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
  param: flags.string({
    char: 'p',
    description: 'parameter values in KEY VALUE format', // help description for flag
    multiple: true // allow setting this flag multiple times
  }),
  'param-file': flags.string({
    char: 'P',
    description: 'FILE containing parameter values in JSON format' // help description for flag
  })
}

TriggerFire.description = 'Fire a trigger for Adobe I/O Runtime'

TriggerFire.aliases = [
  'rt:trigger:fire'
]

module.exports = TriggerFire
