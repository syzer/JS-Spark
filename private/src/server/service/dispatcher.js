module.exports = function dispatcher(ioServer) {

    //private
    var workers = [];

    return {
        start: start
    }

    // public methods
    function start() {
        var handleMessage = function(socket) {
            console.info('New client of dispatcher ', socket.id);
            // clients.push(socket);

            // drop old clients
            socket.on('disconnect', function () {
                // var index = clients.indexOf(socket);
                // if (index != -1) {
                //     console.info('RIP client', socket.id);
                //     clients.splice(index, 1);
                // }
            });

            // process client response
            socket.on('response', function (data) {
                // console.log('Client response ', socket.id);
                // console.log(data.split(','));
            });
        };
        ioServer.on('connection', handleMessage)
    }

    function addTask() {

    }



    // private methods
};