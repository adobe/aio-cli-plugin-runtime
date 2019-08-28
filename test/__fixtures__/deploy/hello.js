
function main (params) {
  const msg = 'Hello ' + params.name + ', ' + params.message + '.'
  return { msg }
}

module.exports.main = main
