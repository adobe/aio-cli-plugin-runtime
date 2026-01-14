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
const { Args, Flags } = require('@oclif/core')

class RuleCreate extends DeployServiceCommand {
  isUpdate () { return false }

  async run () {
    const { args, flags } = await this.parse(RuleCreate)
    try {
      const ow = await this.wsk()
      const RuleCreateObject = { ...args }
      const method = this.isUpdate() ? 'update' : 'create'
      const result = await ow.rules[method](RuleCreateObject)
      if (flags.json) {
        this.logJSON('', result)
      }
    } catch (err) {
      const method = this.isUpdate() ? 'update' : 'create'
      await this.handleError(`failed to ${method} rule`, err)
    }
  }
}

RuleCreate.description = 'Create a Rule'

RuleCreate.args = {
  name: Args.string({
    required: true,
    description: 'Name of the rule'
  }),
  trigger: Args.string({
    required: true,
    description: 'Name of the trigger'
  }),
  action: Args.string({
    required: true,
    description: 'Name of the action'
  })
}

RuleCreate.flags = {
  ...DeployServiceCommand.flags,
  json: Flags.boolean({
    description: 'output raw json'
  })
}

RuleCreate.aliases = [
  'rt:rule:create'
]

module.exports = RuleCreate
