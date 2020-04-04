const express = require('express')
const Enforcer = require('openapi-enforcer')
const EnforcerMiddleware = require('openapi-enforcer-middleware')
const path = require('path')

module.exports = function (port = 0) {
  const enforcer = new EnforcerMiddleware(path.resolve(__dirname, 'openapi.yml'), {
    componentOptions: {
      production: process.env.ENVIRONMENT === 'production'
    }
  })

  // handle requests explicitly wanting mock data
  enforcer.mocks(null, false).catch(console.error)

  // handle requests for real data where implemented on the server
  enforcer.controllers(path.resolve(__dirname, 'controllers'))
    .catch(console.error)

  // fallback to automatically mock responses for other requests
  enforcer.mocks(null, true).catch(console.error)

  // set up the express server
  const app = express()
  app.use(enforcer.middleware())

  function start(callback) {
    const promise = new Promise((resolve, reject) => {
      const listener = app.listen(port, err => {
        if (err) return reject(err)
        resolve({
          port: listener.address().port,
          stop: () => listener.close()
        })
      })
    })
    if (typeof callback !== 'function') return promise
    promise.then(o => callback(null, o), err => callback(err, null))
  }

  return {
    app,
    enforcer,
    start
  }
}
