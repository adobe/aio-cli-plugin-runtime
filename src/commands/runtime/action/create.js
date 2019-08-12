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

let fs = require('fs')
const RuntimeBaseCommand = require('../../../RuntimeBaseCommand')
const { createKeyValueObjectFromFlag, createKeyValueObjectFromFile, createComponentsfromSequence } = require('../../../runtime-helpers')
const { flags } = require('@oclif/command')

class ActionCreate extends RuntimeBaseCommand {
  async run () {
    const { args, flags } = this.parse(ActionCreate)
    const name = args.actionName
    let action = ''
    let paramsAction = {}
    let annotationParams = {}
    try {
      if (args.actionPath) {
        if (fs.existsSync(args.actionPath)) {
          if (args.actionPath.endsWith('.zip')) {
            action = fs.readFileSync(args.actionPath)
          } else {
            action = fs.readFileSync(args.actionPath, { encoding: 'utf8' })
          }
        } else {
          throw new Error('Provide a valid path for ACTION')
        }
      }
      if (flags.param) {
        // each --param flag expects two values ( a key and a value ). Multiple --param flags can be passed
        // For example : aio runtime:action:create --param name "foo" --param city "bar"
        paramsAction = createKeyValueObjectFromFlag(flags.param)
      } else if (flags['param-file']) {
        paramsAction = createKeyValueObjectFromFile(flags['param-file'])
      }
      if (flags.annotation) {
        // each --annotation flag expects two values ( a key and a value ). Multiple --annotation flags can be passed
        // For example : aio runtime:action:create -a description "foo" -a sampleInput "bar"
        annotationParams = createKeyValueObjectFromFlag(flags.annotation)
      } else if (flags['annotation-file']) {
        annotationParams = createKeyValueObjectFromFile(flags['annotation-file'])
      }
      if (flags.web) {
        // use: --web true or --web yes to make it a web action
        // use --web raw for raw HTTP web action
        // TODO : Implement require-whisk-auth flag
        switch (flags.web) {
          case 'true':
          case 'yes' :
            annotationParams['web-export'] = true
            break
          case 'raw' :
            annotationParams['web-export'] = true
            annotationParams['raw-http'] = true
        }
      }

      const ow = await this.wsk()
      let options = {}
      options['name'] = name
      options['action'] = action
      let limits = {}
      if (flags.timeout) {
        limits['timeout'] = flags.timeout
      }
      if (flags.logsize) {
        limits['logs'] = flags.logsize
      }
      if (flags.memory) {
        limits['memory'] = flags.memory
      }
      if (flags.sequence) {
        let sequenceAction = flags.sequence.trim().split(',')
        if (sequenceAction[0].length === 0) {
          throw new Error('Provide a valid sequence component')
        } else {
          let opts = await ow.actions.client.options
          let ns = opts.namespace
          options['exec'] = createComponentsfromSequence(sequenceAction, ns)
        }
      }

      if (flags.main) {
        if (!options.exec) {
          options.exec = {}
        }
        options.exec.main = flags.main
      }
      options['limits'] = limits
      options['kind'] = flags.kind
      options['params'] = paramsAction
      options['annotations'] = annotationParams
      const result = await ow.actions.create(options)
      if (flags.json) {
        this.logJSON('', result)
      }
    } catch (err) {
      this.handleError('failed to create the action', err)
    }
  }
}

ActionCreate.args = [
  {
    name: 'actionName',
    required: true
  },
  {
    name: 'actionPath',
    required: false
  }
]

ActionCreate.flags = {
  ...RuntimeBaseCommand.flags,
  'param': flags.string({
    char: 'p',
    description: 'parameter values in KEY VALUE format', // help description for flag
    hidden: false, // hide from help
    multiple: true, // allow setting this flag multiple times
    required: false
  }),
  'web': flags.string({
    description: 'treat ACTION as a web action or as a raw HTTP web action', // help description for flag
    multiple: false, // allow setting this flag multiple times
    options: ['true', 'yes', 'false', 'no', 'raw'],
    required: false
  }),
  'param-file': flags.string({
    char: 'P',
    description: 'FILE containing parameter values in JSON format', // help description for flag
    hidden: false, // hide from help
    multiple: false, // allow setting this flag multiple times
    required: false
  }),
  'timeout': flags.integer({
    char: 't',
    description: 'the timeout LIMIT in milliseconds after which the action is terminated (default 60000)', // help description for flag
    hidden: false, // hide from help
    multiple: false, // allow setting this flag multiple times
    required: false
  }),
  'memory': flags.integer({
    char: 'm',
    description: 'the maximum memory LIMIT in MB for the action (default 256)', // help description for flag
    hidden: false, // hide from help
    multiple: false, // allow setting this flag multiple times
    required: false
  }),
  'logsize': flags.integer({
    char: 'l',
    description: 'the maximum log size LIMIT in MB for the action (default 10)', // help description for flag
    hidden: false, // hide from help
    multiple: false, // allow setting this flag multiple times
    required: false
  }),
  'kind': flags.string({
    description: 'the KIND of the action runtime (example: swift:default, nodejs:default)', // help description for flag
    hidden: false, // hide from help
    multiple: false, // allow setting this flag multiple times
    required: false,
    default: 'nodejs:10'
  }),
  'annotation': flags.string({
    char: 'a',
    description: 'annotation values in KEY VALUE format', // help description for flag
    hidden: false, // hide from help
    multiple: true, // allow setting this flag multiple times
    required: false
  }),
  'annotation-file': flags.string({
    char: 'A',
    description: 'FILE containing annotation values in JSON format', // help description for flag
    hidden: false, // hide from help
    multiple: false, // allow setting this flag multiple times
    required: false
  }),
  'sequence': flags.string({
    description: 'treat ACTION as comma separated sequence of actions to invoke', // help description for flag
    hidden: false, // hide from help
    multiple: false, // allow setting this flag multiple times
    required: false
  }),
  'main': flags.string({
    description: 'the name of the action entry point (function or fully-qualified method name when applicable)'
  }),
  'json': flags.boolean({
    description: 'output raw json'
  })
}

ActionCreate.description = 'Creates an Action'

ActionCreate.aliases = ['rt:action:create']

module.exports = ActionCreate
