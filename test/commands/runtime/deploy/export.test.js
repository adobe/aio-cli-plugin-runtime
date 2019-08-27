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

const TheCommand = require('../../../../src/commands/runtime/deploy/export.js')
const RuntimeBaseCommand = require('../../../../src/RuntimeBaseCommand.js')
const ow = require('openwhisk')()
const { stdout } = require('stdout-stderr')
const owPackageList = 'packages.list'
const owRulesList = 'rules.list'
const owTriggerList = 'triggers.list'
const fs = require('fs')

test('exports', async () => {
  expect(typeof TheCommand).toEqual('function')
  expect(TheCommand.prototype instanceof RuntimeBaseCommand).toBeTruthy()
})

test('description', async () => {
  expect(TheCommand.description).toBeDefined()
})

test('aliases', async () => {
  expect(TheCommand.aliases).toBeDefined()
  expect(TheCommand.aliases).toBeInstanceOf(Array)
  expect(TheCommand.aliases.length).toBeGreaterThan(0)
})

describe('instance methods', () => {
  let command, handleError
  let packagelist = [{
    annotations: [{
      key: 'whisk-managed',
      value: {
        file: 'manifest.yaml',
        projectDeps: [],
        projectHash: 'xyz',
        projectName: 'proj'
      }
    }],
    binding: false,
    name: 'testSeq',
    namespace: 'ns',
    publish: false,
    updated: 1555533204836,
    version: '0.0.2'
  }]

  let packageNoAnnotations = [{
    annotations: [],
    binding: false,
    name: 'testSeq1',
    namespace: 'ns',
    publish: false,
    updated: 1555533204836,
    version: '0.0.2'
  }]

  let packagelistNoProjectName = [{
    annotations: [{
      key: 'whisk-managed',
      value: 'key'
    }],
    binding: false,
    name: 'testSeq1',
    namespace: 'ns',
    publish: false,
    updated: 1555533204836,
    version: '0.0.2'
  }]

  let packageget = {
    actions: [{
      annotations: [],
      name: 'helloAction',
      version: '0.0.2'
    },
    {
      annotations: [],
      name: 'helloAction1',
      version: '0.0.2'
    }],
    annotations: [{
      key: 'whisk-managed',
      value: {
        file: 'manifest.yaml',
        projectDeps: [],
        projectHash: 'xyz',
        projectName: 'proj'
      }
    }],
    binding: {},
    feeds: [],
    name: 'testSeq',
    namespace: 'ns',
    parameters: [],
    publish: false,
    version: '0.0.2'
  }

  let sequenceGet = {
    annotations: [
      {
        key: 'whisk-managed',
        value: {
          file: 'manifest.yaml',
          projectDeps: [],
          projectHash: 'xyz',
          projectName: 'proj'
        }
      },
      {
        key: 'exec',
        value: 'sequence'
      }
    ],
    exec:
    { components: [
      '/53444_51981/testSeq/zero',
      '/53444_51981/testSeq/one',
      '/53444_51981/testSeq/two'
    ],
    kind: 'sequence'
    },
    name: 'four',
    namespace: '53444_51981/testSeq',
    parameters: [ {
      key: '_actions',
      value: [ '/53444_51981/testSeq/zero', '/53444_51981/testSeq/one', '/53444_51981/testSeq/two' ]
    }],
    publish: false,
    version: '0.0.9'
  }

  let actionGet = {
    annotations: [
      {
        key: 'whisk-managed',
        value: {
          file: 'manifest.yaml',
          projectDeps: [],
          projectHash: 'xyz',
          projectName: 'proj'
        }
      },
      {
        key: 'exec', value: 'nodejs:10'
      }
    ],
    exec:
    { kind: 'nodejs:10',
      code: `code`,
      binary: false,
      main: 'split' },
    limits: { concurrency: 1, logs: 10, memory: 256, timeout: 60000 },
    name: 'helloAction1',
    namespace: '53444_51981/testSeq',
    parameters: [ {
      key: 'key1',
      value: 'val1'
    },
    {
      key: 'key2',
      value: 'val1'
    }
    ],
    publish: false,
    version: '0.0.9'
  }

  let actionBinaryGet = {
    annotations: [
      {
        key: 'whisk-managed',
        value: {
          file: 'manifest.yaml',
          projectDeps: [],
          projectHash: 'xyz',
          projectName: 'proj'
        }
      },
      {
        key: 'exec', value: 'nodejs:10'
      }
    ],
    exec:
    { kind: 'nodejs:10',
      binary: true,
      code: 'code'
    },
    limits: { concurrency: 1, logs: 10, memory: 256, timeout: 60000 },
    name: 'helloAction',
    namespace: '53444_51981/testSeq',
    parameters: [ {
      key: 'key1',
      value: 'val1'
    },
    {
      key: 'key2',
      value: 'val1'
    }
    ],
    publish: false,
    version: '0.0.9'
  }

  let triggerlist = [{
    annotations: [{
      key: 'whisk-managed',
      value: {
        file: 'manifest.yaml',
        projectDeps: [],
        projectHash: 'wxyz',
        projectName: 'proj'
      }
    }],
    name: 'meetPerson',
    namespace: 'ns',
    publish: false,
    updated: 1555527174943,
    version: '0.0.1'
  }]

  let rulesNoAnnotations = [{
    action: { name: 'three2', path: 'ns/testSeq2' },
    annotations: [],
    name: 'meetPersonRule2',
    namespace: 'ns',
    publish: false,
    trigger: { name: 'meetPerson2', path: 'ns' },
    version: '0.0.2'
  }]

  let triggerNoProjectName = [
    {
      annotations: [{
        key: 'whisk-managed',
        value: 'value'
      }],
      name: 'meetPerson1',
      namespace: 'ns',
      publish: false,
      updated: 1555527174943,
      version: '0.0.1'
    }
  ]
  let triggerNoAnnotation = [{
    annotations: [],
    name: 'meetPerson2',
    namespace: 'ns',
    publish: false,
    updated: 1555527174943,
    version: '0.0.1'
  }]

  let triggerGet = {
    annotations: [{
      key: 'whisk-managed',
      value: {
        file: 'manifest.yaml',
        projectDeps: [],
        projectHash: 'wxyz',
        projectName: 'proj'
      }
    }],
    limits: {},
    name: 'meetPerson',
    namespace: '53444_51981',
    parameters: [{
      key: 'name', value: 'Sam'
    },
    { key: 'place',
      value: ''
    },
    { key: 'children',
      value: 0
    } ],
    publish: false,
    rules: {
      '53444_51981/meetPersonRule': {
        action: {
          name: 'three',
          path: '53444_51981/testSeq'
        },
        status: 'active'
      }
    },
    version: '0.0.5'
  }

  let ruleslist = [{
    action: { name: 'three', path: 'ns/testSeq' },
    annotations: [{
      key: 'whisk-managed',
      value: {
        file: 'manifest.yaml',
        projectDeps: [],
        projectHash: 'wxyz',
        projectName: 'proj'
      }
    }],
    name: 'meetPersonRule',
    namespace: '53444_51981',
    publish: false,
    trigger: { name: 'meetPerson', path: 'ns' },
    version: '0.0.2'
  },
  {
    action: { name: 'three1', path: 'ns/testSeq1' },
    annotations: [{
      key: 'blah',
      value: 'value'
    }],
    name: 'meetPersonRule1',
    namespace: 'ns',
    publish: false,
    trigger: { name: 'meetPerson1', path: 'ns' },
    version: '0.0.2'
  }]

  beforeEach(() => {
    command = new TheCommand([])
    handleError = jest.spyOn(command, 'handleError')
    const json = {
      'deploy/deployment_syncSequences.yaml': fixtureFile('deploy/deployment_syncSequences.yaml'),
      'deploy/manifest.yaml': fixtureFile('deploy/manifest.yaml'),
      'deploy/deployment_actionMissingInputs.yaml': fixtureFile('deploy/deployment_actionMissingInputs.yaml'),
      'deploy/deployment_syncMissingAction.yaml': fixtureFile('deploy/deployment_syncMissingAction.yaml'),
      'deploy/manifest.yml': fixtureFile('deploy/manifest.yml'),
      'deploy/hello.js': fixtureFile('deploy/hello.js'),
      'deploy/hello_plus.js': fixtureFile('deploy/hello_plus.js'),
      'deploy/deployment.yaml': fixtureFile('deploy/deployment.yaml'),
      'deploy/deployment.yml': fixtureFile('deploy/deployment.yml')
    }
    fakeFileSystem.addJson(json)
  })

  afterEach(() => {
    // reset back to normal
    fakeFileSystem.reset()
  })

  describe('run', () => {
    test('exists', async () => {
      expect(command.run).toBeInstanceOf(Function)
      ow.mockResolved('rules.get', '')
      ow.mockResolved('triggers.get', '')
      ow.mockResolved('actions.get', '')
      ow.mockResolved(owTriggerList, '')
      ow.mockResolved(owRulesList, '')
    })

    test('fetch list of packages to be exported from project name', () => {
      let cmd = ow.mockResolved(owPackageList, '')
      command.argv = [ '--projectname', 'proj', '-m', '/deploy/manifest.yaml' ]
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          expect(stdout.output).toMatch('')
        })
    })

    test('fetch list of actions to be exported from project name', () => {
      let cmd = ow.mockResolved('packages.get', packageget)
      command.argv = [ '--projectname', 'proj', '-m', '/deploy/manifest.yaml' ]
      ow.mockResolved(owPackageList, packagelist)
      ow.mockResolved('actions.get', actionGet)
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          expect(stdout.output).toMatch('')
        })
    })

    test('fetch list of triggers to be exported from project name', () => {
      let cmd = ow.mockResolved(owTriggerList, '')
      command.argv = [ '--projectname', 'proj', '-m', '/deploy/manifest.yaml' ]
      ow.mockResolved(owPackageList, packagelist)
      ow.mockResolved('packages.get', packageget)
      ow.mockResolved('actions.get', actionGet)
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          expect(stdout.output).toMatch('')
        })
    })

    test('fetch list of rules to be exported from project name', () => {
      let cmd = ow.mockResolved(owRulesList, '')
      command.argv = [ '--projectname', 'proj', '-m', '/deploy/manifest.yaml' ]
      ow.mockResolved(owPackageList, packagelist)
      ow.mockResolved('packages.get', packageget)
      ow.mockResolved('actions.get', actionGet)
      ow.mockResolved(owTriggerList, '')
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          expect(stdout.output).toMatch('')
        })
    })

    test('write action to js file', () => {
      ow.mockResolved(owTriggerList, triggerlist)
      ow.mockResolved('triggers.get', triggerGet)
      ow.mockResolved(owRulesList, ruleslist)
      fs.writeFileSync = jest.fn()
      command.argv = [ '--projectname', 'proj', '-m', '/deploy/manifest.yaml' ]
      let yaml = fixtureFile('deploy/export_yaml.yaml')
      return command.run()
        .then(() => {
          expect(fs.writeFileSync).toHaveBeenCalledWith('/deploy/manifest.yaml', yaml)
          expect(fs.writeFileSync).toHaveBeenCalledWith('/deploy/testSeq/helloAction1.js', 'code')
          expect(fs.writeFileSync).toHaveBeenCalledWith('/deploy/testSeq/helloAction.js', 'code')
        })
    })

    test('write sequence to js file', () => {
      ow.mockResolved('actions.get', sequenceGet)
      ow.mockResolved(owTriggerList, triggerlist)
      ow.mockResolved('triggers.get', triggerGet)
      ow.mockResolved(owRulesList, ruleslist)
      fs.writeFileSync = jest.fn()
      command.argv = [ '--projectname', 'proj', '-m', '/deploy/manifest.yaml' ]
      let yaml = fixtureFile('deploy/export_yaml_Sequence.yaml')
      return command.run()
        .then(() => {
          expect(fs.writeFileSync).toHaveBeenCalledWith('/deploy/manifest.yaml', yaml)
        })
    })

    test('write binary of action to js file', () => {
      let bufferData = Buffer.from('code', 'base64')
      ow.mockResolved('actions.get', actionBinaryGet)
      ow.mockResolved(owTriggerList, triggerlist)
      ow.mockResolved('triggers.get', triggerGet)
      ow.mockResolved(owRulesList, ruleslist)
      fs.writeFileSync = jest.fn()
      command.argv = [ '--projectname', 'proj', '-m', '/deploy/manifest.yaml' ]
      return command.run()
        .then(() => {
          expect(fs.writeFileSync).toHaveBeenCalledWith('/deploy/testSeq/helloAction.zip', bufferData, 'buffer')
        })
    })

    test('write project name to manifest file if package has no annotations and there are no triggers and rules', () => {
      ow.mockResolved(owPackageList, packageNoAnnotations)
      ow.mockResolved(owTriggerList, '')
      ow.mockResolved(owRulesList, '')
      fs.writeFileSync = jest.fn()
      command.argv = [ '--projectname', 'proj', '-m', '/deploy/manifest.yaml' ]
      let yaml = fixtureFile('deploy/export_yaml_noAnnotations.yaml')
      return command.run()
        .then(() => {
          expect(fs.writeFileSync).toHaveBeenCalledWith('/deploy/manifest.yaml', yaml)
        })
    })

    test('write project name to manifest file if package has no whisk managed project name and there are no triggers and rules', () => {
      ow.mockResolved(owPackageList, packagelistNoProjectName)
      fs.writeFileSync = jest.fn()
      ow.mockResolved(owTriggerList, '')
      ow.mockResolved(owRulesList, '')
      command.argv = [ '--projectname', 'proj', '-m', '/deploy/manifest.yaml' ]
      let yaml = fixtureFile('deploy/export_yaml_noAnnotations.yaml')
      return command.run()
        .then(() => {
          expect(fs.writeFileSync).toHaveBeenCalledWith('/deploy/manifest.yaml', yaml)
        })
    })

    test('do not write trigger to js file if trigger has no whisk managed key', () => {
      ow.mockResolved(owPackageList, '')
      ow.mockResolved(owTriggerList, triggerNoProjectName)
      ow.mockResolved(owRulesList, '')
      let cmd = ow.mockResolved('triggers.get', '')
      command.argv = [ '--projectname', 'proj', '-m', '/deploy/manifest.yaml' ]
      return command.run()
        .then(() => {
          expect(cmd).not.toHaveBeenCalled()
        })
    })

    test('do not write trigger to js file if trigger has no annotations', () => {
      ow.mockResolved(owPackageList, '')
      ow.mockResolved(owTriggerList, triggerNoAnnotation)
      ow.mockResolved(owRulesList, '')
      let cmd = ow.mockResolved('triggers.get', '')
      command.argv = [ '--projectname', 'proj', '-m', '/deploy/manifest.yaml' ]
      return command.run()
        .then(() => {
          expect(cmd).not.toHaveBeenCalled()
        })
    })

    test('write project name to manifest file if rule has no whisk managed project name', () => {
      ow.mockResolved(owPackageList, '')
      fs.writeFileSync = jest.fn()
      ow.mockResolved(owTriggerList, '')
      ow.mockResolved(owRulesList, rulesNoAnnotations)
      command.argv = [ '--projectname', 'proj', '-m', '/deploy/manifest.yaml' ]
      let yaml = fixtureFile('deploy/export_yaml_noAnnotations.yaml')
      return command.run()
        .then(() => {
          expect(fs.writeFileSync).toHaveBeenCalledWith('/deploy/manifest.yaml', yaml)
        })
    })

    test('errors out on api error', (done) => {
      ow.mockRejected(owPackageList, new Error('an error'))
      command.argv = [ '--projectname', 'proj', '-m', '/deploy/manifest.yaml' ]
      return command.run()
        .then(() => done.fail('does not throw error'))
        .catch(() => {
          expect(handleError).toHaveBeenLastCalledWith('Failed to export', new Error('an error'))
          done()
        })
    })
  })
})
