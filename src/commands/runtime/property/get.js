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
const { cli } = require('cli-ux')
const { createFetch } = require('@adobe/aio-lib-core-networking')
const { PropertyKey, PropertyDefault, propertiesFile, PropertyEnv } = require('../../../properties')
const debug = require('debug')('aio-cli-plugin-runtime/property')
const config = require('@adobe/aio-lib-core-config')

class PropertyGet extends RuntimeBaseCommand {
  async run () {
    const { flags } = this.parse(PropertyGet)

    // if no property flags specified, default to all
    if (!(flags.all || flags.apiversion ||
      flags.auth || flags.cliversion || flags.namespace ||
      flags.apibuild || flags.apihost || flags.apibuildno
    )) {
      flags.all = true
    }

    const data = []
    const properties = propertiesFile()

    // get property data
    const auth = process.env[PropertyEnv.AUTH] || config.get('runtime.auth') || properties.get(PropertyKey.AUTH) || PropertyDefault.AUTH
    if (flags.all || flags.auth) {
      data.push({ Property: PropertyGet.flags.auth.description, Value: auth })
    }

    const apiHost = process.env[PropertyEnv.APIHOST] || config.get('runtime.apihost') || properties.get(PropertyKey.APIHOST) || PropertyDefault.APIHOST
    if (flags.all || flags.apihost) {
      data.push({ Property: PropertyGet.flags.apihost.description, Value: apiHost })
    }

    const apiVersion = process.env[PropertyEnv.APIVERSION] || config.get('runtime.apiversion') || properties.get(PropertyKey.APIVERSION) || PropertyDefault.APIVERSION
    if (flags.all || flags.apiversion) {
      data.push({ Property: PropertyGet.flags.apiversion.description, Value: apiVersion })
    }

    const cert = config.get('runtime.cert') || properties.get(PropertyKey.CERT) || PropertyDefault.CERT
    if (flags.all || flags.cert) {
      data.push({ Property: PropertyGet.flags.cert.description, Value: cert })
    }

    const key = config.get('runtime.key') || properties.get(PropertyKey.KEY) || PropertyDefault.KEY
    if (flags.all || flags.key) {
      data.push({ Property: PropertyGet.flags.key.description, Value: key })
    }

    const namespace = process.env[PropertyEnv.NAMESPACE] || config.get('runtime.namespace') || properties.get(PropertyKey.NAMESPACE) || PropertyDefault.NAMESPACE
    if (flags.all || flags.namespace) {
      data.push({ Property: PropertyGet.flags.namespace.description, Value: namespace })
    }

    if (flags.all || flags.cliversion) {
      data.push({ Property: PropertyGet.flags.cliversion.description, Value: this.config.userAgent })
    }

    // to get apibuild and apibuildno, we need to do a server call
    if (flags.all || flags.apibuild || flags.apibuildno) {
      const uri = `${apiHost}/api/${apiVersion}`

      let result = { build: 'error', buildno: 'error' }

      try {
        debug(`Getting data from url ${uri} ...\n`)
        const fetch = createFetch()
        const response = await fetch(uri)
        result = await response.json()
        debug(JSON.stringify(result, null, 2))
      } catch (err) {
        debug(err)
      }

      if (flags.all || flags.apibuild) {
        data.push({ Property: PropertyGet.flags.apibuild.description, Value: result.build })
      }

      if (flags.all || flags.apibuildno) {
        data.push({ Property: PropertyGet.flags.apibuildno.description, Value: result.buildno })
      }
    }

    cli.table(data,
      {
        Property: { minWidth: 10 },
        Value: { minWidth: 20 }
      },
      {
        printLine: this.log,
        'no-truncate': true,
        ...flags // parsed flags
      })
  }
}

PropertyGet.flags = {
  // override property command flags, they need to be boolean type, not string
  ...Object.assign(RuntimeBaseCommand.flags, RuntimeBaseCommand.propertyFlags({ asBoolean: true })),
  namespace: flags.boolean({
    description: 'whisk namespace'
  }),
  all: flags.boolean({
    description: 'all properties'
  }),
  apibuild: flags.boolean({
    description: 'whisk API build version'
  }),
  apibuildno: flags.boolean({
    description: 'whisk API build number'
  }),
  cliversion: flags.boolean({
    description: 'whisk CLI version'
  })
}

PropertyGet.description = 'get property'

PropertyGet.aliases = [
  'runtime:prop:get',
  'rt:property:get',
  'rt:prop:get'
]

module.exports = PropertyGet
