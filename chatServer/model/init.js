/**
 * 初始化数据用户和表情包
 */

const db = require('../utils/database.js')
const fs = require('fs')
const path = require('path')

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
    type: String
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
    type: String,
    default: '3'
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
  conversationsList: Array
})

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
  random: Number // (随机数索引，用于随机查找一条)
})

const initUser = (callback) => {
  let user = new users({
    account: 'LC',
    password: '123456',
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
      // for (let k in obj) {
      //     let expre = new expression({
      //         name: k,
      //         list: obj[k]
      //     });
      //     expre.save();
      // }
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
  users
}