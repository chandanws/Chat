const groupModel = require('../model/index')

/**
 * 创建群
 * @param {Object} req 请求变量，获取其body中的groupAccount, userAccount
 * @param {String} res 响应变量，code指示响应状态，data返回响应数据
 */
const createGroup = (req, res) => {
  const params = req.body
  groupModel.createGroup((params), (r) => {
    if (r.code === 0) {
      res.json({
        code: 0,
        data: r,
        msg: '账户创建成功！'
      })
    } else if (r.code === 1) {
      res.json({
        code: 1,
        data: '账号已存在',
      })
    } else {
      res.json({
        code: -1,
        data: '注册失败'
      })
    }
  })
}

/**
 * 获取群列表
 * @param {Object} req 获取其query中的userId
 * @param {*} res 
 */
const getGroupList = (req, res) => {
  const params = req.query
  groupModel.getGroupList((params), (r) => {
    if (r.code === 0) {
      res.json({
        code: 0,
        data: r
      })
    } else {
      res.json({
        code: -1,
        data: '查询群列表失败'
      })
    }
  })
}

/**
 * 获取群主信息
 * @param {Object} req 获取其中的groupId
 * @param {*} res 
 */
const getGroupOwner = (req, res) => {
  const params = req.query
  groupModel.getGroupOwner((params), (r) => {
    if (r.code === 0) {
      res.json({
        code: 0,
        data: r
      })
    } else {
      res.json({
        code: -1,
        data: '查询群主失败'
      })
    }
  })
}

/**
 * 获取群信息
 * @param {Object} req 获取其中的groupId
 * @param {*} res 
 */
const getGroupInfo = (req, res) => {
  const params = req.query
  groupModel.getGroupInfo((params), (r) => {
    if (r.code === 0) {
      res.json({
        code: 0,
        data: r
      })
    } else {
      res.json({
        code: -1,
        data: '查询群信息失败'
      })
    }
  })
}

/**
 * 添加群成员
 * @param {Object} req 获取其中的userId, groupId
 * @param {*} res 
 */
const addGroupMember = (req, res) => {
  const params = req.body
  groupModel.addGroupMember((params), r => {
    if (r.code === 0) {
      res.json({
        code: 0,
      })
    } else if (r.code === -3) {
      res.json({
        code: 1,
        data: '用户已存在'
      })
    } else {
      res.json({
        code: -1,
        data: '添加出错'
      })
    }
  })
}

module.exports = {
  createGroup,
  getGroupList,
  getGroupOwner,
  getGroupInfo,
  addGroupMember
}