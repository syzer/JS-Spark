/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

// Populate DB with sample data
if (config.seedDB) {
    require('./config/seedDb');
}

// setup Dependencies
var ROOT = './';
var di = require(ROOT + 'controller/di')(
    require(ROOT + 'config/di').services
);

// Setup server
var app = di.get('app');
var server = di.get('server');
var socketio = di.get('io.server');
require('./config/express')(app);
require('./routes')(app, di);

// Start server
server.listen(config.port, config.ip, function () {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;

var _ = di.get('_');
var jsSpark = di.get('service.jsSpark');

setInterval(
    function delayedTask() {
        console.log('Sending task to calculate');
        jsSpark(_.range(1000))
            .filter(function isOdd(num) {
                return num % 2;
            })
            .reduce(function sumUp(sum, num) {
                return sum + num;
            })
            .run()
            .then(function (data) {
                console.log('Total sum of 1 to 1000 odd numbers is:', data);
            });
    }, 5000
);


