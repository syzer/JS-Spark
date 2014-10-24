'use strict';

// Development specific configuration
// ==================================
module.exports = {
    // MongoDB connection options
    mongo: {
        uri: 'mongodb://localhost/jssparkui-dev',
        options: {
            user: 'js-spark',
            pass: 'js-spark1'
        }
    },

    seedDB: true
};
