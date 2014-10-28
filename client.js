/**
 * Created by syzer on 7/24/2014.
 */
var io = require('socket.io-client'),
    ioClient = io.connect('http://localhost:9000'),
    _ = require('lodash');

var jsSparkClient = require('./private/src/client/components/socket/socket.service')(_);
jsSparkClient.registerJsSparkTaskHandler(ioClient);
