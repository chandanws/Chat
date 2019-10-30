let users = require('./user')
let init = require('./init')
let group = require('./group')
let friend = require('./friend')

module.exports = {
  ...users,
  ...init,
  ...group,
  ...friend
}
