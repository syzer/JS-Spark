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

//        { socket:
//          { nsp: [Object],
//            server: [Object],
//            adapter: [Object],
//            id: 'haQJ-zLwkTFof2RVAAAB',
//            client: [Object],
//            conn: [Object],
//            rooms: [Object],
//            acks: {},
//            connected: true,
//            disconnected: false,
//            handshake: [Object],
//            address: 'undefined:undefined',
//            connectedAt: Mon Oct 27 2014 21:37:46 GMT+0100 (W. Europe Standard Time),
//            _events: [Object]
//          },
//        free: false,
//        id: 'haQJ-zLwkTFof2RVAAAB' },
    function get() {
        return _(workers)
            .map(function (worker) {
                return {
                    id: worker.id,
                    lastConnectedAt: worker.socket.connectedAt,
                    connected: worker.socket.connected,
                    handshake: worker.socket.handshake,
                    free: worker.free,
                    rooms: worker.socket.rooms,
                    points: worker.points,
                    benchmark: worker.benchmark
                }
            })
            .value();
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
