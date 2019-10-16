const db = require('../utils/database')

let expression = db.model("expression", {
  name: String,
  info: String,
  list: Array
})

const getExpression = (params, callback) => {
  expression.find().then(r => {
    callback({
      code: 0,
      data: r
    })
  }).catch(err => {
    console.log(err);
    callback({
      code: -1
    })
  })
}

module.exports = {
  getExpression
}
