'use strict';

describe('Controller: ClientsCtrl', function () {

    // load the controller's module
    beforeEach(module('jsSparkUiApp'));

    var ClientsCtrl, scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        ClientsCtrl = $controller('ClientsCtrl', {
            $scope: scope
        });
    }));

    it('should ...', function () {
        expect(1).toEqual(1);
    });
});
