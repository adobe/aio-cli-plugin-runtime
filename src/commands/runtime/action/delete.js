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
const { Flags } = require('@oclif/core')

class ActionDelete extends DeployServiceCommand {
  async run () {
    const { flags, args } = await this.parse(ActionDelete)
    const name = args.actionName
    try {
      const ow = await this.wsk()
      const result = await ow.actions.delete(name)
      if (flags.json) {
        this.logJSON('', result)
      }
    } catch (err) {
      await this.handleError('failed to delete the action', err)
    }
  }
}

ActionDelete.args = [
  {
    name: 'actionName',
    required: true
  }
]

ActionDelete.flags = {
  ...DeployServiceCommand.flags,
  json: Flags.boolean({
    description: 'output raw json'
  })
}

ActionDelete.description = 'Deletes an Action'

ActionDelete.aliases = ['runtime:action:del',
  'rt:action:delete',
  'rt:action:del']

module.exports = ActionDelete
