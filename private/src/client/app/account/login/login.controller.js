'use strict';

angular.module('jsSparkUiApp')
    .controller('LoginCtrl', function ($scope, Auth, $location, $window) {

        $scope.user = {password: '', email: ''};
        $scope.errors = {};
        $scope.cannotSubbmit = !$scope.user.password || !scope.user.email;

        $scope.login = function (form) {
            $scope.submitted = true;

            if (!form.$valid) {
                return;
            }

            Auth
                .login({
                    email: $scope.user.email,
                    password: $scope.user.password
                })
                .then(function () {
                    // Logged in, redirect to Search
                    $location.path('/search/');
                })
                .catch(function (err) {
                    $scope.errors.other = err.message;
                });
        };

        $scope.loginOauth = function (provider) {
            $window.location.href = '/auth/' + provider;
        };

        // fix on change of user name if user had stored password then will auto fill password
        $scope.validateModel = function () {
            setTimeout(function () {
                $scope.$apply(function () {
                    $scope.user.password = $('input[type=password]').val();
                    $scope.cannotSubbmit = !$scope.user.password || !$scope.user.email;
                });
            }, 200);
        };

    });
