"use strict";
let fs = require('fs'),
    {Pokemon, PokemonList} = require('./classes');

const hidePlace = './field/';

function random(min, max) {//from min to max, including max
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.hide = function (folderName, pokemonList, callback) {
    let dirPromises = [];
    fs.mkdirSync(hidePlace);
    for(let i = 0; i < 10; i++){
        dirPromises.push(new Promise(
            (resolve) => { fs.mkdir(hidePlace + i, error => {
                //if (error) {console.log('dir exists')}
                resolve();
            })}
        ));
    }
    Promise.all(dirPromises).then( () => {
        let hidden = new PokemonList('hidden'),
            text = '',
            hideUpTo = pokemonList.length < 3 ? pokemonList.length: 3;

        for(let i = random(1, hideUpTo); i >= 0; i--){
            let hide = random(0, pokemonList.length - 1);
            hidden.push(pokemonList[hide]);
            text += pokemonList[hide].name + '|' + pokemonList[hide].level + ';'
            pokemonList.splice(hide,1);
        }
        fs.writeFile(hidePlace + folderName + "/pokemon.txt", text, (err) => {
            if(err) { throw err }
            if(typeof callback == 'function') {
                callback(hidden);
            }
        });
    });
};

exports.seek = function (folderName) {

    fs.readFile(hidePlace + folderName + "/pokemon.txt", 'utf8', (err, data) => {
        if (err) { throw err }
        let pokemonArr,
            pokemonStrings = data.split(';'),
            find = new PokemonList('find');
        pokemonStrings.forEach((item)=>{
            if(!item) {return}
            pokemonArr = item.split('|');
            find.push(new Pokemon(pokemonArr[0],pokemonArr[1]));
        });

        console.log('data', data);
        find.show();
    });
};