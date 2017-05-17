'use strict';

pokemonApp.controller('PokemonListCtrl', function($scope, $q, PokemonsService, BerriesService) {

    // PokemonsService.getPokemons().then(function(response) {
    //     $scope.pokemons = response.data.results;
    // });
    //
    // BerriesService.getBerries().then(function(response) {
    //     $scope.berries = response.data.results;
    // });
    $scope.pokemonLoaded = false;
    $q.all([PokemonsService.getPokemons(), BerriesService.getBerries()]).then(function(values){
        $scope.pokemons = values[0].data;
        $scope.berries = values[1].data;
        $scope.pokemonLoaded = true;
        //$scope.pokemonsOld = values[2].data.results;
        //console.log($scope.pokemons, $scope.pokemonsOld)
    });

    // PokemonsService.getPokemons().then(function(response) {
    //     $scope.pokemons = response.data.results;
    //
    //     return BerriesService.getBerries()
    // }).then(function(response) {
    //     $scope.berries = response.data.results;
    // });

});
