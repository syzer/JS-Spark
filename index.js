/**
 * Created by syzer on 7/24/2014.
 * Its just a Proof of Concept
 */
'use strict';

var jsSpark,
    _;

var ROOT = './private/src/server/';
// DI container
var services = require(ROOT + 'config/di').services;

// setup Dependencies
var di = require(ROOT + 'controller/di')(services);
// start listening on given port
di.get('server').listen(di.get('port'));

// lodash
_ = di.get('_');

jsSpark = di.get('service.jsSpark');

var task, task2, task3, doElections;

task = jsSpark(_.range(10))
    // https://lodash.com/docs#sortBy
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
    .run();

// client side heavy CPU computation
task2 = jsSpark([20])
    .map(function addOne(num) {
        return num + 1;
    })
    .run();

task3 = task
    .then(function serverSideComputingOfData(data) {
        var basesNumber = data.split(',').map(Number)[0] + 21;
        // All your 101 base are belong to us
        console.log('All your ' + basesNumber + ' base are belong to us');
        return basesNumber;
    })
    .catch(function (reason) {
        console.log('Task could not compute ' + reason.toString());
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
            .run()
            .then(function (data) {
                console.log('Total sum of 1 to 1000 odd numbers is:', data);
            });
    }, 5000
);

di.get('promise')
    .all([task, task2, task3])
    .then(function (data) {
        console.log('Tasks 1 to 3 done', data);
        di.get('service.dispatcher').stop();
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
        console.log('Most clients could not agree, ', + reason.toString());
    });
