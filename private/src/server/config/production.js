/**
 * adapter, overwrite config variables
 */
module.exports = function productionConfig(config) {
    'use strict';

    config.DOMAIN = "http://localhost:9000";

    return config;
};

