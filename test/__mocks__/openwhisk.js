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
    let cmd = methodName.split('.')
    let method = this
    while (cmd.length > 1) {
      let word = cmd.shift()
      method = method[word] = method[word] || {}
    }
    method = method[cmd.shift()] = jest.fn()
    return method
  },
  mockResolvedFixture: function (methodName, returnValue) {
    return this.mockResolved(methodName, returnValue, true)
  },
  mockRejectedFixture: function (methodName, returnValue) {
    return this.mockRejected(methodName, returnValue, true)
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
