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

const { Command, flags } = require('@oclif/command')

const debug = require('debug')
const { propertiesFile, PropertyEnv } = require('./properties')
const OpenWhisk = require('openwhisk')

class RuntimeBaseCommand extends Command {
  async wsk () {
    const { flags } = this.parse(this.constructor)
    const properties = propertiesFile()

    const options = {
      cert: flags.cert || properties.get('CERT'),
      key: flags.key || properties.get('KEY'),
      apiversion: flags.apiversion || properties.get('APIVERSION'),
      apihost: flags.apihost || properties.get('APIHOST'),
      namespace: properties.get('NAMESPACE'),
      api_key: flags.auth || properties.get('AUTH'),
      ignore_certs: flags.insecure
    }

    // remove any null or undefined keys
    Object
      .keys(options)
      .forEach((key) => {
        if (options[key] === null || options[key] === undefined) {
          delete options[key]
        }
      })

    return OpenWhisk(options)
  }

  async init () {
    const { flags } = this.parse(this.constructor)

    // See https://www.npmjs.com/package/debug for usage in commands
    if (flags.verbose) {
      // verbose just sets the debug filter to everything (*)
      debug.enable('*')
    } else if (flags.debug) {
      debug.enable(flags.debug)
    }
  }

  handleError (msg, err) {
    const { flags } = this.parse(this.constructor)

    msg = msg || 'unknown error'
    if (err) {
      msg = `${msg}: ${err.message}`

      if (flags.verbose) {
        debug.log(err) // for stacktrace when verbose
      }
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
  let newData = {}

  Object
    .keys(propData)
    .forEach((key) => {
      newData[key] = (asBoolean ? flags.boolean(propData[key]) : flags.string(propData[key]))
    })
  return newData
}

RuntimeBaseCommand.flags = {
  ...RuntimeBaseCommand.propertyFlags(),
  insecure: flags.boolean({ char: 'i', description: 'bypass certificate check' }),
  debug: flags.string({ description: 'Debug level output' }),
  verbose: flags.boolean({ char: 'v', description: 'Verbose output' }),
  version: flags.boolean({ description: 'Show version' }),
  help: flags.boolean({ description: 'Show help' }),
  'User-Agent': flags.string({
    hidden: true,
    default: 'aio-cli-plugin-runtime@' + require('../package.json').version
  })
}

module.exports = RuntimeBaseCommand
