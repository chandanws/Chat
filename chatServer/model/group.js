const initModel = require('./init')
const Groups = initModel.groups
const GroupUser = initModel.groupUser

const createGroup = (params, callback) => {
  Groups.find({
    account: params.groupAccount
  }).then(res => {
    console.log('---------creategroup--------')
    console.log(res)
    if (res.length) {
      callback({
        code: 1
      })
    } else {
      GenCode().then(res => {
        let code = res
        let group = new Groups({
          account: params.groupAccount,
          code: code,
          holderAccount: params.holderAccount,
          avatar: params.avatar,
          signature: params.signature
        })
        group.save().then(r => {
          console.log('-------存进去的group-----')
          console.log(r)
          if (r['_id']) {
            initModel.users.find({
              account: params.holderAccount
            }).then(rs => {
              console.log('---------用户信息--------')
              console.log(rs)
              if (rs.length) {
                GroupUser.create({
                  userAccount: params.holderAccount,
                  userId: rs[0]._id,
                  holder: 1,
                  groupId: r['_id']
                }).then(res => {
                  console.log('-------群主信息------')
                  console.log(res)
                  if (res['_id']) {
                    callback({
                      code: 0,
                      data: r
                    })
                  } else {
                    Groups.remove({
                      '_id': r['_id']
                    }, 1)
                    callback({
                      code: -1
                    })
                  }
                })
              } else {
                Groups.remove({
                  '_id': r['_id']
                }, 1)
                callback({
                  code: -1
                })
              }
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

const getGroupList = (params, callback) => {
  GroupUser.findGroupByUserAccount(params.userAccount, (err, groupList) => {
    if (err) {
      console.log(err)
      callback({
        code: -1,
        data: err
      })
    } else {
      callback({
        code: 0,
        data: groupList
      })
    }

  })
}

const getGroupOwner = (params, callback) => {
  GroupUser.findGroupUsersByGroupId(params.groupId, (err, owner) => {
    if (err) {
      console.log(err)
      callback({
        code: -1,
        data: err
      })
    } else {
      callback({
        code: 0,
        data: owner
      })
    }
  })
}

const getGroupInfo = (params, callback) => {
  Groups.find({
    $or: [{
      "account": params.groupAccount
    }, {
      "code": params.groupAccount
    }]
  }).then(r => {
    if (r.length) {
      callback({
        code: 0,
        data: r[0],
      })
    } else {
      callback({
        code: -1
      })
    }
  }).catch(res => {
    console.log('通过account查找群信息异常')
    console.log(res)
  })
}

const addGroupMember = (params, callback) => {
  const data = {
    groupId: params.groupId,
    userId: params.userId,
    userAccount: params.userAccount,
  }
  GroupUser.find({
    groupId: params.groupId,
    userId: params.userId,
  }).then(res => {
    if (res.length) {
      callback({
        code: -3
      })
    } else {
      GroupUser.create(data).then(r => {
        if (r['_id']) {
          Groups.update({
            '_id': params.groupId
          }, {
            $inc: {
              'userNum': 1
            }
          }).then(raw => {
            if (raw.nModified > 0) {
              callback({
                code: 0
              })
            } else {
              GroupUser.deleteOne({
                '_id': r['_id']
              })
              callback({
                code: -2
              })
            }
          })
        }
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