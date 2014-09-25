/**
 * Created by syzer on 4/24/2014.
 */
module.exports = function (ROOT_PATH, DATA_PATH) {
    'use strict';

    // Avoids DEPTH_ZERO_SELF_SIGNED_CERT error for self-signed certs
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    return {

        api: {
            url: 'https://localhost:3000/api/'
        },
        chrome: {
            kill: true
        },
        fileWatcher: {
            path: {
                listen: 'data/processingPdf',
                processTo: 'data/savedPdf'
            }
        },
        seleniumConfig: {
            // http://code.google.com/p/selenium/wiki/DesiredCapabilities
            desiredCapabilities: {
                browserName: 'chrome'     // use chrome for debugging
//                browserName: 'phantomjs'  // headless, tho slightly slower
            }
            //logLevel: 'silent'
        },
        ssl: {
            key: 'data/ssl/key.pem',
            cert: 'data/ssl/key-cert.pem'
        },
        log: {
            error: {
                file: (function () {
                    return DATA_PATH + 'error.log';
                })()
            }
        }
    }
};


