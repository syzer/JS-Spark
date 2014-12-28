/**
 * Created by syzer on 12/28/2014.
 */
module.exports = function forkService(log, exec, _, q) {
    'use strict';

    return {
        forkWorker: forkWorker
    };

    function forkWorker(config) {
        var todos = [];
        config = config || {times: 1};

        _.times(config.times, function () {
            todos.push(exec('node client.js'));
        });

        return q.all(todos);
    }
};
