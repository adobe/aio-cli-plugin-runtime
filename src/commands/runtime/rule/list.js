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

class RuleList extends RuntimeBaseCommand {
  async run () {
    const { flags } = this.parse(RuleList)
    try {
      const ow = await this.wsk()
      const RuleListObject = { ...flags }
      const result = await ow.rules.list(RuleListObject)
      let p = Promise.all(
        result.map(item => {
          let res = ow.rules.get(item.name)
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
            actions: {
              header: 'rules',
              minWidth: 40,
              get: row => `/${row.namespace}/${row.name}`
            },
            published: {
              header: '',
              get: row => `${row.publish === false ? 'private' : 'public'}`
            },
            details: {
              header: '',
              get: row => `${row.status}`
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
    multiple: false,
    hidden: false,
    required: false,
    default: 30
  }),
  skip: flags.integer({
    char: 's',
    description: 'Skip number of rules returned',
    multiple: false,
    hidden: false,
    required: false
  }),
  'json': flags.boolean({
    description: 'output raw json'
  })
}

RuleList.aliases = [
  'runtime:rule:ls',
  'rt:rule:list',
  'rt:rule:ls'
]

module.exports = RuleList
