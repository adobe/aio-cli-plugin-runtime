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

const moment = require('moment')
const RuntimeBaseCommand = require('../../../RuntimeBaseCommand')
const { flags } = require('@oclif/command')
const { cli } = require('cli-ux')

class TriggerList extends RuntimeBaseCommand {
  async run () {
    const { flags } = this.parse(TriggerList)
    try {
      const ow = await this.wsk()
      const options = {
        limit: flags.limit // there is always a default
      }

      if (flags.skip) {
        options.skip = flags.skip
      }

      if (flags.count) {
        options.count = true
      }

      const result = await ow.triggers.list(options)

      // if only showing the count, show the result and return
      if (flags.count) {
        if (flags.json) {
          this.logJSON('', result)
        } else {
          this.log(`You have ${result.triggers} ${result.triggers === 1 ? 'trigger' : 'triggers'} in this namespace.`)
        }
        return
      }

      if (flags['name-sort'] || flags.name) {
        result.sort((a, b) => a.name.localeCompare(b.name))
      }

      await Promise.all(
        result.map(item => {
          const res = ow.triggers.get(item.name)
          return res
        })
      ).then((resultsWithStatus) => {
        if (flags.json) {
          this.logJSON('', resultsWithStatus)
        } else {
          const columns = {
            Datetime: {
              get: row => moment(row.updated).format('MM/DD HH:mm:ss'),
              minWidth: 16
            },
            status: {
              header: 'Status',
              get: row => {
                let active = 0
                if (row.rules) {
                  const entries = Object.entries(row.rules)
                  active = entries.filter(([k, v]) => v.status === 'active').length
                }
                return active > 0 ? `${active} active` : 'inactive'
              },
              minWidth: 18
            },
            version: {
              header: 'Version',
              minWidth: 9,
              get: row => row.version
            },
            triggers: {
              header: 'Trigger',
              minWidth: 50,
              get: row => row.name
            }
          }
          cli.table(resultsWithStatus, columns)
        }
      })
    } catch (err) {
      this.handleError('failed to list triggers', err)
    }
  }
}

TriggerList.flags = {
  ...RuntimeBaseCommand.flags,
  limit: flags.integer({
    char: 'l',
    default: 30,
    description: 'only return LIMIT number of triggers from the collection (default 30)'
  }),
  skip: flags.integer({
    char: 's',
    description: 'exclude the first SKIP number of triggers from the result'
  }),
  count: flags.boolean({
    char: 'c',
    description: 'show only the total number of triggers'
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

TriggerList.description = 'Lists all of your triggers for Adobe I/O Runtime'

TriggerList.aliases = [
  'runtime:trigger:ls',
  'rt:trigger:list',
  'rt:trigger:ls'
]

module.exports = TriggerList
