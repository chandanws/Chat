const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
// const server = require('http').Server(app)

const upload = require('./routes/upload')
const user = require('./routes/user')
const group = require('./routes/group')
const friend = require('./routes/friend')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/user', user)
app.use('/upload', upload)
app.use('/group', group)
app.use('/friend', friend)

app.listen(3000, () => {
  console.log('app listening on port 3000.')
})

module.exports = app;
