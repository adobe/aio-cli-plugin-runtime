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

function createColumns (columnName) {
  return {
    firstColumn: {
      header: columnName,
      minWidth: 50,
      'no-truncate': true,
      get: row => `/${row.namespace}/${row.name}`
    },
    published: {
      header: '',
      'no-truncate': true,
      get: row => `${row.publish === false ? 'private' : 'public'}`
    },
    exec: {
      header: '',
      minWidth: 15,
      'no-truncate': true,
      get: (row) => {
        const filtered = row.annotations.filter(elem => elem.key === 'exec')
        if (filtered.length) {
          return filtered[0].value
        }
        return ''
      }
    },
    status: {
      header: '',
      minWidth: 10,
      'no-truncate': true,
      get: row => row.status ? row.status : ''
    }
  }
}

async function getRulesWithStatus (ow, rules) {
  // unfortunately for rules, we need to do a 'get' for each to get the status
  // (this is done the same way in the Go CLI)

  const fetchRules = rules.map(async (rule) => {
    return ow.rules.get({ name: rule.name })
  })

  return Promise.all(fetchRules)
}

class NamespaceGet extends RuntimeBaseCommand {
  async run () {
    const { flags } = this.parse(NamespaceGet)
    try {
      const ow = await this.wsk()
      const data = await ow.namespaces.get()
      data.rules = await getRulesWithStatus(ow, data.rules)

      if (flags.json) {
        this.logJSON('', data)
      } else {
        this.log('Entities in namespace:')

        cli.table(data.packages, createColumns('packages'))
        cli.table(data.actions, createColumns('actions'))
        cli.table(data.triggers, createColumns('triggers'))
        cli.table(data.rules, createColumns('rules'))
      }
    } catch (err) {
      this.handleError('failed to get the data for a namespace', err)
    }
  }
}

NamespaceGet.flags = {
  ...RuntimeBaseCommand.flags,
  'json': flags.boolean({
    description: 'output raw json'
  })
}

NamespaceGet.aliases = [ 'runtime:list' ]

NamespaceGet.description = 'Get triggers, actions, and rules in the registry for namespace'

module.exports = NamespaceGet
