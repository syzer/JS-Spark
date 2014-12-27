/**
 * Created by syzer on 8/28/2014.
 */
var expect = require('chai').expect;
var jsSpark, di;
global.ROOT_PATH = __dirname + '/../src/server/';
global.TEST_PATH = './';
global.expect = expect;

function initialize() {
    var services = require(ROOT_PATH + 'config/di').services;
    di = require(ROOT_PATH + 'controller/di')(services);
    di.get('server').listen(di.get('port'));
    return di.get('service.jsSpark');
}

global.initialize = initialize;
global.jsSpark = jsSpark || initialize();
global.di = di;

module.exports = global;
