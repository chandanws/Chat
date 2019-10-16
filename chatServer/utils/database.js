/**
 * 连接数据库
 */

 const mongoose = require('mongoose')
 mongoose.connect('mongodb://127.0.0.1:27017/chat')
 var db = mongoose.connection
  db.on('error', console.error.bind(console, '链接错误：'))
  db.once('open', (callback) => {
    console.log('MongoDB 连接成功！')
  })
 mongoose.Promise = global.Promise

 module.exports = mongoose
