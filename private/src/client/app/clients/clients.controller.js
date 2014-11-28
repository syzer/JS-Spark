'use strict';

angular.module('jsSparkUiApp')
    .controller('ClientsCtrl', function ($scope, $http, socket) {
        $scope.clients = [];

        $http.get('/api/clients').success(function (clients) {
            $scope.clients = clients;
            socket.syncUpdates('client', $scope.clients);
        });

        //TODO move to alert service
        $scope.closeAlert = function (index) {
            console.warn('closing', index);
        };

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('client');
        });
    });

