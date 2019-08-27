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

class RuleStatus extends RuntimeBaseCommand {
  async run () {
    const { args } = this.parse(RuleStatus)
    try {
      const ow = await this.wsk()
      const RuleStatusObject = { ...args }
      const statusRule = await ow.rules.get(RuleStatusObject)
      this.log(statusRule.status)
    } catch (err) {
      this.handleError('failed to retrieve rule', err)
    }
  }
}

RuleStatus.description = 'Gets the status of a rule'

RuleStatus.args = [
  {
    name: 'name',
    required: true,
    description: 'Name of the rule'
  }
]

RuleStatus.flags = {
  ...RuntimeBaseCommand.flags
}

RuleStatus.aliases = [
  'rt:rule:status'
]

module.exports = RuleStatus
