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
const { Args } = require('@oclif/core')

class ApiGet extends RuntimeBaseCommand {
  async run () {
    const { args } = await this.parse(ApiGet)

    try {
      const ow = await this.wsk()
      const options = {
        basepath: args.basePathOrApiName
      }

      const result = await ow.routes.get(options)
      this.logJSON('', result.apis[0].value.apidoc)
    } catch (err) {
      await this.handleError('failed to get the api', err)
    }
  }
}

ApiGet.args = {
  basePathOrApiName: Args.string({
    required: true,
    description: 'The base path or api name'
  })
}

ApiGet.flags = {
  ...RuntimeBaseCommand.flags
}

ApiGet.description = 'get API details'

ApiGet.aliases = [
  'runtime:route:get',
  'rt:route:get',
  'rt:api:get'
]

module.exports = ApiGet
