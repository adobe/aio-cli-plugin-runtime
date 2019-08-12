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
const { flags } = require('@oclif/command')
const { createKeyValueObjectFromFlag, createKeyValueObjectFromFile } = require('../../../runtime-helpers')

class ActionInvoke extends RuntimeBaseCommand {
  async run () {
    const { args, flags } = this.parse(ActionInvoke)
    const name = args.actionName
    let paramsAction = {}
    try {
      if (flags.param) {
        // each --param flag expects two values ( a key and a value ). Multiple --parm flags can be passed
        // For example : aio runtime:action:create --param name "foo" --param city "bar"
        paramsAction = createKeyValueObjectFromFlag(flags.param)
      } else if (flags['param-file']) {
        paramsAction = createKeyValueObjectFromFile(flags['param-file'])
      }
      const ow = await this.wsk()
      const result = await ow.actions.invoke({
        name,
        params: paramsAction,
        blocking: flags.blocking || flags.result,
        result: flags.result
      })
      this.logJSON('', result)
    } catch (err) {
      this.handleError('failed to invoke the action', err)
    }
  }
}

ActionInvoke.args = [
  {
    name: 'actionName',
    required: true
  }
]

ActionInvoke.flags = {
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
  'blocking': flags.boolean({
    char: 'b',
    description: 'blocking invoke', // help description for flag
    hidden: false, // hide from help
    multiple: false, // allow setting this flag multiple times
    required: false,
    default: false
  }),
  'result': flags.boolean({
    char: 'r',
    description: 'blocking invoke; show only activation result (unless there is a failure)', // help description for flag
    hidden: false, // hide from help
    multiple: false, // allow setting this flag multiple times
    required: false,
    default: false
  })
}
ActionInvoke.description = 'Invokes an Action'

ActionInvoke.aliases = ['rt:action:invoke']

module.exports = ActionInvoke
