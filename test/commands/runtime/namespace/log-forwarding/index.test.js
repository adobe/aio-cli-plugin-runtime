const TheCommand = require('../../../../../src/commands/runtime/namespace/log-forwarding/index')
const HHelp = require('@oclif/plugin-help').default

test('returns help for log-forwarding commands', () => {
  const spy = jest.spyOn(HHelp.prototype, 'showHelp').mockReturnValue(true)
  const command = new TheCommand([])
  return command.run().then(() => {
    expect(spy).toHaveBeenCalledWith(['runtime:namespace:log-forwarding', '--help'])
  })
})
