module.exports = function manager(dispatcher) {

    //private
    var tasks = [];
    return {
        init: init,
        addTask: addTask
    }

    // public methods
    function init() {
      dispatcher.start()
    }

    function addTask(task) {
      dispatcher.addTask(task)
      tasks.push(task)
    }



    // private methods
};