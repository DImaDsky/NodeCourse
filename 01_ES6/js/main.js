'use strict';

class Pokemon{
    constructor (name = 'NoName', level = 0){
        this.name = name;
        this.level = level;
    }
    show () {
        console.log(`Pokemon: ${this.name} with level: ${this.level}`);
    }
    valueOf(){
        return this.level;
    }
}

class PokemonList extends Array{
    constructor (name, ...pokemons){
        super(...pokemons);
        this.name = name;
    }
    add(name, level){
        this.push(new Pokemon (name, level));
    }
    show(){
        console.log('Pokemon list:');
        for (let pokemon of this) {
            pokemon.show();
        }
    }
    max(){
        let max = -1;
        this.forEach(p=>{
            if(max < p.valueOf()){
                max = p;
            }
        });
        return max
        //Math.max(...this);
    }
    static changeList(nameFrom, from, to){
        let indexFrom = from.findIndex((el, i)=>{
            if(el.name == nameFrom){
                return true;
            }
        });
        if(indexFrom == -1){
            console.log('No pokemon with such name')
        }
        to.push(from[indexFrom]);
        from.splice(indexFrom, 1);
    }
}

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



