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
const sha1 = require('sha1')
const cloneDeep = require('lodash.clonedeep')

// for lines starting with date-time-string followed by stdout|stderr a ':' and a log-line, return only the logline
const dtsRegex = /\d{4}-[01]{1}\d{1}-[0-3]{1}\d{1}T[0-2]{1}\d{1}:[0-6]{1}\d{1}:[0-6]{1}\d{1}.\d+Z( *(stdout|stderr):)?\s(.*)/

const stripLog = (elem) => {
  // `2019-10-11T19:08:57.298Z       stdout: login-success ::  { code: ...`
  // should become: `login-success ::  { code: ...`
  const found = elem.match(dtsRegex)
  if (found && found.length > 3 && found[3].length > 0) {
    return found[3]
  }
  return elem
}

/**
 * Prints activation logs messages.
 *
 * @param activation the activation
 * @param strip if true, strips the timestamp which prefixes every log line
 * @param logger an instance of a logger to emit messages to
 */
function printLogs (activation, strip, logger) {
  if (activation.logs) {
    activation.logs.forEach(elem => {
      if (strip) {
        logger(stripLog(elem))
      } else {
        logger(elem)
      }
    })
  }
}

/**
 * @description returns key value array from the object supplied.
 * @param object: JSON object
 * @returns An array of key value pairs in this format : [{key : 'Your key 1' , value: 'Your value 1'}, {key : 'Your key 2' , value: 'Your value 2'} ]
 */
function createKeyValueArrayFromObject (object) {
  return Object.keys(object).map(key => ({ key, value: object[key] }))
}

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

function createComponentsfromSequence (sequenceAction) {
  const fqn = require('openwhisk-fqn')
  const objSequence = {}
  objSequence['kind'] = 'sequence'
  // The components array requires fully qualified names [/namespace/package_name/action_name] of all the actions passed as sequence
  sequenceAction = sequenceAction.map(component => {
    return fqn(component)
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
          let val = input[key].substr(1)
          if (val.startsWith('{')) {
            val = val.slice(1, -1)
          }
          input[key] = process.env[val] || ''
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

  if (action['annotations'] && action['annotations']['conductor'] !== undefined) {
    annotationParams['conductor'] = action['annotations']['conductor']
  }

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

/**
 * Creates an array of route definitions from the given manifest-based package.
 * See https://github.com/apache/openwhisk-wskdeploy/blob/master/parsers/manifest_parser.go#L1187
 *
 * @param pkg The package definition from the manifest.
 * @param pkgName The name of the package.
 * @param apiName The name of the HTTP API definition from the manifest.
 * @param allowedActions List of action names allowed to be used in routes.
 * @param allowedSequences List of sequence names allowed to be used in routes.
 * @param pathOnly Skip action, method and response type in route definitions.
 * @return {{
 * action: String,
 * operation: String,
 * responsetype: String
 * basepath: String,
 * relpath: String,
 * name: String
 * }[]}
 */
function createApiRoutes (pkg, pkgName, apiName, allowedActions, allowedSequences, pathOnly) {
  const actions = pkg.actions
  const sequences = pkg.sequences
  const basePaths = pkg.apis[apiName]

  if (!basePaths) {
    throw new Error('Arguments to create API not provided')
  }

  const routes = []

  Object.keys(basePaths).forEach((basePathName) => {
    const basePath = basePaths[basePathName]

    Object.keys(basePath).forEach((resourceName) => {
      const resource = basePath[resourceName]

      Object.keys(resource).forEach((actionName) => {
        const route = {
          name: apiName,
          basepath: `/${basePathName}`,
          relpath: `/${resourceName}`
        }

        // only name/path based information is requested
        // add basic route and skip
        if (pathOnly) {
          routes.push(route)
          return
        }

        // if action name is among allowed set, get from package actions
        let actionDefinition = allowedActions.includes(actionName)
          ? actions[actionName]
          : null

        // no action of that name, fall back to sequences if available
        if (!actionDefinition) {
          actionDefinition = allowedSequences.includes(actionName)
            ? sequences[actionName]
            : null
        }

        // neither action nor sequence found, abort
        if (!actionDefinition) {
          throw new Error('Action provided in the api not present in the package')
        }

        // ensure action or sequence has the web annotation
        if (!actionDefinition.web && !actionDefinition['web-export']) {
          throw new Error('Action or sequence provided in api is not a web action')
        }

        const action = resource[actionName]

        routes.push({
          ...route,
          action: `${pkgName}/${actionName}`,
          operation: action.method,
          responsetype: action.response || 'json'
        })
      })
    })
  })

  return routes
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
    if (!thisAction['runtime'] && !thisAction['docker']) {
      throw (new Error(`Invalid or missing property "runtime" in the manifest for this action: ${objAction.name}`))
    }
    objAction.action = fs.readFileSync(thisAction['function'])
  } else {
    objAction.action = fs.readFileSync(thisAction['function'], { encoding: 'utf8' })
  }

  if (thisAction.main || thisAction.docker || thisAction.runtime) {
    objAction.exec = {}
    if (thisAction.main) {
      objAction.exec.main = thisAction.main
    }
    if (thisAction.docker) {
      objAction.exec.kind = 'blackbox'
      objAction.exec.image = thisAction.docker
    } else if (thisAction.runtime) {
      objAction.exec.kind = thisAction.runtime
    }
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

/**
 * This is a temporary function that implements the support for the `require-adobe-auth`
 * annotation for web actions by rewriting the action to a sequence that first executes
 * the /adobeio/shared-validators/ims validator.
 *
 * As an example, the following manifest:
 * ```
 * packages:
 *   helloworld:
 *     actions:
 *       hello:
 *         function: path/to/hello.js
 *         web: 'yes'
 *         require-adobe-auth: true
 * ```
 * will be deployed as:
 * ```
 * packages:
 *   helloworld:
 *     actions:
 *       __secured_hello:
 *         function: path/to/hello.js
 *         web: 'yes'
 *         annotations:
 *           require-whisk-auth: true #makes sure action cannot be called by itself anymore
 *     sequences:
 *       hello:
 *        actions: '/adobeio/shared-validators/ims,helloworld/__secured_hello'
 * ```
 *
 * The annotation will soon be natively supported in Adobe I/O Runtime, at which point
 * this function and references to it can be safely deleted.
 *
 * @access private
 */
function rewriteActionsWithAdobeAuthAnnotation (packages, deploymentPackages) {
  // do not modify those
  const ADOBE_AUTH_ANNOTATION = 'require-adobe-auth'
  const ADOBE_AUTH_ACTION = '/adobeio/shared-validators/ims'
  const REWRITE_ACTION_PREFIX = '__secured_'

  // avoid side effects, do not modify input packages
  const newPackages = cloneDeep(packages)
  const newDeploymentPackages = cloneDeep(deploymentPackages)

  // traverse all actions in all packages
  Object.keys(newPackages).forEach((key) => {
    if (newPackages[key]['actions']) {
      Object.keys(newPackages[key]['actions']).forEach((actionName) => {
        const thisAction = newPackages[key]['actions'][actionName]

        const isWebExport = checkWebFlags(thisAction['web-export'])['web-export']
        const isWeb = checkWebFlags(thisAction['web'])['web-export']
        const isRaw = checkWebFlags(thisAction['web'])['raw-http'] || checkWebFlags(thisAction['web-export'])['raw-http']

        // check if the annotation is defined AND the action is a web action
        if ((isWeb || isWebExport) && thisAction.annotations && thisAction.annotations[ADOBE_AUTH_ANNOTATION]) {
          debug(`found annotation '${ADOBE_AUTH_ANNOTATION}' in action '${key}/${actionName}'`)

          // 1. rename the action
          const renamedAction = REWRITE_ACTION_PREFIX + actionName
          /* istanbul ignore if */
          if (newPackages[key]['actions'][renamedAction] !== undefined) {
            // unlikely
            throw new Error(`Failed to rename the action '${key}/${actionName}' to '${key}/${renamedAction}': an action with the same name exists already.`)
          }

          // set the action to the new key
          newPackages[key]['actions'][renamedAction] = thisAction
          // delete the old key
          delete newPackages[key]['actions'][actionName]

          // make sure any content in the deployment package is linked to the new action name
          if (newDeploymentPackages[key] && newDeploymentPackages[key]['actions'] && newDeploymentPackages[key]['actions'][actionName]) {
            newDeploymentPackages[key]['actions'][renamedAction] = newDeploymentPackages[key]['actions'][actionName]
            delete newDeploymentPackages[key]['actions'][actionName]
          }

          // 2. delete the adobe-auth annotation and secure the renamed action
          // the renamed action is made secure by removing its web property
          if (isWeb) {
            newPackages[key]['actions'][renamedAction]['web'] = false
          }
          if (isWebExport) {
            newPackages[key]['actions'][renamedAction]['web-export'] = false
          }
          delete newPackages[key]['actions'][renamedAction]['annotations'][ADOBE_AUTH_ANNOTATION]

          debug(`renamed action '${key}/${actionName}' to '${key}/${renamedAction}'`)

          // 3. create the sequence
          if (newPackages[key]['sequences'] === undefined) {
            newPackages[key]['sequences'] = {}
          }
          /* istanbul ignore if */
          if (newPackages[key]['sequences'][actionName] !== undefined) {
            // unlikely
            throw new Error(`The name '${key}/${actionName}' is defined both for an action and a sequence, it should be unique`)
          }
          // set the sequence content
          newPackages[key]['sequences'][actionName] = {
            actions: `${ADOBE_AUTH_ACTION},${key}/${renamedAction}`,
            web: (isRaw && 'raw') || 'yes'
          }

          debug(`defined new sequence '${key}/${actionName}': '${ADOBE_AUTH_ACTION},${key}/${renamedAction}'`)
        }
      })
    }
  })
  return {
    newPackages,
    newDeploymentPackages
  }
}

function processPackage (packages, deploymentPackages, deploymentTriggers, params, namesOnly = false, owOptions = {}) {
  if (owOptions.apihost === 'https://adobeioruntime.net') {
    // rewrite packages in case there are any `require-adobe-auth` annotations
    // this is a temporary feature and will be replaced by a native support in Adobe I/O Runtime
    const { newPackages, newDeploymentPackages } = rewriteActionsWithAdobeAuthAnnotation(packages, deploymentPackages)
    packages = newPackages
    deploymentPackages = newDeploymentPackages
  }

  const pkgAndDeps = []
  const actions = []
  const routes = []
  const rules = []
  const triggers = []
  const ruleAction = []
  const ruleTrigger = []
  const arrSequence = []

  Object.keys(packages).forEach((key) => {
    pkgAndDeps.push({ name: key })
    // From wskdeploy repo : currently, the 'version' and 'license' values are not stored in Apache OpenWhisk, but there are plans to support it in the future
    // pkg.version = packages[key]['version']
    // pkg.license = packages[key]['license']
    if (packages[key]['dependencies']) {
      Object.keys(packages[key]['dependencies']).forEach((depName) => {
        const thisDep = packages[key]['dependencies'][depName]
        const objDep = { name: depName }
        if (!namesOnly) {
          let objDepPackage = {}
          try { // Parse location
            const thisLocation = thisDep['location'].split('/')
            objDepPackage = {
              binding: {
                namespace: thisLocation[1],
                name: thisLocation[2]
              }
            }
          } catch (ex) {
            throw (new Error(`Invalid or missing property "location" in the manifest for this action: ${depName}`))
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
            objDepPackage['parameters'] = processedInput
          }
          objDep.package = objDepPackage
        }
        pkgAndDeps.push(objDep)
      })
    }
    if (packages[key]['actions']) {
      Object.keys(packages[key]['actions']).forEach((actionName) => {
        const thisAction = packages[key]['actions'][actionName]
        let objAction = { name: `${key}/${actionName}` }
        if (!namesOnly) {
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
        }
        actions.push(objAction)
      })
    }

    if (packages[key]['sequences']) {
      // Sequences can have only one field : actions
      // Usage: aio runtime:action:create <action-name> --sequence existingAction1, existingAction2
      Object.keys(packages[key]['sequences']).forEach((sequenceName) => {
        let objSequence = { name: `${key}/${sequenceName}` }
        if (!namesOnly) {
          objSequence.action = ''
          const thisSequence = packages[key]['sequences'][sequenceName]
          objSequence = createSequenceObject(thisSequence['actions'], objSequence, key)
          objSequence['annotations'] = returnAnnotations(thisSequence)
          arrSequence.push(sequenceName)
        }
        actions.push(objSequence)
      })
    }
    if (packages[key]['triggers']) {
      Object.keys(packages[key]['triggers']).forEach((triggerName) => {
        const objTrigger = { name: triggerName }
        if (!namesOnly) {
          objTrigger.trigger = {}
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
          ruleTrigger.push(triggerName)
        }
        // trigger creation requires only name parameter and hence will be created in all cases
        triggers.push(objTrigger)
      })
    }
    // Rules cannot belong to any package
    if (packages[key]['rules']) {
      Object.keys(packages[key]['rules']).forEach((ruleName) => {
        const objRule = { name: ruleName }
        if (!namesOnly) {
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
          } else {
            throw new Error('Action/Trigger provided in the rule not found in manifest file')
          }
        }
        rules.push(objRule)
      })
    }

    if (packages[key]['apis']) {
      Object.keys(packages[key].apis).forEach((apiName) => {
        const apiRoutes = createApiRoutes(packages[key], key, apiName, ruleAction, arrSequence, namesOnly)
        routes.push.apply(routes, apiRoutes) // faster than concat for < 100k elements
      })
    }
  })
  return {
    pkgAndDeps,
    apis: routes,
    triggers,
    rules,
    actions
  }
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
  for (const pkg of entities.pkgAndDeps) {
    logger(`Info: Deploying package [${pkg.name}]...`)
    await ow.packages.update(pkg)
    logger(`Info: package [${pkg.name}] has been successfully deployed.\n`)
  }
  for (const action of entities.actions) {
    if (action['exec'] && action['exec']['kind'] === 'sequence') {
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

  for (const route of entities.apis) {
    const routeInfo = `[${route.operation} ${route.basepath}${route.relpath} [${route.action}]]`
    logger(`Info: Deploying route ${routeInfo} for API [${route.name}]...`)
    await ow.routes.create(route)
    logger(`Info: route ${routeInfo} successfully deployed.\n`)
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

async function undeployPackage (entities, ow, logger) {
  for (const action of entities.actions) {
    logger(`Info: Undeploying action [${action.name}]...`)
    await ow.actions.delete({ name: action.name })
    logger(`Info: action [${action.name}] has been successfully undeployed.\n`)
  }
  for (const trigger of entities.triggers) {
    logger(`Info: Undeploying trigger [${trigger.name}]...`)
    await ow.triggers.delete({ name: trigger.name })
    logger(`Info: trigger [${trigger.name}] has been successfully undeployed.\n`)
  }
  for (const rule of entities.rules) {
    logger(`Info: Undeploying rule [${rule.name}]...`)
    await ow.rules.delete({ name: rule.name })
    logger(`Info: rule [${rule.name}] has been successfully undeployed.\n`)
  }
  for (const route of entities.apis) {
    const routeInfo = `[${route.operation} ${route.basepath}${route.relpath} [${route.action}]]`
    logger(`Info: Deleting route ${routeInfo} for API [${route.name}]...`)
    await ow.routes.delete({ basepath: route.basepath, relpath: route.relpath }) // cannot use name + basepath
    logger(`Info: route ${routeInfo} successfully deleted.\n`)
  }
  for (const packg of entities.pkgAndDeps) {
    logger(`Info: Undeploying package [${packg.name}]...`)
    await ow.packages.delete({ name: packg.name })
    logger(`Info: package [${packg.name}] has been successfully undeployed.\n`)
  }
  logger('Success: Undeployment completed successfully.')
}

async function syncProject (projectName, manifestPath, manifestContent, entities, ow, logger, deleteEntities = true) {
  // find project hash from server based on entities in the manifest file
  const hashProjectSynced = await findProjectHashonServer(ow, projectName)

  // compute the project hash from the manifest file
  const projectHash = getProjectHash(manifestContent, manifestPath)
  await addManagedProjectAnnotations(entities, manifestPath, projectName, projectHash)
  await deployPackage(entities, ow, logger)
  if (deleteEntities && (projectHash !== hashProjectSynced)) {
    // delete old files with same project name that do not exist in the manifest file anymore
    const junkEntities = await getProjectEntities(hashProjectSynced, true, ow)
    await undeployPackage(junkEntities, ow, () => {})
  }
}

async function getProjectEntities (project, isProjectHash, ow) {
  let paramtobeChecked
  if (isProjectHash) {
    paramtobeChecked = 'projectHash'
  } else {
    paramtobeChecked = 'projectName'
  }

  const getEntityList = async id => {
    const res = []
    const entityListResult = await ow[id].list()
    for (const entity of entityListResult) {
      if (entity.annotations.length > 0) {
        const whiskManaged = entity.annotations.find(a => a.key === 'whisk-managed')
        if (whiskManaged !== undefined && whiskManaged.value[paramtobeChecked] === project) {
          if (id === 'actions') {
            // get action package name
            const nsAndPkg = entity.namespace.split('/')
            if (nsAndPkg.length > 1) {
              entity.name = `${nsAndPkg[1]}/${entity.name}`
            }
          }
          res.push(entity)
        }
      }
    }
    return res
  }

  // parallel io
  const entitiesArray = await Promise.all(['actions', 'triggers', 'rules', 'packages'].map(getEntityList))

  const entities = {
    actions: entitiesArray[0],
    triggers: entitiesArray[1],
    rules: entitiesArray[2],
    pkgAndDeps: entitiesArray[3],
    apis: [] // apis are not whisk-managed (no annotation support)
  }

  return entities
}

async function addManagedProjectAnnotations (entities, manifestPath, projectName, projectHash) {
  // add whisk managed annotations
  for (const pkg of entities.pkgAndDeps) {
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
  }
  for (const action of entities.actions) {
    action['annotations']['whisk-managed'] = {
      file: manifestPath,
      projectDeps: [],
      projectHash: projectHash,
      projectName: projectName
    }
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
  }
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

function fileExtensionForKind (kind) {
  if (kind) {
    const [lang] = kind.split(':')
    switch (lang.toLowerCase()) {
      case 'ballerina': return '.bal'
      case 'dotnet': return '.cs'
      case 'go': return '.go'
      case 'java': return '.java'
      case 'nodejs': return '.js'
      case 'php': return '.php'
      case 'python': return '.py'
      case 'ruby': return '.rb'
      case 'rust': return '.rs'
      case 'swift': return '.swift'
    }
  }
  return ''
}

function kindForFileExtension (filename) {
  if (filename) {
    const path = require('path')
    const ext = path.extname(filename)
    switch (ext.toLowerCase()) {
      case '.bal': return 'ballerina:default'
      case '.cs': return 'dotnet:default'
      case '.go': return 'go:default'
      case '.java': return 'java:default'
      case '.js': return 'nodejs:default'
      case '.php': return 'php:default'
      case '.py': return 'python:default'
      case '.rb': return 'ruby:default'
      case '.rs': return 'rust:default'
      case '.swift': return 'swift:default'
    }
  }
  return undefined
}

module.exports = {
  createKeyValueArrayFromObject,
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
  createApiRoutes,
  returnAnnotations,
  deployPackage,
  undeployPackage,
  processPackage,
  setPaths,
  getProjectEntities,
  syncProject,
  findProjectHashonServer,
  getProjectHash,
  addManagedProjectAnnotations,
  printLogs,
  fileExtensionForKind,
  kindForFileExtension
}
