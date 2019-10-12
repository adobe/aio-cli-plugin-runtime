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
// for lines starting with date-time-string and 6 spaces, returns stdout|stderr and everything after
const dtsRegex = /\d{4}-[01]{1}\d{1}-[0-3]{1}\d{1}T[0-2]{1}\d{1}:[0-6]{1}\d{1}:[0-6]{1}\d{1}.\d+Z {6}((stdout|stderr):)?\s(.*)/

const stripLog = (elem) => {
  // `2019-10-11T19:08:57.298Z       stdout: login-success ::  { code: ...`
  // should become: `login-success ::  { code: ...`
  const found = elem.match(dtsRegex)
  if (found && found.length > 3 && found[3].length > 0) {
    return found[3]
  }
  return elem
}

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

      if (result.logs) {
        result.logs.forEach(elem => {
          if (flags.strip) {
            this.log(stripLog(elem))
          } else {
            this.log(elem)
          }
        })
      }
    } catch (err) {
      this.handleError('failed to retrieve the logs', err)
    }
  }
}

ActivationLogs.args = [
  {
    name: 'activationID',
    required: false
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
