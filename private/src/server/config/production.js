/**
 * adapter
 */
module.exports = function productionConfig(config) {
    'use strict';

    config.fileWatcher = {
        path: {
            listen: '/Database/pdf/processingPdf',
            processTo: '/Database/pdf/savedPdf'
        }
    };

    config.chrome.kill = false;

    return config;
};

