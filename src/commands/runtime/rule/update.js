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

const RuleCreate = require('./create')
const { Args } = require('@oclif/core')

class RuleUpdate extends RuleCreate {
  isUpdate () { return true }
}

RuleUpdate.description = 'Update a Rule'

RuleUpdate.args = {
  name: Args.string({ required: true, description: 'Name of the rule' }),
  trigger: Args.string({ required: true, description: 'Name of the trigger' }),
  action: Args.string({ required: true, description: 'Name of the action' })
}

RuleUpdate.flags = RuleCreate.flags

RuleUpdate.aliases = [
  'rt:rule:update'
]

module.exports = RuleUpdate
