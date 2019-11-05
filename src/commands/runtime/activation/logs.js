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
const { printLogs } = require('./common')

class ActivationLogs extends RuntimeBaseCommand {
  async run () {
    const { args, flags } = this.parse(ActivationLogs)
    let id = args.activationID // note: could be null, but we wait to check
    const ow = await this.wsk()

    if (flags.last) {
      const ax = await ow.activations.list({ limit: 1, skip: 0 })
      id = ax[0].activationId
      this.log('activation logs %s', id)
    }
    if (!id) {
      // just a thought, but we could just return --last activation log when no id is present
      this.error('Missing required arg: `activationID`')
    }

    try {
      const result = await ow.activations.logs(id)
      printLogs(result, flags.strip, this.log)
    } catch (err) {
      this.handleError('failed to retrieve the logs', err)
    }
  }
}

ActivationLogs.args = [
  {
    name: 'activationID'
  }
]

ActivationLogs.flags = {
  ...RuntimeBaseCommand.flags,
  last: flags.boolean({
    char: 'l',
    description: 'retrieves the most recent activation log'
  }),
  strip: flags.boolean({
    char: 'r',
    description: 'strip timestamp information and output first line only'
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
