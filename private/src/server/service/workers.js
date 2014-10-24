/**
 * Created by syzer on 7/24/2014.
 */
module.exports = function workers(log) {
    var workers = [];
    return {
        create: create,
        getFree: getFree,
    };

    function create(socket) {
        var worker = {
            socket: socket,
            free: false
        }
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