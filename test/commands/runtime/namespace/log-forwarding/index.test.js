const TheCommand = require('../../../../../src/commands/runtime/namespace/log-forwarding/index')
const { Help } = require('@oclif/core')

test('returns help for log-forwarding commands', () => {
  const spy = jest.spyOn(Help.prototype, 'showHelp').mockReturnValue(true)
  const command = new TheCommand([])
  command.config = {}
  return command.run().then(() => {
    expect(spy).toHaveBeenCalledWith(['runtime:namespace:log-forwarding', '--help'])
  })
})
