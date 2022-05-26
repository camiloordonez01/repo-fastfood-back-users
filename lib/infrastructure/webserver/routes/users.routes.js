const express = require('express')

const UsersRouter = express.Router()

const { SignUpMiddleware } = require('../../../interfaces/middleware')

const { signUp } = require('../../../interfaces/controllers/UsersController')

UsersRouter.post('/signup', SignUpMiddleware, signUp)

module.exports = { UsersRouter }
