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

const DeployServiceCommand = require('../../../DeployServiceCommand')
const { Args } = require('@oclif/core')

class ApiDelete extends DeployServiceCommand {
  async run () {
    const { args } = await this.parse(ApiDelete)

    try {
      const ow = await this.wsk()
      const options = {
        basepath: args.basePathOrApiName,
        relpath: args.relPath,
        operation: args.apiVerb
      }

      await ow.routes.delete(options)
    } catch (err) {
      await this.handleError('failed to delete the api', err)
    }
  }
}

ApiDelete.args = {
  basePathOrApiName: Args.string({
    required: true,
    description: 'The base path or api name'
  }),
  relPath: Args.string({
    required: false,
    description: 'The path of the api relative to the base path'
  }),
  apiVerb: Args.string({
    required: false,
    description: 'The http verb',
    options: ['get', 'post', 'put', 'patch', 'delete', 'head', 'options']
  })
}

ApiDelete.flags = {
  ...DeployServiceCommand.flags
}

ApiDelete.description = 'delete an API'

ApiDelete.aliases = [
  'runtime:route:delete',
  'rt:route:delete',
  'rt:api:delete'
]

module.exports = ApiDelete
