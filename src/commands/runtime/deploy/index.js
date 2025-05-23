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
const { deployPackage, setPaths, processPackage, getKeyValueObjectFromMergedParameters } = require('@adobe/aio-lib-runtime').utils
const { Flags } = require('@oclif/core')

class IndexCommand extends RuntimeBaseCommand {
  async run () {
    const { flags } = await this.parse(IndexCommand)

    try {
      // in case of 'aio runtime:deploy' (without the path to the manifest file) the program looks for the manifest file in the current directory.
      const components = setPaths(flags)
      const packages = components.packages
      const deploymentTriggers = components.deploymentTriggers
      const deploymentPackages = components.deploymentPackages

      const params = getKeyValueObjectFromMergedParameters(flags.param, flags['param-file'])
      const options = await this.getOptions()
      const entities = processPackage(packages, deploymentPackages, deploymentTriggers, params, false, options)
      const ow = await this.wsk()
      const logger = this.log
      await deployPackage(entities, ow, logger.bind(this), this.getImsOrgId())
    } catch (err) {
      await this.handleError('Failed to deploy', err)
    }
  }
}

IndexCommand.flags = {
  ...RuntimeBaseCommand.flags,
  manifest: Flags.string({
    char: 'm',
    description: 'the manifest file location' // help description for flag
  }),
  deployment: Flags.string({
    char: 'd',
    description: 'the path to the deployment file'
  }),
  param: Flags.string({
    description: 'parameter values in KEY VALUE format', // help description for flag
    multiple: true // allow setting this flag multiple times
  }),
  'param-file': Flags.string({
    char: 'P',
    description: 'FILE containing parameter values in JSON format' // help description for flag
  })
}

IndexCommand.description = 'The Runtime Deployment Tool'

IndexCommand.aliases = ['rt:deploy']

module.exports = IndexCommand
