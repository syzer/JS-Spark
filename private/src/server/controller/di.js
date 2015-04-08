/**
 * Created by syzer on 4/16/2014.
 */
module.exports = function diController(initialServices) {
    'use strict';

    var SERVICE_INVALID = 'Invalid service';
    var SERVICE_DOES_NOT_EXISTS = 'Service with this name does not exist';
    var SERVICE_WAS_EXISTING = 'Cannot add service that exists';
    var services = initialServices || {};

    return {

        add: function (serviceName, service) {
            if (!service || !serviceName) {
                throw new Error(SERVICE_INVALID);
            }
            if (this.hasService(serviceName)) {
                throw new Error(SERVICE_WAS_EXISTING + ': ' + serviceName);
            }
            services[serviceName] = service;
        },

        /**
         * return service , if service is curred returns auto-curred/resolved version
         * @param serviceName
         * @returns {*}
         */
        get: function (serviceName) {
            if (!this.hasService(serviceName)) {
                throw new Error(SERVICE_DOES_NOT_EXISTS + ': ' + serviceName);
            }
            // auto-curry anonymous addService function
            // not sure if Function.name will be legal in next ECMA script
            if (('function' === typeof services[serviceName]) &&
                ('addService' === services[serviceName].name)) {
                //console.log('function ', services[serviceName].name, serviceName);
                services[serviceName] = services[serviceName](this);
            }
            return services[serviceName];
        },

        /** use full for testing */
        replace: function (serviceName, service) {
            if (!this.hasService(serviceName)) {
                throw new Error(SERVICE_DOES_NOT_EXISTS + ': ' + serviceName);
            }
            delete services[serviceName];
            this.add(serviceName, service);
        },

        hasService: function (serviceName) {
            return services.hasOwnProperty(serviceName);
        },

        //TODO merge services between modules also might merge initialServices
        mergeServices: function () {}
    };
};
