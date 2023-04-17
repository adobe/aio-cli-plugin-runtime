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
const { Flags, CliUx: cli } = require('@oclif/core')

/**
 * @param api
 */
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
      item.APIName = api.value.apidoc.info.title
      item.URL = `${api.value.gwApiUrl}${key}`
      data.push(item)
    })
  })

  return data
}

class ApiList extends RuntimeBaseCommand {
  async run () {
    const { args, flags } = await this.parse(ApiList)

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

        cli.ux.table(data, {
          Action: { minWidth: 10 },
          Verb: { minWidth: 10 },
          APIName: { header: 'API Name', minWidth: 10 },
          URL: { minWidth: 15, 'no-truncate': true }
        },
        {
          printLine: this.log.bind(this),
          ...flags // parsed flags
        })
      }
    } catch (err) {
      await this.handleError('failed to list the api', err)
    }
  }
}

ApiList.args = [
  {
    name: 'basePath',
    description: 'The base path of the api'
  },
  {
    name: 'relPath',
    description: 'The path of the api relative to the base path'
  },
  {
    name: 'apiVerb',
    description: 'The http verb',
    options: ['get', 'post', 'put', 'patch', 'delete', 'head', 'options']
  }
]

ApiList.flags = {
  ...RuntimeBaseCommand.flags,
  limit: Flags.integer({
    char: 'l',
    description: 'only return LIMIT number of triggers'
  }),
  skip: Flags.integer({
    char: 's',
    description: 'exclude the first SKIP number of triggers from the result'
  }),
  json: Flags.boolean({
    description: 'output raw json'
  })
}

ApiList.description = 'list route/apis for Adobe I/O Runtime'

ApiList.aliases = [
  'runtime:api:ls',
  'runtime:route:list',
  'runtime:route:ls',
  'rt:api:list',
  'rt:api:ls',
  'rt:route:list',
  'rt:route:ls'
]

module.exports = ApiList
