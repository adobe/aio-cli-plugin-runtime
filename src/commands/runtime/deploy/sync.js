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
const { setPaths, processPackage, deleteEntities } = require('../../../runtime-helpers')
const { flags } = require('@oclif/command')
const sha1 = require('sha1')
const fs = require('fs')

class DeploySync extends RuntimeBaseCommand {
  async run () {
    const { flags } = this.parse(DeploySync)
    try {
      // in case of 'aio runtime:deploy' (without the path to the manifest file) the program looks for the manifest file in the current directory.
      const components = setPaths(flags)
      const packages = components.packages
      const deploymentTriggers = components.deploymentTriggers
      const deploymentPackages = components.deploymentPackages
      if (components.projectName === '') {
        throw new Error('The mandatory key [project name] is missing')
      }
      const params = {}
      const entities = processPackage(packages, deploymentPackages, deploymentTriggers, params)
      const ow = await this.wsk()
      const logger = this.log
      // find project hash from server based on entities in the manifest file
      const hashProjectSynced = await findProjectHashonServer(ow, components.projectName)

      // compute the project hash from the manifest file
      const projectHash = getProjectHash(components.manifestContent, components.manifestPath)
      await addAnnotationsandDeploy(entities, ow, logger, components.manifestPath, components.projectName, projectHash)
      if (projectHash !== hashProjectSynced) {
        // delete old files with same project name that do not exist in the manifest file anymore
        await deleteEntities(hashProjectSynced, ow, '')
      }
    } catch (err) {
      this.handleError('Failed to sync', err)
    }
  }
}

async function addAnnotationsandDeploy (entities, ow, logger, manifestPath, projectName, projectHash) {
  // add whisk managed annotations
  const opts = await ow.actions.client.options
  const ns = opts.namespace
  for (const pkg of entities.pkgtoCreate) {
    const options = {}
    options['name'] = pkg.name
    options['package'] = {
      annotations: [
        {
          key: 'whisk-managed',
          value: {
            file: manifestPath,
            projectDeps: [],
            projectHash: projectHash,
            projectName: projectName
          }
        }
      ]
    }
    logger(`Info: Deploying package [${pkg.name}]...`)
    await ow.packages.update(options)
    logger(`Info: package [${pkg.name}] has been successfully deployed.\n`)
  }
  for (const action of entities.actions) {
    if (action['exec'] && action['exec']['kind']) {
      action['exec']['components'] = action['exec']['components'].map(sequence => {
        return `/${ns}/${sequence}`
      })
    }
    action['annotations']['whisk-managed'] = {
      file: manifestPath,
      projectDeps: [],
      projectHash: projectHash,
      projectName: projectName
    }
    logger(`Info: Deploying action [${action.name}]...`)
    await ow.actions.update(action)
    logger(`Info: action [${action.name}] has been successfully deployed.\n`)
  }

  for (const trigger of entities.triggers) {
    const managedAnnotation = {
      key: 'whisk-managed',
      value: {
        file: manifestPath,
        projectDeps: [],
        projectHash: projectHash,
        projectName: projectName
      }
    }
    if (trigger['trigger'] && trigger['trigger']['annotations']) {
      trigger['trigger']['annotations'].push(managedAnnotation)
    } else {
      trigger['trigger']['annotations'] = [managedAnnotation]
    }
    logger(`Info: Deploying trigger [${trigger.name}]...`)
    await ow.triggers.update(trigger)
    logger(`Info: trigger [${trigger.name}] has been successfully deployed.\n`)
  }

  logger('Success: Deployment completed successfully.')
}

function getProjectHash (manifestContent, manifestPath) {
  const stats = fs.statSync(manifestPath)
  const fileSize = stats.size.toString()
  const hashString = `Runtime ${fileSize}\0${manifestContent}`
  const projectHash = sha1(hashString)
  return projectHash
}

async function findProjectHashonServer (ow, projectName) {
  let projectHash = ''
  const options = {}
  // check for package with the projectName in manifest File and if found -> return the projectHash on the server
  const resultSync = await ow.packages.list(options)
  for (const pkg of resultSync) {
    if (pkg.annotations.length > 0) {
      const whiskManaged = pkg.annotations.find(elem => elem.key === 'whisk-managed')
      if (whiskManaged !== undefined && whiskManaged.value.projectName === projectName) {
        projectHash = whiskManaged.value.projectHash
        return projectHash
      }
    }
  }
  // if no package exists with the projectName -> look in actions
  const resultActionList = await ow.actions.list()
  for (const action of resultActionList) {
    if (action.annotations.length > 0) {
      const whiskManaged = action.annotations.find(elem => elem.key === 'whisk-managed')
      if (whiskManaged !== undefined && whiskManaged.value.projectName === projectName) {
        projectHash = whiskManaged.value.projectHash
        return projectHash
      }
    }
  }

  // if no action exists with the projectName -> look in triggers
  const resultTriggerList = await ow.triggers.list()
  for (const trigger of resultTriggerList) {
    if (trigger.annotations.length > 0) {
      const whiskManaged = trigger.annotations.find(elem => elem.key === 'whisk-managed')
      if (whiskManaged !== undefined && whiskManaged.value.projectName === projectName) {
        projectHash = whiskManaged.value.projectHash
        return projectHash
      }
    }
  }

  // if no trigger exists with the projectName -> look in rules
  const resultRules = await ow.rules.list()
  for (const rule of resultRules) {
    if (rule.annotations.length > 0) {
      const whiskManaged = rule.annotations.find(elem => elem.key === 'whisk-managed')
      if (whiskManaged !== undefined && whiskManaged.value.projectName === projectName) {
        projectHash = whiskManaged.value.projectHash
        return projectHash
      }
    }
  }
  return projectHash
}

DeploySync.flags = {
  ...RuntimeBaseCommand.flags,
  manifest: flags.string({
    char: 'm',
    description: 'the manifest file location' // help description for flag
  }),
  deployment: flags.string({
    char: 'd',
    description: 'the path to the deployment file'
  })
}

DeploySync.description = 'A tool to sync deployment and undeployment of Runtime packages using a manifest and optional deployment files using YAML'

DeploySync.aliases = ['rt:deploy:sync']

module.exports = DeploySync
