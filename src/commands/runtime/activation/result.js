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

class ActivationResult extends RuntimeBaseCommand {
  async run () {
    const { args, flags } = await this.parse(ActivationResult)
    let id = args.activationID
    try {
      const ow = await this.wsk()
      if (flags.last) {
        const ax = await ow.activations.list({ limit: 1, skip: 0 })
        id = ax[0].activationId
      }
      if (!id) {
        this.error('missing required argument activationID')
      }

      const result = await ow.activations.result(id)
      this.logJSON('', result)
    } catch (err) {
      await this.handleError('failed to fetch activation result', err)
    }
  }
}

ActivationResult.args = [
  {
    name: 'activationID'
  }
]

ActivationResult.flags = {
  ...RuntimeBaseCommand.flags,
  last: Flags.boolean({
    char: 'l',
    description: 'retrieves the most recent activation result'
  })
}

ActivationResult.description = 'Retrieves the Results for an Activation'

ActivationResult.aliases = [
  'rt:activation:result'
]

module.exports = ActivationResult
