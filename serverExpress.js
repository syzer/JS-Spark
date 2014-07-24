'use strict';
var server;
var ROOT = './private/src/server/';

// DI container
var services = require(ROOT + 'config/di').services;

// setup Dependencies
var di = require(ROOT + 'controller/di')(services);

// example
var buildModuleService = function () {
    var module = require(ROOT + 'services/express')(
        di.get('app'),
        di.get('port'),
        di.get('cookieParser'),
        di.get('compression'),
        di.get('http'),
        di.get('session')
    );
    module.setup();
    module.registerRouteHandler(
        '/',
        di.get('controller.index').defaultRoute
    );
    module.registerErrors();
    return module;
}();
// or getApp / server
server = di.add('service.express', buildModuleService);

// watches new data
di.get('service.fileWatcher').watcher.start();

// TODO Setup Socket.IO
var io = io.listen(server);
io.sockets.on('connection', function(socket){
    console.log('Client Connected');
    socket.on('message', function(data){
        socket.broadcast.emit('server_message',data);
        socket.emit('server_message',data);
    });
    socket.on('disconnect', function(){
        console.log('Client Disconnected.');
    });
});
