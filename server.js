#!/usr/bin/env node

// Module dependencies
const express = require('express');
const bodyParser = require('body-parser');
const app = require('./server/app');

/* const app = require('./server/app'); */
const debug = require('debug')('passport-local-express4:server');
const http = require('http');

// Get port from environment and store in Express
const port = normalizePort(process.env.PORT || '5000');
app.set('port', port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create HTTP Server
const server = http.createServer(app);

// Listen on provided port, on all network interfaces
server.listen(port);
server.on('listening', onListening);

// Normalize a port into a number, string, or false
function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) return val;
    if (port >= 0) return port;

    return false;
}

// Event listener for HTTP server "listening" event
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
