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

const ActionCreate = require('./create')

class ActionUpdate extends ActionCreate {
  isUpdate () { return true }
}

ActionUpdate.args = [
  {
    name: 'actionName',
    required: true
  },
  {
    name: 'actionPath'
  }
]

ActionUpdate.flags = ActionCreate.flags

ActionUpdate.description = 'Updates an Action'

ActionUpdate.aliases = ['rt:action:update']

module.exports = ActionUpdate
