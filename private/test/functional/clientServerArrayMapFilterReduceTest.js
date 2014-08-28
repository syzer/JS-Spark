/**
 * Created by syzer on 8/28/2014.
 */
var expect = require('chai').expect;
var SRC_DIR = './../../src/'; // run on over the test

//var lib = require(SRC_DIR + 'gridWalk');
var _ = require('lodash');

var input = '';
var output = '';

describe('Client Executes Computation', function () {

    afterEach(function (done) {
        setTimeout(done, 60);
    });

    it('Should fail', function (done) {
        expect(false).eql(true);

        done();
    });

});
