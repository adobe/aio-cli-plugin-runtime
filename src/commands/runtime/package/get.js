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

class PackageGet extends RuntimeBaseCommand {
  async run () {
    const { args } = this.parse(PackageGet)
    try {
      const ow = await this.wsk()
      const options = parsePackageName(args.packageName)
      const result = await ow.packages.get(options)
      this.logJSON('', result)
    } catch (err) {
      this.handleError('failed to retrieve the package', err)
    }
  }
}

PackageGet.args = [
  {
    name: 'packageName',
    required: true
  }
]

PackageGet.flags = {
  ...RuntimeBaseCommand.flags
}

PackageGet.description = 'Retrieves a Package'

PackageGet.aliases = [
  'runtime:pkg:get',
  'rt:package:get',
  'rt:pkg:get'
]

module.exports = PackageGet
