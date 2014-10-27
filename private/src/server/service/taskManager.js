/**
 * TODO task default strategy
 * TODO task give task statistics
 * TODO give clients statistics
 */
module.exports = function taskManagerService(config, log, dispatcher, workersService) {

    // private
    // TODO task is duplicated in dispatcher
    var tasks = [];

    return {
        init: init,
        addTask: addTask,
        getWorkers: workersService.get
    };

    // public methods
    function init() {
        dispatcher.start();
    }

    function addTask(task, deferred) {
        dispatcher.addTask(task, deferred);
        tasks.push(task);
    }
};
