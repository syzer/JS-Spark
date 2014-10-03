module.exports = function jsSParkService(taskManager) {

    // TODO proxy to monad, so we could add all lodash/underscore methods
    // is a monad
    return function jsSpark (data) {

        var operations = [],
            array = data;

        return {

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

        // TODO return promise
        // factory method
        function createTask() {
            var task = {

                operations: operations,

                execute: function (_, data, callbacks) {
                    var chain = _.chain(data);
                    // TODO move to reduce?
                    this.operations.forEach(function (operation, i) {

                        chain = operation.chaining(chain, operation.callback);
                    });

                    return chain;
                },

                data: array
            };

            taskManager.addTask(task);

            return task;
        }
    }
};
