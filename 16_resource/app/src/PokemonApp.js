var pokemonApp = angular.module('PokemonApp', ['ngRoute', 'ngResource']);

angular.
module('PokemonApp')

.config(['$routeProvider',
    function config($routeProvider) {

        $routeProvider.
        when('/pokemons', {
            templateUrl: 'src/PokemonList/PokemonList.html',
            controller: 'PokemonListCtrl'
        }).
        when('/berries', {
            templateUrl: 'src/BerryList/BerryList.html',
            controller: 'BerryListCtrl'
        }).
        when('/pokemons/:pokemonId', {
            templateUrl: 'src/PokemonDetail/PokemonDetail.html',
            controller: 'PokemonDetailCtrl'
        }).
        when('/berry/:berryId', {
            templateUrl: 'src/BerryDetail/BerryDetail.html',
            controller: 'BerryDetailCtrl'
        }).
        when('/edit/:pokemonId', {
            templateUrl: 'src/EditPokemon/EditPokemon.html',
            controller: 'EditPokemonCtrl'
        }).
        when('/editBerry/:berryId', {
            templateUrl: 'src/EditBerry/EditBerry.html',
            controller: 'EditBerryCtrl'
        }).
        when('/create', {
            templateUrl: 'src/CreatePokemon/CreatePokemon.html',
            controller: 'CreatePokemonCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
])

.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.common = {
        "application-id": "4B730C92-F81E-236B-FFF0-6651FE882800",
        "secret-key": "CB6DE86C-6069-86C4-FF1C-9049D5AC9400"
    };

}]);
