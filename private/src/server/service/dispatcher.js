module.exports = function dispatcherService(log, ioServer, serializer, _) {

    // 10 seconds
    const DISPATCH_INTERVAL = 10000;

    // AKA clients
    var workers = [];

    // TODO: task clients send, recieved form clients,
    //TODO maybe tasks here are not required?
    var tasks = [];

    // maybe merge with tasks
    var promises = [];

    // timer for digest cycle
    var timerId;

    return {
        start: start,
        addTask: addTask,
        stop: stop
    };

    // TODO check here validity of client message
    // TODO task manger should decide if we should reject or resolve
    function start() {
        var handleMessage = function (socket) {
            log.info('New client of dispatcher ', socket.id);
            workers.push(socket);

            // drop old clients
            // TODO reject worker tasks after some timeout(he yet may reconnect)
            socket.on('disconnect', function () {
                var index = workers.indexOf(socket);
                if (index != -1) {
                    log.info('RIP client', socket.id);
                    workers.splice(index, 1);
                }
            });

            socket.on('syntaxError', function (data) {
                log.error('client ', socket.id, ', task ', data.id, ', reports error:', data.resp);
                promises[socket.id].reject(data.resp);
            });

            socket.on('clientError', function (data) {
                log.error('client ', socket.id, ', task ', data.id, ', reports error:', data.resp);
                promises[socket.id].reject(data.resp);
            });

            // process client response
            socket.on('response', function (data) {
                log.info('Client response ', socket.id);
                log.info('task id', data.id);
                log.info('data', data.resp);
                promises[socket.id].resolve(data.resp);
            });

        };
        ioServer.on('connection', handleMessage);
        timerId = periodicallyDispatchStrategy()
    }

    function stop() {
        log.info('dispatching stopped @' + new Date());
        clearInterval(timerId);
    }

    // TODO move setInterval to process next tick and to separate startDigest cycle function
    // TODO check tasks, check resolved promises
    // TODO tasks.pop() is NOT the best implementation maybe task->state pending?
    // spams clients with meaning-full task, like good PM
    function periodicallyDispatchStrategy() {
        return setInterval(function () {
            var randomClient, workerId, task;
            if (noFreeWorkersOrPendingTasks()) {
                return;
            }
            task = tasks.pop();
            randomClient = Math.floor(Math.random() * workers.length);
            workerId = workers[randomClient].id;
            promises[workerId] = task.deferred;
            workers[randomClient].emit(
                'task', {id: newUniqueTaskId(workerId), task: task.task}
            );
        }, DISPATCH_INTERVAL);
    }

    // maybe better hashing algorithm than
    // consequent unique numbers + prefix
    function newUniqueTaskId(prefix) {
        return _.uniqueId(prefix);
    }

    // TODO refactor out to task manager
    // maybe memorize stringify() with _.memoize(serializer.stringify)
    // task schema
    function newTask(task, clientId, deferred) {
        clientId = clientId || '';

        return {
            id: newUniqueTaskId(clientId),
            task: serializer.stringify(task),
            deferred: deferred
        }
    }

    function addTask(task, deferred) {
        tasks.push(newTask(task, '', deferred));
    }

    // TODO pending tasks
    function noFreeWorkersOrPendingTasks() {
        return _.isEmpty(workers) || _.isEmpty(tasks);
    }
};
