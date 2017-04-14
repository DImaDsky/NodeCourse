'use strict';
let hidenseek = require('./hidenseek'),
    {Pokemon, PokemonList} = require('./classes');

let p1 = new Pokemon('Tor', 31),
    p2 = new Pokemon('Buba', 11),
    p3 = new Pokemon('Kiri', 19),
    p4 = new Pokemon('Asd', 88),
    p5 = new Pokemon();

let pokemons = new PokemonList ('pokemonsHere',p1, p2, p3, p4, p5);

pokemons.show();

let hide = hidenseek.hide('./field/', pokemons);
hide.then(
    (hidden)=>{
        console.log('some pokemons lost');
        pokemons.show();
        hidden[0].show();
        hidenseek.seek('./field/').then( find => {
            find[0].show();
        }).catch(console.log);
    }
).catch(console.log);


// process.argv.forEach(z=>{
//     console.log(z);
// });