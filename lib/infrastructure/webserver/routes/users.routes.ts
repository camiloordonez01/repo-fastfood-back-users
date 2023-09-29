import express from 'express'

import { login } from '../../../interfaces/controllers/Users.controller'

import { LoginMiddleware } from '../../../interfaces/middleware'

const UsersRouter = express.Router()

UsersRouter.post('/login', LoginMiddleware, login)

export default UsersRouter
