/**
 * TODO
 */
module.exports = function taskManagerService(config, log, dispatcher, workersService, defer, promise, server, port, _) {

    return {
        init: init,
        addTask: addTask,
        getWorkers: workersService.get,
        stop: stop
    };

    function stop() {
        var stopDate = new Date();
        server.close();
        log.info('server stopped @ ' + stopDate);

        //dispatcher.stop(); // is closed by server
        return stopDate;
    }

    // TODO start server(if not started)
    // public methods
    function init() {
        dispatcher.start();
        server.listen(port);
    }

    function addTask(task, taskConfig) {
        taskConfig = taskConfig || '';
        var deferred = defer(),
            todos = [];

        dispatcher.addTask(task, deferred);

        if (!taskConfig.times) {
            return deferred.promise;
        }

        todos.push(deferred.promise);

        _.times(taskConfig.times - 1, function (n) {
            deferred = defer();
            dispatcher.addTask(task, deferred);
            todos.push(deferred.promise);
        });

        return promise
            .settle(todos)
            .then(filterFullFilled)
            .then(checkMajority);
    }

    function filterFullFilled(promises) {
        return promises
            .filter(function (promise) {
                return promise.isFulfilled();        //  can be also isRejected()
            })
            .map(function (promise) {
                return promise.value();
            });
    }

    function first2MostCommon(arr) {
        return _(arr)
            .groupBy()
            .sortBy(function (el) {
                return -el.length;
            })
            .map(function firstTwo(data) {
                return [data[0], data[1]];
            })
            .value();
    }

    function compare2Answers(data) {
        if (_.isEqual(data[0], data[1])) {
            return data[0];
        } else {
            throw new Error('Clients calculated different things, ' +
                'some may even could not finish calculations');
        }
    }

    // maybe would be better to send calculations to arbiter
    //:: array[data] -> array
    function checkMajority(data) {
        var requiredOK = parseInt(data.length / 2 + 1);
        if (2 === requiredOK) {
            return compare2Answers(data);
        }
        return first2MostCommon(data);
    }
};
