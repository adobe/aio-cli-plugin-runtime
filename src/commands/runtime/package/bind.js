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
const { parsePackageName } = require('@adobe/aio-lib-runtime').utils
const { getKeyValueArrayFromMergedParameters } = require('@adobe/aio-lib-runtime').utils
const { Args, Flags } = require('@oclif/core')

class PackageBind extends RuntimeBaseCommand {
  async run () {
    const { args, flags } = await this.parse(PackageBind)
    const name = args.bindPackageName
    try {
      const binding = parsePackageName(args.packageName)
      const paramsPackage = getKeyValueArrayFromMergedParameters(flags.param, flags['param-file']) || []
      const annotationParams = getKeyValueArrayFromMergedParameters(flags.annotation, flags['annotation-file']) || []

      const options = {}
      options.name = name
      options.package = {
        parameters: paramsPackage,
        annotations: annotationParams,
        binding
      }
      const ow = await this.wsk()
      const result = await ow.packages.create(options)
      if (flags.json) {
        this.logJSON('', result)
      }
    } catch (err) {
      await this.handleError('failed to bind the package', err)
    }
  }
}

PackageBind.args = {
  packageName: Args.string({ required: true }),
  bindPackageName: Args.string({ required: true })
}

PackageBind.flags = {
  ...RuntimeBaseCommand.flags,
  param: Flags.string({
    char: 'p',
    description: 'parameters in key value pairs to be passed to the package', // help description for flag
    multiple: true // allow setting this flag multiple times
  }),
  'param-file': Flags.string({
    char: 'P',
    description: 'parameter to be passed to the package for json file' // help description for flag
  }),
  annotation: Flags.string({
    char: 'a',
    description: 'annotation values in KEY VALUE format', // help description for flag
    multiple: true // allow setting this flag multiple times
  }),
  'annotation-file': Flags.string({
    char: 'A',
    description: 'FILE containing annotation values in JSON format' // help description for flag
  }),
  json: Flags.boolean({
    description: 'output raw json'
  })
}

PackageBind.description = 'Bind parameters to a package'

PackageBind.aliases = [
  'runtime:pkg:bind',
  'rt:package:bind',
  'rt:pkg:bind'
]

module.exports = PackageBind
