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

const fs = require('fs')
const path = require('path')
const PropertiesReader = require('properties-reader')
const config = require('@adobe/aio-cli-config')

const PropertyKey = {
  AUTH: 'AUTH',
  APIHOST: 'APIHOST',
  APIVERSION: 'APIVERSION',
  NAMESPACE: 'NAMESPACE',
  CERT: 'CERT',
  KEY: 'KEY'
}

const PropertyEnv = {
  AUTH: 'WHISK_AUTH',
  APIHOST: 'WHISK_APIHOST',
  APIVERSION: 'WHISK_APIVERSION',
  NAMESPACE: 'WHISK_NAMESPACE',
  CONFIG_FILE: 'WSK_CONFIG_FILE'
}

const PropertyDefault = {
  AUTH: '',
  APIHOST: 'https://adobeioruntime.net',
  APIVERSION: 'v1',
  NAMESPACE: '_',
  CERT: '',
  KEY: '',
  CONFIG_FILE: path.join(require('os').homedir(), '.wskprops')
}

function propertiesFile () {
  let properties = { get: () => null }
  let wskConfigFile = process.env[PropertyEnv.CONFIG_FILE] || config.get('runtime.config_file') || PropertyDefault.CONFIG_FILE

  if (fs.existsSync(wskConfigFile)) {
    properties = PropertiesReader(wskConfigFile)
  }

  properties.save = function () {
    let saved = []
    this.each((key, val) => saved.push(`${key}=${val}`))

    fs.writeFileSync(wskConfigFile, saved.join('\n'))
  }

  return properties
}

module.exports = {
  propertiesFile,
  PropertyKey,
  PropertyEnv,
  PropertyDefault
}
