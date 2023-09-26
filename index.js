const awsServerlessExpress = require('aws-serverless-express')
const { app } = require('./lib/infrastructure/webserver/server')

const server = awsServerlessExpress.createServer(app)

module.exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context)
