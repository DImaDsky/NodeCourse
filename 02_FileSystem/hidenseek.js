"use strict";
let fs = require('fs'),
    {Pokemon, PokemonList} = require('./classes');

function random(min, max) {//from min to max, including max
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
fs.writeFilePromise = function (path, text, prevResult){
    return new Promise(resolve=>{
        fs.writeFile(path, text, (err)=>{
            if(err) { console.log(err) }
            resolve(prevResult)
        })
    });
};

fs.mkdirPromise = function (dir) {
    return new Promise(resolve => {
        fs.mkdir(dir, err =>{
            if (err) {console.log('dir exists')}
            resolve()
        })
    })
};

fs.readFilePromise = function (dir, encode, cb) {
    if(!fs.existsSync(dir)){
        return;
    }
    return new Promise(resolve => {
        fs.readFile(dir, encode, (err, data) => {
            if (err) { throw err }
            let result = cb(data);
            resolve(result);
        })
    })
};

exports.hide = function (hidePlace, pokemonList) {
        let dirPromises = [];
        if (!fs.existsSync(hidePlace)) {
            fs.mkdirSync(hidePlace);
        }
        for(let i = 0; i < 10; i++){
            dirPromises.push(fs.mkdirPromise(hidePlace + i));
        }

        return Promise.all(dirPromises).then( () => {
            let hidden = new PokemonList('hidden'),
                written = [],
                hideUpTo = pokemonList.length < 3 ? pokemonList.length : 3;

            for(let i = random(1, hideUpTo); i > 0; i--){
                let folderN = random(0,9),
                    hide = random(0, pokemonList.length - 1),
                    text = pokemonList[hide].name + '|' + pokemonList[hide].level + ';';
                console.log('Lost:', text);
                hidden.push(pokemonList[hide]);
                pokemonList.splice(hide,1);
                written.push(fs.writeFilePromise(hidePlace + folderN + "/pokemon.txt", text, hidden));
            }
            return Promise.all(written)//.then( () => {returnResolve(hidden)} );
        }).catch(console.log);
};

exports.seek = function (hidePlace) {
    let find = new PokemonList('find'),
        promises = [];
    for(let i = 0; i < 10; i++){
        promises.push(
            fs.readFilePromise(hidePlace + i + "/pokemon.txt", 'utf8', data => {
                let pokemonArr,
                    pokemonStrings = data.split(';');

                pokemonStrings.forEach((item)=>{
                    if(!item) {return}
                    pokemonArr = item.split('|');
                    find.push(new Pokemon(pokemonArr[0],pokemonArr[1]));
                });

                console.log('data', data);
                return find;
            })
        )
    }

    return Promise.all(promises).then( () => {return find} );
};