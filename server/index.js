const express = require('express')

module.exports = server

function server (port = 0) {
  return new Promise((resolve, reject) => {
    const app = express()

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

    const listener = app.listen(port, err => {
      if (err) return reject(err)
      resolve({
        port: listener.address().port,
        stop: () => listener.close()
      })
    })
  })

}

server(3000)
  .then(({ port, stop }) => {
    console.log('Server listening on port ' + port)
  })
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })