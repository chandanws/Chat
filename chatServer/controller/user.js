/**
 * 处理api请求的逻辑
 */
const userModel = require('../model/index')

const login = (req, res) => {
  const params = req.body
  userModel.login(params, (r) => {
    if (r.code === 0) {
      // req.session.login = r.data.account
      res.json({
        code: 0,
        data: r,
        msg: '登录成功！'
      })
    } else {
      res.json({
        code: -1,
        data: '账号不存在或密码错误！'
      })
    }
  })
}

const signUp = (req, res) => {
  const params = req.body
  userModel.signUp(params, (r) => {
    if (r.code === 0) {
      // req.session.login = r.data.account
      res.json({
        code: 0,
        data: r,
        msg: '注册成功！'
      })
    } else if (r.code === 1) {
      res.json({
        code: 1,
        data: '用户已存在！'
      })
    } else {
      res.json({
        code: -1,
        data: '注册失败！'
      })
    }
  })
}

const getUserInfo = (req, res) => { // 使用用户的code值查找用户信息
  const params = req.query
  userModel.getUserInfo((params), (r) => {
    if (r.code === 0) {
      res.json({
        code: 0,
        data: r.data
      })
    } else {
      res.json({
        code: -1,
        msg: '查找用户信息失败'
      })
    }
  })

}

const modifyUserInfo = (req, res) => {
  const params = req.body
  userModel.modifyUserInfo((params), (r) => {
    if (r.code === 0) {
      res.json({
        code: 0,
        data: r.data
      })
    } else {
      res.json({
        code: -1,
        msg: '修改信息失败'
      })
    }
  })
}

const getConversationList = (req, res) => {
  const params = req.query
  userModel.getConversationList((params), (r) => {
    if (r.code === 0) {
      res.json({
        code: 0,
        data: r,
        msg: '获取会话列表成功'
      })
    } else {
      res.json({
        code: -1,
        data: '获取会话列表失败'
      })
    }
  })
}


module.exports = {
  login,
  signUp,
  getUserInfo,
  modifyUserInfo,
  getConversationList
}