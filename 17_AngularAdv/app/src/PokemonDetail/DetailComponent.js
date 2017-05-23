'use strict';

pokemonApp.component('pokemonDetail', {
    controller: function pokemonListCtrl($routeParams, PokemonsService) {
        // bindings:{
        //     pokemon: '<'
        // }
        this.pokemonLoaded = false;
        this.pokemon = PokemonsService.get({
            pokemonId: $routeParams['pokemonId']
        });
        this.pokemon.$promise.then(()=>{
            this.pokemonLoaded = true;
        })
    },
    templateUrl: './src/PokemonDetail/PokemonDetail.html'
});