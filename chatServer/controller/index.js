let user = require('./user')
let init = require('./init')
let group = require('./group')
let friend = require('./friend')

module.exports = {
  ...user,
  ...init,
  ...group,
  ...friend
}
