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
const { Flags } = require('@oclif/core')
const fs = require('fs')

class ApiCreate extends RuntimeBaseCommand {
  async run () {
    const { args, flags } = await this.parse(ApiCreate)

    try {
      const ow = await this.wsk()
      let options = {}
      if (flags['config-file']) {
        options.swagger = fs.readFileSync(flags['config-file'], 'utf8')
      } else {
        if (!args.basePath || !args.relPath || !args.apiVerb || !args.action) {
          throw new Error('either the config-file flag or the arguments basePath, relPath, apiVerb and action are required')
        }
        options = {
          basepath: args.basePath,
          relpath: args.relPath,
          operation: args.apiVerb,
          action: args.action,
          responsetype: flags['response-type'], // has a default
          name: flags.apiname
        }
      }

      const result = await ow.routes.create(options)
      if (flags['config-file']) {
        this.log(`${result.gwApiUrl}`)
      } else {
        this.log(`${result.gwApiUrl}${args.relPath}`)
      }
    } catch (err) {
      await this.handleError('failed to create the api', err)
    }
  }
}

ApiCreate.args = [
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
  },
  {
    name: 'action',
    required: false,
    description: 'The action to call'
  }
]

ApiCreate.flags = {
  ...RuntimeBaseCommand.flags,
  apiname: Flags.string({
    char: 'n',
    description: 'Friendly name of the API; ignored when CFG_FILE is specified (default BASE_PATH)',
    exclusive: ['config-file']
  }),
  'response-type': Flags.string({
    char: 'r',
    description: 'Set the web action response TYPE.',
    default: 'json',
    options: ['html', 'http', 'json', 'text', 'svg', 'json'],
    exclusive: ['config-file']
  }),
  'config-file': Flags.string({
    char: 'c',
    description: 'file containing API configuration in swagger JSON format'
  })
}

ApiCreate.description = 'create a new api route'

ApiCreate.aliases = [
  'runtime:route:create',
  'rt:route:create',
  'rt:api:create'
]

module.exports = ApiCreate
