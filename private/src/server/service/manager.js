module.exports = function manager(dispatcher) {

    //private
    var task = [];
    var dispatcher;
    return {
        init: init,
        addTask: addTask
    }

    // public methods
    function init() {
      dispatcher.init()
    }

    function addTask(task) {

      tasks.push(task)
    }



    // private methods
};