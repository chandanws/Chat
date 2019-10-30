/**
 * 初始化数据用户和表情包
 */
const db = require('../utils/database.js')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const md5 = password => {
  let md5 = crypto.createHash('md5')
  return md5.update(password).digest('hex')
}

const users = db.model("users", {
  account: {
    type: String,
    unique: true
  },
  password: String,
  code: {
    type: String,
    unique: true
  },
  avatar: {
    type: String,
    default: '/img/avatar.png'
  },
  signature: {
    type: String,
    default: '这个人很懒，没有签名哦~'
  },
  nickName: {
    type: String,
    default: 'LC-' + Date.now()
  },
  email: {
    type: String,
    default: ''
  },
  sex: {
    type: Number,
    default: 3
  }, // 0 男 1 女 3 保密
  projectTheme: {
    type: String,
    default: 'LC'
  },
  signUpTime: {
    type: Date,
    default: Date.now()
  },
  lastLoginTime: {
    type: Date,
    default: Date.now()
  },
  conversationsList: Array // 哪个列表？？会话列表
})

const groups = db.model("groups", {
  account: {
    type: String,
    unique: true
  },
  holderAccount: {
    type: String,
  },
  avatar: {
    type: String,
    default: '/img/avatar.png'
  },
  signature: {
    type: String,
    default: '介绍一下你们的小天地吧~'
  },
  code: String,
  desc: { // 1 降序
    type: Number,
    default: 1
  },
  userNum: {
    type: Number,
    default: 1
  },
  createDate: {
    type: Date,
    default: Date.now()
  }
})

const groupUserSchema = new db.Schema({
  groupId: {
    type: db.Schema.ObjectId,
    ref: 'groups'
  },
  userId: { // 用户的id
    type: db.Schema.ObjectId,
    ref: 'users'
  },
  userAccount: { // 用户的账号
    type: String
  },
  manager: {
    type: Number,
    default: 0
  },
  holder: {
    type: Number,
    default: 0
  },
  card: String
})


const initGroup = (callback) => {
  const group = new groups({
    account: 'LC-Group',
    signature: 'LC官方群',
    code: 999999,
    holderAccount: 'LC'
  })

  group.save().then((res) => {
    console.log('初始化成功')
    console.log(res)
    callback(res)
  })
}

groupUserSchema.statics = {
  findGroupByUserAccount(userAccount, callback) {
    return this.find({
      userAccount: userAccount
    }).populate('groupId').exec(callback)
  },
  findGroupUsersByGroupId(groupId, callback) {
    return this.find({
      groupId: groupId
    }).populate({
      path: 'userId',
      select: 'signature avatar account createDate code'
    }).exec(callback)
  }
}

const groupUser = db.model("groupUser", groupUserSchema)

const initGroupUser = (callback) =>{
  let groupuser = groupUser({
    groupId: '5db7d3cb763f02137c67748b',
    userId: '5db7d3ca763f02137c6768c6',
    userAccount: 'LC'
  })

  groupuser.save().then((res) => {
    console.log('初始化成功')
    console.log(res)
    callback(res)
  })
}

const expression = db.model("expression", {
  name: String,
  info: String,
  list: Array,
  code: Number
})

const accountBase = db.model("accountBase", {
  code: String,
  status: String, // 1 已使用 0 未使用
  special: String,
  type: String, // 1 用户 2 群聊
  random: Number // 随机数索引，用于随机查找一条
})

const initUser = (callback) => {
  let password = md5('123456')
  let user = new users({
    account: 'LC',
    password: password,
    avatar: '',
    signature: '@LC官方',
    nickName: 'LC官方',
    code: 666666
  })

  user.save().then((res) => {
    console.log('初始化成功')
    console.log(res)
    callback(res)
  })
}

const initEmoji = (filePath, objs) => {
  console.log('：objs' + objs)
  let files = fs.readdirSync(filePath)

  files.forEach((filename, i) => {
    let filedir = path.join(filePath, filename)

    let states = fs.statSync(filedir)
    let isFile = states.isFile()
    let isDir = states.isDirectory()

    if (isFile) {
      if (filePath.slice(filePath.lastIndexOf('\\') + 1) === objs.name) {
        objs.list.push('/expression/' + objs.name + '/' + filename)
      }
      if (i === files.length - 1) {
        console.log(objs);
        let expre = new expression(objs);
        expre.save();
      }
    }

    if (isDir) {
      let obj = {
        name: filename,
        list: [],
        code: i + 1,
        info: filename
      };
      initEmoji(filedir, obj); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
    }
  })
}

const initAccount = () => {
  let index = 0
  for (let i = 10000001; i <= 10001999; i++) { // 首批用户默认账号 8位
    let account = new accountBase({ // 通过new Model1()创建的文档doc1，必须通过save()方法，才能将创建的文档保存到数据库的集合中
      code: i,
      status: '0',
      type: '1',
      random: Math.random()
    })
    account.save(function (error, newAccount) { // 回调函数是可选项，第一个参数为err，第二个参数为保存的文档对象
      if (error) {
        console.log("插入 " + account + " 错误:" + error)
      } else {
        console.log("已成功插入 " + newAccount)
      }
    })
  }
  for (let i = 100001; i <= 100999; i++) { // 首批群聊默认账号 6位
    let account = new accountBase({ // 通过new Model1()创建的文档doc1，必须通过save()方法，才能将创建的文档保存到数据库的集合中
      code: i,
      status: '0',
      type: '2',
      random: Math.random()
    })
    account.save(function (error, newAccount) { // 回调函数是可选项，第一个参数为err，第二个参数为保存的文档对象
      index = i
      if (error) {
        console.log("插入 " + account + " 错误:" + error)
      } else {
        console.log("已成功插入 " + newAccount)
      }
    })
  }
  if (index === 100999) {
    setInterval(_ => {
      process.exit() // 退出进程
    }, 1000)
  }
}

module.exports = {
  initUser,
  initEmoji,
  initAccount,
  initGroup,
  initGroupUser,
  users,
  groups,
  groupUser,
  accountBase,
  expression
}