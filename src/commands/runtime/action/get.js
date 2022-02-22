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
const RuntimeBaseCommand = require('../../../RuntimeBaseCommand')
const { fileExtensionForKind } = require('../../../kinds')
const { Flags } = require('@oclif/core')

class ActionGet extends RuntimeBaseCommand {
  async run () {
    const { args, flags } = await this.parse(ActionGet)
    const name = args.actionName
    const ow = await this.wsk()

    try {
      const result = await ow.actions.get(name)
      if (flags.url) {
        /*
          wsk go client uses :
          Properties.APIHost
          DefaultOpenWhiskApiPath = "/api"
          Properties.APIVersion
          qualifiedName.GetPackageName()
        */
        const opts = ow.actions.client.options
        const webFlag = result.annotations.find(elem => elem.key === 'web-export')
        const webAction = webFlag !== undefined && webFlag.value === true
        const namespaceAsSubdomainSupported = opts.api.includes('https://adobeioruntime.net/api')

        let [namespace, packageName] = result.namespace.split('/')
        const actionPartOfPackage = !!packageName

        if (webAction) {
          const web = 'web'
          packageName = actionPartOfPackage ? packageName : 'default'
          namespaceAsSubdomainSupported
            ? this.log(`https://${namespace}.adobeioruntime.net/api/${opts.apiVersion}/${web}/${packageName}/${result.name}`)
            : this.log(`${opts.api}${web}/${namespace}/${packageName}/${result.name}`)
        } else {
          const nsPrefix = 'namespaces'
          const actionPrefix = 'actions'
          packageName = actionPartOfPackage ? packageName + '/' : ''
          this.log(`${opts.api}${nsPrefix}/${namespace}/${actionPrefix}/${packageName}${result.name}`)
        }
      } else {
        const bSaveFile = flags['save-as'] && flags['save-as'].length > 0

        if (flags.save || bSaveFile) {
          if (result.exec.binary) {
            const saveFileName = bSaveFile ? flags['save-as'] : `${result.name}.zip`
            const data = Buffer.from(result.exec.code, 'base64')
            fs.writeFileSync(saveFileName, data, 'buffer')
          } else {
            const extension = fileExtensionForKind(result.exec.kind)
            const saveFileName = bSaveFile ? flags['save-as'] : `${result.name}${extension}`
            fs.writeFileSync(saveFileName, result.exec.code)
          }
        } else if (ActionGet.fullGet) {
          this.logJSON('', result)
        } else if (flags.code) {
          if (!result.exec.binary) {
            this.log(result.exec.code)
          } else {
            throw new Error(ActionGet.codeNotText)
          }
        } else {
          // destructure getAction to remove the exec.code
          this.logJSON(`${result.name}\n`, {
            ...result,
            exec: {
              ...result.exec,
              code: undefined
            }
          })
        }
      }
    } catch (err) {
      if (err.message === ActionGet.codeNotText) {
        await this.handleError(err.message)
      } else {
        await this.handleError('failed to retrieve the action', err)
      }
    }
  }
}

ActionGet.args = [
  {
    name: 'actionName',
    required: true
  }
]

ActionGet.flags = {
  ...RuntimeBaseCommand.flags,
  url: Flags.boolean({
    char: 'r',
    description: 'get action url'
  }),
  code: Flags.boolean({
    char: 'c',
    description: 'show action code (only works if code is not a zip file)'
  }),
  save: Flags.boolean({
    description: 'save action code to file corresponding with action name'
  }),
  'save-as': Flags.string({
    description: 'file to save action code to'
  })
}

// global toggle to allow clients to retrieve the action code
// and metadata at once
ActionGet.fullGet = false

ActionGet.codeNotText = 'Cannot display code because it is not plaintext.'

ActionGet.description = 'Retrieves an Action'

ActionGet.aliases = ['rt:action:get']

module.exports = ActionGet
