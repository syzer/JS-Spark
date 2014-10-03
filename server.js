/**
 * Created by syzer on 7/24/2014.
 * Its just a Proof of Concept
 */
var io,
    ioServer,
    jsSpark,
    taskManager,
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

jsSpark = di.get('service.jsSpark');
taskManager = di.get('service.taskManager');

var task, task2;

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

// All your 101 base are belong to us
task.then(function (data) {
    var basesNumber = data.split(',').map(Number)[0] + 21;
    console.log('All your ' + basesNumber + ' base are belong to us');
});
