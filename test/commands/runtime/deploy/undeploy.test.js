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

const { stdout } = require('stdout-stderr')
const TheCommand = require('../../../../src/commands/runtime/deploy/undeploy.js')
const RuntimeBaseCommand = require('../../../../src/RuntimeBaseCommand.js')
const ow = require('openwhisk')()
const owAction = 'actions.delete'
const owPackage = 'packages.delete'
const owRules = 'rules.delete'
const owTrigger = 'triggers.delete'
const owApi = 'routes.delete'

test('exports', async () => {
  expect(typeof TheCommand).toEqual('function')
  expect(TheCommand.prototype instanceof RuntimeBaseCommand).toBeTruthy()
})

test('description', async () => {
  expect(TheCommand.description).toBeDefined()
})

test('aliases', async () => {
  expect(TheCommand.aliases).toEqual([])
})

test('flags', async () => {
  expect(TheCommand.flags.manifest.required).toBe(false)
  expect(TheCommand.flags.manifest.char).toBe('m')
  expect(typeof TheCommand.flags.manifest).toBe('object')
  expect(TheCommand.flags.projectname.required).toBe(false)
  expect(typeof TheCommand.flags.projectname).toBe('object')
})

describe('instance methods', () => {
  let command
  let cwdSpy
  let packagelist = [{
    annotations: [{
      key: 'whisk-managed',
      value: {
        file: 'manifest.yaml',
        projectDeps: [],
        projectHash: '136a3e0db7b3c1abb09bcd43ad509b1f9ce2ee22',
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

  let packagelistNoAnnotation = [{
    annotations: [],
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

  beforeAll(() => {
    cwdSpy = jest.spyOn(process, 'cwd').mockImplementation(() => {
      return ('/deploy')
    })
  })

  afterAll(() => {
    cwdSpy.mockRestore()
  })

  beforeEach(() => {
    command = new TheCommand([])
    const json = {
      'deploy/manifest_triggersRules.yaml': fixtureFile('deploy/manifest_triggersRules.yaml'),
      'deploy/manifest.yaml': fixtureFile('deploy/manifest.yaml'),
      'deploy/manifest_report.yaml': fixtureFile('deploy/manifest_report.yaml'),
      'deploy/api_manifest.yaml': fixtureFile('deploy/api_manifest.yaml'),
      'deploy/manifest.yml': fixtureFile('deploy/manifest.yml'),
      'deploy/hello.js': fixtureFile('deploy/hello.js'),
      'deploy/hello_plus.js': fixtureFile('deploy/hello_plus.js')
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
      ow.mockResolved(owApi, '')
      expect(command.run).toBeInstanceOf(Function)
    })

    test('undeploy a package without specifying manifest file', () => {
      let cmd = ow.mockResolved(owPackage, '')
      command.argv = [ ]
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({ name: 'demo_package' })
          expect(stdout.output).toMatch('')
        })
    })

    test('manifest.yaml missing', () => {
      const toRemove = [ '/deploy/manifest.yaml' ]
      fakeFileSystem.removeKeys(toRemove)
      let cmd = ow.mockResolved(owPackage, '')
      command.argv = [ ]
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({ name: 'demo_package' })
          expect(stdout.output).toMatch('')
        })
    })

    test('manifest.yml missing', () => {
      const toRemove = [ '/deploy/manifest.yml' ]
      fakeFileSystem.removeKeys(toRemove)
      let cmd = ow.mockResolved(owPackage, '')
      command.argv = [ ]
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({ name: 'demo_package' })
          expect(stdout.output).toMatch('')
        })
    })

    test('undeploy a package with manifest file', () => {
      let cmd = ow.mockResolved(owPackage, '')
      command.argv = [ '-m', '/deploy/manifest_triggersRules.yaml' ]
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({ name: 'testSeq' })
          expect(stdout.output).toMatch('')
        })
    })

    test('package should be created if project is the root', () => {
      let cmd = ow.mockResolved(owPackage, '')
      command.argv = ['-m', '/deploy/manifest_report.yaml']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          expect(stdout.output).toMatch('')
        })
    })

    test('undeploy a trigger with manifest file', () => {
      let cmd = ow.mockResolved(owTrigger, '')
      command.argv = [ '-m', '/deploy/manifest_triggersRules.yaml' ]
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          expect(stdout.output).toMatch('')
        })
    })

    test('undeploy a rule with manifest file', () => {
      let cmd = ow.mockResolved(owRules, '')
      command.argv = [ '-m', '/deploy/manifest_triggersRules.yaml' ]
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          expect(stdout.output).toMatch('')
        })
    })

    test('undeploy an action with manifest file', () => {
      let cmd = ow.mockResolved(owAction, '')
      command.argv = [ '-m', '/deploy/manifest_triggersRules.yaml' ]
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          expect(stdout.output).toMatch('')
        })
    })

    test('undeploy entities of a certain project name', () => {
      ow.mockResolved('packages.list', packagelist)
      ow.mockResolved('actions.list', '')
      ow.mockResolved('triggers.list', '')
      ow.mockResolved('rules.list', '')
      let cmd = ow.mockResolved(owPackage, '')
      command.argv = [ '--projectname', 'proj' ]
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
        })
    })

    test('do not undeploy entities of a certain project name if no annotations', () => {
      ow.mockResolved('packages.list', packagelistNoAnnotation)
      ow.mockResolved('actions.list', '')
      ow.mockResolved('triggers.list', '')
      ow.mockResolved('rules.list', '')
      let cmd = ow.mockResolved(owPackage, '')
      command.argv = [ '--projectname', 'proj' ]
      return command.run()
        .then(() => {
          expect(cmd).not.toHaveBeenCalled()
        })
    })

    test('do not undeploy entities of a certain project name if projectName does not match', () => {
      ow.mockResolved('packages.list', packagelistNoProjectName)
      ow.mockResolved('actions.list', '')
      ow.mockResolved('triggers.list', '')
      ow.mockResolved('rules.list', '')
      let cmd = ow.mockResolved(owPackage, '')
      command.argv = [ '--projectname', 'proj' ]
      return command.run()
        .then(() => {
          expect(cmd).not.toHaveBeenCalled()
        })
    })

    test('undeploy an api with manifest file', () => {
      let cmd = ow.mockResolved(owApi, '')
      command.argv = [ '-m', '/deploy/api_manifest.yaml' ]
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          expect(stdout.output).toMatch('')
        })
    })

    test('both manifest files not found', (done) => {
      const toRemove = [ '/deploy/manifest.yaml', '/deploy/manifest.yml' ]
      fakeFileSystem.removeKeys(toRemove)

      ow.mockRejected(owAction, new Error('an error'))
      command.argv = [ ]
      return command.run()
        .then(() => done.fail('does not throw error'))
        .catch((err) => {
          expect(err).toMatchObject(new Error('Failed to undeploy: Manifest file not found'))
          done()
        })
    })
  })
})
