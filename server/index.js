const express = require('express')

module.exports = function server (port) {
  if (typeof port !== 'number' || port < 1) throw Error('Invalid port number')

  let app
  let listener
  
  return {
    start () {
      app = express()

      app.get('/greet', (req, res) => {
        res.send('Hello, stranger!')
      })
    
      app.get('/greet/:name', (req, res) => {
        res.send(`Hello ${req.params.name}`)
      })
    
      app.put('/add', (req, res) => {
        const numbers = req.query.numbers && req.query.numbers.split(',')
        if (!numbers || !Array.isArray(numbers)) {
          res.status(400).send('You must include the query parameter "numbers=x,y,z" where x,y,z etc. are integers')
        } else {
          const length = numbers.length;
          let sum = 0;
          for (let i = 0; i < length; i++) {
            sum += parseInt(numbers[i])
          }
          res.send(numbers.join(' + ') + ' = ' + sum)
        }
      })

      return new Promise((resolve, reject) => {
        listener = app.listen(port, err => {
          if (err) return reject(err)
          console.log('Server started on port ' + port)
          resolve()
        })
      })
    },
    stop () {
      listener.close()
    }
  }
}