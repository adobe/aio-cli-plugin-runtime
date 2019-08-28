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
const { createKeyValueArrayFromFlag, createKeyValueArrayFromFile } = require('../../../runtime-helpers')
const { flags } = require('@oclif/command')

class TriggerUpdate extends RuntimeBaseCommand {
  async run () {
    const { args, flags } = this.parse(TriggerUpdate)

    try {
      let triggerPackage = []
      if (flags.param) {
      // each --param flag expects two values ( a key and a value ). Multiple --param flags can be passed
      // For example : aio runtime:package:create --param name "foo" --param city "bar"
        triggerPackage = createKeyValueArrayFromFlag(flags.param)
      } else if (flags['param-file']) {
        triggerPackage = createKeyValueArrayFromFile(flags['param-file'])
      }
      let annotationParams = {}
      if (flags.annotation) {
      // Annotations that describe packages include : 'description' and 'parameters'
      // TODO -- should we check if annotation keys match description or parameters ?
        annotationParams = createKeyValueArrayFromFlag(flags.annotation)
      } else if (flags['annotation-file']) {
        annotationParams = createKeyValueArrayFromFile(flags['annotation-file'])
      }

      // triggerParams.parameters is expected to be passed as an array of key value pairs
      // For example : [{key : 'Your key 1' , value: 'Your value 1'}, {key : 'Your key 2' , value: 'Your value 2'} ]
      let triggerParams = {}
      if (triggerPackage.length) {
        triggerParams.parameters = triggerPackage
      }
      if (Object.keys(annotationParams).length) {
        triggerParams.annotations = annotationParams
      }

      let options = {
        name: args.triggerName,
        trigger: triggerParams
      }

      const ow = await this.wsk()
      await ow.triggers.update(options)
    } catch (err) {
      this.handleError('failed to update the trigger', err)
    }
  }
}

TriggerUpdate.args = [
  {
    name: 'triggerName',
    required: true,
    description: 'The name of the trigger'
  }
]

TriggerUpdate.flags = {
  ...RuntimeBaseCommand.flags,
  'param': flags.string({
    char: 'p',
    description: 'parameter values in KEY VALUE format', // help description for flag
    hidden: false, // hide from help
    multiple: true, // allow setting this flag multiple times
    required: false
  }),
  'param-file': flags.string({
    char: 'P',
    description: 'FILE containing parameter values in JSON format', // help description for flag
    hidden: false, // hide from help
    multiple: false, // allow setting this flag multiple times
    required: false
  }),
  'annotation': flags.string({
    char: 'a',
    description: 'annotation values in KEY VALUE format', // help description for flag
    hidden: false, // hide from help
    multiple: true, // allow setting this flag multiple times
    required: false
  }),
  'annotation-file': flags.string({
    char: 'A',
    description: 'FILE containing annotation values in JSON format', // help description for flag
    hidden: false, // hide from help
    multiple: false, // allow setting this flag multiple times
    required: false
  })
}

TriggerUpdate.description = 'Update or create a trigger for Adobe I/O Runtime'

TriggerUpdate.aliases = [
  'rt:trigger:update'
]

module.exports = TriggerUpdate
