/**
 * Created by syzer on 8/28/2014.
 */
describe('Js-Spark Service', function () {

    afterEach(function (done) {
        setTimeout(done, 60);
    });

    it('can initialize', function (done) {
        expect(jsSpark).to.be.an.instanceof(Function);

        done();
    });

    it('run() returns promise', function (done) {
        var promise = jsSpark([1,2,3]).map(function multiplyBy2(el) {
            return el * 2;
        }).run();

        expect(promise.then).to.be.an('function');
        expect(promise.catch).to.be.an('function');
        expect(promise.all).to.be.an('function');

        done();
    });

});
