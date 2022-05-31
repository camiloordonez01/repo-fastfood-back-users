const express = require('express')

const UsersRouter = express.Router()

const {
    SignUpMiddleware,
    VerifyMiddleware,
} = require('../../../interfaces/middleware')

const {
    signUp,
    verify,
} = require('../../../interfaces/controllers/UsersController')

UsersRouter.post('/signup', SignUpMiddleware, signUp)

UsersRouter.post('/verify', VerifyMiddleware, verify)

module.exports = { UsersRouter }
