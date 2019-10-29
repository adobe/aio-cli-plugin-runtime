const mockOpenWhisk = {
  actions: {},
  activations: {},
  namespaces: {},
  packages: {},
  rules: {},
  triggers: {},
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

module.exports = jest.fn(() => mockOpenWhisk)
