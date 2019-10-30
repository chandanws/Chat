const initModel = require("../model/index") // 初始化数据库表

let db = {
    initUser() {
        initModel.initUser()
    },
    initGroup() {
      initModel.initGroup()
    },
    initGroupUser() {
      initModel.initGroupUser()
    },
    initEmoji() { // 初始化表情包
        initModel.initEmoji('./public/expression')
    },
    initAccount() {
        initModel.initAccount()
    },
    init() {
        this.initUser()
        this.initEmoji()
        this.initAccount()
        this.initGroup()
        this.initGroupUser()
    }
}

module.exports = db
