'use strict';

angular.module('jsSparkUiApp').controller('ClientsCtrl', function ($scope, $http, socket) {
    $scope.message = 'Hello';

    $scope.clients = [];

    $http.get('/api/clients').success(function (clients) {
        $scope.clients = clients.map(function (client) {
            if (!client.email) {
                client.email = "unknown@example.com";
            }
            return client;
        });
        console.warn(clients);
        socket.syncUpdates('client', $scope.clients);
    });

    //TODO move to alert service
    $scope.closeAlert = function(index) {
        //$scope.alerts.splice(index, 1);
        console.warn('closing', index);
    };
});

