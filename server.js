/**
 * Created by syzer on 7/24/2014.
 * Its just a Proof of Concept
 */
var jsSpark,
    _;


var ROOT = './private/src/server/';
// DI container
var services = require(ROOT + 'config/di').services;

// setup Dependencies
var di = require(ROOT + 'controller/di')(services);

// lodash
_ = di.get('_');

jsSpark = di.get('service.jsSpark');

var task, task2;

task = jsSpark(_.range(10))
    .add('sortBy', function _sortBy(el) {
        return Math.sin(el);
    })
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
    .createTask();

task
    .then(function (data) {
        var basesNumber = data.split(',').map(Number)[0] + 21;
        // All your 101 base are belong to us
        console.log('All your ' + basesNumber + ' base are belong to us');
    })
    .catch(function (reason) {
        console.log('Task could not compute ' + reason.toString());
    });
