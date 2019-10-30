let controller = require('../controller/index')

let express = require('express')
let router = express.Router()

router.get('/get/group/list', controller.getGroupList)
router.get('/get/group/info', controller.getGroupInfo)
router.get('/get/group/owner', controller.getGroupOwner)

router.post('/create/group', controller.createGroup)
router.post('/add/group/member', controller.addGroupMember)

module.exports = router
