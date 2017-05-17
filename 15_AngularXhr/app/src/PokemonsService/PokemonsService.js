angular
.module('PokemonApp')
.factory('PokemonsService', function($http) {
    var link = 'https://api.backendless.com/5CAF4EE9-326C-6070-FF6D-E72278541500/22656574-93DD-CAB8-FF95-A5935A106200/data/' + 'pokemon';
    return {
        getPokemons: function() {
            return $http.get(link);
        },

        getPokemon: function(pokemonId) {
            return $http.get(link + '/' + pokemonId);
        },

        createPokemon: function(pokemonData) {
            return $http({
                method: 'POST',
                url: link,
                data: pokemonData
            });
        },

        deletePokemon: function(pokemonId) {
            return $http({
                method: 'DELETE',
                url: link + '/' + pokemonId,
            });
        },

        updatePokemon: function (pokemonData) {
            return $http({
                method: 'PUT',
                url: link + '/' + pokemonData.objectId,
                data: pokemonData
            });
        }
    }
});