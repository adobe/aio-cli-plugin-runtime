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
const fs = require('fs')

class ActionGet extends RuntimeBaseCommand {
  async run () {
    const { args, flags } = this.parse(ActionGet)
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
        let web = 'namespaces'
        let actionValue = '/actions'
        const webFlag = result.annotations.find(elem => elem.key === 'web-export')
        let actionPartOfPackage = false
        // check if action belongs to a package
        if (name.split('/').length > 1) {
          actionPartOfPackage = true
        }
        if (webFlag !== undefined && webFlag.value === true) {
          web = 'web'
          if (actionPartOfPackage) {
            actionValue = ''
          } else {
            actionValue = '/default'
          }
        }
        const opts = ow.actions.client.options
        this.log(`${opts.api}${web}/${opts.namespace}${actionValue}/${name}`)
      } else {
        const bSaveFile = flags['save-as'] && flags['save-as'].length > 0

        if (flags.save || bSaveFile) {
          if (result.exec.binary) {
            const saveFileName = bSaveFile ? flags['save-as'] : `${name}.zip`
            const data = Buffer.from(result.exec.code, 'base64')
            fs.writeFileSync(saveFileName, data, 'buffer')
          } else {
            const saveFileName = bSaveFile ? flags['save-as'] : `${name}.js`
            fs.writeFileSync(saveFileName, result.exec.code)
          }
        } else {
          // destructure getAction to remove the exec.code
          this.logJSON(`${result.name}\n`, { ...result,
            exec: { ...result.exec,
              code: undefined
            }
          })
        }
      }
    } catch (err) {
      this.handleError('failed to retrieve the action', err)
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
  url: flags.boolean({
    char: 'r',
    description: 'get action url',
    required: false
  }),
  save: flags.boolean({
    description: 'save action code to file corresponding with action name'
  }),
  'save-as': flags.string({
    description: 'file to save action code to'
  })
}

ActionGet.description = 'Retrieves an Action'

ActionGet.aliases = ['rt:action:get']

module.exports = ActionGet
