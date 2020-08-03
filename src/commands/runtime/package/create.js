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
const { getKeyValueArrayFromMergedParameters } = require('../../../utils')
const { flags } = require('@oclif/command')

class PackageCreate extends RuntimeBaseCommand {
  isUpdate () { return false }

  async run () {
    const { args, flags } = this.parse(PackageCreate)
    let paramsPackage // omit if no params are defined explicitly
    try {
      paramsPackage = getKeyValueArrayFromMergedParameters(this.argv, '-p', '--param', '-P', '--param-file')
      let annotationParams = getKeyValueArrayFromMergedParameters(this.argv, '-a', '--annotation', '-A', '--annotation-file')
      
      // packageParams.parameters is expected to be passed as an array of key value pairs
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
          break
      }
      const options = {}
      options['name'] = args.packageName
      // only provide 'pacakge' property if it's not empty
      if (Object.entries(packageParams).filter(([_, v]) => v !== undefined).length > 0) {
        options['package'] = packageParams
      }
      const ow = await this.wsk()
      const method = this.isUpdate() ? 'update' : 'create'
      const result = await ow.packages[method](options)
      if (flags.json) {
        this.logJSON('', result)
      }
    } catch (err) {
      const method = this.isUpdate() ? 'update' : 'create'
      this.handleError(`failed to ${method} the package`, err)
    }
  }
}

PackageCreate.args = [
  {
    name: 'packageName',
    required: true
  }
]

PackageCreate.flags = {
  ...RuntimeBaseCommand.flags,
  param: flags.string({
    char: 'p',
    description: 'parameters in key value pairs to be passed to the package', // help description for flag
    multiple: true // allow setting this flag multiple times
  }),
  'param-file': flags.string({
    char: 'P',
    description: 'parameter to be passed to the package for json file' // help description for flag
  }),
  shared: flags.string({
    description: 'parameter to be passed to indicate whether package is shared or private',
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

PackageCreate.description = 'Creates a Package'

PackageCreate.aliases = [
  'runtime:pkg:create',
  'rt:package:create',
  'rt:pkg:create'
]

module.exports = PackageCreate
