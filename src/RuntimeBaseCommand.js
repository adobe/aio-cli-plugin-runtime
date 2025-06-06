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

const { Command, Flags } = require('@oclif/core')

const { propertiesFile, PropertyEnv, PropertyDefault } = require('./properties')
const createDebug = require('debug')
const debug = createDebug('aio-cli-plugin-runtime')
const http = require('http')
const runtimeLib = require('@adobe/aio-lib-runtime')
const config = require('@adobe/aio-lib-core-config')

class RuntimeBaseCommand extends Command {
  async getOptions () {
    const { flags } = await this.parse(this.constructor)
    const properties = propertiesFile()

    const options = {
      cert: flags.cert || config.get('runtime.cert') || properties.get('CERT'),
      key: flags.key || config.get('runtime.key') || properties.get('KEY'),
      apiversion: flags.apiversion || config.get('runtime.apiversion') || properties.get('APIVERSION') || PropertyDefault.APIVERSION,
      apihost: flags.apihost || config.get('runtime.apihost') || properties.get('APIHOST') || PropertyDefault.APIHOST,
      namespace: config.get('runtime.namespace') || properties.get('NAMESPACE'),
      api_key: flags.auth || config.get('runtime.auth') || properties.get('AUTH'),
      ignore_certs: flags.insecure || config.get('runtime.insecure'),
      'use-runtime-auth': process.env.USE_RUNTIME_AUTH || flags['use-runtime-auth']
    }

    // remove any null or undefined keys
    Object
      .keys(options)
      .forEach((key) => {
        if (options[key] === null || options[key] === undefined) {
          delete options[key]
        }
      })

    debug(options)

    if (!(options.apihost).toString().trim()) {
      throw new Error('An API host must be specified')
    }

    if (!(options.api_key || '').toString().trim()) {
      throw new Error('An AUTH key must be specified')
    }

    // .env var is given priority, then the flag, which has a default value
    // of aio-cli-plugin-runtime@VERSION
    if (!process.env.__OW_USER_AGENT) {
      process.env.__OW_USER_AGENT = flags.useragent
    }

    return options
  }

  async wsk (options) {
    let _options = structuredClone(options)
    if (!_options) {
      _options = await this.getOptions()
    }
    return runtimeLib.init(_options)
  }

  getImsOrgId () {
    return config.get('project.org.ims_org_id')
  }

  async init () {
    const { flags } = await this.parse(this.constructor)

    // See https://www.npmjs.com/package/debug for usage in commands
    if (flags.verbose) {
      // verbose just sets the debug filter to everything (*)
      createDebug.enable('*')
    } else if (flags.debug) {
      createDebug.enable(flags.debug)
    }
  }

  async handleError (msg, err) {
    await this.parse(this.constructor)

    msg = msg || 'unknown error'

    const getStatusCode = (code) => `${code} ${http.STATUS_CODES[code] || ''}`.trim()

    if (err) {
      let pretty = err.message || ''
      if (err.name === 'OpenWhiskError') {
        if (err.error && err.error.error) {
          pretty = err.error.error.toLowerCase()
          if (err.statusCode) pretty = `${pretty} (${getStatusCode(err.statusCode)})`
          else if (err.error.code) pretty = `${pretty} (${err.error.code})`
        } else if (err.statusCode) {
          pretty = getStatusCode(err.statusCode)
        }
      }

      if ((pretty || '').toString().trim()) {
        msg = `${msg}: ${pretty}`
      }

      debug(err)
      msg = msg + '\n specify --verbose flag for more information'
    }
    return this.error(msg)
  }

  logJSON (msg, obj) {
    if (msg) {
      this.log(msg, JSON.stringify(obj, null, 2))
    } else {
      this.log(JSON.stringify(obj, null, 2))
    }
  }
}

RuntimeBaseCommand.propertyFlags = ({ asBoolean = false } = {}) => {
  const propData = {
    cert: { description: 'client cert' },
    key: { description: 'client key' },
    apiversion: { description: 'whisk API version', env: PropertyEnv.APIVERSION },
    apihost: { description: 'whisk API host', env: PropertyEnv.APIHOST },
    auth: { char: 'u', description: 'whisk auth', env: PropertyEnv.AUTH }
  }
  const newData = {}

  Object
    .keys(propData)
    .forEach((key) => {
      newData[key] = (asBoolean ? Flags.boolean(propData[key]) : Flags.string(propData[key]))
    })
  return newData
}

RuntimeBaseCommand.flags = {
  ...RuntimeBaseCommand.propertyFlags(),
  insecure: Flags.boolean({ char: 'i', description: 'bypass certificate check' }),
  debug: Flags.string({ description: 'Debug level output' }),
  verbose: Flags.boolean({ char: 'v', description: 'Verbose output' }),
  version: Flags.boolean({ description: 'Show version' }),
  help: Flags.boolean({ description: 'Show help' }),
  useragent: Flags.string({
    hidden: true,
    description: 'Use custom user-agent string',
    default: 'aio-cli-plugin-runtime@' + require('../package.json').version
  })
}

module.exports = RuntimeBaseCommand
