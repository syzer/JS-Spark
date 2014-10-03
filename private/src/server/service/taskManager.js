module.exports = function taskManager(dispatcher) {

    // private
    // TODO task is duplicated in dispacher
    var tasks = [];

    return {
        init: init,
        addTask: addTask
    };

    // public methods
    function init() {
        dispatcher.start()
    }

    function addTask(task) {
        dispatcher.addTask(task);
        tasks.push(task)
    }

};
