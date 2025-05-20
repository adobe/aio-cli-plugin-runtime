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

const { Flags } = require('@oclif/core')

const { PropertyDefault } = require('./properties')
const runtimeLib = require('@adobe/aio-lib-runtime')
const { getToken, context, CLI } = require('@adobe/aio-lib-ims')
const { getCliEnv } = require('@adobe/aio-lib-env')
const RuntimeBaseCommand = require('./RuntimeBaseCommand')

class DeployServiceCommand extends RuntimeBaseCommand {

  getAuthHandler () {
    return {
      getAuthHeader: async () => {
        await context.setCli({ 'cli.bare-output': true }, false) // set this globally
        const env = getCliEnv()
        this.debug(`Retrieving CLI Token using env=${env}`)
        const accessToken = await getToken(CLI)

        return `Bearer ${accessToken}`
      }
    }
  }

  async setRuntimeApiHostAndAuthHandler(options) {
    if (!options.useRuntimeAuth) {
      options.apihost = process.env.DEPLOY_SERVICE_URL ?? PropertyDefault.DEPLOYSERVICEURL
      options.auth_handler = this.getAuthHandler()
    }

    return options
  }

  async wsk (options) {
    if (!options) {
      options = await super.getOptions()
      options =await this.setRuntimeApiHostAndAuthHandler(options)
    }
    return runtimeLib.init(options)
  }

}

DeployServiceCommand.flags = {
  ...RuntimeBaseCommand.flags,
  useRuntimeAuth: Flags.boolean({ char: 'r', description: 'use Runtime auth [default: false]', default: false })
}

module.exports = DeployServiceCommand
