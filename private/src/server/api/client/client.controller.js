'use strict';


/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function (req, res) {
    var users = [
        {id: '-ooHn-0id9eXLxRgAAAB'},
        {id: '1ooHn-0id9eXLxRgAAAB', email: 'some@that.loggedin.com'}
    ];

    res.json(200, users);

};
