/**
 * Created by Yinon Cohen and Maor Shabtay on 18/12/2017.
 */
'use strict';

/**
 * Dependent modules
 */
const _         = require('lodash');
const fs        = require('fs');
const http      = require('http');
const path      = require('path');


function isValidPort(port) {
    return !_.includes(port, '.') && !isNaN(port) && port >= 1024 && port <= 65535;
}


let PORT    = 3300;
let address = '127.0.0.1';

if (_.includes(process.argv, '--help')) {
    console.log('Usage: node CDN [options]\n');
    console.log('Options:');
    console.log('  --port        Define CDN server\'s port argument (3300 by default)');
    process.exit(0);
}

process.argv.forEach((val, index, array) => {
    if (val === '--port' && array[index + 1]) {
        if (!isValidPort(array[index + 1])) {
            console.error('\x1b[31m', '--------ERROR!--------\nServer failed to load:\nInvalid given port.');
            process.exit(1);
        }
        PORT = parseInt(array[index + 1]) || PORT;
    }
});

/**
 * Creating the server and defining the specific service for various requests.
 */
const server = http.createServer((req, res) => {
    console.log(`${req.method} request for ${req.url}`);
    console.log(`From: ${req.connection.remoteAddress}`);
    let fileName = req.url;
    if (fileName === '/' || fileName === '/index.html') {
        fileName = 'index.html';
    }
    fs.readFile(path.join(__dirname, fileName), (err, data) => {
        if (err) {
            res.writeHead(400, {'Content-type':'text/html'});
            res.end('A trouble occurred with the file.');
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        }
    });
});

/**
 * Defining the server's listener
 */
require('dns').lookup(require('os').hostname(), (err, add) => {
    if (err) {
        throw err;
    }
    address = add;
    server.listen(PORT, address);
    process.stdout.write(`Server is listening on ip ${address}, port ${PORT}.\n`);
});