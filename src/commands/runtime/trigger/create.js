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

const DeployServiceCommand = require('../../../DeployServiceCommand')
const { getKeyValueArrayFromMergedParameters } = require('@adobe/aio-lib-runtime').utils
const { Flags } = require('@oclif/core')

class TriggerCreate extends DeployServiceCommand {
  isUpdate () { return false }

  async run () {
    const { args, flags } = await this.parse(TriggerCreate)

    try {
      const triggerPackage = getKeyValueArrayFromMergedParameters(flags.param, flags['param-file']) || []
      const annotationParams = getKeyValueArrayFromMergedParameters(flags.annotation, flags['annotation-file']) || []

      // triggerParams.parameters is expected to be passed as an array of key value pairs
      // For example : [{key : 'Your key 1' , value: 'Your value 1'}, {key : 'Your key 2' , value: 'Your value 2'} ]
      const triggerParams = {}
      if (triggerPackage.length) {
        triggerParams.parameters = triggerPackage
      }
      if (Object.keys(annotationParams).length) {
        triggerParams.annotations = annotationParams
      }
      // TODO: Updating a feed is not supported as per wsk cli. Need to check if we can still support it.
      if (flags.feed && !this.isUpdate()) {
        triggerParams.feed = flags.feed
      }

      const options = {
        name: args.triggerName,
        trigger: triggerParams
      }

      const ow = await this.wsk()
      const method = this.isUpdate() ? 'update' : 'create'
      await ow.triggers[method](options)
    } catch (err) {
      const method = this.isUpdate() ? 'update' : 'create'
      await this.handleError(`failed to ${method} the trigger`, err)
    }
  }
}

TriggerCreate.args = [
  {
    name: 'triggerName',
    required: true,
    description: 'The name of the trigger'
  }
]

TriggerCreate.flags = {
  ...DeployServiceCommand.flags,
  param: Flags.string({
    char: 'p',
    description: 'parameter values in KEY VALUE format', // help description for flag
    multiple: true // allow setting this flag multiple times
  }),
  'param-file': Flags.string({
    char: 'P',
    description: 'FILE containing parameter values in JSON format' // help description for flag
  }),
  annotation: Flags.string({
    char: 'a',
    description: 'annotation values in KEY VALUE format', // help description for flag
    multiple: true // allow setting this flag multiple times
  }),
  'annotation-file': Flags.string({
    char: 'A',
    description: 'FILE containing annotation values in JSON format' // help description for flag
  }),
  feed: Flags.string({
    char: 'f',
    description: 'trigger feed ACTION_NAME'
  })
}

TriggerCreate.description = 'Create a trigger for Adobe I/O Runtime'

TriggerCreate.aliases = [
  'rt:trigger:create'
]

module.exports = TriggerCreate
