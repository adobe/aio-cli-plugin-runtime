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

const { Flags } = require('@oclif/core')
const RuntimeBaseCommand = require('../../../RuntimeBaseCommand')
const rtLib = require('@adobe/aio-lib-runtime')
const printLogs = rtLib.utils.printLogs
const chalk = require('chalk')

class ActivationLogs extends RuntimeBaseCommand {
  async run () {
    const { args, flags } = await this.parse(ActivationLogs)
    const ow = await this.wsk()

    const configuredLogForwarding = await ow.logForwarding.get()
    if (configuredLogForwarding !== undefined && configuredLogForwarding !== null && !Array.isArray(configuredLogForwarding) && typeof configuredLogForwarding === 'object') {
      const destinations = Object.keys(configuredLogForwarding)
      if (destinations.length === 1 && destinations[0] !== 'adobe_io_runtime') {
        this.log(`Namespace is configured with custom log forwarding destination: '${destinations[0]}'. ` +
            'Please use corresponding logging platform to view logs.')
        return
      }
    }

    let limit = 1
    if (flags.last) {
      limit = 1
    } else if (flags.limit) {
      limit = flags.limit
    }

    if (!args.activationId) {
      const owOptions = await this.getOptions()
      owOptions.auth = owOptions.api_key
      delete owOptions.api_key

      let components
      const filterActions = []
      const filterPackageActions = (pkgName, actions) => {
        // TODO: Following line is a temporary workaround till we figure out how to deal with __APP_PACKAGE__
        pkgName = pkgName.replace(/__APP_PACKAGE__/g, '')
        Object.keys(actions).forEach((actionName) => {
          filterActions.push(pkgName + '/' + actionName)
        })
      }

      if (flags.package) {
        if (flags.deployed) {
          filterActions.push(flags.package + '/')
        } else { // Check in the manifest
          components = await rtLib.utils.setPaths()
          if (!Object.keys(components.manifestContent.packages).includes(flags.package)) {
            await this.handleError(`Could not find package ${flags.package} in manifest`)
          }
          filterPackageActions(flags.package, components.manifestContent.packages[flags.package].actions)
        }
      }

      if (flags.manifest) {
        components = await rtLib.utils.setPaths()
        Object.entries(components.manifestContent.packages).forEach((packageTuple) => {
          filterPackageActions(packageTuple[0], packageTuple[1].actions)
        })
      } else if (flags.action) {
        filterActions.push(flags.action)
      }

      await rtLib.printActionLogs({ ow: owOptions }, this.log.bind(this), limit, filterActions, flags.strip, flags.poll || flags.tail || flags.watch)
    } else {
      return ow.activations.logs(args.activationId).then((result) => {
        this.log(chalk.dim('=== ') + chalk.bold('activation logs %s'), args.activationId)
        printLogs(result, flags.strip, this.log.bind(this))
      }, async (err) => {
        await this.handleError('failed to retrieve logs for activation', err)
      })
    }
  }
}

ActivationLogs.args = [
  {
    name: 'activationId'
  }
]

ActivationLogs.flags = {
  ...RuntimeBaseCommand.flags,
  action: Flags.string({
    description: 'Fetch logs for a specific action',
    exclusive: ['manifest', 'package'],
    char: 'a'
  }),
  manifest: Flags.boolean({
    description: 'Fetch logs for all actions in the manifest',
    exclusive: ['package', 'action'],
    char: 'm'
  }),
  package: Flags.string({
    description: 'Fetch logs for a specific package in the manifest',
    exclusive: ['manifest', 'action'],
    char: 'p'
  }),
  deployed: Flags.boolean({
    description: 'Fetch logs for all actions deployed under a specific package',
    exclusive: ['manifest', 'action'],
    char: 'd'
  }),
  last: Flags.boolean({
    char: 'l',
    description: 'retrieves the most recent activation logs'
  }),
  strip: Flags.boolean({
    char: 'r',
    description: 'strip timestamp information and output first line only',
    default: false
  }),
  limit: Flags.integer({
    description: 'return logs only from last LIMIT number of activations (min: 0, max: 50)',
    exclusive: ['last']
  }),
  tail: Flags.boolean({
    description: 'Fetch logs continuously',
    default: false,
    char: 't',
    exclusive: ['watch', 'poll']
  }),
  watch: Flags.boolean({
    description: 'Fetch logs continuously',
    default: false,
    char: 'w',
    exclusive: ['tail', 'poll']
  }),
  poll: Flags.boolean({
    description: 'Fetch logs continuously',
    default: false,
    char: 'o',
    exclusive: ['watch', 'tail']
  })
}

ActivationLogs.description = 'Retrieves the Logs for an Activation'

ActivationLogs.aliases = [
  'runtime:activation:log',
  'runtime:log',
  'runtime:logs',
  'rt:activation:logs',
  'rt:activation:log',
  'rt:log',
  'rt:logs'
]

module.exports = ActivationLogs
