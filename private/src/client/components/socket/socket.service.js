/* global io */
'use strict';

// hack to use with node
var angular = angular || {
    module: function () {
        return this;
    },
    factory: function () {
        return this;
    }
};

// hack to use with node (own browserify)
var module = module || {};
module.exports = function (_) {
    return {
        registerJsSparkTaskHandler: registerJsSparkTaskHandler
    };

    function registerJsSparkTaskHandler(ioClient) {
        ioClient.on('task', function (receivedTask) {
            var task,
                response;
            try {
                task = JSON.parse(receivedTask.task, functionCreate);
                response = task.execute(_, task.data).value();
                ioClient.emit('response',
                    {id: receivedTask.id, resp: response}
                );
                //console.log('Client response', response);
            } catch (error) {
                console.error('Error:', error.stack);
                if ('SyntaxError' === error.name) {
                    return ioClient.emit('syntaxError', {id: receivedTask.id, resp: error.toString()});
                }
                ioClient.emit('clientError', {id: receivedTask.id, resp: error.toString()});
            }
        });
    }

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
};

angular.module('jsSparkUiApp')
    .factory('socket', function (socketFactory, _) {

        // socket.io now auto-configures its connection when we omit a connection url
        var ioSocket = io(null, {
            // Send auth token on connection, you will need to DI the Auth service above
            // 'query': 'token=' + Auth.getToken()
        });

        var socket = socketFactory({
            ioSocket: ioSocket
        });

        module.exports(_).registerJsSparkTaskHandler(socket);

        return {
            socket: socket,

            /**
             * Register listeners to sync an array with updates on a model
             *
             * Takes the array we want to sync, the model name that socket updates are sent from,
             * and an optional callback function after new items are updated.
             *
             * @param {String} modelName
             * @param {Array} array
             * @param {Function} cb
             */
            syncUpdates: function (modelName, array, cb) {
                cb = cb || angular.noop;

                //TODO use _.merge
                /**
                 * Syncs item creation/updates on 'model:save'
                 */
                socket.on(modelName + ':save', function (item) {
                    var oldItem = _.find(array, {_id: item._id});
                    var index = array.indexOf(oldItem);
                    var event = 'created';

                    // replace oldItem if it exists
                    // otherwise just add item to the collection
                    if (oldItem) {
                        array.splice(index, 1, item);
                        event = 'updated';
                    } else {
                        array.push(item);
                    }

                    cb(event, item, array);
                });

                /**
                 * Syncs removed items on 'model:remove'
                 */
                socket.on(modelName + ':remove', function (item) {
                    var event = 'deleted';
                    _.remove(array, {_id: item._id});
                    cb(event, item, array);
                });
            },

            /**
             * Removes listeners for a models updates on the socket
             *
             * @param modelName
             */
            unsyncUpdates: function (modelName) {
                socket.removeAllListeners(modelName + ':save');
                socket.removeAllListeners(modelName + ':remove');
            }
        };
    });

