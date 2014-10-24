'use strict';

angular.module('jsSparkUiApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('admin', {
                url: '/admin',
                templateUrl: 'app/admin/admin.html',
                controller: 'AdminCtrl'
            });
    });
