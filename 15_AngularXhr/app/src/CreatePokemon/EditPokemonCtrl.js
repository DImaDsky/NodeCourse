'use strict';

pokemonApp.controller('EditPokemonCtrl', function($scope, $location, $routeParams, PokemonsService) {

    PokemonsService.getPokemon($routeParams.pokemonId).then(function (result) {
        $scope.newPokemon = result.data;
    });

    $scope.createPokemon = function(myPokemon) {

        PokemonsService.updatePokemon(myPokemon).then(function(response) {
            $location.path('/pokemons/' + response.data.objectId);
        });
    }
});
