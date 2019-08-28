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
const yaml = require('js-yaml')
const path = require('path')

class DeployExport extends RuntimeBaseCommand {
  async run () {
    const { flags } = this.parse(DeployExport)
    try {
      const ow = await this.wsk()
      const projectEntities = await findProjectEntities(ow, flags.projectname)
      const manifest = flags.manifest
      const fileDirectory = path.dirname(manifest)
      const projectJSON = await createProjectJSON(projectEntities, flags.projectname, ow, fileDirectory)
      const yamlObject = { project: projectJSON }
      fs.writeFileSync(manifest, yaml.safeDump(yamlObject))
    } catch (err) {
      this.handleError('Failed to export', err)
    }
  }
}

async function findProjectEntities (ow, projectName) {
  const packages = []
  const actions = []
  const triggers = []
  const rules = []

  const options = {}
  const resultSync = await ow.packages.list(options)
  for (const pkg of resultSync) {
    if (pkg.annotations.length > 0) {
      const whiskManaged = pkg.annotations.find(elem => elem.key === 'whisk-managed')
      if (whiskManaged !== undefined && whiskManaged.value.projectName === projectName) {
        packages.push(pkg)
      }
    }
  }

  for (const pkg of packages) {
    const getPackage = await ow.packages.get(pkg)
    for (const action of getPackage.actions) {
      const actionName = `${getPackage.name}/${action.name}`
      actions.push(actionName)
    }
  }

  const resultTriggerList = await ow.triggers.list()
  for (const trigger of resultTriggerList) {
    if (trigger.annotations.length > 0) {
      const whiskManaged = trigger.annotations.find(elem => elem.key === 'whisk-managed')
      if (whiskManaged !== undefined && whiskManaged.value.projectName === projectName) {
        triggers.push(trigger.name)
      }
    }
  }

  // if no trigger exists with the projectName -> look in rules
  const resultRules = await ow.rules.list()
  for (const rule of resultRules) {
    if (rule.annotations.length > 0) {
      const whiskManaged = rule.annotations.find(elem => elem.key === 'whisk-managed')
      if (whiskManaged !== undefined && whiskManaged.value.projectName === projectName) {
        rules.push(rule)
      }
    }
  }

  const entities = {
    packages: packages,
    actions: actions,
    triggers: triggers,
    rules: rules
  }
  return entities
}
async function createProjectJSON (entities, projectname, ow, fileDirectory) {
  const project = { name: projectname, packages: {} }
  for (const pkg of entities.packages) {
    const annotations = returninputsfromKeyValue(pkg.annotations)
    project['packages'][pkg.name] = {
      version: pkg.version,
      namespace: pkg.namespace,
      annotations: annotations,
      actions: {},
      triggers: {},
      sequences: {},
      rules: {}
    }
  }

  const filesObject = []
  let packageName
  for (const action of entities.actions) {
    const getAction = await ow.actions.get(action)
    packageName = getAction.namespace.split('/').pop()
    const actionName = getAction.name
    if (getAction.exec.kind !== 'sequence') {
      const binaryFlag = getAction.exec.binary || false
      let functionValue = `${action}.js`
      if (binaryFlag) {
        functionValue = `${action}.zip`
      }
      const limits = {
        timeout: getAction.limits.timeout,
        memorySize: getAction.limits.memory,
        logSize: getAction.limits.logs
      }
      project['packages'][packageName]['actions'][actionName] = {
        version: getAction.version,
        namespace: getAction.namespace,
        annotations: returninputsfromKeyValue(getAction.annotations),
        inputs: returninputsfromKeyValue(getAction.parameters),
        function: functionValue,
        runtime: getAction.exec.kind,
        main: getAction.exec.main || '',
        limits: limits
      }
      const obj = { name: functionValue, code: getAction.exec.code }
      filesObject.push(obj)
    } else {
      let sequenceString = ''
      sequenceString = getAction.parameters[0].value
      sequenceString = sequenceString.map(action => {
        return action.split('/').pop()
      })
      project['packages'][packageName]['sequences'][actionName] = {
        actions: sequenceString.join()
      }
    }
  }

  for (const trigger of entities.triggers) {
    const getTrigger = await ow.triggers.get(trigger)
    project['packages'][packageName]['triggers'][trigger] = {
      namespace: getTrigger.namespace,
      inputs: returninputsfromKeyValue(getTrigger.parameters),
      annotations: returninputsfromKeyValue(getTrigger.annotations)
    }
  }

  for (const rule of entities.rules) {
    project['packages'][packageName]['rules'][rule.name] = {
      action: rule.action.name,
      annotations: returninputsfromKeyValue(rule.annotations),
      trigger: rule.trigger.name
    }
  }
  writeFiles(filesObject, fileDirectory)
  return project
}

function writeFiles (fileObj, fileDirectory) {
  for (const file of fileObj) {
    const packageName = path.dirname(file.name)
    const fileDirectorywithPackage = `${fileDirectory}/${packageName}`
    if (!fs.existsSync(fileDirectorywithPackage)) {
      fs.mkdirSync(fileDirectorywithPackage, { recursive: true })
    }
    file.name = `${fileDirectory}/${file.name}`
    if (file.name.endsWith('.zip')) {
      const data = Buffer.from(file.code, 'base64')
      fs.writeFileSync(file.name, data, 'buffer')
    } else {
      fs.writeFileSync(file.name, file.code)
    }
  }
}

function returninputsfromKeyValue (inputs) {
  const inputObj = {}
  for (const input of inputs) {
    // whisk managed annotation not exported to yaml file
    if (input.key !== 'whisk-managed') {
      inputObj[input.key] = input.value
    }
  }
  return inputObj
}

DeployExport.flags = {
  ...RuntimeBaseCommand.flags,
  manifest: flags.string({
    char: 'm',
    description: 'the manifest file location', // help description for flag
    required: true
  }),

  projectname: flags.string({
    description: 'the name of the project to be undeployed', // help description for flag
    required: true
  })
}

DeployExport.description = 'Exports managed project assets from Runtime to manifest and function files'

DeployExport.aliases = [
  'rt:deploy:export'
]

module.exports = DeployExport
