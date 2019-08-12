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
const { flags } = require('@oclif/command')
const { cli } = require('cli-ux')

class ActivationList extends RuntimeBaseCommand {
  async run () {
    const { args, flags } = this.parse(ActivationList)
    const id = args.activationID
    try {
      let options = {}
      if (id) {
        options['name'] = id
      }
      if (flags.limit) {
        options['limit'] = flags.limit
      }
      if (flags.skip) {
        options['skip'] = flags.skip
      }
      if (flags.since) {
        options['since'] = flags.since
      }
      if (flags.upto) {
        options['upto'] = flags.upto
      }
      if (flags.full) {
        options['docs'] = flags.full
        // implies --json
        flags.json = true
      }

      const ow = await this.wsk()
      let listActivation
      if (Object.entries(options).length === 0) {
        listActivation = await ow.activations.list()
      } else {
        listActivation = await ow.activations.list(options)
      }

      if (flags.json) {
        this.logJSON('', listActivation)
      } else {
        const columns = {
          Datetime: {
            get: row => `${new Date(row.start).toLocaleString()}`
          },
          ActivationID: {
            header: 'Activation ID',
            get: row => `${row.activationId}`
          },
          Kind: {
            get: (row) => {
              return row.annotations.find((elem) => {
                return (elem.key === 'kind')
              }).value
            }
          },
          Start: {
            get: (row) => {
              const elem = row.annotations.find((elem) => {
                return (elem.key === 'initTime')
              })
              return elem ? 'cold' : 'warm'
            }
          },
          Duration: {
            get: row => `${row.duration}ms`
          },
          Status: {
            get: (row) => {
              let statusStrings = ['success', 'application error', 'developer error', 'internal error']
              return statusStrings[row.statusCode]
            }
          },
          Entity: {
            get: (row) => {
              const path = row.annotations.find((elem) => {
                return (elem.key === 'path')
              }).value
              return `${path}:${row.version}`
            }
          }
        }
        if (listActivation) {
          cli.table(listActivation, columns, {
            'no-truncate': true
          })
        }
      }
    } catch (err) {
      this.handleError('failed to list the activations', err)
    }
  }
}

ActivationList.args = [
  {
    name: 'activationID',
    required: false
  }
]

ActivationList.flags = {
  ...RuntimeBaseCommand.flags,
  // example usage:  aio runtime:activation:list --limit 10 --skip 2
  'limit': flags.integer({
    char: 'l',
    description: 'only return LIMIT number of activations from the collection with a maximum LIMIT of 200 activations (default 30)',
    hidden: false, // hide from help
    multiple: false, // allow setting this flag multiple times
    required: false // not mandatory
  }),
  'skip': flags.integer({
    char: 's',
    description: 'exclude the first SKIP number of activations from the result',
    hidden: false, // hide from help
    multiple: false, // allow setting this flag multiple times
    required: false // not mandatory
  }),
  'since': flags.integer({
    description: 'return activations with timestamps later than SINCE; measured in milliseconds since Th, 01, Jan 1970',
    hidden: false, // hide from help
    multiple: false, // allow setting this flag multiple times
    required: false // not mandatory
  }),
  'upto': flags.integer({
    description: 'return activations with timestamps earlier than UPTO; measured in milliseconds since Th, 01, Jan 1970',
    multiple: false, // allow setting this flag multiple times
    hidden: false, // hide from help
    required: false // not mandatory
  }),
  'json': flags.boolean({
    description: 'output raw json'
  }),
  'full': flags.boolean({
    char: 'f',
    description: 'include full activation description'
  })
}

ActivationList.description = 'Lists all the Activations'

ActivationList.aliases = [
  'runtime:activations:list',
  'runtime:activation:ls',
  'runtime:activations:ls',
  'rt:activation:list',
  'rt:activation:ls',
  'rt:activations:list',
  'rt:activations:ls'
]

module.exports = ActivationList
