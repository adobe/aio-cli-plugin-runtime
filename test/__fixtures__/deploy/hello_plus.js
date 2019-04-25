
function main (params) {
  let msg = 'Hello, ' + params.name + ' , ' + params.place + '.'
  let employees = 'You have ' + params.employees + ' employees '
  let address = 'and are located at ' + params.address + '.'
  return { greeting: msg + employees + address }
}

module.exports.main = main
