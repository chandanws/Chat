let user = require('./user')
let init = require('./init')

module.exports = {
  ...user,
  ...init
}
