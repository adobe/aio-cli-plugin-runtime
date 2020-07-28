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

const { flags } = require('@oclif/command')
const RuntimeBaseCommand = require('../../../RuntimeBaseCommand')
const { printLogs } = require('@adobe/aio-lib-runtime').utils
const chalk = require('chalk')

class ActivationLogs extends RuntimeBaseCommand {
  async run () {
    const { args, flags } = this.parse(ActivationLogs)
    // note: could be null, but we wait to check
    let activations = [{ activationId: args.activationId }]
    const ow = await this.wsk()

    if (flags.last) {
      const limit = Math.max(1, Math.min(flags.count, 5))
      activations = await ow.activations.list({ limit: limit, skip: 0 })
      if (!activations || activations.length < 1) {
        this.log('No activations to log.')
        return
      }
    }
    if (!activations[0].activationId) {
      // just a thought, but we could just return --last activation log when no id is present
      this.error('Missing required arg: `activationId`')
    }

    const logger = this.log
    await Promise.all(activations.map((ax) => {
      return ow.activations.logs(ax.activationId).then((result) => {
        logger(chalk.dim('=== ') + chalk.bold('activation logs %s %s:%s'), ax.activationId, ax.name || '', ax.version || '')
        printLogs(result, flags.strip, logger)
      }, (err) => {
        this.handleError('failed to retrieve logs for activation', err)
      })
    }))
  }
}

ActivationLogs.args = [
  {
    name: 'activationId'
  }
]

ActivationLogs.flags = {
  ...RuntimeBaseCommand.flags,
  last: flags.boolean({
    char: 'l',
    description: 'retrieves the most recent activation logs'
  }),
  strip: flags.boolean({
    char: 'r',
    description: 'strip timestamp information and output first line only'
  }),
  count: flags.integer({
    char: 'c',
    description: 'used with --last, return the last `count` activation logs. Max 5',
    default: 1
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
