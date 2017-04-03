"use strict";
let fs = require('fs'),
    {Pokemon, PokemonList} = require('./classes');

function random(min, max) {//from min to max, including max
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.hide = function (hidePlace, pokemonList) {
    return new Promise((returnResolve) => {
        let dirPromises = [];
        if (!fs.existsSync(hidePlace)) {
            fs.mkdirSync(hidePlace);
        }
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
                written = [],
                hideUpTo = pokemonList.length < 3 ? pokemonList.length: 3;

            for(let i = random(1, hideUpTo); i >= 0; i--){
                let folderN = random(0,9),
                    hide = random(0, pokemonList.length - 1),
                    text = pokemonList[hide].name + '|' + pokemonList[hide].level + ';';
                hidden.push(pokemonList[hide]);
                pokemonList.splice(hide,1);
                written.push(new Promise(resolve => {
                    fs.writeFile(hidePlace + folderN + "/pokemon.txt", text, (err) => {
                        if(err) { console.log(err) }
                        resolve();
                    });
                }));

            }
            Promise.all(written).then( () => {returnResolve(hidden)} );
        });
    });
};

exports.seek = function (hidePlace) {
    let find = new PokemonList('find'),
        promises = [];
    for(let i = 0; i < 10;i++){
        promises.push(new Promise(resolve => {
            if(!fs.existsSync(hidePlace + i + "/pokemon.txt")){
                resolve();
                return;
            }
            fs.readFile(hidePlace + i + "/pokemon.txt", 'utf8', (err, data) => {
                if (err) { throw err }
                let pokemonArr,
                    pokemonStrings = data.split(';');

                pokemonStrings.forEach((item)=>{
                    if(!item) {return}
                    pokemonArr = item.split('|');
                    find.push(new Pokemon(pokemonArr[0],pokemonArr[1]));
                });

                console.log('data', data);
                resolve();
            });
        }))
    }
    Promise.all(promises).then(() => {find.show()});
};