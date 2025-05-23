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

class RuleDelete extends DeployServiceCommand {
  async run () {
    const { flags, args } = await this.parse(RuleDelete)
    try {
      const ow = await this.wsk()
      const RuleDeleteObject = { ...args }
      const deleteRule = await ow.rules.delete(RuleDeleteObject)
      if (flags.json) {
        this.logJSON('', deleteRule)
      }
    } catch (err) {
      await this.handleError('failed to delete rules', err)
    }
  }
}

RuleDelete.description = 'Delete a Rule'

RuleDelete.args = [
  {
    name: 'name',
    required: true,
    description: 'Name of the rule'
  }
]

RuleDelete.flags = {
  ...DeployServiceCommand.flags,
  json: Flags.boolean({
    description: 'output raw json'
  })
}

RuleDelete.aliases = [
  'rt:rule:delete'
]

module.exports = RuleDelete
