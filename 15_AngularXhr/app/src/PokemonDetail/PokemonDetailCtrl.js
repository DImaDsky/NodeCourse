'use strict';

pokemonApp.controller('PokemonDetailCtrl', function($scope, $routeParams, $location, PokemonsService) {

    $scope.pokemonLoaded = false;

    PokemonsService.getPokemon($routeParams['pokemonId']).then(function(response) {
        $scope.pokemon = response.data;
        $scope.pokemonLoaded = true;
    });

    $scope.deletePokemon = function(pokemonId) {

        $scope.deletionError = false;
        $scope.deletionSuccess = false;

        PokemonsService.deletePokemon(pokemonId).then(function successCallback(response) {

            // Окей!
            $scope.deletionSuccess = true;

        }, function errorCallback(response) {

            // Не окей..
            $scope.deletionError = true;
        });

    };

    $scope.editPokemon = function(pokemonId) {
        $location.path('/pokemon/edit/' + pokemonId);
    }

});
