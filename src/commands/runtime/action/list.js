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
const { cli } = require('cli-ux')

class ActionList extends RuntimeBaseCommand {
  async run () {
    const { flags } = this.parse(ActionList)
    try {
      const ow = await this.wsk()
      const result = await ow.actions.list(flags)
      if (flags.json) {
        this.logJSON('', result)
      } else {
        const columns = {
          actions: {
            header: 'actions',
            minWidth: 50,
            get: row => `/${row.namespace}/${row.name}`
          },
          published: {
            header: '',
            get: row => `${row.publish === false ? 'private' : 'public'}`
          },
          details: {
            header: '',
            minWidth: 10,
            get: row => `${row.annotations.filter(elem => elem.key === 'exec')[0].value}`
          }
        }
        cli.table(result, columns)
      }
    } catch (err) {
      this.handleError('failed to list the actions', err)
    }
  }
}

ActionList.flags = {
  ...RuntimeBaseCommand.flags,
  // example usage:  aio runtime:action:list --limit 10 --skip 2
  'limit': flags.integer({
    char: 'l',
    description: 'only return LIMIT number of actions from the collection (default 30)',
    hidden: false, // hide from help
    multiple: false, // allow setting this flag multiple times
    required: false // not mandatory
  }),
  'skip': flags.integer({
    char: 's',
    description: 'exclude the first SKIP number of actions from the result',
    multiple: false, // allow setting this flag multiple times
    required: false // not mandatory
  }),
  'json': flags.boolean({
    description: 'output raw json'
  })
}

ActionList.description = 'Lists all the Actions'

module.exports = ActionList
