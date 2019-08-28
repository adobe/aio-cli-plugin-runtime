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

class RuleUpdate extends RuntimeBaseCommand {
  async run () {
    const { args, flags } = this.parse(RuleUpdate)
    try {
      const ow = await this.wsk()
      const RuleUpdateObject = { ...args }
      const result = await ow.rules.update(RuleUpdateObject)
      if (flags.json) {
        this.logJSON('', result)
      }
    } catch (err) {
      this.handleError('failed to update rule', err)
    }
  }
}

RuleUpdate.description = 'Update a Rule'

RuleUpdate.args = [
  {
    name: 'name',
    required: true,
    description: 'Name of the rule'
  },
  {
    name: 'trigger',
    required: true,
    description: 'Name of the trigger'
  },
  {
    name: 'action',
    required: true,
    description: 'Name of the action'
  }
]

RuleUpdate.flags = {
  ...RuntimeBaseCommand.flags,
  json: flags.boolean({
    description: 'output raw json'
  })
}

RuleUpdate.aliases = [
  'rt:rule:update'
]

module.exports = RuleUpdate
