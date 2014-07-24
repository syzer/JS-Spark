/**
 * Created by syzer on 5/15/2014.
 */
'use strict';
var ROOT_PATH = __dirname + '/../';
var PROD_SETTINGS = 'production';

var services = {
    _: require('lodash'),
    app: function addService(di) {
        var express = di.get('express');
        var app = express();
        app.use(di.get('bodyParser'));
        app.use(di.get('methodOverride'));

        var allowCrossDomain = function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');  //http://example.com ////config.allowedDomains
            res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'x-xsrf-token, X-Requested-With, X-HTTP-Method-Override, Authorization, Origin, Content-Type, Accept');
            res.header('Access-Control-Allow-Credentials', 'true'); //for basic auth

            next();
        };
        app.use(allowCrossDomain);

        return app;
    },
    bodyParser: require('body-parser')(),
    cookieParser: require('cookie-parser')(),
    compression: require('compression')(),
    connect: require('connect'),
    config: function addService(di) {
        var config = require(ROOT_PATH + 'config/config')();
        // use adapter
        if (process.env.NODE_ENV === PROD_SETTINGS) {
            console.log('Running in production\n');
            return require(ROOT_PATH + 'config/prodConfig')(config);
        }
        return config;
    },
    port: (process.env.PORT || 8081),
    exec: require('child_process').exec,
    express: require('express'),
    events: require('events'),
    http: require('http'),
    io: require('socket.io'),
    log: function addService(di) {
        return require(ROOT_PATH + 'services/logging').createLog();
    },
    // Lets you use HTTP verbs such as PUT or DELETE in places you normally can't.
    methodOverride: require('method-override')(),
    session: function addService(di) {
        return require('express-session')(
            { secret: "shhhhhhhhh!"}
        );
    },
    util: require('util'),
    when: require('when')
};
module.exports.services = services;
