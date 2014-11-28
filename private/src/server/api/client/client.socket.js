/**
 * Broadcast updates to client when the model changes
 */
module.exports = function clientSocketApi(workers) {
    'use strict';

    return {
        //TODO check authorized
        register: function (socket) {
            workers.addListener(socket);
        }
    };

};
