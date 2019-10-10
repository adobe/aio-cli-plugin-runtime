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

      const result = await ow.triggers.list(options)
      if (flags['name-sort'] || flags.name) {
        result.sort((a, b) => a.name.localeCompare(b.name))
      }

      if (flags.json) {
        this.logJSON('', result)
      } else {
        const columns = {
          triggers: {
            header: 'triggers',
            minWidth: 50,
            get: row => `/${row.namespace}/${row.name}`
          },
          published: {
            header: '',
            minWidth: 7,
            get: row => `${row.publish === false ? 'private' : 'public'}`
          }
        }
        cli.table(result, columns)
      }
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
  json: flags.boolean({
    description: 'output raw json'
  }),
  'name-sort': flags.boolean({
    description: 'sort results by name',
    multiple: false, // allow setting this flag multiple times
    required: false // not mandatory
  }),
  name: flags.boolean({
    char: 'n',
    description: 'sort results by name',
    multiple: false, // allow setting this flag multiple times
    required: false // not mandatory
  })
}

TriggerList.description = 'Lists all of your triggers for Adobe I/O Runtime'

TriggerList.aliases = [
  'runtime:trigger:ls',
  'rt:trigger:list',
  'rt:trigger:ls'
]

module.exports = TriggerList
