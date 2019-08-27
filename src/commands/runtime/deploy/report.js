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
const { processInputs, returnUnion, setPaths } = require('../../../runtime-helpers')
const { flags } = require('@oclif/command')

class DeployReport extends RuntimeBaseCommand {
  async run () {
    const { flags } = this.parse(DeployReport)
    try {
      let components = setPaths(flags)
      let packages = components.packages
      let deploymentTriggers = components.deploymentTriggers
      let deploymentPackages = components.deploymentPackages

      let proj = {
        name: components.projectName,
        Inputs: {}
      }
      let pkg = []
      let actions = []
      let triggers = []
      Object.keys(packages).forEach((key) => {
        pkg.push({ name: key, Inputs: {} })
        if (packages[key]['actions']) {
          Object.keys(packages[key]['actions']).forEach((action) => {
            let objAction = { name: action, Inputs: {} }
            let packageInputs = packages[key]['actions'][action]['inputs'] || {}
            let deploymentInputs = {}
            if (deploymentPackages[key] && deploymentPackages[key]['actions'] && deploymentPackages[key]['actions'][action]) {
              deploymentInputs = deploymentPackages[key]['actions'][action]['inputs'] || {}
            }
            let allInputs = returnUnion(packageInputs, deploymentInputs)
            objAction.Inputs = processInputs(allInputs, {})
            actions.push(objAction)
          })
        }

        if (packages[key]['sequences']) {
          Object.keys(packages[key]['sequences']).forEach((sequence) => {
            let objSequence = { name: sequence, Inputs: {} }
            actions.push(objSequence)
          })
        }

        if (packages[key]['triggers']) {
          Object.keys(packages[key]['triggers']).forEach((trigger) => {
            let objTrigger = { name: trigger }
            let packageInputs = packages[key]['triggers'][trigger]['inputs'] || {}
            let deploymentInputs = {}
            if (trigger in deploymentTriggers) {
              deploymentInputs = deploymentTriggers[trigger]
            }
            let allInputs = returnUnion(packageInputs, deploymentInputs)
            allInputs = processInputs(allInputs, {})
            objTrigger.Inputs = allInputs
            triggers.push(objTrigger)
          })
        }
      })

      this.logJSON('', proj)

      for (let packg of pkg) {
        this.logJSON('', packg)
      }
      for (let action of actions) {
        // TODO : Need to improve the fetching of namespace and addition to actions
        this.logJSON('', action)
      }
      for (let trigger of triggers) {
        this.logJSON('', trigger)
      }
    } catch (err) {
      this.handleError('Failed to report', err)
    }
  }
}

DeployReport.flags = {
  ...RuntimeBaseCommand.flags,
  'manifest': flags.string({
    char: 'm',
    description: 'the manifest file location', // help description for flag
    required: false
  }),
  'deployment': flags.string({
    char: 'd',
    description: 'the deployment file location', // help description for flag
    required: false
  })
}

DeployReport.description = 'Provides a summary report of Runtime assets being deployed/undeployed based on manifest/deployment YAML'

DeployReport.aliases = ['rt:deploy:report']

module.exports = DeployReport
