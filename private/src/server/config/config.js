/**
 * Created by syzer on 4/24/2014.
 */
module.exports = function (ROOT_PATH, DATA_PATH, MAIN_PATH) {
    'use strict';

    // Avoids DEPTH_ZERO_SELF_SIGNED_CERT error for self-signed certs
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    return {

        api: {
            url: 'https://localhost:3000/api/'
        },
        ssl: {
            key: 'data/ssl/key.pem',
            cert: 'data/ssl/key-cert.pem'
        },
        log: {
            error: {
                file: (function () {
                    return DATA_PATH + '/log/error.log';
                })()
            },
            level: 'warn'
        }
    }
};


