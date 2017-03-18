/*
 использовать возможности ES2015 по максимуму.

 Создать класс Pokemon, конструктор которого принимает имя и уровень в качестве аргумента.
 Все экземпляры этого класса должны иметь общий метод show, который выводит информацию о покемоне.
 Создать класс PokemonList, который в качестве аргументов принимает любое количество покемонов.
 Экземпляры этого класса должны обладать всеми функциями массива. А так же иметь метод add, который принимает в качестве
  аргументов имя и уровень, создает нового покемона и добавляет его в список.

 Создать два списка покемонов и сохранить их в переменных lost и found. Имена и уровни придумайте самостоятельно.
 Добавить несколько новых покемонов в каждый список.
 Добавить спискам покемонов метод show, который выводит информацию о покемонах и их общее количество в списке.
 Перевести одного из покемонов из списка lost в список found
+
 Добавить спискам покемонов метод max, который возвращает покемона максимального уровня.
 Переопределите и используйте метод valueOf у покемонов, для решения этой задачи.
 */

// 'use strict';

class Pokemon{
    constructor (name = 'NoName', level = 0){
        this.name = name;
        this.level = level;
    }
    show () {
        console.log(this.name, this.level);
    }
}

class PokemonList extends Array{
    constructor (...pokemons){
        super();
        for (let p of pokemons) {
            this.push(p);
        }
    }
    add(name, level){
        this.push(new Pokemon (name, level));
    }
    max(){

    }
    static changeList(indexFrom, from, to){
        to.push(from[indexFrom]);
        from.splice(indexFrom, 1);
    }
}


let p1 = new Pokemon('Tor', 31),
    p2 = new Pokemon('Buba', 11),
    p3 = new Pokemon('Kiri', 19),
    p4 = new Pokemon('Fif', 2),
    p5 = new Pokemon();

p5.show();

let found  = new PokemonList (p1, p2),
    lost  = new PokemonList (p3, p4, p5);
debugger
lost.add('Newbie');

PokemonList.changeList(0, lost, found);
console.log(lost, found);


