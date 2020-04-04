const awsServerlessExpress = require('aws-serverless-express')
const Server = require('./server')

const { app } = Server(3000)
const server = awsServerlessExpress.createServer(app)

exports.handler = (event, context) => {
  awsServerlessExpress.proxy(server, event, context)
}