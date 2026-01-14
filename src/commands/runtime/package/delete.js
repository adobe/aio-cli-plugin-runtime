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
const { Args, Flags } = require('@oclif/core')

class PackageDelete extends RuntimeBaseCommand {
  async run () {
    const { args, flags } = await this.parse(PackageDelete)
    let result
    try {
      const ow = await this.wsk()
      const options = parsePackageName(args.packageName)
      if (flags.recursive) {
        // Packages can be deleted only when there are no actions inside the packagess
        result = await recursivelyDeletePackage(ow, options)
      } else {
        result = await ow.packages.delete(options)
      }
      if (flags.json) {
        this.logJSON('', result)
      }
    } catch (err) {
      await this.handleError('failed to delete the package', err)
    }
  }
}

/** @private */
async function recursivelyDeletePackage (ow, pkg) {
  const mapRulesToActionName = (rules) => {
    let ruleMap = new Map()
    if (Array.isArray(rules)) {
      ruleMap = rules.reduce((rulesMap, rule) => {
        const ruleData = {
          ruleName: rule.name,
          trigger: {
            namespace: rule.trigger.path,
            triggerName: rule.trigger.name
          }
        }
        rulesMap.set(rule.action.name, ruleData)
        return rulesMap
      }, new Map())
    }
    return ruleMap
  }
  const actions = await ow.actions.list()
  const mappedRules = mapRulesToActionName(await ow.rules.list())
  const deleteEntitiesPromises = []
  for (const action of actions) {
    if (action.namespace.split('/').includes(pkg.name)) {
      if (mappedRules.has(action.name)) {
        const actionRule = mappedRules.get(action.name)
        deleteEntitiesPromises.push(ow.triggers.delete(actionRule.trigger),
          ow.rules.delete(actionRule.ruleName))
      }
      deleteEntitiesPromises.push(ow.actions.delete(action))
    }
  }
  if (deleteEntitiesPromises.length > 0) {
    await Promise.all(deleteEntitiesPromises)
  }
  return ow.packages.delete(pkg)
}

PackageDelete.args = {
  packageName: Args.string({
    required: true
  })
}

PackageDelete.flags = {
  json: Flags.boolean({
    description: 'output raw json'
  }),
  recursive: Flags.boolean({
    description: 'Deletes all associated actions (and rules & triggers associated with the actions)',
    char: 'r',
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
