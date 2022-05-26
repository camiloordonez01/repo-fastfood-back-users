const express = require('express')
const RouterMain = express.Router()

const { UsersRouter } = require('./users.routes')

RouterMain.use('/users', UsersRouter)

module.exports = { RouterMain }
