
function main (params) {
  let msg = 'Hello ' + params.name + ', ' + params.message + '.'
  return { msg }
}

module.exports.main = main
