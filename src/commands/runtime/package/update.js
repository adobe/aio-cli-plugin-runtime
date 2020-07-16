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
const { createKeyValueArrayFromFlag, createKeyValueArrayFromFile } = require('@adobe/aio-lib-runtime').utils
const { flags } = require('@oclif/command')

class PackageUpdate extends RuntimeBaseCommand {
  async run () {
    const { args, flags } = this.parse(PackageUpdate)
    let paramsPackage // omit if no params are defined explicitly
    try {
      if (flags.param) {
        // each --param flag expects two values ( a key and a value ). Multiple --param flags can be passed
        // For example : aio runtime:package:update --param name "foo" --param city "bar"
        paramsPackage = createKeyValueArrayFromFlag(flags.param)
      } else if (flags['param-file']) {
        paramsPackage = createKeyValueArrayFromFile(flags['param-file'])
      }
      let annotationParams // omit if no annotations are defined explicitly
      if (flags.annotation) {
        // Annotations that describe packages include : 'description' and 'parameters'
        // TODO -- should we check if annotation keys match description or parameters ?
        annotationParams = createKeyValueArrayFromFlag(flags.annotation)
      } else if (flags['annotation-file']) {
        annotationParams = createKeyValueArrayFromFile(flags['annotation-file'])
      }
      // The keys 'parameters' and 'annotations' are expected to be passed as an array of key value pairs
      // For example : [{key : 'Your key 1' , value: 'Your value 1'}, {key : 'Your key 2' , value: 'Your value 2'} ]
      const packageParams = {
        parameters: paramsPackage,
        annotations: annotationParams
      }
      switch (flags.shared) {
        case 'true' :
        case 'yes' :
          packageParams['publish'] = true
          break
        case 'false' :
        case 'no' :
          packageParams['publish'] = false
      }
      const options = {}
      options['name'] = args.packageName
      // only provide 'pacakge' property if it's not empty
      if (Object.entries(packageParams).filter(([_, v]) => v !== undefined).length > 0) {
        options['package'] = packageParams
      }
      const ow = await this.wsk()
      const result = await ow.packages.update(options)
      if (flags.json) {
        this.logJSON('', result)
      }
    } catch (err) {
      this.handleError('failed to update the package', err)
    }
  }
}

PackageUpdate.args = [
  {
    name: 'packageName',
    required: true
  }
]

PackageUpdate.flags = {
  ...RuntimeBaseCommand.flags,
  param: flags.string({
    char: 'p',
    description: 'parameter values in KEY VALUE format', // help description for flag
    multiple: true // allow setting this flag multiple times
  }),
  'param-file': flags.string({
    char: 'P',
    description: 'FILE containing parameter values in JSON format' // help description for flag
  }),
  shared: flags.string({
    description: 'parameter to be passed to indicate whether package is shared or private', // help description for flag
    options: ['true', 'yes', 'false', 'no']
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
  json: flags.boolean({
    description: 'output raw json'
  })
}

PackageUpdate.description = 'Updates a Package'

PackageUpdate.aliases = [
  'runtime:pkg:update',
  'rt:package:update',
  'rt:pkg:update'
]

module.exports = PackageUpdate
