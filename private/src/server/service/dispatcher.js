module.exports = function dispatcher(ioServer, serializer) {

    //private
    var workers = [];
    // TODO: task clients send, recieved form clients,
    var tasks = [];

    return {
        start: start,
        addTask: addTask
    };

    // public methods
    function start() {
        var handleMessage = function(socket) {
            console.info('New client of dispatcher ', socket.id);
            workers.push(socket);

            // drop old clients
            socket.on('disconnect', function () {
                var index = workers.indexOf(socket);
                if (index != -1) {
                    console.info('RIP client', socket.id);
                    workers.splice(index, 1);
                }
            });

            // process client response
            socket.on('response', function (data) {
                console.log('Client response ', socket.id);
                console.log(data.split(','));
            });
        };
        ioServer.on('connection', handleMessage);

        // spam clients with meaning-full task, like good PM
    }

    function addTask(task) {
        // #TODO well, writer the correct dispatcher.
        tasks.push(task);
        var serializedTask = serializer.stringify(task);

        setInterval(function () {
            var randomClient;

            if (workers.length > 0) {
                randomClient = Math.floor(Math.random() * workers.length);
                workers[randomClient].emit('task', serializedTask);
            }
        }, 10000);
    }



    // private methods
};
