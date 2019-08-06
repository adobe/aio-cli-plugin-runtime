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

class ActivationGet extends RuntimeBaseCommand {
  async run () {
    const { args } = this.parse(ActivationGet)
    const id = args.activationID
    try {
      const ow = await this.wsk()
      const result = await ow.activations.get(id)
      this.logJSON('', result)
    } catch (err) {
      this.handleError('failed to retrieve the activation', err)
    }
  }
}

ActivationGet.args = [
  {
    name: 'activationID',
    required: true
  }
]

ActivationGet.description = 'Retrieves an Activation'
ActivationGet.aliases = [
  'rt:activation:get'
]

module.exports = ActivationGet
