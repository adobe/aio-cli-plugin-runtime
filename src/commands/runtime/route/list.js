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

function processApi (api) {
  const data = []
  const paths = api.value.apidoc.paths

  Object.keys(paths).forEach(key => {
    if (!key.startsWith('/')) {
      return
    }

    const path = paths[key]
    Object.keys(path).forEach(verb => {
      const operation = path[verb]
      const item = {}

      item.Action = `/${operation.operationId}`
      item.Verb = verb
      item.APIName = api.value.apidoc.basePath
      item.URL = `${api.value.gwApiUrl}${key}`
      data.push(item)
    })
  })

  return data
}

class RouteList extends RuntimeBaseCommand {
  async run () {
    const { args, flags } = this.parse(RouteList)

    try {
      const ow = await this.wsk()
      const options = {
        basepath: args.basePath,
        relpath: args.relPath,
        operation: args.apiVerb,
        skip: flags.skip,
        limit: flags.limit
      }

      const result = await ow.routes.list(options)

      if (flags.json) {
        this.logJSON('', result.apis[0].value.apidoc)
      } else {
        let data = []
        result.apis.forEach(api => {
          // join the two arrays by reduce
          data = processApi(api).reduce((coll, item) => {
            coll.push(item)
            return coll
          }, data)
        })

        cli.table(data, {
          Action: { minWidth: 10 },
          Verb: { minWidth: 10 },
          APIName: { header: 'API Name', minWidth: 10 },
          URL: { minWidth: 15, 'no-truncate': true }
        },
        {
          printLine: this.log,
          ...flags // parsed flags
        })
      }
    } catch (err) {
      this.handleError('failed to list the api', err)
    }
  }
}

RouteList.args = [
  {
    name: 'basePath',
    required: false,
    description: 'The base path of the api'
  },
  {
    name: 'relPath',
    required: false,
    description: 'The path of the api relative to the base path'
  },
  {
    name: 'apiVerb',
    required: false,
    description: 'The http verb',
    options: ['get', 'post', 'put', 'patch', 'delete', 'head', 'options']
  }
]

RouteList.flags = {
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
  })
}

RouteList.description = 'list route/apis for Adobe I/O Runtime'

RouteList.aliases = [
  'runtime:route:ls',
  'runtime:api:list',
  'runtime:api:ls',
  'rt:route:list',
  'rt:route:ls',
  'rt:api:list',
  'rt:api:ls'
]

module.exports = RouteList
