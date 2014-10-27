/**
 * Created by syzer on 7/24/2014.
 */
module.exports = function workersService(log, _) {
    'use strict';

    var workers = [];

    return {
        create: create,
        getFreeWorkers: getFreeWorkers,
        remove: remove,
        get: get,
        getFirstFree: getFirstFree
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

    function remove(worker) {
        var index = workers.indexOf(worker);
        if (index != -1) {
            log.info('RIP client', workers[index].socket.id);
            workers.splice(index, 1);
        }
    }

    function get() {
        return workers;
    }

    // + getFirstFree::array -> object
    function getFirstFree() {
        return _.first(workers, 'free')[0];
    }

    //TODO getBest
    function getFreeWorkers() {
        return workers.filter(function (worker) {
            return worker.free;
        });
    }

};
