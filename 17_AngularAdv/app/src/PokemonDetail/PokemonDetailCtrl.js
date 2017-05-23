'use strict';

pokemonApp.controller('PokemonDetailCtrl', function($scope, $routeParams, PokemonsService) {

    $scope.pokemonLoaded = false;

    $scope.pokemon = PokemonsService.get({
        pokemonId: $routeParams['pokemonId']
    }, function(successResult) {
        // Окей!
        $scope.notfoundError = false;
        $scope.pokemonLoaded = true;

        $scope.activeTab = 1;
        $scope.disableControlTab = true;
    }, function(errorResult) {
        // Не окей..
        $scope.notfoundError = true;
        $scope.pokemonLoaded = true;


    });

    $scope.pokemon.$promise.then(function(result) {
        //$scope.pokemonLoaded = true;
    });

    $scope.deletePokemon = function(pokemonId) {

        $scope.pokemon.$delete({
            pokemonId: pokemonId
        }, function(successResult) {
            // Окей!
            $scope.deletionSuccess = true;
        }, function(errorResult) {
            // Не окей..
            $scope.deletionError = true;
        });

    }

});
