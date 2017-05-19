pokemonApp.controller('BerryDetailCtrl', function ($scope, $routeParams, BerriesService) {
    $scope.berryLoaded = false;

    $scope.berry = BerriesService.get({
        berryId: $routeParams['berryId']
    }, function (successResult) {
        console.log(successResult);
        $scope.berryLoaded = true;
    }, function (err) {
        console.log(err);
        $scope.berryLoaded = true;
    });

    $scope.berry.$promise.then(function(result) {
        console.log('2',result);
        //$scope.berryLoaded = true;
    });


});

