/**
 * Created by syzer on 7/24/2014.
 * Its just a Proof of Concept
 */
var io = require('socket.io'),
    ioServer = io.listen(8000),
    clients = [],           // TODO in redis
    _ = require('lodash');

var ROOT = './private/src/server/';

// DI container
var services = require(ROOT + 'config/di').services;

// setup Dependencies
var di = require(ROOT + 'controller/di')(services);

var serializer = di.get('service.serializer');

console.log('Server listening on 8000');

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
