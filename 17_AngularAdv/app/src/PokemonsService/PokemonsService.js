angular
.module('PokemonApp')
.factory('PokemonsService', function($resource) {
    var link = 'https://api.backendless.com/5CAF4EE9-326C-6070-FF6D-E72278541500/22656574-93DD-CAB8-FF95-A5935A106200/data/';

    return $resource(link + 'pokemon/:pokemonId/', {
        pokemonId: '@pokemonId'
    }, {
        query: {
            method: 'GET',
            isArray: true,
            transformResponse: function(responseData) {
                return angular.fromJson(responseData);
            }
        },
        update: {
            method: 'PUT'
        }
    })
});
