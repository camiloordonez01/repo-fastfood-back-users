const express = require('express')

const UsersRouter = express.Router()

const {
    SignUpMiddleware,
    VerifyMiddleware,
    SignInMiddleware,
    ResendCodeMiddleware,
} = require('../../../interfaces/middleware')

const {
    signUp,
    verify,
    signIn,
    resendCode,
} = require('../../../interfaces/controllers/UsersController')

UsersRouter.post('/signup', SignUpMiddleware, signUp)

UsersRouter.post('/verify', VerifyMiddleware, verify)

UsersRouter.post('/signin', SignInMiddleware, signIn)

UsersRouter.post('/resendcode', ResendCodeMiddleware, resendCode)

module.exports = { UsersRouter }
