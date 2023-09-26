import express from 'express'

import { signIn } from '../../../interfaces/controllers/Users.controller'

import { SignInMiddleware } from '../../../interfaces/middleware'

const UsersRouter = express.Router()

UsersRouter.post('/signin', SignInMiddleware, signIn)

export default UsersRouter
