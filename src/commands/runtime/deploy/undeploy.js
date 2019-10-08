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
const fs = require('fs')
const yaml = require('js-yaml')
const { setManifestPath, deleteEntities } = require('../../../runtime-helpers')
const { flags } = require('@oclif/command')

class DeployUndeploy extends RuntimeBaseCommand {
  async run () {
    const { flags } = this.parse(DeployUndeploy)
    try {
      if (flags.projectname) {
        const ow = await this.wsk()
        await deleteEntities('', ow, flags.projectname)
        return
      }
      let manifestPath
      if (!flags.manifest) {
        manifestPath = setManifestPath()
      } else {
        manifestPath = flags.manifest
      }
      const manifest = yaml.safeLoad(fs.readFileSync(manifestPath, 'utf8'))
      let packages
      if (manifest.project) {
        packages = manifest.project.packages
      } else {
        packages = manifest.packages
      }
      const pkg = []
      const actions = []
      const triggers = []
      const rules = []
      const apis = []
      Object.keys(packages).forEach((key) => {
        pkg.push(key)
        if (packages[key]['dependencies']) {
          Object.keys(packages[key]['dependencies']).forEach((depName) => {
            pkg.push(depName)
          })
        }
        if (packages[key]['actions']) {
          Object.keys(packages[key]['actions']).forEach((action) => {
            action = `${key}/${action}`
            actions.push(action)
          })
        }
        if (packages[key]['sequences']) {
          Object.keys(packages[key]['sequences']).forEach((sequence) => {
            sequence = `${key}/${sequence}`
            actions.push(sequence)
          })
        }
        if (packages[key]['triggers']) {
          Object.keys(packages[key]['triggers']).forEach((trigger) => {
            triggers.push(trigger)
          })
        }
        if (packages[key]['rules']) {
          Object.keys(packages[key]['rules']).forEach((rule) => {
            rules.push(rule)
          })
        }
        if (packages[key]['apis']) {
          Object.keys(packages[key]['apis']).forEach((api) => {
            const firstProp = (obj) => Object.keys(obj)[0]
            const objectAPI = {}
            objectAPI.name = api
            objectAPI.basepath = firstProp(packages[key]['apis'][api])
            objectAPI.relpath = firstProp(packages[key]['apis'][api][objectAPI.basepath])
            objectAPI.relpath = '/' + objectAPI.relpath
            objectAPI.basepath = '/' + objectAPI.basepath
            apis.push(objectAPI)
          })
        }
      })

      const ow = await this.wsk()
      for (const action of actions) {
        this.log(`Info: Undeploying action [${action}]...`)
        await ow.actions.delete(action)
        this.log(`Info: action [${action}] has been successfully undeployed.\n`)
      }
      for (const trigger of triggers) {
        this.log(`Info: Undeploying trigger [${trigger}]...`)
        await ow.triggers.delete(trigger)
        this.log(`Info: trigger [${trigger}] has been successfully undeployed.\n`)
      }
      for (const rule of rules) {
        this.log(`Info: Undeploying rule [${rule}]...`)
        await ow.rules.delete(rule)
        this.log(`Info: rule [${rule}] has been successfully undeployed.\n`)
      }
      for (const api of apis) {
        this.log(`Info: Undeploying api [${api.name}]...`)
        await ow.routes.delete(api)
        this.log(`Info: api [${api.name}] has been successfully undeployed.\n`)
      }
      for (const packg of pkg) {
        const options = {}
        options.name = packg
        this.log(`Info: Undeploying package [${packg}]...`)
        await ow.packages.delete(options)
        this.log(`Info: package [${packg}] has been successfully undeployed.\n`)
      }
      this.log('Success: Undeployment completed successfully.')
    } catch (err) {
      this.handleError('Failed to undeploy', err)
    }
  }
}

DeployUndeploy.flags = {
  ...RuntimeBaseCommand.flags,
  manifest: flags.string({
    char: 'm',
    description: 'the manifest file location', // help description for flag
    required: false
  }),
  projectname: flags.string({
    description: 'the name of the project to be undeployed', // help description for flag
    required: false
  })
}

DeployUndeploy.description = 'Undeploy removes Runtime assets which were deployed from the manifest and deployment YAML'

DeployUndeploy.aliases = ['rt:deploy:undeploy']

module.exports = DeployUndeploy
