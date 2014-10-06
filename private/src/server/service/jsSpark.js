module.exports = function jsSParkService(taskManager, Promise, _) {

    // is a monad
    return function jsSpark (data) {

        var operations = [],
            array = data;

        return {

            // TODO move dynamic method dispatch to apply/call
            // array generics are still not available in node
            // add lodash function
            add: function (/*args*/) {
                operations.push({
                    chaining: function (chain, functions, _) {
                        return chain[functions[0]](functions[1]);
                    },
                    callback: Array.prototype.slice.call(arguments)
                });

                return this;
            },

            map: function (callback) {
                operations.push({
                    chaining: function (chain, callback) {
                        return chain.map(callback);
                    },
                    callback: callback
                });

                return this;
            },

            filter: function (callback) {
                operations.push({
                    chaining: function (chain, callback) {
                        return chain.filter(callback);
                    },
                    callback: callback
                });

                return this;
            },

            reduce: function (callback) {
                operations.push({
                    chaining: function (chain, callback) {
                        return chain.reduce(callback);
                    },
                    callback: callback
                });

                return this;
            },

            createTask: createTask
        };

        // TODO move forEach to reduce?
        // factory method
        function createTask() {
            var deferred = Promise.pending();
            var task = {

                operations: operations,

                execute: function (_, data) {
                    var chain = _.chain(data);
                    this.operations.forEach(function (operation, i) {
                        chain = operation.chaining(chain, operation.callback, _);
                    });

                    return chain;
                },

                data: array
            };

            taskManager.addTask(task, deferred);

            return deferred.promise;
        }
    }
};
