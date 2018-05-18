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
const MongoClient = require('mongodb').MongoClient;


function getDataWithFilter(filter) {
    return new Promise((resolve, reject) => {
        const uri = 'mongodb+srv://yinonmail:YinonMaor123!@yinonmaor-pgqgs.mongodb.net/test?retryWrites=true';
        MongoClient.connect(uri, async (err, client) => {
            if (err) {
                throw err;
            }
            const collection = await client.db('players').collection('details');
            collection.find({}).toArray((err, docs) => {
                if (err) {
                    throw err;
                }
                let newArray = _.filter(docs, player => {
                    let flag = false;
                    _.each(filter, (value, key) => {
                        if (_.isNumber(value)) {
                            value = _.toNumber(value);
                            flag = _.isEqual(_.toNumber(player[key]), value);
                        } else {
                            flag = _.isEqual(player[key], value);
                        }
                    });
                    return flag;
                });
                _.each(newArray, (value, key) => {
                    newArray[key] = _.omit(newArray[key], ['_id', 'Unnamed: 0']);
                });
                client.close();
                resolve(newArray);
            });
        });
    });
}

let PORT    = 3300;
let address = '127.0.0.1';

if (_.includes(process.argv, '--help')) {
    console.log('Usage: node Server [options]\n');
    console.log('Options:');
    console.log('  --port        Define server\'s port argument (3300 by default)');
    process.exit(0);
}

process.argv.forEach((val, index, array) => {
    if (val === '--port' && array[index + 1]) {
        PORT = parseInt(array[index + 1]);
    }
});

const server = http.createServer((req, res) => {
    console.log(`${req.method} request for ${req.url}`);
    console.log(`From: ${req.connection.remoteAddress}`);
    let fileName = req.url;
    if (fileName === '/' || fileName === '/index.html') {
        fileName = 'index.html';
    }
    const promise = getDataWithFilter({Age: 26});
    if (_.includes(fileName, 'data.json')) {
        promise.then(result => {
            fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(result), 'utf-8');
            fs.readFile(path.join(__dirname, fileName), (err, data) => {
                if (err) {
                    res.writeHead(400, {'Content-type':'application/json'});
                    res.end('A trouble occurred with the file.');
                } else {
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify(data));
                }
            });
        });
    } else {
        fs.readFile(path.join(__dirname, fileName), (err, data) => {
            if (err) {
                res.writeHead(400, {'Content-type':'text/html'});
                res.end('A trouble occurred with the file.');
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            }
        });
    }
});

require('dns').lookup(require('os').hostname(), (err, add) => {
    if (err) {
        throw err;
    }
    address = add;
    server.listen(PORT, address);
    process.stdout.write(`Server is listening on ip ${address}, port ${PORT}.\n`);
});