/**
 * Created by syzer on 7/24/2014.
 * Its just a Proof of Concept
 */
var io,
    ioServer,
    clients = [],           // TODO in redis
    jsSpark,
    manager,
    serializer,
    _;


var ROOT = './private/src/server/';
// DI container
var services = require(ROOT + 'config/di').services;

// setup Dependencies
var di = require(ROOT + 'controller/di')(services);

// lodash
_ = di.get('_');

io = di.get('io');
ioServer = di.get('io.server');
console.log('Io server listening on 8000');

serializer = di.get('service.serializer');
jsSpark = di.get('service.jsSpark');
manager = di.get('service.manager');
manager.init();

var task, serializedTask;

task = jsSpark(_.range(10))
    .map(function multiplyBy2(el) {
        return el * 2;
    })
    .filter(function remove5and10(el) {
        return el % 5 !== 0;
    })
    // sum of  [ 2, 4, 6, 8, 12, 14, 16, 18 ] => 80
    .reduce(function sumUp(arr, el) {
        return arr + el;
    })
//    .sortBy(function(num){
//        return num;
//    })
    .createTask();
//console.log(task);

serializedTask = serializer.stringify(task);
// spam clients with meaning-full task, like good PM
setInterval(function () {
    var randomClient;

    if (clients.length > 0) {
        randomClient = Math.floor(Math.random() * clients.length);
        clients[randomClient].emit('task', serializedTask);
    }
}, 5000);
