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
    require('./config/seed');
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
require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app, di);

// Start server
server.listen(config.port, config.ip, function () {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
