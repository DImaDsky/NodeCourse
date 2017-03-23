'use strict';

class Pokemon{
    constructor (name = 'NoName', level = 0){
        this.name = name;
        this.level = level;
    }
    show () {
        console.log(this.name, this.level);
    }
    valueOf(){
        return this.level;
    }
}

class PokemonList extends Array{
    constructor (name, ...pokemons){
        super();
        this.name = name;
        for (let p of pokemons) {
            this.push(p);
        }
    }
    add(name, level){
        this.push(new Pokemon (name, level));
    }
    show(){
        let show = `In list ${this.name} - ${this.length} pokemons: `;
        for (let pokemon of this) {
            show += pokemon.name + `(${pokemon.level}) `;
        }
        console.log(show);
    }
    max(){
        return Math.max(...this);
    }
    static changeList(indexFrom, from, to){
        to.push(from[indexFrom]);
        from.splice(indexFrom, 1);
    }
}

let p1 = new Pokemon('Tor', 31),
    p2 = new Pokemon('Buba', 11),
    p3 = new Pokemon('Kiri', 19),
    p5 = new Pokemon();

p5.show();

let found  = new PokemonList ('found', p1, p2),
    lost  = new PokemonList ('lost', p3, p5);

lost.add('Newbie');
console.log('Max level', found.max());
PokemonList.changeList(0, lost, found);
found.show();
lost.show();



