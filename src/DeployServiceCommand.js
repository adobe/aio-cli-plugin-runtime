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

/**
 * Retrieves an access token for Adobe I/O CLI authentication.
 * This function handles both CLI and custom contexts, setting up the appropriate
 * authentication context and retrieving the corresponding access token.
 * 
 * @async
 * @function getAccessToken
 * @param {Object} [options] - Options for token retrieval
 * @param {boolean} [options.useCachedToken=false] - Whether to use a cached token instead of requesting a new one
 * @returns {Promise<{accessToken: string|null, env: string}>} An object containing:
 *   - accessToken: The retrieved access token for authentication, or null if token retrieval failed
 *   - env: The current CLI environment (e.g. 'prod', 'stage')
 * @throws {Error} If token retrieval fails or context setup fails
 */
async getAccessToken({ useCachedToken = false } = {}) {
  const env = getCliEnv()
  let contextName = CLI // default
  const currentContext = await context.getCurrent() // potential override

  if (currentContext !== CLI) {
    contextName = currentContext
  } else {
    await context.setCli({ 'cli.bare-output': true }, false) // set this globally
  }

  let accessToken = null
  if (useCachedToken) {
    const contextConfig = await context.get(contextName)
    accessToken = contextConfig?.access_token?.token
  } else {
    accessToken = await getToken(contextName)
  }

  return { accessToken, env }
}


  getAuthHandler () {
    return {
      getAuthHeader: async () => {
        this.debug(`Retrieving CLI Token using env=${env}`)
        const { accessToken } = await this.getAccessToken()

        return `Bearer ${accessToken}`
      }
    }
  }

  async setRuntimeApiHostAndAuthHandler(options) {
    if (!options.useRuntimeAuth) {
      const endpoint = process.env.AIO_DEPLOY_SERVICE_URL ?? PropertyDefault.DEPLOYSERVICEURL
      options.apihost = `${endpoint}/runtime`
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
