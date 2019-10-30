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
const { deleteEntities, undeployPackage, processPackage, setPaths } = require('../../../runtime-helpers')
const { flags } = require('@oclif/command')

class DeployUndeploy extends RuntimeBaseCommand {
  async run () {
    const { flags } = this.parse(DeployUndeploy)
    try {
      // a. delete entities by project name
      if (flags.projectname) {
        const ow = await this.wsk()
        await deleteEntities('', ow, flags.projectname)
        return
      }

      // b. delete entities by manifest file
      const components = setPaths(flags) // if !flags.manifest -> uses default
      const packages = components.packages
      // todo support deployment files
      const deploymentTriggers = {} // components.deploymentTriggers
      const deploymentPackages = {} // components.deploymentPackages
      const entities = processPackage(packages, deploymentTriggers, deploymentPackages, {}, true) // true for getting entity namesOnly, we do not need to parse all actions files and so on

      const ow = await this.wsk()
      const logger = this.log
      await undeployPackage(entities, ow, logger)
    } catch (err) {
      this.handleError('Failed to undeploy', err)
    }
  }
}

DeployUndeploy.flags = {
  ...RuntimeBaseCommand.flags,
  manifest: flags.string({
    char: 'm',
    description: 'the manifest file location' // help description for flag
  }),
  projectname: flags.string({
    description: 'the name of the project to be undeployed' // help description for flag
  })
}

DeployUndeploy.description = 'Undeploy removes Runtime assets which were deployed from the manifest and deployment YAML'

DeployUndeploy.aliases = ['rt:deploy:undeploy']

module.exports = DeployUndeploy
