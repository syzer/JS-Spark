/**
 * Created by syzer on 10/9/2014.
 */
module.exports = function deferService(Promise) {

    return function defer() {
        var resolve, reject;
        // i highly doubt that it will be memory efficient
        var promise = new Promise(function () {
            resolve = arguments[0];
            reject = arguments[1];
        });

        return {
            resolve: resolve,
            reject: reject,
            promise: promise
        };
    }
};

