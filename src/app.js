const express = require('express')
const cors = require('cors')
const session = require('cookie-session')
const routes = require('./routes')
const path = require('path')

const app = express()

app.use(cors())
app.use(express.static(path.join(__dirname, '/views')))
app.use(
  session({
    name: 'session',
    keys: [
      'bd7126f457237e4aab0d47124ce4aac2',
      '9009def68579d15d871a5bf346422839',
    ],
    cookie: {
      httpOnly: false,
      expires: new Date(Date.now() + 60 * 60 * 1000 * 2), // 2 horas
    },
  }),
)
app.use(express.json())
app.use(routes)

module.exports = app
