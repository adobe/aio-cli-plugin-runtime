
/**
 * @param params
 */
function main (params) {
  const msg = 'Hello, ' + params.name + ' , ' + params.place + '.'
  const employees = 'You have ' + params.employees + ' employees '
  const address = 'and are located at ' + params.address + '.'
  return { greeting: msg + employees + address }
}

module.exports.main = main
