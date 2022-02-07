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
const { CliUx: cli } = require('@oclif/core')

class NamespaceList extends RuntimeBaseCommand {
  async run () {
    try {
      const { flags } = this.parse(NamespaceList)
      const ow = await this.wsk()
      const result = await ow.namespaces.list()

      if (flags.json) {
        this.logJSON('', result)
      } else {
        const columns = {
          namespaces: {
            minWidth: 20,
            get: row => row
          }
        }
        cli.ux.table(result, columns)
      }
    } catch (err) {
      this.handleError('failed to list namespaces', err)
    }
  }
}

NamespaceList.flags = {
  ...RuntimeBaseCommand.flags,
  json: flags.boolean({
    description: 'output raw json'
  })
}

NamespaceList.description = 'Lists all of your namespaces for Adobe I/O Runtime'

NamespaceList.aliases = [
  'runtime:namespace:ls',
  'runtime:ns:list',
  'runtime:ns:ls',
  'rt:namespace:list',
  'rt:namespace:ls',
  'rt:ns:list',
  'rt:ns:ls'
]

module.exports = NamespaceList
