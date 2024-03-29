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
const { Flags } = require('@oclif/core')
const { PropertyKey, propertiesFile } = require('../../../properties')

class PropertyUnset extends RuntimeBaseCommand {
  async run () {
    try {
      const { flags } = await this.parse(PropertyUnset)
      const properties = propertiesFile()

      properties.unset = function (key) {
        delete this._properties[key]
      }

      if (flags.auth) {
        properties.unset(PropertyKey.AUTH)
      }

      if (flags.apihost) {
        properties.unset(PropertyKey.APIHOST)
      }

      if (flags.apiversion) {
        properties.unset(PropertyKey.APIVERSION)
      }

      if (flags.namespace) {
        properties.unset(PropertyKey.NAMESPACE)
      }

      if (flags.cert) {
        properties.unset(PropertyKey.CERT)
      }

      if (flags.key) {
        properties.unset(PropertyKey.KEY)
      }

      properties.save()
    } catch (err) {
      await this.handleError('failed to unset the property', err)
    }
  }
}

PropertyUnset.flags = {
  // override property command flags, they need to be boolean type, not string
  ...Object.assign(RuntimeBaseCommand.flags, RuntimeBaseCommand.propertyFlags({ asBoolean: true })),
  namespace: Flags.boolean({
    description: 'whisk namespace'
  })
}

PropertyUnset.description = 'unset property'

PropertyUnset.aliases = [
  'runtime:prop:unset',
  'rt:property:unset',
  'rt:prop:unset'
]

module.exports = PropertyUnset
