const RuntimeBaseCommand = require('./RuntimeBaseCommand')

const { getToken, context } = require('@adobe/aio-lib-ims')
const { CLI } = require('@adobe/aio-lib-ims/src/context')
const { getCliEnv } = require('@adobe/aio-lib-env')
const runtimeLib = require('@adobe/aio-lib-runtime')

/**
 * Class representing a command to deploy runtime.
 * 
 * @extends RuntimeBaseCommand
 */
class RuntimeDeployCommand extends RuntimeBaseCommand {
    async wsk(options) {
        if (!options) {
            const authHandler = {
                getAuthHeader: async () => {
                    await context.setCli({ 'cli.bare-output': true }, false) // set this globally

                    const env = getCliEnv()

                    console.debug(`Retrieving CLI Token using env=${env}`)
                    const accessToken = await getToken(CLI)

                    return `Bearer ${accessToken}`
                }
            }
            options = await this.getOptions()
            options.auth_handler = authHandler
            options.apihost = env.API_HOST ?? "http://localhost:3000/runtime"
        }
        return runtimeLib.init(options)
    }
}

RuntimeDeployCommand.flags = {
    ...RuntimeDeployCommand.flags
}

module.exports = RuntimeDeployCommand
