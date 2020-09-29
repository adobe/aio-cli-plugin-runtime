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
const RuntimeLib = require('@adobe/aio-lib-runtime')
const utils = RuntimeLib.utils

const pkgNameVersion = 'aio-cli-plugin-runtime@' + require('../../../../package.json').version

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

const fakePackages = {
  pkg1: {
    version: '1.0',
    license: 'Apache-2.0',
    actions: {
      one: {
        function: 'actions/one.js',
        inputs: {}
      },
      two: {
        function: 'actions/two.js',
        inputs: {
          itwoname: {
            type: 'string',
            description: 'name of a person',
            default: 'unknown'
          },
          itwoplace: {
            type: 'string',
            description: 'location of person',
            default: 'unknown'
          }
        },
        outputs: {
          member: {
            type: 'json',
            description: 'member record'
          }
        }
      }
    },
    triggers: {
      firsttrigger: {
        feed: 'fakefeed',
        inputs: {
          name: 'dude'
        }
      },
      secondtrigger: {
        feed: 'fakefeed'
      }
    }
  },
  pkg2: {
    public: true,
    sequences: {
      seqone: {
        actions: 'pkg1/one,pkg1/two'
      }
    },
    actions: {
      three: {
        inputs: {
          ione: {}
        }
      },
      four: {
        function: 'four.js'
      }
    },
    triggers: {
      triggerone: {
        inputs: {
          name: 'Sam',
          place: 'string'
        }
      }
    }
  },
  pkg3: {
    public: false
  }
}

const fakeDepPackages = {
  pkg1: {
    actions: {
      notinthere: {
        inputs: {
          bad: 123
        }
      },
      one: { }
    }
  },
  pkg2: {
    actions: {
      stillnotinthere: {
        inputs: {
          bad: 155
        }
      },
      three: {
        inputs: {
          ione: 'yo',
          good2: 5
        }
      }
    }
  }
}

const fakeDepTriggers = {
  triggerone: {
    inputs: {}
  },
  firsttrigger: {
    place: 'bowling',
    name2: 'love'
  },
  notinthere: {
    fake: 'should not be there'
  }
}

const expectedOutput = `{
  "name": "fakeProjectName",
  "Inputs": {}
}
{
  "name": "pkg1",
  "Inputs": {}
}
{
  "name": "pkg2",
  "Inputs": {},
  "public": true
}
{
  "name": "pkg3",
  "Inputs": {}
}
{
  "name": "one",
  "Inputs": {
    "fakeinpts": "inputs"
  }
}
{
  "name": "two",
  "Inputs": {
    "fakeinpts": "inputs"
  }
}
{
  "name": "three",
  "Inputs": {
    "fakeinpts": "inputs"
  }
}
{
  "name": "four",
  "Inputs": {
    "fakeinpts": "inputs"
  }
}
{
  "name": "seqone",
  "Inputs": {}
}
{
  "name": "firsttrigger",
  "feed": "fakefeed",
  "Inputs": {
    "fakeinpts": "inputs"
  }
}
{
  "name": "secondtrigger",
  "feed": "fakefeed",
  "Inputs": {
    "fakeinpts": "inputs"
  }
}
{
  "name": "triggerone",
  "Inputs": {
    "fakeinpts": "inputs"
  }
}
`

describe('instance methods', () => {
  let command, handleError

  const expectedProcessedInputs = { fakeinpts: 'inputs' }
  const expectedUnionInputs = [{ allinpts: 'inputs' }]
  beforeEach(() => {
    command = new TheCommand([])
    handleError = jest.spyOn(command, 'handleError')
    RuntimeLib.mockReset()
    utils.processInputs.mockReturnValue(expectedProcessedInputs)
    utils.returnUnion.mockReturnValue(expectedUnionInputs)
  })

  describe('run', () => {
    test('exists', async () => {
      expect(command.run).toBeInstanceOf(Function)
    })

    test('print entities from manifest packages', async () => {
      command.argv = ['-m', 'fake-manifest.yaml']

      utils.setPaths.mockReturnValue({
        packages: fakePackages,
        deploymentTriggers: {},
        deploymentPackages: {},
        manifestPath: 'someFakePath',
        manifestContent: { fake: 'not useful' },
        projectName: 'fakeProjectName'
      })

      await command.run()
      expect(utils.setPaths).toHaveBeenCalledWith({ manifest: 'fake-manifest.yaml', useragent: pkgNameVersion })
      expect(utils.returnUnion).toHaveBeenCalledTimes(7)
      expect(utils.returnUnion).toHaveBeenCalledWith(fakePackages.pkg1.actions.two.inputs, {})
      expect(utils.returnUnion).toHaveBeenCalledWith(fakePackages.pkg2.triggers.triggerone.inputs, {})
      expect(utils.returnUnion).toHaveBeenCalledWith(fakePackages.pkg2.actions.three.inputs, {})
      expect(utils.returnUnion).toHaveBeenCalledWith(fakePackages.pkg1.triggers.firsttrigger.inputs, {})
      expect(utils.returnUnion).toHaveBeenCalledWith({}, {})
      expect(utils.processInputs).toHaveBeenCalledTimes(7)
      expect(utils.processInputs).toHaveBeenCalledWith(expectedUnionInputs, {})

      expect(stdout.output).toEqual(expectedOutput)
    })

    test('print entities from manifest packages and deployment packages and triggers', async () => {
      command.argv = ['-m', 'fake-manifest.yaml', '-d', 'fake-dep.yml']

      utils.setPaths.mockReturnValue({
        packages: fakePackages,
        deploymentTriggers: fakeDepTriggers,
        deploymentPackages: fakeDepPackages,
        manifestPath: 'someFakePath',
        manifestContent: { fake: 'not useful' },
        projectName: 'fakeProjectName'
      })
      await command.run()
      expect(utils.setPaths).toHaveBeenCalledWith({ manifest: 'fake-manifest.yaml', deployment: 'fake-dep.yml', useragent: pkgNameVersion })
      expect(utils.returnUnion).toHaveBeenCalledTimes(7)
      expect(utils.returnUnion).toHaveBeenCalledWith(fakePackages.pkg1.actions.two.inputs, {})
      expect(utils.returnUnion).toHaveBeenCalledWith(fakePackages.pkg2.triggers.triggerone.inputs, fakeDepTriggers.triggerone)
      expect(utils.returnUnion).toHaveBeenCalledWith(fakePackages.pkg2.actions.three.inputs, fakeDepPackages.pkg2.actions.three.inputs)
      expect(utils.returnUnion).toHaveBeenCalledWith(fakePackages.pkg1.triggers.firsttrigger.inputs, fakeDepTriggers.firsttrigger)
      expect(utils.returnUnion).toHaveBeenCalledWith({}, {})
      expect(utils.processInputs).toHaveBeenCalledTimes(7)
      expect(utils.processInputs).toHaveBeenCalledWith(expectedUnionInputs, {})

      // output doesn't change because of processInputs mock
      expect(stdout.output).toEqual(expectedOutput)
    })

    test('error in setPaths', async () => {
      utils.setPaths.mockImplementation(() => { throw new Error('the ERROR') })
      command.argv = []
      await expect(command.run()).rejects.toThrow('the ERROR')
      expect(handleError).toHaveBeenCalled()
    })
  })
})
