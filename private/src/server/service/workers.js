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
        workers.push(worker);

        return worker;
    }

    //TODO getBest
    function getFree() {
        return workers.filter(function (worker) {
            return worker.free;
        })[0];
    }

};
