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

class RouteCreate extends RuntimeBaseCommand {
  async run () {
    const { args, flags } = this.parse(RouteCreate)

    try {
      const ow = await this.wsk()
      const options = {
        basepath: args.basePath,
        relpath: args.relPath,
        operation: args.apiVerb,
        action: args.action,
        responsetype: flags['response-type'], // has a default
        name: flags.apiname
      }

      const result = await ow.routes.create(options)
      this.log(`${result.gwApiUrl}${args.relPath}`)
    } catch (err) {
      this.handleError('failed to create the api', err)
    }
  }
}

RouteCreate.args = [
  {
    name: 'basePath',
    required: true,
    description: 'The base path of the api'
  },
  {
    name: 'relPath',
    required: true,
    description: 'The path of the api relative to the base path'
  },
  {
    name: 'apiVerb',
    required: true,
    description: 'The http verb',
    options: ['get', 'post', 'put', 'patch', 'delete', 'head', 'options']
  },
  {
    name: 'action',
    required: true,
    description: 'The action to call'
  }
]

RouteCreate.flags = {
  ...RuntimeBaseCommand.flags,
  apiname: flags.string({
    char: 'n',
    description: 'Friendly name of the API; ignored when CFG_FILE is specified (default BASE_PATH)'
  }),
  'response-type': flags.string({
    char: 'r',
    description: 'Set the web action response TYPE.',
    default: 'json',
    options: ['html', 'http', 'json', 'text', 'svg', 'json']
  })
}

RouteCreate.description = 'create a new api route'

RouteCreate.aliases = [
  'runtime:api:create',
  'rt:route:create',
  'rt:api:create'
]

module.exports = RouteCreate
