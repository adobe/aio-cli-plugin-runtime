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

const moment = require('dayjs')
const RuntimeBaseCommand = require('../../../RuntimeBaseCommand')
const { parsePackageName } = require('@adobe/aio-lib-runtime').utils
const { Flags, CliUx: cli } = require('@oclif/core')
const decorators = require('../../../decorators').decorators()

class ActionList extends RuntimeBaseCommand {
  async run () {
    const { flags, args } = await this.parse(ActionList)
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
      const ns = (await ow.namespaces.list())[0]
      const result = await ow.actions.list(options)

      if (flags['name-sort'] || flags.name) {
        result.sort((a, b) => a.name.localeCompare(b.name))
      }

      if (flags.json) {
        this.logJSON('', result)
      } else if (flags.count) {
        this.log(`You have ${result.actions} ${result.actions === 1 ? 'action' : 'actions'} in this namespace.`)
      } else {
        const columns = {
          Datetime: {
            get: row => moment(row.updated).format('MM/DD HH:mm:ss'),
            minWidth: 16
          },
          published: {
            header: 'Access',
            minWidth: 9,
            get: row => {
              const web = row.annotations.find(_ => _.key === 'web-export')
              const auth = row.annotations.find(_ => _.key === 'require-whisk-auth')
              if (web && web.value !== false) {
                if (auth && auth.value === true) {
                  return `web ${decorators.lock_with_key}`
                } else if (auth && auth.value !== false) {
                  return `web ${decorators.lock_with_key}`
                } else {
                  return 'web'
                }
              } else return 'private'
            }
          },
          details: {
            header: 'Kind',
            minWidth: 9,
            get: (row) => {
              const kind = row.annotations.find(_ => _.key === 'exec').value
              return kind.includes('lambda') ? kind.replace('-lambda', '') + ' (λ)' : kind
            }
          },
          version: {
            header: 'Version',
            minWidth: 9,
            get: row => row.version
          },
          actions: {
            header: 'Actions',
            minWidth: 50,
            get: row => {
              const path = `${row.namespace}/${row.name}`
              return path.replace(`${ns}/`, '')
            }
          }
        }
        cli.ux.table(result, columns)
      }
    } catch (err) {
      await this.handleError('failed to list the actions', err)
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
  limit: Flags.integer({
    char: 'l',
    description: 'only return LIMIT number of actions (min: 0, max: 50)'
  }),
  skip: Flags.integer({
    char: 's',
    description: 'exclude the first SKIP number of actions from the result'
  }),
  count: Flags.boolean({
    char: 'c',
    description: 'show only the total number of actions'
  }),
  json: Flags.boolean({
    description: 'output raw json'
  }),
  'name-sort': Flags.boolean({
    description: 'sort results by name'
  }),
  name: Flags.boolean({
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
