import express from 'express'
import UsersRouter from './users.routes'

const RouterMain = express.Router()

RouterMain.use('/users', UsersRouter)

export default RouterMain
