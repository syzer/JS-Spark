/**
 * Created by syzer on 4/10/2014.
 * newrelic dependence is required
 */
module.exports = function logService(config, winston, newrelic) {
    'use strict';

    var fileName = config.log.error.file;

    var consoleLogConfig = {
        transports: [
            new (winston.transports.Console)({ level: config.log.level, colorize: true })
        ]
    };

    var productionLogConfig = {
        transports: [
            new (winston.transports.Console)({ level: config.log.level, colorize: true }),
            new (winston.transports.File)({ filename: fileName, level: 'error' })
        ]
    };

    var createLog = function (fileName, configInjected) {
        var config = productionLogConfig || configInjected;
        return new (winston.Logger)(config);
    };

    var createConsoleLog = function () {
        return createLog('', consoleLogConfig);
    };

    return {
        createLog: createLog,
        createConsoleLog: createConsoleLog
    };
};
