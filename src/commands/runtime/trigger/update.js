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

const TriggerCreate = require('./create')
const cloneDeep = require('lodash.clonedeep')

class TriggerUpdate extends TriggerCreate {
  isUpdate () { return true }
}

TriggerUpdate.args = [
  {
    name: 'triggerName',
    required: true,
    description: 'The name of the trigger'
  }
]

TriggerUpdate.flags = cloneDeep(TriggerCreate.flags)
// TODO: Updating a feed is not supported as per wsk cli. Need to check if we can still support it.
delete TriggerUpdate.flags.feed

TriggerUpdate.description = 'Update or create a trigger for Adobe I/O Runtime'

TriggerUpdate.aliases = [
  'rt:trigger:update'
]

module.exports = TriggerUpdate
