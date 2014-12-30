/**
 * Created by syzer on 12/28/2014.
 */
describe('Forks new workers', function () {
    'use strict';

    var forkService;

    afterEach(function (done) {
        setTimeout(done, 60);
    });

    it('can fork new worker and return new promise', function (done) {
        forkService = di.get('service.fork');
        expect(forkService.forkWorker().then).to.be.a('function');

        done();
    });

    it('can fork new worker 2 workers', function (done) {
        forkService = di.get('service.fork');
        var promise = forkService.forkWorker({times: 2});
        expect(promise.then).to.be.a('function');

        done();
    });

});
