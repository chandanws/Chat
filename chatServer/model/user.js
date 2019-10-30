/**
 * 定义用户将会操作的变量
 * 操作底层数据库
 */
const initModel = require('./init')
const Users = initModel.users
const crypto = require('crypto')

const md5 = password => {
  let md5 = crypto.createHash('md5')
  return md5.update(password).digest('hex')
}

const login = (params, callback) => {
  Users.find({
    $or: [{
      "account": params.account
    }, {
      "code": params.account
    }]

  }).then(res => {
    if (res.length) {
      let password = md5(params.password)
      if (res[0]['password'] === password) {
        Users.findOne({
          account: res[0].account
        }).updateOne({
          lastLoginTime: new Date()
        }).then(r => {
          callback({
            code: 0,
            data: {
              account: res[0].account,
              code: res[0].code,
              id: res[0]._id
            }
          })
        }).catch(err => {
          console.log(err + '更新出错')
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

const signUp = (params, callback) => {
  Users.find({
    account: params.account
  }).then(res => {
    if (res.length) {
      callback({
        code: 1
      })
    } else {
      GenCode().then(res => {
        let code = res
        let user = new Users({
          account: params.account,
          password: md5(params.password),
          code: code
        })
        user.save().then(res => {
          if (res['_id']) {
            callback({
              code: 0,
              data: res
            })
          } else {
            callback({
              code: -1
            })
          }
        })
      })
    }
  })
}

// 生成code
function GenCode() {
  const Character = initModel.accountBase
  const filter = {
    type: '1',
    status: '0'
  }
  const updateStatus = {
    status: '1'
  }
  let code = -1

  return new Promise((resolve, reject) => {
    Character.findOneAndUpdate(filter, updateStatus, {
      new: true
    }).then(res => {
      code = res.code
      resolve(code)
    }).catch(err => {
      reject(err + 'code生成失败')
    })
  })
}

const getUserInfo = (params, callback) => {
  Users.findById(params.id).then(res => {
    if (res) {
      callback({
        code: 0,
        data: res
      })
    } else {
      callback({
        code: -1
      })
    }
  })
}

const modifyUserInfo = (params, callback) => {
  const filter = {
    _id: params.id
  }

  const updateStatus = {
    account: params.account,
    avatar: params.avatar,
    signature: params.signature,
    nickName: params.nickName,
    email: params.email,
    sex: params.sex
  }

  Users.findOneAndUpdate(filter, updateStatus, {
    new: true
  }).then(res => {
    if (res.length) {
      callback({
        code: 0,
        data: res
      })
    } else {
      callback({
        code: -1
      })
    }
  })
}

const getConversationList = (params, callback) => {
  Users.findById(params.id).then(res => {

  })
}

module.exports = {
  login,
  signUp,
  getUserInfo,
  modifyUserInfo,
  getConversationList
}