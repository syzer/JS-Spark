module.exports = function clientIndex(di) {
    'use strict';

    var express = require('express');
    var taskManagerService = di.get('service.taskManager');
    var controller = require('./client.controller')(taskManagerService);
    var auth = require('../../auth/auth.service');

    var router = express.Router();

    router.get('/', auth.hasRole('admin'), controller.index);

    return router;
};
