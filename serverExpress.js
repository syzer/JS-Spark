'use strict';
var server, app;
var ROOT = './private/src/server/';

// DI container
var services = require(ROOT + 'config/di').services;

// setup Dependencies
var di = require(ROOT + 'controller/di')(services);

// example
var buildModuleService = function () {
    var module = require(ROOT + 'service/express')(
        di.get('app'),
        di.get('port'),
        di.get('cookieParser'),
        di.get('compression'),
        di.get('http'),
        di.get('session'),
        di.get('static_')
    );
    module.setup();
    module.registerRouteHandler(
        '/',
        di.get('controller.index').defaultRoute,
        ['GET']
    );
    module.registerErrors();
    return module;
}();
// or getApp / server
server = di.add('service.express', buildModuleService);

// watches new data
// di.get('service.fileWatcher').watcher.start();







var io = di.get('io'),
    ioServer = io(di.get('service.express').getServer()),
    clients = [],           // TODO in redis
    _ = require('lodash');

var ROOT = './private/src/server/';

var serializer = di.get('service.serializer');

// register new clients
ioServer.on('connection', function (socket) {
    console.info('New client ', socket.id);
    clients.push(socket);

    // drop old clients
    socket.on('disconnect', function () {
        var index = clients.indexOf(socket);
        if (index != -1) {
            console.info('RIP client', socket.id);
            clients.splice(index, 1);
        }
    });

    socket.on('response', function (data) {
        console.log('Client response ', socket.id);
        console.log(data.split(','));
    });
});
var task, serializedTask;

task = JSPark(_.range(10))
    .map(function (el) {
        return el * 2;
    }).createTask();
console.log(task);

serializedTask = serializer.stringify(task);

// spam clients with meaning-full task, like good PM
setInterval(function () {
    var randomClient;

    if (clients.length > 0) {
        randomClient = Math.floor(Math.random() * clients.length);
        clients[randomClient].emit('task', serializedTask);
    }
}, 5000);

function JSPark(data) {

    var operation,
        array = data,
        callbacks = [];

    return {

        // operations array??
        map: function (callback) {
            callbacks.push(callback.toString());

            operation = function (_, data, callbacks) {
                return _.chain(data).map(callbacks[0]);
            };
            return this;
        },

        value: function () {
            return operation().value();
        },

        createTask: createTask
    };

    // factory method
    function createTask() {
        return {
            operation: operation,
            execute: function (_, data, callbacks) {
                return this.operation(_, data, callbacks);
            },
            callbacks: callbacks,
            data: array
        }
    }
}
