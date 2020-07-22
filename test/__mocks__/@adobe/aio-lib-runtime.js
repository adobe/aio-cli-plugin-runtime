
module.exports = {
  utils: {
    createKeyValueObjectFromArray: jest.fn(),
    createKeyValueArrayFromObject: jest.fn(),
    createKeyValueArrayFromFile: jest.fn(),
    createKeyValueArrayFromFlag: jest.fn(),
    createKeyValueObjectFromFlag: jest.fn(),
    createKeyValueObjectFromFile: jest.fn(),
    parsePathPattern: jest.fn(),
    parsePackageName: jest.fn(),
    createComponentsfromSequence: jest.fn(),
    processInputs: jest.fn(),
    returnUnion: jest.fn(),
    deployPackage: jest.fn(),
    undeployPackage: jest.fn(),
    processPackage: jest.fn(),
    setPaths: jest.fn(),
    getProjectEntities: jest.fn(),
    syncProject: jest.fn(),
    findProjectHashonServer: jest.fn(),
    getProjectHash: jest.fn(),
    addManagedProjectAnnotations: jest.fn(),
    printLogs: jest.fn()
  },
  init: () => {
    return require('openwhisk')()
  }
}
