let controller = require('../controller/index')

let express = require('express')
let router = express.Router()

router.post('/login', controller.login)
router.post('/signUp', controller.signUp)

router.get('/get/user/info', controller.getUserInfo)
router.post('/modify/user/info', controller.modifyUserInfo)

router.get('/get/conversation/list', controller.getConversationList)

module.exports = router
