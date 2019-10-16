/**
 * 定义用户将会操作的变量
 * 操作底层数据库
 */
const initModel = require('./init')
const crypto = require('crypto')
// const fs = require('fs')

const md5 = password => {
  let md5 = crypto.createHash('md5')
  return md5.update(password).digest('hex')
}

const getUser = () => {
  initModel.users.find().then(r => {
    console.log(r)
  })
}

const login = (params, callback) => {
  console.log('开始查找数据库')
  initModel.users.find({
    $or: [{
      "account": params.account
    }, {
      "code": params.account
    }]

  }).then(r => {
    if (r.length) {
      console.log('r的长度')
      console.log(r)
      let password = md5(params.password)
      if (r[0]['password'] === password) {
        initModel.users.update({
          account: params.account
        }, {
          lastLoginTime: Date.now()
        }).then(r => {
          console.log(r)
        })
        callback({
          code: 0,
          data: {
            account: r[0].account,
            avatar: r[0].avatar
          }
        })
      } else {
        callback({
          code: -1
        })
      }
    } else {
      callback({
        code: -1
      })
    }
  }).catch(err => {
    console.log('查找失败')
  })
}

module.exports = {
  getUser,
  login
}