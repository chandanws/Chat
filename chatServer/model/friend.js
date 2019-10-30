const db = require('../utils/database')
const initModel = require('./init')
const Users = initModel.users

const friendSchema = new db.Schema({
  userX: {
    type: db.Schema.ObjectId,
    ref: 'users'
  },
  userY: {
    type: db.Schema.ObjectId,
    ref: 'users'
  },
  createDate: {
    type: Date,
    default: Date.now()
  },
})

friendSchema.statics = {
  findFriendByUserX: function(userId, callback) {
    return this.find({
      userX: userId
    }).populate({
      path: 'userY',
      select: 'signature avatar nickName account code'
    }).exec(callback)
  },
  findFriendByUserY: function(userId, callback) {
    return this.find({
      userY: userId
    }).populate({
      path: 'userX',
      select: 'signature avatar nickName account code'
    }).exec(callback)
  }
}

let friend = db.model("friends", friendSchema)

const getFriendList = (params, callback) => {
  friend.findFriendByUserX(params.userId).then(userX => {
    console.log('--------getfriendlist----')
    console.log(userX)
    friend.findFriendByUserY(params.userId).then(userY => {
      console.log(userY)
      let data = []
      userX.forEach(v => {
        data.push({
          createDate: v.createDate,
          nickName: v.userY.nickName,
          account: v.userY.account,
          avatar: v.userY.avatar,
          code: v.userY.code,
          signature: v.userY.signature,
          id: v.userY._id,
          roomid: params.userId + '-' + v.userY._id
        })
      })

      userY.forEach(v => {
        data.push({
          createDate: v.createDate,
          nickName: v.userX.nickName,
          avatar: v.userX.avatar,
          code: v.userX.code,
          signature: v.userX.signature,
          account: v.userX.account,
          id: v.userX._id,
          roomid: v.userX._id + '-' + params.userId
        })
      })

      console.log(data)
      callback({
        code: 0,
        data: data
      })
    })
  })
}

const getFriendInfo = (params, callback) => {
  Users.find({
    $or: [{
      "account": params.friendAccount
    }, {
      "code": params.friendAccount
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
    console.log('通过account查找用户信息异常')
    console.log(res)
  })
}

const addFriend = (params, callback) => {
  let pr = {
    userX: params.userX,
    userY: params.userY
  }

  friend.find(pr).then(x => {
    console.log('--------addfriend----')
    console.log(x)
    friend.find({
      userX: params.userY,
      userY: params.userX
    }).then(y => {
      console.log(y)
      if (!(x.length + y.length)) {
        friend.create(pr).then(r => {
          console.log(r)
          if (r['_id']) {
            callback({
              code: 0
            })
          } else {
            callback({
              code: -1
            })
          }
        })
      } else {
        callback({
          code: -3
        })
      }
    })
  })
}

const isFriend = (params, callback) => {
  let pr = {
    userX: params.userY,
    userY: params.userX
  };
  friend.find(params).then(r => {
    if (r.length > 0) {
      callback({
        code: 0,
        data: true
      })
    } else {
      friend.find(pr).then(r => {
        if (r.length > 0) {
          callback({
            code: 0,
            data: true
          })
        } else {
          callback({
            code: 0,
            data: false
          })
        }
      })
    }
  }).catch(err => {
    callback({
      code: -1,
      data: err
    })
  })
}

module.exports = {
  getFriendList,
  getFriendInfo,
  addFriend,
  isFriend
}