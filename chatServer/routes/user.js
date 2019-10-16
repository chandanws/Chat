let controller = require('../controller/index')

let express = require('express')
let router = express.Router()

router.get('/getUser', controller.getUser)
router.post('/login', controller.login)

module.exports = router
