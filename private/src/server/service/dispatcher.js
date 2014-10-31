module.exports = function dispatcherService(log, ioServer, serializer, _, workers, uiApplicationModels) {

    // TODO: task clients send, received form clients,
    // TODO maybe tasks here are not required?
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
    // TODO reject worker tasks after some timeout(he yet may reconnect)
    function start() {
        var handleMessage = function (socket) {
            var onError,
                worker;

            log.info('New client of dispatcher ', socket.id);
            log.info('[%s] CONNECTED', socket.address);

            // this is optional
            authenticateClient(socket);

            registerApplicationHandlers(socket);

            // Try to give him a task.
            worker = workers.create(socket);
            emitFreeTask(worker);

            // process client response
            socket.on('response', function (data) {
                log.info('Client response ', socket.id);
                log.info('task id', data.id);
                log.info('data', data.resp);
                promises[socket.id] && promises[socket.id].resolve(data.resp);
                worker.points += 1;
                emitFreeTask(worker);
            });

            // drop dead clients
            socket.on('disconnect', function () {
                workers.remove(worker);
                promises[socket.id] && promises[socket.id].reject('Client disconnected');
            });

            // When the client emits 'info', this listens and executes
            socket.on('info', function (data) {
                console.info('[%s] %s', socket.address, JSON.stringify(data, null, 2));
            });

            onError = _.partial(onClientError, worker, socket);
            socket.on('syntaxError', onError);
            socket.on('clientError', onError);
        };
        ioServer.on('connection', handleMessage);
    }

    // its getting java-ish
    function registerApplicationHandlers(socket) {
        uiApplicationModels.forEach(function (model) {
            model.register(socket);
        });
    }

    function onClientError(worker, socket, data) {
        log.error('client ', socket.id, ', task ', data.id, ', reports error:', data.resp);
        promises[socket.id] && promises[socket.id].reject(data.resp);
        emitFreeTask(worker);
    }

    function authenticateClient(socket) {
        // We can authenticate socket.io users and access their token through socket.handshake.decoded_token
        //
        // 1. You will need to send the token in `client/components/socket/socket.service.js`
        //
        // 2. Require authentication here:
        // socketio.use(require('socketio-jwt').authorize({
        //   secret: config.secrets.session,
        //   handshake: true
        // }));

        // set socket address
        socket.address = socket.handshake.address !== null ?
            socket.handshake.address.address + ':' + socket.handshake.address.port :
            process.env.DOMAIN;

        socket.connectedAt = new Date();
    }

    function stop() {
        log.info('dispatching stopped @' + new Date());
        clearInterval(timerId);
    }

    function emitFreeTask(worker) {
        worker.free = true;
        if (_.isEmpty(tasks)) {
            return;
        }
        var task = tasks.pop();
        promises[worker.id] = task.deferred;
        worker.socket.emit(
            'task', {
                id: newUniqueTaskId(worker.id),
                task: task.task
            }
        );
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

        var w = workers.getFirstFree();
        if (w) {
            emitFreeTask(w);
        }
    }
};
