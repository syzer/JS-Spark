/**
 * Broadcast updates to client when the model changes
 */
// TODO finish this
'use strict';

var client = require('./client.model');

exports.register = function (socket) {
    client.schema.post('save', function (doc) {
        onSave(socket, doc);
    });
    client.schema.post('remove', function (doc) {
        onRemove(socket, doc);
    });
};

function onSave(socket, doc, cb) {
    socket.emit('client:save', doc);
}

function onRemove(socket, doc, cb) {
    socket.emit('client:remove', doc);
}
