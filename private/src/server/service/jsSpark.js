module.exports = function jsSParkService(taskManager, _) {

    // is a monad
    // TODO use newChainedMethod not to double code and change run()
    return function jsSpark(data) {

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

            thru: function (callback) {
                operations.push({
                    chaining: function (chain, callback) {
                        return chain.thru(callback);
                    },
                    callback: callback
                });

                return this;
            },

            run: run,

            stop: taskManager.stop
        };

        // TODO move forEach to reduce?
        // TODO args = options{timeout,...}
        // factory method
        // :: object -> deferred
        function run(taskConfig) {
            var task = {

                operations: operations,

                execute: function (_, data) {
                    var chain = _.chain(data);
                    this.operations.forEach(function (operation, i) {
                        chain = operation.chaining(chain, operation.callback.bind(_), _);
                    });

                    return chain;
                },

                data: array
            };

            return taskManager.addTask(task, taskConfig);
        }
    }
};
