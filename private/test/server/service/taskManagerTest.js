/**
 * Created by syzer on 12/27/2014.
 */
describe('Task Manager Service', function () {
    var taskManager;

    afterEach(function (done) {
        setTimeout(done, 60);
    });

    it('can initialize', function (done) {
        taskManager = di.get('service.taskManager');
        expect(taskManager.init).to.be.an.instanceof(Function);

        done();
    });

    it('can stop()', function (done) {
        expect(taskManager.stop).to.be.an.instanceof(Function);
        var stopDate = taskManager.stop();

        taskManager.init();
        expect(stopDate).to.be.below(new Date());

        done();
    });

});
