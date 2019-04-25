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

const TheCommand = require('../../../../src/commands/runtime/deploy/sync.js')
const RuntimeBaseCommand = require('../../../../src/RuntimeBaseCommand.js')
const { stdout } = require('stdout-stderr')
const ow = require('openwhisk')()
jest.mock('sha1')
const sha1 = require('sha1')
const owAction = 'actions.update'
const owPackage = 'packages.update'
const owRules = 'rules.update'
const owTrigger = 'triggers.update'
const owActionDelete = 'actions.delete'
const owPackageDelete = 'packages.delete'
const owRulesDelete = 'rules.delete'
const owTriggerDelete = 'triggers.delete'

test('sync', async () => {
  expect(typeof TheCommand).toEqual('function')
  expect(TheCommand.prototype instanceof RuntimeBaseCommand).toBeTruthy()
})

test('description', async () => {
  expect(TheCommand.description).toBeDefined()
})

test('aliases', async () => {
  expect(TheCommand.aliases).toEqual([])
})

describe('instance methods', () => {
  let command
  let cwdSpy
  let projectHash = 'xyz'
  let packagelist = [{
    annotations: [{
      key: 'whisk-managed',
      value: {
        file: 'manifest.yaml',
        projectDeps: [],
        projectHash: projectHash,
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

  let changedPackagelist = [{
    annotations: [{
      key: 'whisk-managed',
      value: {
        file: 'manifest.yaml',
        projectDeps: [],
        projectHash: 'wxyz',
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
  let rulesWrongHash = [{
    action: { name: 'three', path: 'ns/testSeq' },
    annotations: [{
      key: 'whisk-managed',
      value: {
        file: 'manifest.yaml',
        projectDeps: [],
        projectHash: '2333',
        projectName: 'proj1'
      }
    }],
    name: 'meetPersonRule3',
    namespace: 'ns',
    publish: false,
    trigger: { name: 'meetPerson', path: 'ns' },
    version: '0.0.2'
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

  let actionList = [{
    annotations: [
      {
        key: 'whisk-managed',
        value: {
          file: 'manifest.yaml',
          projectDeps: [],
          projectHash: projectHash,
          projectName: 'proj'
        }
      }
    ],
    exec: { binary: false },
    limits: { logs: 10, memory: 256, timeout: 60000 },
    name: 'lib1_greeting1',
    namespace: 'ns/lib1_package',
    publish: false,
    updated: 1555623951804,
    version: '0.0.16' }
  ]

  let changeActionList = [{
    annotations: [
      {
        key: 'whisk-managed',
        value: {
          file: 'manifest.yaml',
          projectDeps: [],
          projectHash: 'wxyz',
          projectName: 'proj'
        }
      }
    ],
    exec: { binary: false },
    limits: { concurrency: 1, logs: 10, memory: 256, timeout: 60000 },
    name: 'lib1_greeting1',
    namespace: 'ns/lib1_package',
    publish: false,
    updated: 1555623951804,
    version: '0.0.16' }
  ]

  let actionListNoPackage = [{
    annotations: [
      {
        key: 'whisk-managed',
        value: {
          file: 'manifest.yaml',
          projectDeps: [],
          projectHash: 'wxyz',
          projectName: 'proj'
        }
      }
    ],
    exec: { binary: false },
    limits: { concurrency: 1, logs: 10, memory: 256, timeout: 60000 },
    name: 'lib1_greeting1',
    namespace: 'ns',
    publish: false,
    updated: 1555623951804,
    version: '0.0.16' }
  ]

  let actionWrongHash = [{
    annotations: [{
      key: 'whisk-managed',
      value: {
        file: 'manifest.yaml',
        projectDeps: [],
        projectHash: '2333',
        projectName: 'proj1'
      }
    }],
    exec: { binary: false },
    limits: { concurrency: 1, logs: 10, memory: 256, timeout: 60000 },
    name: 'lib1_greeting2',
    namespace: 'ns/lib1_package',
    publish: false,
    updated: 1555623951804,
    version: '0.0.16' }
  ]

  let actionNoAnnotations = [{
    annotations: [],
    exec: { binary: false },
    limits: { concurrency: 1, logs: 10, memory: 256, timeout: 60000 },
    name: 'lib1_greeting3',
    namespace: 'ns/lib1_package',
    publish: false,
    updated: 1555623951804,
    version: '0.0.16' }
  ]

  beforeAll(() => {
    cwdSpy = jest.spyOn(process, 'cwd').mockImplementation(() => {
      return ('/deploy')
    })
    sha1()
  })

  afterAll(() => {
    cwdSpy.mockRestore()
  })

  beforeEach(() => {
    command = new TheCommand([])
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
      ow.mockResolved(owPackage, '')
      ow.mockResolved(owAction, '')
      ow.mockResolved(owRules, '')
      ow.mockResolved(owTrigger, '')
      ow.mockResolved(owPackageDelete, '')
      ow.mockResolved(owActionDelete, '')
      ow.mockResolved(owRulesDelete, '')
      ow.mockResolved(owTriggerDelete, '')
      ow.mockResolved('actions.client.options', '')
      ow.actions.client.options = { namespace: 'ns' }
      ow.mockResolved('packages.list', '')
      ow.mockResolved('packages.update', '')
      ow.mockResolved('actions.update', '')
      ow.mockResolved('triggers.list', '')
      ow.mockResolved('triggers.update', '')
      ow.mockResolved('rules.list', '')
      ow.mockResolved('rules.update', '')
      expect(command.run).toBeInstanceOf(Function)
    })

    test('sync a package which has not been deployed on server before', () => {
      let cmd = ow.mockResolved(owPackage, '')
      ow.mockResolved('actions.list', [])
      command.argv = [ '-m', '/deploy/deployment_actionMissingInputs.yaml' ]
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          expect(stdout.output).toMatch('')
        })
    })

    test('sync a trigger which has not been deployed on server before', () => {
      ow.mockResolved('actions.list', [])
      let cmd = ow.mockResolved(owTrigger, '')
      command.argv = [ '-m', '/deploy/deployment_actionMissingInputs.yaml' ]
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          expect(stdout.output).toMatch('')
        })
    })

    test('sync an action which has not been deployed on server before', () => {
      ow.mockResolved('actions.list', [])
      let cmd = ow.mockResolved(owAction, '')
      command.argv = [ '-m', '/deploy/deployment_actionMissingInputs.yaml' ]
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          expect(stdout.output).toMatch('')
        })
    })

    test('sync a package which has been deployed before but has not changed ', () => {
      ow.mockResolved('packages.list', packagelist)
      let cmd = ow.mockResolved(owPackage, '')
      command.argv = [ '-m', '/deploy/deployment_actionMissingInputs.yaml' ]
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          expect(stdout.output).toMatch('')
        })
    })

    test('sync a trigger which has been deployed before but has not changed ', () => {
      ow.mockResolved('packages.list', packagelist)
      let cmd = ow.mockResolved(owTrigger, '')
      command.argv = [ '-m', '/deploy/deployment_actionMissingInputs.yaml' ]
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          expect(stdout.output).toMatch('')
        })
    })

    test('sync an action which has been deployed before but has not changed ', () => {
      ow.mockResolved('packages.list', packagelist)
      let cmd = ow.mockResolved(owAction, '')
      command.argv = [ '-m', '/deploy/deployment_actionMissingInputs.yaml' ]
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          expect(stdout.output).toMatch('')
        })
    })

    test('sync a project which has been deployed before and manifest content has changed ', () => {
      ow.mockResolved('packages.list', changedPackagelist)
      ow.mockResolved('actions.list', actionList)
      let cmd = ow.mockResolved(owPackageDelete, '')
      command.argv = [ '-m', '/deploy/deployment_syncMissingAction.yaml' ]
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith('testSeq')
          expect(stdout.output).toMatch('')
        })
    })

    test('should not find projectHash from package list with no annotations and package should not be deleted ', () => {
      ow.mockResolved('packages.list', packageNoAnnotations)
      ow.mockResolved('actions.list', actionList)
      let cmd = ow.mockResolved(owPackageDelete, '')
      command.argv = [ '-m', '/deploy/deployment_syncMissingAction.yaml' ]
      return command.run()
        .then(() => {
          expect(cmd).not.toHaveBeenCalled()
          expect(stdout.output).toMatch('')
        })
    })

    test('should not find projectHash from package list with no value for project name and package should not be deleted ', () => {
      ow.mockResolved('packages.list', packagelistNoProjectName)
      ow.mockResolved('actions.list', actionList)
      let cmd = ow.mockResolved(owPackageDelete, '')
      command.argv = [ '-m', '/deploy/deployment_syncMissingAction.yaml' ]
      return command.run()
        .then(() => {
          expect(cmd).not.toHaveBeenCalled()
          expect(stdout.output).toMatch('')
        })
    })

    test('sync a trigger which has been deployed before and manifest content has changed ', () => {
      ow.mockResolved('packages.list', [])
      ow.mockResolved('actions.list', [])
      ow.mockResolved('triggers.list', triggerlist)
      let cmd = ow.mockResolved(owTriggerDelete, '')
      command.argv = [ '-m', '/deploy/deployment_syncMissingAction.yaml' ]
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith('meetPerson')
          expect(stdout.output).toMatch('')
        })
    })

    test('fail to find projectHash from trigger list which has no annotations and has been deployed before and manifest content has changed ', () => {
      ow.mockResolved('packages.list', [])
      ow.mockResolved('actions.list', [])
      ow.mockResolved('triggers.list', triggerNoAnnotation)
      let cmd = ow.mockResolved(owTriggerDelete, '')
      command.argv = [ '-m', '/deploy/deployment_syncMissingAction.yaml' ]
      return command.run()
        .then(() => {
          expect(cmd).not.toHaveBeenCalled()
          expect(stdout.output).toMatch('')
        })
    })

    test('fail to find projectHash from trigger list which has no projectHash and has been deployed before and manifest content has changed ', () => {
      ow.mockResolved('packages.list', [])
      ow.mockResolved('actions.list', [])
      ow.mockResolved('triggers.list', triggerNoProjectName)
      let cmd = ow.mockResolved(owTriggerDelete, '')
      command.argv = [ '-m', '/deploy/deployment_syncMissingAction.yaml' ]
      return command.run()
        .then(() => {
          expect(cmd).not.toHaveBeenCalled()
          expect(stdout.output).toMatch('')
        })
    })

    test('fail to find projectHash from action list which has no projectHash and has been deployed before and manifest content has changed ', () => {
      ow.mockResolved('packages.list', [])
      ow.mockResolved('actions.list', actionWrongHash)
      let cmd = ow.mockResolved(owActionDelete, '')
      command.argv = [ '-m', '/deploy/deployment_syncMissingAction.yaml' ]
      return command.run()
        .then(() => {
          expect(cmd).not.toHaveBeenCalled()
          expect(stdout.output).toMatch('')
        })
    })

    test('fail to find projectHash from action list which has no annotations and has been deployed before and manifest content has changed ', () => {
      ow.mockResolved('packages.list', [])
      ow.mockResolved('actions.list', actionNoAnnotations)
      let cmd = ow.mockResolved(owTriggerDelete, '')
      command.argv = [ '-m', '/deploy/deployment_syncMissingAction.yaml' ]
      return command.run()
        .then(() => {
          expect(cmd).not.toHaveBeenCalled()
          expect(stdout.output).toMatch('')
        })
    })

    test('find project hash from action list which has been deployed before and action should be deleted because of projecthash change', () => {
      ow.mockResolved('packages.list', [])
      ow.mockResolved('actions.list', changeActionList)
      let cmd = ow.mockResolved(owActionDelete, '')
      command.argv = [ '-m', '/deploy/deployment_syncMissingAction.yaml' ]
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          expect(stdout.output).toMatch('')
        })
    })

    test('find project hash from action list which has been deployed but not as part of any package before and action should be deleted because of projecthash change', () => {
      ow.mockResolved('packages.list', [])
      ow.mockResolved('actions.list', actionListNoPackage)
      let cmd = ow.mockResolved(owActionDelete, '')
      command.argv = [ '-m', '/deploy/deployment_syncMissingAction.yaml' ]
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          expect(stdout.output).toMatch('')
        })
    })

    test('find project hash from rules which has been deployed before and rule should be deleted because of projecthash change', () => {
      ow.mockResolved('packages.list', [])
      ow.mockResolved('actions.list', [])
      ow.mockResolved('triggers.list', [])
      ow.mockResolved('rules.list', ruleslist)
      let cmd = ow.mockResolved(owRulesDelete, '')
      command.argv = [ '-m', '/deploy/deployment_syncMissingAction.yaml' ]
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith('meetPersonRule')
          expect(stdout.output).toMatch('')
        })
    })

    test('no project hash found and rule should not be deleted', () => {
      ow.mockResolved('packages.list', [])
      ow.mockResolved('actions.list', [])
      ow.mockResolved('triggers.list', [])
      ow.mockResolved('rules.list', rulesWrongHash)
      let cmd = ow.mockResolved(owRulesDelete, '')
      command.argv = [ '-m', '/deploy/deployment_syncMissingAction.yaml' ]
      return command.run()
        .then(() => {
          expect(cmd).not.toHaveBeenCalled()
          expect(stdout.output).toMatch('')
        })
    })

    test('no project hash found in rule with empty annotations should not be deleted', () => {
      ow.mockResolved('packages.list', [])
      ow.mockResolved('actions.list', [])
      ow.mockResolved('triggers.list', [])
      ow.mockResolved('rules.list', rulesNoAnnotations)
      let cmd = ow.mockResolved(owRulesDelete, '')
      command.argv = [ '-m', '/deploy/deployment_syncMissingAction.yaml' ]
      return command.run()
        .then(() => {
          expect(cmd).not.toHaveBeenCalled()
          expect(stdout.output).toMatch('')
        })
    })

    test('find project hash and deploy sequences', () => {
      ow.mockResolved('packages.list', packagelist)
      ow.mockResolved('actions.list', actionList)
      let cmd = ow.mockResolved(owAction, '')
      command.argv = [ '-m', '/deploy/deployment_syncSequences.yaml' ]
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          expect(stdout.output).toMatch('')
        })
    })

    test('both manifest files not found', (done) => {
      const toRemove = [ '/deploy/manifest.yaml', '/deploy/manifest.yml' ]
      fakeFileSystem.removeKeys(toRemove)

      command.argv = [ ]
      return command.run()
        .then(() => done.fail('does not throw error'))
        .catch((err) => {
          expect(err).toMatchObject(new Error('Failed to sync: Manifest file not found'))
          done()
        })
    })

    test('project name missing from manifest file', (done) => {
      command.argv = [ ]
      return command.run()
        .then(() => done.fail('does not throw error'))
        .catch((err) => {
          expect(err).toMatchObject(new Error('Failed to sync: The mandatory key [project name] is missing'))
          done()
        })
    })

    test('project name different in manifest and deployment file', (done) => {
      command.argv = [ '-m', '/deploy/deployment_syncMissingAction.yaml', '-d', '/deploy/deployment.yml' ]
      return command.run()
        .then(() => done.fail('does not throw error'))
        .catch((err) => {
          expect(err).toMatchObject(new Error('Failed to sync: The project name in the deployment file does not match the project name in the manifest file'))
          done()
        })
    })
  })
})
