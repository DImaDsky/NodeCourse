angular
    .module('PokemonApp')
    .factory('BerriesService', function($http) {
        var link = 'https://api.backendless.com/5CAF4EE9-326C-6070-FF6D-E72278541500/22656574-93DD-CAB8-FF95-A5935A106200/data/';
            return {
                getBerries: function() {
                    return $http.get(link + 'berry?pageSize=5');
                }

            }

        }

    );
