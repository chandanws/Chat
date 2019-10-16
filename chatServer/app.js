const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()

const user = require('./routes/user')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, '../dist')))
app.use('/', user)

app.listen(3000, () => {
  console.log('app listening on port 3000.')
})

module.exports = app;
