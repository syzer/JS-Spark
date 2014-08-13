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

                return this;
            },

            filter: function (callback) {
                operations.push({
                  chaining: function(chain, callback) {
                    return chain.filter(callback);
                  },
                  callback: callback
                });
                return this;

            },

            createTask: createTask
        };

        // factory method
        function createTask() {
            return {
                operations: operations,
                execute: function (_, data, callbacks) {
                    var chain = _.chain(data);
                    for (var i = 0; i < this.operations.length; i++) {

                      chain = this.operations[i].chaining(chain, this.operations[i].callback)
                    }
                    return chain;
                },
                callbacks: callbacks,
                data: array
            }
        }
    }
};
