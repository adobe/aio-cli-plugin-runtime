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
const RuntimeLib = require('@adobe/aio-lib-runtime')
const rtUtils = RuntimeLib.utils
const rtAction = 'actions.delete'
const owPackage = 'packages.delete'
const owRules = 'rules.delete'
const owTrigger = 'triggers.delete'
const owApi = 'routes.delete'
const owFeed = 'feeds.delete'

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

test('flags', async () => {
  expect(TheCommand.flags.manifest.char).toBe('m')
  expect(typeof TheCommand.flags.manifest).toBe('object')
  expect(typeof TheCommand.flags.projectname).toBe('object')
})

describe('instance methods', () => {
  let command, handleError
  let cwdSpy
  const packagelist = [{
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

  const packagelistNoAnnotation = [{
    annotations: [],
    binding: false,
    name: 'testSeq',
    namespace: 'ns',
    publish: false,
    updated: 1555533204836,
    version: '0.0.2'
  }]

  const packagelistNoProjectName = [{
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
    handleError = jest.spyOn(command, 'handleError')
    const json = {
      'deploy/manifest_triggersRules.yaml': fixtureFile('deploy/manifest_triggersRules.yaml'),
      'deploy/manifest.yaml': fixtureFile('deploy/manifest.yaml'),
      'deploy/manifest_dependencies.yaml': fixtureFile('deploy/manifest_dependencies.yaml'),
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
      rtLib.mockResolved(owPackage, '')
      rtLib.mockResolved(rtAction, '')
      rtLib.mockResolved(owRules, '')
      rtLib.mockResolved(owTrigger, '')
      rtLib.mockResolved(owApi, '')
      expect(command.run).toBeInstanceOf(Function)
    })

    test('undeploy a package without specifying manifest file', () => {
      const cmd = rtLib.mockResolved(owPackage, '')
      command.argv = []
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({ name: 'demo_package' })
          expect(stdout.output).toMatch('')
        })
    })

    test('manifest.yaml missing', () => {
      const toRemove = ['/deploy/manifest.yaml']
      fakeFileSystem.removeKeys(toRemove)
      const cmd = rtLib.mockResolved(owPackage, '')
      command.argv = []
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({ name: 'demo_package' })
          expect(stdout.output).toMatch('')
        })
    })

    test('manifest.yml missing', () => {
      const toRemove = ['/deploy/manifest.yml']
      fakeFileSystem.removeKeys(toRemove)
      const cmd = rtLib.mockResolved(owPackage, '')
      command.argv = []
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({ name: 'demo_package' })
          expect(stdout.output).toMatch('')
        })
    })

    test('undeploy a package with manifest file', () => {
      const cmd = rtLib.mockResolved(owPackage, '')
      rtLib.mockResolved('triggers.get', {})
      command.argv = ['-m', '/deploy/manifest_triggersRules.yaml']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({ name: 'testSeq' })
          expect(stdout.output).toMatch('')
        })
    })

    test('undeploy a package dependency with manifest file', () => {
      const cmd = rtLib.mockResolved(owPackage, '')
      command.argv = ['-m', '/deploy/manifest_dependencies.yaml']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith({ name: 'mypackage' })
          expect(stdout.output).toMatch('')
        })
    })

    test('package should be created if project is the root', () => {
      const cmd = rtLib.mockResolved(owPackage, '')
      rtLib.mockResolved('triggers.get', {})
      command.argv = ['-m', '/deploy/manifest_report.yaml']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          expect(stdout.output).toMatch('')
        })
    })

    test('undeploy a trigger with manifest file', () => {
      const cmd = rtLib.mockResolved(owTrigger, '')
      rtLib.mockResolved('triggers.get', {})
      command.argv = ['-m', '/deploy/manifest_triggersRules.yaml']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          expect(stdout.output).toMatch('')
        })
    })

    test('undeploy a trigger with manifest file - including feed', () => {
      const cmd = rtLib.mockResolved(owTrigger, '')
      const cmdfeed = rtLib.mockResolved(owFeed, '')
      rtLib.mockResolved('triggers.get', {
        annotations: [
          {
            key: 'feed',
            value: '/whisk.system/alarms/alarm'
          }
        ],
        name: 'trigger1'
      })
      command.argv = ['-m', '/deploy/manifest_triggersRules.yaml']
      return command.run()
        .then(() => {
          expect(cmdfeed).toHaveBeenCalled()
          expect(cmd).toHaveBeenCalled()
          expect(stdout.output).toMatch('')
        })
    })

    test('undeploy a trigger with manifest file - including feed - codecov', () => {
      const cmd = rtLib.mockResolved(owTrigger, '')
      const cmdfeed = rtLib.mockResolved(owFeed, '')
      rtLib.mockResolved('triggers.get', {
        annotations: [
          {
            key: 'key1',
            value: 'value1'
          }
        ],
        name: 'trigger1'
      })
      rtLib.mockResolved('feeds.delete', '')
      command.argv = ['-m', '/deploy/manifest_triggersRules.yaml']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          expect(cmdfeed).not.toHaveBeenCalled()
          expect(stdout.output).toMatch('')
        })
    })

    test('undeploy a rule with manifest file', () => {
      const cmd = rtLib.mockResolved(owRules, '')
      rtLib.mockResolved('triggers.get', {})
      command.argv = ['-m', '/deploy/manifest_triggersRules.yaml']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          expect(stdout.output).toMatch('')
        })
    })

    test('undeploy an action with manifest file', () => {
      const cmd = rtLib.mockResolved(rtAction, '')
      rtLib.mockResolved('triggers.get', {})
      command.argv = ['-m', '/deploy/manifest_triggersRules.yaml']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
          expect(stdout.output).toMatch('')
        })
    })

    test('undeploy entities of a certain project name', () => {
      rtLib.mockResolved('packages.list', packagelist)
      rtLib.mockResolved('actions.list', '')
      rtLib.mockResolved('triggers.list', '')
      rtLib.mockResolved('rules.list', '')
      const cmd = rtLib.mockResolved(owPackage, '')
      command.argv = ['--projectname', 'proj']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalled()
        })
    })

    test('do not undeploy entities of a certain project name if no annotations', () => {
      rtLib.mockResolved('packages.list', packagelistNoAnnotation)
      rtLib.mockResolved('actions.list', '')
      rtLib.mockResolved('triggers.list', '')
      rtLib.mockResolved('rules.list', '')
      const cmd = rtLib.mockResolved(owPackage, '')
      command.argv = ['--projectname', 'proj']
      return command.run()
        .then(() => {
          expect(cmd).not.toHaveBeenCalled()
        })
    })

    test('do not undeploy entities of a certain project name if projectName does not match', () => {
      rtLib.mockResolved('packages.list', packagelistNoProjectName)
      rtLib.mockResolved('actions.list', '')
      rtLib.mockResolved('triggers.list', '')
      rtLib.mockResolved('rules.list', '')
      const cmd = rtLib.mockResolved(owPackage, '')
      command.argv = ['--projectname', 'proj']
      return command.run()
        .then(() => {
          expect(cmd).not.toHaveBeenCalled()
        })
    })

    test('undeploy an api with manifest file', () => {
      const cmd = rtLib.mockResolved(owApi, '')
      command.argv = ['-m', '/deploy/api_manifest.yaml']
      return command.run()
        .then(() => {
          expect(cmd).toHaveBeenCalledWith(expect.objectContaining({ basepath: '/hello', relpath: '/world' }))
          expect(cmd).toHaveBeenCalledTimes(2)
          expect(stdout.output).toMatch('')
        })
    })

    test('both manifest files not found', () => {
      return new Promise((resolve, reject) => {
        const toRemove = ['/deploy/manifest.yaml', '/deploy/manifest.yml']
        fakeFileSystem.removeKeys(toRemove)

         rtLib.mockRejected(rtAction, new Error('an error'))
        command.argv = []
        return command.run()
          .then(() => reject(new Error('does not throw error')))
          .catch(() => {
            expect(handleError).toHaveBeenLastCalledWith('Failed to undeploy', new Error('Manifest file not found'))
            resolve()
          })
      })
    })
  })
})
