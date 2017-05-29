"use strict";
const should = require('chai').should();

let {Pokemon,PokemonList} = require('../pokemon.js');

describe('Pokemon Tests:', () => {
    it('ValueOf returning pokemon level', () => {
        let pok = new Pokemon('Name', 55);
        (pok.valueOf()).should.equal(55, 'wrong level get by valueOf');
    });
});
