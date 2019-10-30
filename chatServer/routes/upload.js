let express = require('express')
let router = express.Router()

const upload = require('../utils/upload')
const format = require('../utils/format')

router.post('/uploadAvatar', upload.uploadFile.single('file'), (req, res) => {
  let date = format.formatTime(new Date()).split(' ')[0]
  res.json({
    code: 0,
    data: '/upload/' + date + '/' + req.file.filename
  })
})

module.exports = router
