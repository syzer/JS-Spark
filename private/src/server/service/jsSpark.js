module.exports = function jsSPark() {

    return function(data) {

        var operation,
            array = data,
            callbacks = [];

        return {

            // operations array??
            map: function (callback) {
                callbacks.push(callback.toString());

                operation = function (_, data, callbacks) {
                    return _.chain(data).map(callbacks[0]);
                };
                return this;
            },

            value: function () {
                return operation().value();
            },

            createTask: createTask
        };

        // factory method
        function createTask() {
            return {
                operation: operation,
                execute: function (_, data, callbacks) {
                    return this.operation(_, data, callbacks);
                },
                callbacks: callbacks,
                data: array
            }
        }
    }
};
