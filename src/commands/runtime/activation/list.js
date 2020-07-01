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

const moment = require('moment')
const RuntimeBaseCommand = require('../../../RuntimeBaseCommand')
const { flags } = require('@oclif/command')
const { cli } = require('cli-ux')
const decorators = require('../../../decorators').decorators()
const statusStrings = ['success', 'error', `error${decorators.collision}`, 'syserr']

class ActivationList extends RuntimeBaseCommand {
  async run () {
    const { args, flags } = this.parse(ActivationList)
    const id = args.activation_name
    try {
      const options = {}
      if (id) {
        options.name = id
      }
      if (flags.limit) {
        options.limit = flags.limit
      }
      if (flags.skip) {
        options.skip = flags.skip
      }
      if (flags.since) {
        options.since = flags.since
      }
      if (flags.upto) {
        options.upto = flags.upto
      }
      if (flags.full) {
        options.docs = flags.full
        // implies --json
        flags.json = true
      }
      if (flags.count) {
        options.count = true
      }

      const ow = await this.wsk()

      let listActivation
      if (Object.entries(options).length === 0) {
        listActivation = await ow.activations.list()
      } else {
        listActivation = await ow.activations.list(options)
      }

      // if only showing the count, show the result and return
      if (flags.count) {
        const result = listActivation
        if (flags.json) {
          this.logJSON('', result)
        } else {
          this.log(`You have ${result.activations} ${result.activations === 1 ? 'activation' : 'activations'} in this namespace.`)
        }
        return
      }

      if (flags.json) {
        this.logJSON('', listActivation)
      } else {
        // determine the namespace to use in the activation table
        const ns = (await ow.namespaces.list())[0]

        const columns = {
          Datetime: {
            get: row => moment(row.start).format('MM/DD HH:mm:ss'),
            minWidth: 16
          },
          Status: {
            get: (row) => {
              const code = statusStrings[row.statusCode || 0]
              if (row.statusCode === 2) {
                const timeout = row.annotations.find(_ => _.key === 'timeout')
                if (timeout && timeout.value) {
                  return `timeout`
                }
              }
              return code
            },
            minWidth: 9
          },
          Kind: {
            get: (row) => {
              if (row.duration !== undefined) {
                const { annotations } = row
                let kind
                if (annotations && annotations.length) {
                  kind = annotations.find(_ => _.key === 'kind').value
                }
                kind = kind || '??'
                return `${kind.includes('lambda') ? kind.replace('-lambda', '') + ' (λ)' : kind}`
              } else {
                // this is a trigger
                return 'trigger'
              }
            },
            minWidth: 9
          },
          version: {
            header: 'Version',
            minWidth: 9,
            get: row => row.version
          },
          Topmost: {
            header: '',
            maxWidth: 2,
            get: row => {
              if (row.annotations && row.annotations.length) {
                const seq = row.annotations.find(_ => _.key === 'causedBy')
                if (seq && seq.value === 'sequence') return decorators.dot
                const top = row.annotations.find(_ => _.key === 'topmost')
                if (top && top.value) return decorators.half_circle_lower
              }
              return ''
            }
          },
          ActivationID: {
            header: 'Activation ID',
            get: row => `${row.activationId}`
          },
          Start: {
            get: (row) => {
              if (row.duration !== undefined) {
                const { annotations } = row
                if (!annotations || !annotations.length) return
                const elem = annotations.find((elem) => {
                  return (elem.key === 'initTime')
                })
                return elem ? 'cold' : 'warm'
              } else {
                return '--'
              }
            }
          },
          Wait: {
            get: (row) => {
              if (row.duration !== undefined) {
                const { annotations } = row
                if (!annotations || !annotations.length) return
                const elem = annotations.find((elem) => {
                  return (elem.key === 'waitTime')
                })
                return elem ? elem.value : '--'
              } else {
                return '--'
              }
            }
          },
          Init: {
            get: (row) => {
              if (row.duration !== undefined) {
                const { annotations } = row
                if (!annotations || !annotations.length) return
                const elem = annotations.find((elem) => {
                  return (elem.key === 'initTime')
                })
                return elem ? elem.value : 0
              } else {
                return '--'
              }
            }
          },
          Duration: {
            get: row => row.duration ? `${row.duration}ms` : '--'
          },
          Entity: {
            get: (row) => {
              const { annotations } = row
              let path
              if (annotations && annotations.length) {
                path = annotations.find(_ => _.key === 'path').value
              }
              path = path || `${row.namespace}/${row.name}`
              return path.replace(`${ns}/`, '')
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
    name: 'activation_name'
  }
]

ActivationList.limits = {
  max: 200
}

ActivationList.flags = {
  ...RuntimeBaseCommand.flags,
  // example usage:  aio runtime:activation:list --limit 10 --skip 2
  limit: flags.integer({
    char: 'l',
    description: `only return LIMIT number of activations from the collection with a maximum LIMIT of ${ActivationList.limits.max} activations (default 30)`
  }),
  skip: flags.integer({
    char: 's',
    description: 'exclude the first SKIP number of activations from the result'
  }),
  since: flags.integer({
    description: 'return activations with timestamps later than SINCE; measured in milliseconds since Th, 01, Jan 1970'
  }),
  upto: flags.integer({
    description: 'return activations with timestamps earlier than UPTO; measured in milliseconds since Th, 01, Jan 1970'
  }),
  count: flags.boolean({
    char: 'c',
    description: 'show only the total number of activations'
  }),
  json: flags.boolean({
    description: 'output raw json'
  }),
  full: flags.boolean({
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
