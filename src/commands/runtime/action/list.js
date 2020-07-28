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
const { parsePackageName } = require('@adobe/aio-lib-runtime').utils
const { flags } = require('@oclif/command')
const { cli } = require('cli-ux')

class ActionList extends RuntimeBaseCommand {
  async run () {
    const { flags, args } = this.parse(ActionList)
    const options = {
      ...flags
    }
    try {
      if (args.packageName) {
        const { namespace, name } = parsePackageName(args.packageName)
        options.namespace = namespace
        options.id = `${name}/`
      }
      const ow = await this.wsk()
      const result = await ow.actions.list(options)
      if (flags['name-sort'] || flags.name) {
        result.sort((a, b) => a.name.localeCompare(b.name))
      }
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
            minWidth: 7,
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

ActionList.args = [
  {
    name: 'packageName',
    required: false
  }
]

ActionList.flags = {
  ...RuntimeBaseCommand.flags,
  // example usage:  aio runtime:action:list --limit 10 --skip 2
  limit: flags.integer({
    char: 'l',
    description: 'only return LIMIT number of actions from the collection (default 30)'
  }),
  skip: flags.integer({
    char: 's',
    description: 'exclude the first SKIP number of actions from the result'
  }),
  json: flags.boolean({
    description: 'output raw json'
  }),
  'name-sort': flags.boolean({
    description: 'sort results by name'
  }),
  name: flags.boolean({
    char: 'n',
    description: 'sort results by name'
  })
}

ActionList.description = 'Lists all the Actions'

ActionList.aliases = [
  'runtime:action:ls',
  'runtime:actions:list',
  'runtime:actions:ls',
  'rt:action:list',
  'rt:actions:list',
  'rt:action:ls',
  'rt:actions:ls']

module.exports = ActionList
