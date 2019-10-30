let controller = require('../controller/index')

let express = require('express')
let router = express.Router()

router.get('/get/friend/list', controller.getFriendList)
router.get('/get/friend/info', controller.getFriendInfo)
router.get('/isFriend', controller.isFriend)

router.post('/add/friend', controller.addFriend)

module.exports = router