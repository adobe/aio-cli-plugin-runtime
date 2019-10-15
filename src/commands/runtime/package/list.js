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

class PackageList extends RuntimeBaseCommand {
  async run () {
    const { args, flags } = this.parse(PackageList)
    try {
      const ow = await this.wsk()
      const options = {}
      if (args.namespace) {
        options['namespace'] = args.namespace
      }
      if (flags.skip) {
        options['skip'] = flags.skip
      }
      if (flags.limit) {
        options['limit'] = flags.limit
      }
      const result = await ow.packages.list(options)
      if (flags['name-sort'] || flags.name) {
        result.sort((a, b) => a.name.localeCompare(b.name))
      }
      if (flags.json) {
        this.logJSON('', result)
      } else {
        const columns = {
          actions: {
            header: 'packages',
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
      this.handleError('failed to list the packages', err)
    }
  }
}

PackageList.flags = {
  ...RuntimeBaseCommand.flags,
  // example usage:  aio runtime:package:list --limit 10 --skip 2
  // aio runtime:package:list --count true OR  aio runtime:package:list --count yes
  limit: flags.integer({
    char: 'l',
    description: 'only return LIMIT number of packages from the collection (default 30)'
  }),
  skip: flags.integer({
    char: 's',
    description: 'exclude the first SKIP number of packages from the result'
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

PackageList.args = [
  {
    name: 'namespace'
  }
]

PackageList.description = 'Lists all the Packages'

PackageList.aliases = [
  'runtime:package:ls',
  'runtime:pkg:list',
  'runtime:pkg:ls',
  'rt:package:list',
  'rt:package:ls',
  'rt:pkg:list',
  'rt:pkg:ls'
]

module.exports = PackageList
