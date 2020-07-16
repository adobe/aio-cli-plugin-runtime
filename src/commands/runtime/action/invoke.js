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
const { createKeyValueObjectFromFlag, createKeyValueObjectFromFile } = require('@adobe/aio-lib-runtime').utils

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
        result: flags.result,
        headers: { 'X-OW-EXTRA-LOGGING': 'on' }
      })
      this.logJSON('', result)
    } catch (err) {
      // a blocking/result only invoke which errors produces a 502 http status code
      // and the promise will fail and enter this catch block due to the await above
      // so here, check if the error object contains an activation id (hence the
      // result of the synchronous invoke) and then either log it to console or
      // project the respose result if the result only flag is used.
      if (err.activationId) {
        this.log(`activation took too long, use activation id ${err.activationId} to check for completion.`)
      } else if (flags.result && err.error && err.error.response && err.error.response.result) {
        this.logJSON('', err.error.response.result)
      } else if (flags.blocking && err.error && err.error.activationId) {
        this.logJSON('', err.error)
      } else {
        this.handleError('failed to invoke the action', err)
      }
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
  param: flags.string({
    char: 'p',
    description: 'parameter values in KEY VALUE format', // help description for flag
    multiple: true // allow setting this flag multiple times
  }),
  'param-file': flags.string({
    char: 'P',
    description: 'FILE containing parameter values in JSON format' // help description for flag
  }),
  blocking: flags.boolean({
    char: 'b',
    description: 'blocking invoke', // help description for flag
    default: false
  }),
  result: flags.boolean({
    char: 'r',
    description: 'blocking invoke; show only activation result (unless there is a failure)', // help description for flag
    default: false
  })
}
ActionInvoke.description = 'Invokes an Action'

ActionInvoke.aliases = ['rt:action:invoke']

module.exports = ActionInvoke
