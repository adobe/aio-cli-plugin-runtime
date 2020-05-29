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
const TheCommand = require('../../../../src/commands/runtime/deploy/report.js')
const RuntimeBaseCommand = require('../../../../src/RuntimeBaseCommand.js')

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
  expect(TheCommand.flags.deployment.char).toBe('d')
  expect(typeof TheCommand.flags.deployment).toBe('object')
})

describe('instance methods', () => {
  let command, handleError
  let cwdSpy

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
      'deploy/manifest_dep_Triggers_feeds.yaml': fixtureFile('deploy/manifest_dep_Triggers_feeds.yaml'),
      'deploy/manifest.yaml': fixtureFile('deploy/manifest.yaml'),
      'deploy/manifest_report.yaml': fixtureFile('deploy/manifest_report.yaml'),
      'deploy/deployment_wrongpackage.yaml': fixtureFile('deploy/deployment_wrongpackage.yaml'),
      'deploy/deployment_correctpackage.yaml': fixtureFile('deploy/deployment_correctpackage.yaml'),
      'deploy/deployment_actionMissingInputs.yaml': fixtureFile('deploy/deployment_actionMissingInputs.yaml'),
      'deploy/manifest_actionMissingInputs.yaml': fixtureFile('deploy/manifest_actionMissingInputs.yaml'),
      'deploy/deployment_triggersMissingInputs.yaml': fixtureFile('deploy/deployment_triggersMissingInputs.yaml'),
      'deploy/manifest.yml': fixtureFile('deploy/manifest.yml'),
      'deploy/deployment_syncMissingAction.yaml': fixtureFile('deploy/deployment_syncMissingAction.yaml'),
      'deploy/hello.js': fixtureFile('deploy/hello.js'),
      'deploy/hello_plus.js': fixtureFile('deploy/hello_plus.js'),
      'deploy/deployment-triggerError.yaml': fixtureFile('deploy/deployment-triggerError.yaml')
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
    })

    test('print entities listed in a manifest.yaml file', () => {
      command.argv = ['-m', '/deploy/manifest_report.yaml']
      return command.run()
        .then(() => {
          expect(stdout.output).toMatchFixture('deploy/reportPackage.txt')
        })
    })

    test('print entities listed in a manifest file and a wrong deployment file', () => {
      command.argv = ['-m', '/deploy/manifest_report.yaml', '--deployment', '/deploy/deployment_wrongpackage.yaml']
      return command.run()
        .then(() => {
          expect(stdout.output).toMatchFixture('deploy/reportPackage_defaultDeployment.txt')
        })
    })

    test('print entities listed in a manifest file with wrong action inputs in deployment file', () => {
      command.argv = ['-m', '/deploy/manifest_report.yaml', '-d', '/deploy/deployment_actionMissingInputs.yaml']
      return command.run()
        .then(() => {
          expect(stdout.output).toMatchFixture('deploy/reportPackage_defaultDeployment.txt')
        })
    })

    test('print packages in default manifest file', () => {
      command.argv = []
      return command.run()
        .then(() => {
          expect(stdout.output).toMatchFixture('deploy/report_twoPackages.txt')
        })
    })

    test('print action wihtout inputs manifest file', () => {
      command.argv = ['-m', '/deploy/manifest_actionMissingInputs.yaml']
      return command.run()
        .then(() => {
          expect(stdout.output).toMatchFixture('deploy/report_triggersMissingInputs.txt')
        })
    })

    test('print triggers from manifest file when deployment file has trigger with no inputs', () => {
      command.argv = ['-m', '/deploy/manifest_actionMissingInputs.yaml', '--deployment', '/deploy/deployment_triggersMissingInputs.yaml']
      return command.run()
        .then(() => {
          expect(stdout.output).toMatchFixture('deploy/report_triggersMissingInputs.txt')
        })
    })

    test('print triggers from manifest file when deployment file has trigger with feed', () => {
      command.argv = ['-m', '/deploy/manifest_dep_Triggers_feeds.yaml']
      return command.run()
        .then(() => {
          expect(stdout.output).toMatchFixture('deploy/report_triggersWithFeed.txt')
        })
    })

    test('project name different in manifest and deployment file', () => {
      return new Promise((resolve, reject) => {
        command.argv = ['-m', '/deploy/deployment_syncMissingAction.yaml', '-d', '/deploy/deployment-triggerError.yaml']
        return command.run()
          .then(() => reject(new Error('does not throw error')))
          .catch(() => {
            expect(handleError).toHaveBeenLastCalledWith('Failed to report', new Error('The project name in the deployment file does not match the project name in the manifest file'))
            resolve()
          })
      })
    })

    test('both manifest files not found', () => {
      return new Promise((resolve, reject) => {
        const toRemove = ['/deploy/manifest.yaml', '/deploy/manifest.yml']
        fakeFileSystem.removeKeys(toRemove)

        command.argv = []
        return command.run()
          .then(() => reject(new Error('does not throw error')))
          .catch(() => {
            expect(handleError).toHaveBeenLastCalledWith('Failed to report', new Error('Manifest file not found'))
            resolve()
          })
      })
    })
  })
})
