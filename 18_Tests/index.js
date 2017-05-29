let {Pokemon,PokemonList} = require('./pokemon');

let p1 = new Pokemon('Tor', 31),
    p2 = new Pokemon('Buba', 11),
    p3 = new Pokemon('Kiri', 19),
    p5 = new Pokemon();

let found  = new PokemonList ('found', p1, p2),
    lost  = new PokemonList ('lost', p3, p5);

lost.add('Newbie');
found.max().show();
PokemonList.changeList('Kiri', lost, found);
found.show();
lost.show();