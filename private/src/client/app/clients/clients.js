/**
 * Created by syzer on 8/28/2014.
 */
angular.module('jsSparkUiApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('clients', {
                url: '/clients',
                templateUrl: 'app/clients/clients.html',
                controller: 'ClientsCtrl'
            });
    });
