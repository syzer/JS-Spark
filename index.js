/**
 * Created by syzer on 7/24/2014.
 */
'use strict';

var jsSpark,
    taskManager,
    _;

var ROOT = './private/src/server/';
// DI container
var services = require(ROOT + 'config/di').services;

// setup Dependencies
var di = require(ROOT + 'controller/di')(services);

// start listening on given port
//di.get('server').listen(di.get('port'));

jsSpark = di.get('service.jsSpark');

// lodash
_ = di.get('_');

taskManager = di.get('service.taskManager');

module.exports = function (config) {
    config = config || {};

    if (config.workers) {
        di.get('service.fork').forkWorker({times: config.workers});
    }

    return {
        di: di,
        jsSpark: jsSpark,
        taskManager: taskManager,
        q: di.get('promise')
    }
};

// TODO move to examples
/**
module.exports({workers: 2});

var task, task2, task3, doElections;

task = jsSpark(_.range(10))
    // https://lodash.com/docs#sortBy
    .thru(function (arr) {
        return this.sortBy(arr, function _sortBy(el) {
                return Math.sin(el);
        })
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
    .run();

// client side heavy CPU computation
task2 = jsSpark([20])
    .map(function addOne(num) {
        return num + 1;
    })
    .run();

task3 = task
    .then(function serverSideComputingOfData(data) {
        var basesNumber = data + 21;
        // All your 101 base are belong to us
        console.log('All your ' + basesNumber + ' base are belong to us');
        return basesNumber;
    })
    .catch(function (reason) {
        console.log('Task could not compute ' + reason.toString());
    });

di.get('promise')
    .all([task, task2, task3])
    .then(function (data) {
        console.log('Tasks 1 to 3 done', data);
    });

doElections = jsSpark(_.range(10))
    .reduce(function sumUp(sum, num) {
        return sum + num;
    })
    // how many times repeat calculations
    .run({times: 3})
    .then(function whenClientsFinished(data) {
        // may also get 2 most relevant answers
        console.log('Most clients believe that:');
        console.log('Total sum of numbers from 1 to 10 is:', data);
    })
    .catch(function whenClientsArgue(reason) {
        console.log('Most clients could not agree, ', +reason.toString());
    });

setTimeout(
    function delayedTask() {
        jsSpark(_.range(1000))
            .filter(function isOdd(num) {
                return num % 2;
            })
            .reduce(function sumUp(sum, num) {
                return sum + num;
            })
            .thru(function plusOne(sum) {
                return sum + 1;
            })
            .run()
            .then(function (data) {
                console.log('Total sum of 1 to 1000 odd numbers +1 is:', data);
            })
            .catch(function (reason) {
                console.log('Task could not compute ' + reason.toString());
            });
    }, 5000
);
*/
