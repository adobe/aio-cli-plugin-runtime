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
const { flags } = require('@oclif/command')

class PackageDelete extends RuntimeBaseCommand {
  async run () {
    const { args, flags } = this.parse(PackageDelete)
    let result
    try {
      const ow = await this.wsk()
      if (flags.recursive) {
        result = await recursivelyDeletePackages(ow)
      } else {
        const options = parsePackageName(args.packageName)
        // Packages can be deleted only when there are no actions inside the packages
        result = await ow.packages.delete(options)
      }
      if (flags.json) {
        this.logJSON('', result)
      }
    } catch (err) {
      if (!args.packageName) {
        err.message = 'Missing 1 required arg: packageName'
      }
      this.handleError('failed to delete the package', err)
    }
  }
}

async function recursivelyDeletePackages (ow) {
  const packages = await ow.packages.list()
  const actions = await ow.actions.list()
  const deleteEntitiesPromises = []
  const packagesNamespaces = Array.isArray(packages) &&
      packages.map(pkg => pkg.namespace + '/' + pkg.name)
  for (const action of actions) {
    if (packagesNamespaces.indexOf(action.namespace) > -1) {
      deleteEntitiesPromises.push(ow.actions.delete(action))
    }
  }
  if (deleteEntitiesPromises.length > 0) {
    await Promise.all(deleteEntitiesPromises)
  }
  return ow.packages.delete(packages)
}

PackageDelete.args = [
  {
    name: 'packageName',
    required: false
  }
]

PackageDelete.flags = {
  json: flags.boolean({
    description: 'output raw json'
  }),
  recursive: flags.boolean({
    description: 'Deletes all associates actions',
    default: false
  })
}

PackageDelete.description = 'Deletes a Package'

PackageDelete.aliases = [
  'runtime:pkg:delete',
  'rt:package:delete',
  'rt:pkg:delete'
]

module.exports = PackageDelete
