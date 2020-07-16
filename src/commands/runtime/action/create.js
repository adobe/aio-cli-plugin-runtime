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
const { createKeyValueArrayFromFlag, createKeyValueArrayFromFile, createComponentsfromSequence } = require('@adobe/aio-lib-runtime').utils
const { kindForFileExtension } = require('../../../kinds')
const { flags } = require('@oclif/command')

class ActionCreate extends RuntimeBaseCommand {
  isUpdate () { return false }

  async run () {
    const { args, flags } = this.parse(ActionCreate)
    const name = args.actionName
    let exec
    let paramsAction
    let envParams
    let annotationParams

    try {
      // sanity check must either be a sequence or a file but permit neither in case of an update
      if (args.actionPath && flags.sequence) {
        throw (new Error('Cannot specify sequence and a code artifact at the same time'))
      } else if (flags.docker && flags.sequence) {
        throw (new Error('Cannot specify sequence and a container image at the same time'))
      } else if (flags.docker && flags.kind) {
        throw (new Error('Cannot specify a kind and a container image at the same time'))
      } else if (!args.actionPath && !flags.sequence && !flags.docker && !this.isUpdate()) {
        throw (new Error('Must provide a code artifact, container image, or a sequence'))
      }

      // can only specify main handler when also providing a file
      if (flags.main && !args.actionPath) {
        throw new Error('The function handler can only be specified when you provide a code artifact')
      }

      // a sequence is a system/internal function
      if (flags.kind && flags.sequence) {
        throw new Error('A kind may not be specified for a sequence')
      } else if (flags.kind && !args.actionPath) {
        throw new Error('A kind can only be specified when you provide a code artifact')
      }

      if (args.actionPath) {
        if (fs.existsSync(args.actionPath)) {
          exec = {}

          if (args.actionPath.endsWith('.zip') || flags.binary) {
            if (!flags.kind && !flags.docker) {
              throw (new Error('Invalid argument(s). creating an action from a zip/binary artifact requires specifying the action kind explicitly'))
            }
            exec.code = fs.readFileSync(args.actionPath).toString('base64')
          } else {
            exec.code = fs.readFileSync(args.actionPath, { encoding: 'utf8' })
          }

          if (flags.main) {
            exec.main = flags.main
          }

          if (flags.kind) {
            exec.kind = flags.kind
          } else if (!flags.docker) {
            const kind = kindForFileExtension(args.actionPath)
            if (kind !== undefined) {
              exec.kind = kind
            } else {
              throw new Error('Cannot determine kind of action. Please use --kind to specifiy.')
            }
          }
        } else {
          throw new Error('Provide a valid path for ACTION')
        }
      } else if (flags.sequence) {
        const sequenceAction = flags.sequence.trim().split(',')
        if (sequenceAction[0].length === 0) {
          throw new Error('Provide a valid sequence component')
        } else {
          exec = createComponentsfromSequence(sequenceAction)
        }
      }

      if (flags.docker) {
        exec = exec || {}
        exec.kind = 'blackbox'
        exec.image = flags.docker
      }

      if (flags.param) {
        // each --param flag expects two values ( a key and a value ). Multiple --param flags can be passed
        // For example : aio runtime:action:update --param name "foo" --param city "bar"
        paramsAction = createKeyValueArrayFromFlag(flags.param)
      } else if (flags['param-file']) {
        paramsAction = createKeyValueArrayFromFile(flags['param-file'])
      }

      if (flags.env) {
        // each --env flag expects two values ( a key and a value ). Multiple --env flags can be passed
        // For example : aio runtime:action:update --env name "foo" --env city "bar"
        envParams = createKeyValueArrayFromFlag(flags.env)
      } else if (flags['env-file']) {
        envParams = createKeyValueArrayFromFile(flags['env-file'])
      }

      // merge parametes and environemtn variables
      if (envParams) {
        envParams = envParams.map(e => ({ ...e, init: true }))
        if (paramsAction) {
          // check for overlap and flag errors
          const paramNames = new Set(envParams.map(_ => _.key))
          const overlap = paramsAction.filter(_ => paramNames.has(_.key))
          if (overlap.length === 0) {
            paramsAction = paramsAction.concat(envParams)
          } else {
            throw (new Error(`Invalid argument(s). Environment variables and function parameters may not overlap`))
          }
        } else {
          paramsAction = envParams
        }
      }

      if (flags.annotation) {
        // each --annotation flag expects two values ( a key and a value ). Multiple --annotation flags can be passed
        // For example : aio runtime:action:update -a description "foo" -a sampleInput "bar
        annotationParams = createKeyValueArrayFromFlag(flags.annotation)
      } else if (flags['annotation-file']) {
        annotationParams = createKeyValueArrayFromFile(flags['annotation-file'])
      }

      if (flags.web) {
        annotationParams = annotationParams || []
        // use: --web true or --web yes to make it a web action and --web raw to make it raw HTTP web action
        // TODO : Implement require-whisk-auth flag
        switch (flags.web) {
          case 'true':
          case 'yes' :
            annotationParams.push({ key: 'web-export', value: true })
            break
          case 'raw' :
            annotationParams.push({ key: 'web-export', value: true })
            annotationParams.push({ key: 'raw-http', value: true })
            break
          case 'false':
          case 'no':
            annotationParams.push({ key: 'web-export', value: false })
        }
      }

      let limits
      if (flags.timeout) {
        limits = limits || {}
        limits.timeout = flags.timeout
      }
      if (flags.logsize) {
        limits = limits || {}
        limits.logs = flags.logsize
      }
      if (flags.memory) {
        limits = limits || {}
        limits.memory = flags.memory
      }

      const options = { name }
      if (exec) options.exec = exec
      if (limits) options.limits = limits
      if (paramsAction) options.parameters = paramsAction
      if (annotationParams) options.annotations = annotationParams

      const ow = await this.wsk()
      const method = this.isUpdate() ? 'update' : 'create'
      const result = await ow.actions[method]({ name, action: options })
      if (flags.json) {
        this.logJSON('', result)
      }
    } catch (err) {
      const method = this.isUpdate() ? 'update' : 'create'
      this.handleError(`failed to ${method} the action`, err)
    }
  }
}

ActionCreate.args = [
  {
    name: 'actionName',
    required: true
  },
  {
    name: 'actionPath'
  }
]

ActionCreate.flags = {
  ...RuntimeBaseCommand.flags,
  param: flags.string({
    char: 'p',
    description: 'parameter values in KEY VALUE format', // help description for flag
    multiple: true // allow setting this flag multiple times
  }),
  env: flags.string({
    char: 'e',
    description: 'environment values in KEY VALUE format', // help description for flag
    multiple: true // allow setting this flag multiple times
  }),
  web: flags.string({
    description: 'treat ACTION as a web action or as a raw HTTP web action', // help description for flag
    options: ['true', 'yes', 'false', 'no', 'raw']
  }),
  'param-file': flags.string({
    char: 'P',
    description: 'FILE containing parameter values in JSON format' // help description for flag
  }),
  'env-file': flags.string({
    char: 'E',
    description: 'FILE containing environment variables in JSON format' // help description for flag
  }),
  timeout: flags.integer({
    char: 't',
    description: 'the timeout LIMIT in milliseconds after which the action is terminated (default 60000)' // help description for flag
  }),
  memory: flags.integer({
    char: 'm',
    description: 'the maximum memory LIMIT in MB for the action (default 256)' // help description for flag
  }),
  logsize: flags.integer({
    char: 'l',
    description: 'the maximum log size LIMIT in MB for the action (default 10)' // help description for flag
  }),
  kind: flags.string({
    description: 'the KIND of the action runtime (example: swift:default, nodejs:default)' // help description for flag
  }),
  annotation: flags.string({
    char: 'a',
    description: 'annotation values in KEY VALUE format', // help description for flag
    multiple: true // allow setting this flag multiple times
  }),
  'annotation-file': flags.string({
    char: 'A',
    description: 'FILE containing annotation values in JSON format' // help description for flag
  }),
  sequence: flags.string({
    description: 'treat ACTION as comma separated sequence of actions to invoke' // help description for flag
  }),
  docker: flags.string({
    description: '[Restricted Access] use provided Docker image (a path on DockerHub) to run the action' // help description for flag
  }),
  main: flags.string({
    description: 'the name of the action entry point (function or fully-qualified method name when applicable)'
  }),
  binary: flags.boolean({
    description: 'treat code artifact as binary'
  }),
  json: flags.boolean({
    description: 'output raw json'
  })
}

ActionCreate.description = 'Creates an Action'

ActionCreate.aliases = ['rt:action:create']

module.exports = ActionCreate
