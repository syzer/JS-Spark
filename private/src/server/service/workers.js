/**
 * Created by syzer on 7/24/2014.
 */
module.exports = function workersService(log) {
    'use strict';

    var workers = [];

    return {
        create: create,
        getFree: getFree,
    };

    function create(socket) {
        var worker = {
            socket: socket,
            free: false,
            id: socket.id
        };
        workers.push[worker]
        return worker;
    }

    function getFree() {
        for (var i = 0; i < worker.length; i++) {
            if (workers[i].free) {
                return worker[i];
            }
        }
        return null;
    }

};
