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

class RuleList extends RuntimeBaseCommand {
  async run () {
    const { flags } = this.parse(RuleList)
    try {
      const ow = await this.wsk()
      const options = { ...flags }
      const result = await ow.rules.list(options)

      // if only showing the count, show the result and return
      if (flags.count) {
        if (flags.json) {
          this.logJSON('', result)
        } else {
          this.log(`You have ${result.rules} ${result.rules === 1 ? 'rule' : 'rules'} in this namespace.`)
        }
        return
      }

      if (flags['name-sort'] || flags.name) {
        result.sort((a, b) => a.name.localeCompare(b.name))
      }

      const p = Promise.all(
        result.map(item => {
          const res = ow.rules.get(item.name)
          res.then((result) => {
            item.status = result.status
          })
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
            details: {
              header: 'Status',
              get: row => `${row.status}`,
              minWidth: 18
            },
            version: {
              header: 'Version',
              minWidth: 9,
              get: row => row.version
            },
            rules: {
              header: 'Rules',
              minWidth: 50,
              get: row => row.name
            }
          }
          cli.table(resultsWithStatus, columns)
        }
      })
      return p
    } catch (err) {
      this.handleError('failed to list the rules', err)
    }
  }
}

RuleList.description = 'Retrieves a list of Rules'

RuleList.flags = {
  ...RuntimeBaseCommand.flags,
  limit: flags.integer({
    char: 'l',
    description: 'Limit number of rules returned. Default 30',
    default: 30
  }),
  skip: flags.integer({
    char: 's',
    description: 'Skip number of rules returned'
  }),
  count: flags.boolean({
    char: 'c',
    description: 'show only the total number of rules'
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

RuleList.aliases = [
  'runtime:rule:ls',
  'rt:rule:list',
  'rt:rule:ls'
]

module.exports = RuleList
