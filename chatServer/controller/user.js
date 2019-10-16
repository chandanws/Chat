/**
 * 处理api请求的逻辑
 */
const userModel = require('../model/index')

const getUser = (req, res) => {
  userModel.getUser((r) => {
    res.json({
      code: 0,
      data: r
    })
  })
}

const login = (req, res) => {
  let params = req.body;
  console.log('-----------开始登录-------')
  // userModel.login(params, (r) => {
  //   if(r.code === 0) {
  //     // req.session.login = r.data.account
  //     res.json({
  //       code: 0,
  //       data: r,
  //       msg: '登录成功！'
  //     })
  //   } else {
  //     console.log('账号密码不存在')
  //     res.json({
  //       code: -1,
  //       data: '账号不存在或密码错误！'
  //     })
  //   }
  // })
  res.send({
    code: 0,
    data: params,
    msg: '登录成功！'
  })
  console.log('登录完成')
}

module.exports = {
  getUser,
  login
}