angular
.module('PokemonApp')
.factory('BerriesService', function($resource) {
    var link = 'https://api.backendless.com/5CAF4EE9-326C-6070-FF6D-E72278541500/22656574-93DD-CAB8-FF95-A5935A106200/data/';

    //return $resource('https://api.backendless.com/v1/data/pokemon/:pokemonId/', {
    return $resource(link + 'berry/:berryId/', {
        berryId: '@berryId'
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
