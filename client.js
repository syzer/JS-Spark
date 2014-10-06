/**
 * Created by syzer on 7/24/2014.
 */
var io = require('socket.io-client'),
    ioClient = io.connect('http://localhost:8000'),
    _ = require('lodash');

//TODO split task and parse serialization errors
ioClient.on('task', function (receivedTask) {
    var task,
        response;
    try {
        task = JSON.parse(receivedTask.task, functionCreate);
        response = task.execute(_, task.data/*, task.callbacks*/).value();
        ioClient.emit('response',
            {id: receivedTask.id, resp: response.toString()}
        );
        console.log('Client response', response);
    } catch (e) {
        ioClient.emit('clientError', {id: receivedTask.id, resp: e.toString()});
        console.log('Parse error:', e.stack);
    }

});

// CSP may block Function call, function used not to use eval
function functionCreate(key, value) {

    if (!key) {
        return value;
    }

    if ('string' === typeof value) {
        var funcRegExp = /^function[^\(]*\(([^\)]*)\)[^\{]*{(([^\}]*|\}[^$])*)\}$/,
            match = value.match(funcRegExp);
        if (match) {
            var args = match[1]
                .split(',')
                .map(function (arg) {
                    return arg.replace(/\s+/, '');
                });
            return new Function(args, match[2]);
        }
    }
    return value;
}
