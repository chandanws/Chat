const format = require('./format')
const fs = require('fs')
let multer = require('multer')

let storage = multer.diskStorage({
  destination(req, file, cb) {
    let date = format.formatTime(new Date()).split(' ')[0];
    let path = './public/upload'
    let pathDate = './public/upload/' + date
    let stat = fs.existsSync(path)
    if(!stat) {
      fs.mkdirSync(path)
    }
    let statDate = fs.existsSync(pathDate)
    if(!statDate) {
      fs.mkdirSync(pathDate)
    }
    cb(null, pathDate)
  },

  filename(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
  }
})

let uploadFile = multer({
  storage: storage
})

const upload = {
  uploadFile
}

module.exports = upload
