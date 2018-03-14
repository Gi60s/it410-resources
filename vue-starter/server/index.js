'use strict';
const config        = require('../config');
const express       = require('express');

// create the express app
const app = express();

// serve index.html and static files
app.use(express.static(config.build.dest));

// start listening for requests
const listener = app.listen(config.server.port, function(err) {
    if (err) throw err;

    const port = listener.address().port;
    console.log('Server listening on port: ' + port);

    // in development mode the server is started as a child process and
    // this next line will tell the parent process that the server is ready
    if (process.send) process.send({ type: 'server-listening', port: port });
});