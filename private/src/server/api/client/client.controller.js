'use strict';


/**
 * Get list of users
 * restriction: 'admin'
 */
module.exports = function (taskManagerService) {

    return {
        index: function (req, res) {
            res.status(200).json(taskManagerService.getWorkers());
        }
    };
};
