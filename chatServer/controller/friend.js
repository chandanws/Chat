const friendModel = require('../model/index')


const getFriendList = (req, res) => {
  const params = req.query
  friendModel.getFriendList(params, (r) => {
    if (r.code === 0) {
      res.json({
        code: 0,
        data: r,
        msg: '获取好友列表成功'
      })
    } else {
      res.json({
        code: -1,
        data: '获取好友列表失败'
      })
    }
  })
}

const getFriendInfo = (req, res) => {
  const params = req.query
  friendModel.getFriendInfo((params), (r) => {
    if (r.code === 0) {
      res.json({
        code: 0,
        data: r,
        msg: '获取用户信息成功！'
      })
    } else {
      res.json({
        code: -1,
        data: '获取失败！'
      })
    }
  })
}

const addFriend = (req, res) => {
  const params = req.body
  friendModel.addFriend((params), r => {
    if (r.code === 0) {
      res.json({
        code: 0,
      })
    } else if (r.code === -3) {
      res.json({
        code: 1,
        data: '该用户已经是您的好友'
      })
    } else {
      res.json({
        code: -1,
        data: '添加出错'
      })
    }
  })
}

const isFriend = (req, res) => {
  const params = req.query
  friendModel.isFriend((params), r => {
    if (r.code === 0) {
      res.json({
        code: 0,
        data: r,
      })
    } else {
      res.json({
        code: -1,
        data: '查看是否是好友失败'
      })
    }
  })
}

module.exports = {
  getFriendList,
  getFriendInfo,
  addFriend,
  isFriend
}