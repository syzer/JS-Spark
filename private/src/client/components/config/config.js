/**
 * Created by syzer on 10/24/2014.
 */
angular
    .module('config', [])
    .factory('config', function () {
        return {
            dateFormat: 'yyyy-MM-dd HH:mm:ss Z'
        };
    });
