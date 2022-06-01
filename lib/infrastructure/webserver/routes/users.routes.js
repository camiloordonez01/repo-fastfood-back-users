const express = require('express')

const UsersRouter = express.Router()

const {
    SignUpMiddleware,
    VerifyMiddleware,
    SignInMiddleware,
} = require('../../../interfaces/middleware')

const {
    signUp,
    verify,
    signIn,
} = require('../../../interfaces/controllers/UsersController')

UsersRouter.post('/signup', SignUpMiddleware, signUp)

UsersRouter.post('/verify', VerifyMiddleware, verify)

UsersRouter.post('/signin', SignInMiddleware, signIn)

module.exports = { UsersRouter }
