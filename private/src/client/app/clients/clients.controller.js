'use strict';

angular.module('jsSparkUiApp').controller('ClientsCtrl', function ($scope, $http, socket) {
    $scope.message = 'Hello';

    $scope.clients = [];

    $http.get('/api/clients').success(function(clients) {
        $scope.clients = clients.map(function(client){
            if(!client.email) {
                client.email = "unknown@example.com";
            }
            return client;
        });
        socket.syncUpdates('client', $scope.clients);
    });
});

