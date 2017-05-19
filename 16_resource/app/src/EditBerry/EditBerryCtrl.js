'use strict';

pokemonApp.controller('EditBerryCtrl', function($scope, BerriesService, $routeParams) {

    $scope.berry = BerriesService.get({
        berryId: $routeParams['berryId']
    });

    $scope.updateBerry = function() {

        $scope.berry.$update({}, function(successResult) {
            // Окей!
            $scope.updateSuccess = true;
        }, function(errorResult) {
            // Не окей..
            $scope.updateSuccess = false;
        });

    }

});
