var pokemonApp = angular.module('PokemonApp', ['ngRoute', 'btford.socket-io']);

angular
    .module('PokemonApp')

.config(['$routeProvider',
    function config($routeProvider) {
        $routeProvider.
        when('/pokemons', {
            templateUrl: 'src/PokemonList/PokemonList.html',
            controller: 'PokemonListCtrl'
        }).
        when('/pokemons/:pokemonId', {
            templateUrl: 'src/PokemonDetail/PokemonDetail.html',
            controller: 'PokemonDetailCtrl'
        }).
        when('/create', {
            templateUrl: 'src/CreatePokemon/CreatePokemon.html',
            controller: 'CreatePokemonCtrl'
        }).
        when('/realtime/:userName', {
            templateUrl: 'src/PokemonRealtime/PokemonRealtime.html',
            controller: 'PokemonRealtimeCtrl'
        }).
        when('/pokemon/edit/:pokemonId', {
            templateUrl: 'src/CreatePokemon/CreatePokemon.html',
            controller: 'EditPokemonCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
])
.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.common = {
        "application-id": "5CAF4EE9-326C-6070-FF6D-E72278541500",
        "secret-key": "22656574-93DD-CAB8-FF95-A5935A106200"
    };
}])
.factory('mySocket', function(socketFactory) {
  var myIoSocket = io.connect('https://netology-socket-io.herokuapp.com/');

    mySocket = socketFactory({
      ioSocket: myIoSocket
    });

    return mySocket;
});
