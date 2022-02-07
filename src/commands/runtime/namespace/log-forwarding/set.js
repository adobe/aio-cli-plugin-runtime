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

const inquirer = require('inquirer')
const RuntimeBaseCommand = require('../../../../RuntimeBaseCommand')

class SetCommand extends RuntimeBaseCommand {
  async run () {
    const ow = await this.wsk()
    const logForwarding = ow.logForwarding
    const destination = await this.promptDestination(logForwarding.getSupportedDestinations())
    const settings = await inquirer.prompt(logForwarding.getDestinationSettings(destination))
    try {
      await logForwarding.setDestination(destination, settings)
      this.log(`Log forwarding was set to ${destination} for this namespace`)
    } catch (e) {
      this.handleError('Failed to update log forwarding configuration', e)
    }
  }

  async promptDestination (supportedDestinations) {
    const responses = await inquirer.prompt([{
      name: 'type',
      message: 'select log forwarding destination',
      type: 'list',
      choices: supportedDestinations
    }])
    return responses.type
  }
}

SetCommand.description = 'Configure log forwarding destination (interactive)'

SetCommand.flags = {
  ...RuntimeBaseCommand.flags
}

SetCommand.aliases = [
  'runtime:ns:log-forwarding:set',
  'runtime:ns:lf:set',
  'runtime:namespace:lf:set',
  'rt:namespace:log-forwarding:set',
  'rt:namespace:lf:set',
  'rt:ns:log-forwarding:set',
  'rt:ns:lf:set'
]

module.exports = SetCommand
