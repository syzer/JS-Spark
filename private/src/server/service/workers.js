/**
 * Created by syzer on 7/24/2014.
 * workersSocket - utilized for observing changes in workers
 */
module.exports = function workersService(log, _) {
    'use strict';

    var workers = [];
    var listeners = [];

    return {
        create: create,
        getFreeWorkers: getFreeWorkers,
        remove: remove,
        get: get,
        getFirstFree: getFirstFree,
        busy: busy,
        free: free,
        addListener: addListener
    };

    //TODO notify change
    function create(socket) {
        var worker = {
            socket: socket,
            free: true,
            points: 0,
            _id: socket.id
        };
        workers.push(worker);
        notifyThat('client:save', worker);

        return worker;
    }

    function remove(worker) {
        var index = workers.indexOf(worker);
        if (index != -1) {
            log.info('RIP client', workers[index].socket.id);
            workers.splice(index, 1);
        }
        notifyThat('client:remove', worker);
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
    //        points: 4,
    //        id: 'haQJ-zLwkTFof2RVAAAB' },
    function get() {
        return _(workers)
            .map(extractImportantWorkerInfo)
            .value();
    }

    function extractImportantWorkerInfo(worker) {
        return {
            _id: worker._id,
            connectedAt: worker.socket.connectedAt,
            connected: worker.socket.connected,
            handshake: worker.socket.handshake,
            free: worker.free,
            rooms: worker.socket.rooms,
            points: worker.points,
            benchmark: worker.benchmark
        }
    }

    // + getFirstFree::array -> object
    function getFirstFree() {
        return _.findWhere(workers, { free: true });
    }

    //TODO getBest
    function getFreeWorkers() {
        return workers.filter(function (worker) {
            return worker.free;
        });
    }

    // maybe make a worker class
    // free worker from busy state
    function free(worker, points) {
        points = points || 0;
        worker.free = true;
        worker.points += points;
        notifyThat('client:save', worker);
    }

    function busy(worker) {
        worker.free = false;
        notifyThat('client:save', worker);
    }

    //TODO maybe room broadcast
    function notifyThat(action, actor) {
        actor = extractImportantWorkerInfo(actor);
        listeners.forEach(function(listener){
            listener.emit(action, actor);
        });
    }

    function addListener(socket) {
        listeners.push(socket);
    }

};
