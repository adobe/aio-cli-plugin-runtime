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
const yaml = require('js-yaml')
const debug = require('debug')('aio-cli-plugin-runtime/deploy')
/**
 * @description returns key value array from the parameters supplied. Used to create --param and --annotation key value pairs
 * @param flag : flags.param or flags.annotation
 * @returns An array of key value pairs in this format : [{key : 'Your key 1' , value: 'Your value 1'}, {key : 'Your key 2' , value: 'Your value 2'} ]
 */
function createKeyValueArrayFromFlag (flag) {
  if (flag.length % 2 === 0) {
    let i
    const tempArray = []
    for (i = 0; i < flag.length; i += 2) {
      const obj = {}
      obj['key'] = flag[i]
      try {
        // assume it is JSON, there is only 1 way to find out
        obj['value'] = JSON.parse(flag[i + 1])
      } catch (ex) {
        // hmm ... not json, treat as string
        obj['value'] = flag[i + 1]
      }
      tempArray.push(obj)
    }
    return tempArray
  } else {
    throw (new Error('Please provide correct values for flags'))
  }
}

/**
 * @description returns key value array from the json file supplied. Used to create --param-file and annotation-file key value pairs
 * @param file : flags['param-file'] or flags['annotation-file]
 * @returns An array of key value pairs in this format : [{key : 'Your key 1' , value: 'Your value 1'}, {key : 'Your key 2' , value: 'Your value 2'} ]
 */
function createKeyValueArrayFromFile (file) {
  const jsonData = fs.readFileSync(file)
  const jsonParams = JSON.parse(jsonData)
  const tempArray = []
  Object.entries(jsonParams).forEach(
    ([key, value]) => {
      const obj = {}
      obj['key'] = key
      obj['value'] = value
      tempArray.push(obj)
    }
  )
  return tempArray
}

/**
 * @description returns key value pairs in an object from the parameters supplied. Used to create --param and --annotation key value pairs
 * @param flag : flags.param or flags.annotation
 * @returns An object of key value pairs in this format : {Your key1 : 'Your Value 1' , Your key2: 'Your value 2'}
 */
function createKeyValueObjectFromFlag (flag) {
  if (flag.length % 2 === 0) {
    let i
    const tempObj = {}
    for (i = 0; i < flag.length; i += 2) {
      try {
        // assume it is JSON, there is only 1 way to find out
        tempObj[flag[i]] = JSON.parse(flag[i + 1])
      } catch (ex) {
        // hmm ... not json, treat as string
        tempObj[flag[i]] = flag[i + 1]
      }
    }
    return tempObj
  } else {
    throw (new Error('Please provide correct values for flags'))
  }
}
/**
 * @description returns key value pairs from the parameters supplied. Used to create --param-file and --annotation-file key value pairs
 * @param file : flags['param-file'] or flags['annotation-file']
 * @returns An object of key value pairs in this format : {Your key1 : 'Your Value 1' , Your key2: 'Your value 2'}
 */
function createKeyValueObjectFromFile (file) {
  const jsonData = fs.readFileSync(file)
  return JSON.parse(jsonData)
}

function createComponentsfromSequence (sequenceAction, ns) {
  const objSequence = {}
  objSequence['kind'] = 'sequence'
  // The components array requires fully qualified names [/namespace/package_name/action_name] of all the actions passed as sequence
  sequenceAction = sequenceAction.map(sequence => {
    return `/${ns}/${sequence}`
  })
  objSequence['components'] = sequenceAction
  return objSequence
}

function returnUnion (firstObject, secondObject) {
  return Object.assign(firstObject, secondObject)
}

function parsePathPattern (path) {
  const pattern = /^\/(.+)\/(.+)$/i
  const defaultMatch = [null, null, path]

  return (pattern.exec(path) || defaultMatch)
}

function processInputs (input, params) {
  // check if the value of a key is an object (Advanced parameters)
  const dictDataTypes = {
    string: '',
    integer: 0,
    number: 0
  }

  // check if the value of a key is an object (Advanced parameters)
  for (const key in input) {
    // eslint: see https://eslint.org/docs/rules/no-prototype-builtins
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      input[key] = params[key]
    } else {
      if (typeof input[key] === 'object') {
        for (const val in input[key]) {
          if (val === 'value') {
            input[key] = input[key][val]
          } else if (val === 'default') {
            input[key] = input[key][val]
          }
        }
      } else {
        // For example: name:'string' is changed to name:'' (Typed parameters)
        // For example: height:'integer' or height:'number' is changed to height:0 (Typed parameters)
        // eslint: see https://eslint.org/docs/rules/no-prototype-builtins
        if (Object.prototype.hasOwnProperty.call(dictDataTypes, input[key])) {
          input[key] = dictDataTypes[input[key]]
        } else if (typeof input[key] === 'string' && input[key].startsWith('$')) {
          let val = input[key]
          val = val.substr(1)
          input[key] = process.env[val]
        }
      }
    }
  }

  return input
}

function createKeyValueInput (input) {
  input = Object.keys(input).map(function (k) {
    return { key: k, value: input[k] }
  })
  return input
}

function setDeploymentPath () {
  let deploymentPath
  if (fs.existsSync('./deployment.yaml')) {
    deploymentPath = 'deployment.yaml'
  } else if (fs.existsSync('./deployment.yml')) {
    deploymentPath = 'deployment.yml'
  }
  return deploymentPath
}

function setManifestPath () {
  let manifestPath
  if (fs.existsSync('./manifest.yaml')) {
    manifestPath = 'manifest.yaml'
  } else if (fs.existsSync('./manifest.yml')) {
    manifestPath = 'manifest.yml'
  } else {
    throw (new Error('Manifest file not found'))
  }
  return manifestPath
}

function returnDeploymentTriggerInputs (deploymentPackages) {
  const deploymentTriggers = {}
  Object.keys(deploymentPackages).forEach((key) => {
    if (deploymentPackages[key]['triggers']) {
      Object.keys(deploymentPackages[key]['triggers']).forEach((trigger) => {
        deploymentTriggers[trigger] = deploymentPackages[key]['triggers'][trigger]['inputs'] || {}
      })
    }
  })
  return deploymentTriggers
}

function returnAnnotations (action) {
  let annotationParams = {}
  if (action['web'] !== undefined) {
    annotationParams = checkWebFlags(action['web'])
  } else if (action['web-export'] !== undefined) {
    annotationParams = checkWebFlags(action['web-export'])
  } else {
    annotationParams['web-export'] = false
    annotationParams['raw-http'] = false
    return annotationParams
  }

  if (action['annotations'] && action['annotations']['require-whisk-auth'] !== undefined) {
    if (annotationParams['web-export'] === true) {
      annotationParams['require-whisk-auth'] = action['annotations']['require-whisk-auth']
    }
  }

  if (action['annotations'] && action['annotations']['raw-http'] !== undefined) {
    if (annotationParams['web-export'] === true) {
      annotationParams['raw-http'] = action['annotations']['raw-http']
    }
  }

  if (action['annotations'] && action['annotations']['final'] !== undefined) {
    if (annotationParams['web-export'] === true) {
      annotationParams['final'] = action['annotations']['final']
    }
  }

  return annotationParams
}

function createApiObject (packages, key, api, ruleAction, arrSequence) {
  const objectAPI = {}
  const firstProp = (obj) => Object.keys(obj)[0]
  objectAPI.basepath = firstProp(packages[key]['apis'][api])
  objectAPI.relpath = firstProp(packages[key]['apis'][api][objectAPI.basepath])
  objectAPI.action = firstProp(packages[key]['apis'][api][objectAPI.basepath][objectAPI.relpath])
  objectAPI.operation = packages[key]['apis'][api][objectAPI.basepath][objectAPI.relpath][objectAPI.action].method
  objectAPI.responsetype = packages[key]['apis'][api][objectAPI.basepath][objectAPI.relpath][objectAPI.action].response || 'json' // binding the default parameter
  if (ruleAction.includes(objectAPI.action)) {
    if (packages[key]['actions'][objectAPI.action]['web'] || packages[key]['actions'][objectAPI.action]['web-export']) {
      objectAPI.action = `${key}/${objectAPI.action}`
    } else {
      throw new Error('Action provided in api is not a web action')
    }
  } else if (arrSequence.includes(objectAPI.action)) {
    if (packages[key]['sequences'][objectAPI.action]['web'] || packages[key]['sequences'][objectAPI.action]['web-export']) {
      objectAPI.action = `${key}/${objectAPI.action}`
    } else {
      throw new Error('Sequence provided in api is not a web action')
    }
  } else {
    throw new Error('Action provided in the api not present in the package')
  }
  objectAPI['relpath'] = '/' + objectAPI['relpath']
  objectAPI['basepath'] = '/' + objectAPI['basepath']
  return objectAPI
}

function createSequenceObject (thisSequence, options, key) {
  let actionArray = []
  if (thisSequence) {
    actionArray = thisSequence.split(',')
    actionArray = actionArray.map((action) => {
      // remove space between two actions after split
      const actionItem = action.replace(/\s+/g, '')
      if (actionItem.split('/').length > 1) {
        return actionItem
      } else {
        return `${key}/${actionItem}`
      }
    })
  } else {
    throw new Error('Actions for the sequence not provided.')
  }
  const objSequence = {}
  objSequence['kind'] = 'sequence'
  objSequence['components'] = actionArray
  options['exec'] = objSequence
  return options
}

function checkWebFlags (flag) {
  const tempObj = {}
  switch (flag) {
    case true:
    case 'yes' :
      tempObj['web-export'] = true
      break
    case 'raw' :
      tempObj['web-export'] = true
      tempObj['raw-http'] = true
      break
    case false:
    case 'no':
      tempObj['web-export'] = false
      tempObj['raw-http'] = false
  }
  return tempObj
}

function createActionObject (thisAction, objAction) {
  if (thisAction['function'].endsWith('.zip')) {
    if (!thisAction['runtime']) {
      throw (new Error(`Invalid or missing runtime in the manifest for this action: ${objAction.name}`))
    }
    objAction.action = fs.readFileSync(thisAction['function'])
  } else {
    objAction.action = fs.readFileSync(thisAction['function'], { encoding: 'utf8' })
  }

  if (thisAction['runtime']) {
    // thisAction['runtime'] = thisAction['runtime'].replace('@', ':')  - Conflict in documentation
    objAction['kind'] = thisAction['runtime']
  }

  if (thisAction['main']) {
    objAction['exec'] = { main: thisAction['main'] }
  }

  if (thisAction.limits) {
    const limits = {
      memory: thisAction.limits['memorySize'] || 256,
      logs: thisAction.limits['logSize'] || 10,
      timeout: thisAction.limits['timeout'] || 60000
    }
    objAction['limits'] = limits
  }
  objAction['annotations'] = returnAnnotations(thisAction)
  return objAction
}

function processPackage (packages, deploymentPackages, deploymentTriggers, params) {
  const pkgtoCreate = []
  const actions = []
  const rules = []
  const triggers = []
  const ruleAction = []
  const ruleTrigger = []
  const apis = []
  const arrSequence = []

  Object.keys(packages).forEach((key) => {
    pkgtoCreate.push({ name: key })
    // From wskdeploy repo : currently, the 'version' and 'license' values are not stored in Apache OpenWhisk, but there are plans to support it in the future
    // pkg.version = packages[key]['version']
    // pkg.license = packages[key]['license']
    if (packages[key]['dependencies']) {
      Object.keys(packages[key]['dependencies']).forEach((depName) => {
        const thisDep = packages[key]['dependencies'][depName]
        let objPackage = {}
        try { // Parse location
          const thisLocation = thisDep['location'].split('/')
          objPackage = {
            binding: {
              namespace: thisLocation[1],
              name: thisLocation[2]
            }
          }
        } catch (ex) {
          throw (new Error(`Invalid or missing location in the manifest for this action: ${depName}`))
        }

        // Parse inputs
        let deploymentInputs = {}
        const packageInputs = thisDep['inputs'] || {}
        if (deploymentPackages[key] && deploymentPackages[key]['dependencies'] && deploymentPackages[key]['dependencies'][depName]) {
          deploymentInputs = deploymentPackages[key]['dependencies'][depName]['inputs'] || {}
        }
        const allInputs = returnUnion(packageInputs, deploymentInputs)
        // if parameter is provided as key : 'data type' , process it to set default values before deployment
        if (Object.entries(allInputs).length !== 0) {
          const processedInput = createKeyValueInput(processInputs(allInputs, params))
          objPackage['parameters'] = processedInput
        }
        pkgtoCreate.push({ name: depName, package: objPackage })
      })
    }
    if (packages[key]['actions']) {
      Object.keys(packages[key]['actions']).forEach((actionName) => {
        const thisAction = packages[key]['actions'][actionName]
        let objAction = { name: `${key}/${actionName}` }
        objAction = createActionObject(thisAction, objAction)
        let deploymentInputs = {}
        const packageInputs = thisAction['inputs'] || {}
        if (deploymentPackages[key] && deploymentPackages[key]['actions'] && deploymentPackages[key]['actions'][actionName]) {
          deploymentInputs = deploymentPackages[key]['actions'][actionName]['inputs'] || {}
        }
        const allInputs = returnUnion(packageInputs, deploymentInputs)
        // if parameter is provided as key : 'data type' , process it to set default values before deployment
        if (Object.entries(allInputs).length !== 0) {
          const processedInput = processInputs(allInputs, params)
          objAction['params'] = processedInput
        }
        ruleAction.push(actionName)
        actions.push(objAction)
      })
    }

    if (packages[key]['sequences']) {
      // Sequences can have only one field : actions
      // Usage: aio runtime:action:create <action-name> --sequence existingAction1, existingAction2
      Object.keys(packages[key]['sequences']).forEach((sequenceName) => {
        let options = { name: `${key}/${sequenceName}`, action: '' }
        const thisSequence = packages[key]['sequences'][sequenceName]
        options = createSequenceObject(thisSequence['actions'], options, key)
        options['annotations'] = returnAnnotations(thisSequence)
        arrSequence.push(sequenceName)
        actions.push(options)
      })
    }
    if (packages[key]['triggers']) {
      Object.keys(packages[key]['triggers']).forEach((triggerName) => {
        const objTrigger = { name: triggerName, trigger: {} }
        const packageInputs = packages[key]['triggers'][triggerName]['inputs'] || {}
        let deploymentInputs = {}
        if (triggerName in deploymentTriggers) {
          deploymentInputs = deploymentTriggers[triggerName]
        }
        let allInputs = returnUnion(packageInputs, deploymentInputs)
        allInputs = createKeyValueInput(processInputs(allInputs, {}))
        if (Object.entries(allInputs).length !== 0) {
          objTrigger.trigger.parameters = allInputs
        }
        if (packages[key]['triggers'][triggerName]['annotations']) {
          objTrigger.trigger.annotations = createKeyValueInput(packages[key]['triggers'][triggerName]['annotations'])
        }
        // trigger creation requires only name parameter and hence will be created in all cases
        triggers.push(objTrigger)
        ruleTrigger.push(triggerName)
      })
    }
    // Rules cannot belong to any package
    if (packages[key]['rules']) {
      Object.keys(packages[key]['rules']).forEach((ruleName) => {
        const objRule = { name: ruleName }
        if (packages[key]['rules'][ruleName]['trigger'] && packages[key]['rules'][ruleName]['action']) {
          objRule['trigger'] = packages[key]['rules'][ruleName]['trigger']
          objRule['action'] = packages[key]['rules'][ruleName]['action']
          if (objRule['action'].split('/').length > 1) {
            objRule['action'] = objRule['action'].split('/').pop()
          }
        } else {
          throw new Error('Trigger and Action are both required for rule creation')
        }
        if ((ruleAction.includes(objRule['action']) || arrSequence.includes(objRule['action'])) && ruleTrigger.includes(objRule['trigger'])) {
          objRule['action'] = `${key}/${objRule['action']}`
          rules.push(objRule)
        } else {
          throw new Error('Action/Trigger provided in the rule not found in manifest file')
        }
      })
    }

    if (packages[key]['apis']) {
      Object.keys(packages[key]['apis']).forEach((api) => {
        if (packages[key]['apis'][api]) {
          const objectAPI = createApiObject(packages, key, api, ruleAction, arrSequence)
          objectAPI.name = api
          apis.push(objectAPI)
        } else {
          throw new Error('Arguments to create API not provided')
        }
      })
    }
  })
  const entities = {
    pkgtoCreate: pkgtoCreate,
    apis: apis,
    triggers: triggers,
    rules: rules,
    actions: actions
  }
  return entities
}

function setPaths (flags) {
  let manifestPath
  if (!flags.manifest) {
    manifestPath = setManifestPath()
  } else {
    manifestPath = flags.manifest
  }
  debug(`Using manifest file: ${manifestPath}`)

  let deploymentPath
  let deploymentPackages = {}
  if (!flags.deployment) {
    deploymentPath = setDeploymentPath()
  } else {
    deploymentPath = flags.deployment
  }
  let deploymentTriggers = {}
  let deploymentProjectName = ''
  if (deploymentPath) {
    const deployment = yaml.safeLoad(fs.readFileSync(deploymentPath, 'utf8'))
    deploymentProjectName = deployment.project.name || ''
    deploymentPackages = deployment.project.packages
    deploymentTriggers = returnDeploymentTriggerInputs(deploymentPackages)
  }

  const manifest = yaml.safeLoad(fs.readFileSync(manifestPath, 'utf8'))
  let packages
  let projectName = ''
  if (manifest.project) {
    projectName = manifest.project.name || ''
    packages = manifest.project.packages
  }
  // yaml files from wskdeploy export sometimes have projects and packages at same level (indentation)
  if (manifest.packages) {
    packages = manifest.packages
  }

  // project name in manifest can be undefined and still packages can be deployed/reported
  // if project name is present in both manifest and deployment files, they should be equal
  // in case of aio runtime deploy sync, project name is mandatory -> handled in sync.js
  if (deploymentPath) {
    if (projectName !== '' && projectName !== deploymentProjectName) {
      throw new Error('The project name in the deployment file does not match the project name in the manifest file')
    }
  }

  const filecomponents = {
    packages: packages,
    deploymentTriggers: deploymentTriggers,
    deploymentPackages: deploymentPackages,
    manifestPath: manifestPath,
    manifestContent: manifest,
    projectName: projectName
  }
  return filecomponents
}

async function deployPackage (entities, ow, logger) {
  const opts = await ow.actions.client.options
  const ns = opts.namespace
  for (const pkg of entities.pkgtoCreate) {
    logger(`Info: Deploying package [${pkg.name}]...`)
    await ow.packages.update(pkg)
    logger(`Info: package [${pkg.name}] has been successfully deployed.\n`)
  }
  for (const action of entities.actions) {
    if (action['exec'] && action['exec']['kind']) {
      action['exec']['components'] = action['exec']['components'].map(sequence => {
        /*
          Input => Output
          spackage/saction => /ns/spackage/saction
          /spackage/saction => /ns/spackage/saction
          snamespace/spackage/saction => /snamespace/spackage/saction
          /snamespace/spackage/saction => /snamespace/spackage/saction
        */
        sequence = sequence.startsWith('/') ? sequence.substr(1) : sequence
        const actionItemCount = sequence.split('/').length
        return (actionItemCount > 2)
          ? `/${sequence}`
          : `/${ns}/${sequence}`
      })
    }
    logger(`Info: Deploying action [${action.name}]...`)
    await ow.actions.update(action)
    logger(`Info: action [${action.name}] has been successfully deployed.\n`)
  }

  for (const api of entities.apis) {
    logger(`Info: Deploying api [${api.name}]...`)
    await ow.routes.create(api)
    logger(`Info: api [${api.name}] has been successfully deployed.\n`)
  }
  for (const trigger of entities.triggers) {
    logger(`Info: Deploying trigger [${trigger.name}]...`)
    await ow.triggers.update(trigger)
    logger(`Info: trigger [${trigger.name}] has been successfully deployed.\n`)
  }
  for (const rule of entities.rules) {
    logger(`Info: Deploying rule [${rule.name}]...`)
    rule.action = `/${ns}/${rule.action}`
    await ow.rules.update(rule)
    logger(`Info: rule [${rule.name}] has been successfully deployed.\n`)
  }
  logger('Success: Deployment completed successfully.')
}

async function deleteEntities (projectHash, ow, projectName) {
  let valuetobeChecked
  let paramtobeChecked
  if (projectHash !== '') {
    valuetobeChecked = projectHash
    paramtobeChecked = 'projectHash'
  } else {
    valuetobeChecked = projectName
    paramtobeChecked = 'projectName'
  }

  const resultActionList = await ow.actions.list()
  for (const action of resultActionList) {
    if (action.annotations.length > 0) {
      const whiskManaged = action.annotations.find(elem => elem.key === 'whisk-managed')
      if (whiskManaged !== undefined && whiskManaged.value[paramtobeChecked] === valuetobeChecked) {
        let actionName = action.name
        const ns = action.namespace.split('/')
        if (ns.length > 1) {
          actionName = `${ns[1]}/${actionName}`
        }
        await ow.actions.delete(actionName)
      }
    }
  }

  const options = {}
  const resultSync = await ow.packages.list(options)
  for (const pkg of resultSync) {
    if (pkg.annotations.length > 0) {
      const whiskManaged = pkg.annotations.find(elem => elem.key === 'whisk-managed')
      if (whiskManaged !== undefined && whiskManaged.value[paramtobeChecked] === valuetobeChecked) {
        await ow.packages.delete(pkg.name)
      }
    }
  }

  const resultTriggerList = await ow.triggers.list()
  for (const trigger of resultTriggerList) {
    if (trigger.annotations.length > 0) {
      const whiskManaged = trigger.annotations.find(elem => elem.key === 'whisk-managed')
      if (whiskManaged !== undefined && whiskManaged.value[paramtobeChecked] === valuetobeChecked) {
        await ow.triggers.delete(trigger.name)
      }
    }
  }

  const resultRules = await ow.rules.list()
  for (const rule of resultRules) {
    if (rule.annotations.length > 0) {
      const whiskManaged = rule.annotations.find(elem => elem.key === 'whisk-managed')
      if (whiskManaged !== undefined && whiskManaged.value[paramtobeChecked] === valuetobeChecked) {
        await ow.rules.delete(rule.name)
      }
    }
  }
}

module.exports = {
  createKeyValueArrayFromFile,
  createKeyValueArrayFromFlag,
  createKeyValueObjectFromFlag,
  createKeyValueObjectFromFile,
  parsePathPattern,
  createComponentsfromSequence,
  processInputs,
  createKeyValueInput,
  setManifestPath,
  returnUnion,
  returnDeploymentTriggerInputs,
  setDeploymentPath,
  createActionObject,
  checkWebFlags,
  createSequenceObject,
  createApiObject,
  returnAnnotations,
  deployPackage,
  processPackage,
  setPaths,
  deleteEntities
}
