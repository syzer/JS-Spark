/**
 * Created by syzer on 4/10/2014.
 * newrelic dependence is required
 */
module.exports = function logService(config, winston, newrelic) {
    'use strict';

    var fileName = config.log.error.file;
    console.log('error log file name', fileName, config.log.level);

    var consoleLogConfig = {
        transports: [
            new (winston.transports.Console)({ level: 'warn', colorize: true }),
        ]
    };

    var productionLogConfig = {
        transports: [
            new (winston.transports.Console)({ level: 'warn', colorize: true }),
            new (winston.transports.File)({ filename: fileName, level: 'error' })
        ]
    };

    var createLog = function (fileName, configInjected) {
        var config = productionLogConfig || configInjected;
        var log = new (winston.Logger)(config);

        return log;
    };

    var createConsoleLog = function () {
        return createLog('', consoleLogConfig);
    };

    return {
        createLog: createLog,
        createConsoleLog: createConsoleLog
    };
};
