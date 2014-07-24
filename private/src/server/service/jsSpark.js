module.exports = function jsSParkService() {

    return function(data) {

        var operations = [],
            array = data,
            callbacks = [];

        return {

            // operations array??
            map: function (callback) {
                callbacks.push(callback.toString());

                operations.push({
                  chaining: function(chain, callback) {
                    return chain.map(callback);
                  },
                  callback: callback
                });

                operations.push(function (_, data, callbacks) {
                    return _.chain(data).map(callbacks[0]);
                });
                return this;
            },

            filter: function (callback) {

            },

            createTask: createTask
        };

        // factory method
        function createTask() {
            return {
                operations: operations,
                execute: function (_, data, callbacks) {
                    var chain = _.chain(data)
                    var operation = this.operations[0]
                    chain = operation.chaining(chain, operation.callback)
                    return chain;
                },
                callbacks: callbacks,
                data: array
            }
        }
    }
};
