"use strict";
const assert = require('chai').assert;
const expect = require('chai').expect;

let {Pokemon,PokemonList} = require('../pokemon.js');

describe('PokemonList Tests:', () => {
    let pList;
    beforeEach(() => {
        pList  = new PokemonList ('found', (new Pokemon('Tor', 31)), (new Pokemon('Buba', 11)));
    });

    it('value added', () => {
        let startLen = pList.length;
        pList.add('Newbie');
        expect(pList.length, 'wrong length after addition').to.equal(startLen + 1);
    });

    let testsMax = [
        {add: 100, expect: 100},
        {add: 0, expect: 31},
        {add: 31, expect: 31},
    ];

    testsMax.forEach( values => {
        it('function max', () => {
            //console.log(pList.length)  // same length at te begin of every test due to beforeEach
            pList.add('SomeName', values.add);
            assert((pList.max()).level == values.expect, 'max returned wrong value');
        });
    });

});