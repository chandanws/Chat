const initModel = require("../model/init") // 初始化数据库表
let db = {
    initUser() {
        initModel.initUser()
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
    }
}

module.exports = db