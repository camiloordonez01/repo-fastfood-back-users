const activeENV = process.env.NODE_ENV || 'local'

require('dotenv').config({ path: `.env.${activeENV}` })

const express = require('express')
const cors = require('cors')

const {
    handleError,
    handleResponse,
} = require('../../shared/infrastructure/handler')
const { RouterMain } = require('./routes/index.routes')

const app = express()

app.use(cors({ methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] }))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.disable('x-powered-by')

app.use(RouterMain)
// Response global
app.use((data, req, res, next) => handleResponse(data, res, next))
// Handle Errors || Always end
app.use((err, req, res, next) => handleError(err, res))
module.exports = { app }
