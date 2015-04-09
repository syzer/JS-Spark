/**
 * Created by syzer on 12/28/2014.
 */
module.exports = function forkService(log, fork, _, q, workerCode) {
    'use strict';

    return {
        forkWorker: forkWorker
    };

    // TODO client.js->bower
    function forkWorker(config) {
        var todos = [];
        config = config || {times: 1};

        _.times(config.times, function () {
            // 'client.js'
            todos.push(fork(workerCode, []));
        });

        return q.all(todos);
    }
};
