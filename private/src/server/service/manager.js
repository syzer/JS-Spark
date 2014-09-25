module.exports = function manager(dispatcher) {

    //private
    var task = [];
    return {
        init: init,
        addTask: addTask
    }

    // public methods
    function init() {
      dispatcher.start()
    }

    function addTask(task) {

      tasks.push(task)
    }



    // private methods
};