const mockRtLibInstance = {
  actions: {},
  activations: {},
  namespaces: {},
  packages: {
    update: jest.fn(),
    list: jest.fn(() => '')
  },
  rules: {
    list: jest.fn(() => '')
  },
  triggers: {
    list: jest.fn(() => '')
  },
  logForwarding: {
    get: jest.fn(),
    setAdobeIoRuntime: jest.fn(),
    setAzureLogAnalytics: jest.fn(),
    setSplunkHec: jest.fn()
  },
  feeds: {},
  routes: {},
  mockFn: function (methodName) {
    const cmd = methodName.split('.')
    let method = this
    while (cmd.length > 1) {
      const word = cmd.shift()
      method = method[word] = method[word] || {}
    }
    method = method[cmd.shift()] = jest.fn()
    return method
  },
  mockResolvedFixtureMulitValue: function (methodName, returnValues) {
    return this.mockResolvedMulitValue(methodName, returnValues, true)
  },
  mockResolvedFixture: function (methodName, returnValue) {
    return this.mockResolved(methodName, returnValue, true)
  },
  mockRejectedFixture: function (methodName, returnValue) {
    return this.mockRejected(methodName, returnValue, true)
  },
  mockResolvedMulitValue: function (methodName, returnValues, isFile) {
    let vals = (isFile) ? fixtureFile(returnValues) : returnValues
    try {
      vals = JSON.parse(vals)
    } catch (e) { }
    const mockFn = this.mockFn(methodName)
    for (const i in vals) {
      mockFn.mockResolvedValueOnce(vals[i], isFile)
    }
    mockFn.mockResolvedValue(vals[vals.length - 1], isFile)
    return mockFn
  },
  mockResolved: function (methodName, returnValue, isFile) {
    let val = (isFile) ? fixtureFile(returnValue) : returnValue
    try {
      val = JSON.parse(val)
    } catch (e) { }
    return this.mockFn(methodName).mockResolvedValue(val, isFile)
  },
  mockRejected: function (methodName, err) {
    return this.mockFn(methodName).mockRejectedValue(err)
  }
}

const mockRtUtils = {
  createKeyValueObjectFromArray: jest.fn(),
  createKeyValueArrayFromObject: jest.fn(),
  createKeyValueArrayFromFile: jest.fn(),
  createKeyValueArrayFromFlag: jest.fn(),
  createKeyValueObjectFromFlag: jest.fn(),
  createKeyValueObjectFromFile: jest.fn(),
  getKeyValueArrayFromMergedParameters: jest.fn(),
  getKeyValueObjectFromMergedParameters: jest.fn(),
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
}

const init = jest.fn().mockReturnValue(mockRtLibInstance)
const printActionLogs = jest.fn()
module.exports = {
  utils: mockRtUtils,
  init,
  printActionLogs,
  mockReset: () => {
    Object.values(mockRtUtils).forEach(v => v.mockReset())
    init.mockClear()
    // mock reset for instance too ?
  }
}
