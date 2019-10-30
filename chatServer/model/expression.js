const initModel = require('./init')
const Expression = initModel.expression

const getExpression = (params, callback) => {
  Expression.find().then(r => {
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
