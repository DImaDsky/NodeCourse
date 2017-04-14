"use strict";
let fs = require('fs'),
    {Pokemon, PokemonList} = require('./classes');

function random(min, max) {//from min to max, including max
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.hide = function (hidePlace, pokemonList) {
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
                written.push(new Promise(resolve => {
                    fs.writeFile(hidePlace + folderN + "/pokemon.txt", text, (err) => {
                        if(err) { console.log(err) }
                        resolve(hidden);
                    });
                }));
            }
            return Promise.all(written)//.then( () => {returnResolve(hidden)} );
        }).catch(console.log);
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
                resolve(find);
            });
        }))
    }
    return Promise.all(promises);
};
/*
let z = new Promise(done=>{
    console.log('z');
    return new Promise(ready=>{
        setTimeout(()=>{
            console.log('z->ready');
            ready(); done();
        },4000)
    });

});
let x = z.then(
    function (zzz) {
        console.log('zzz',zzz)
    }
    // new Promise(resolve=>{
    // setTimeout(()=>{
    //     console.log('resolve');
    //     resolve()
    // },2000)
    // })
);
x.then(()=>{console.log('All');})


function  getUserByName(name) {
    return new Promise(done=>{
        setTimeout(()=>{done(33333)}, 2000)
    });
}
getUserByName('nolan').then(function (user) {
    console.log('user',user);
    return new Promise(done=>{
        setTimeout(()=>{done(44444)}, 2000)
    });
    // if (inMemoryCache[user.id]) {
    //     // Данные этого пользователя уже есть,
    //     // возвращаем сразу
    //     return inMemoryCache[user.id];
    // }
    // // А вот про этого пока не знаем,
    // // вернем промис запроса
    // return getUserAccountById(user.id);
})
    .then(function (userAccount) {
        console.log('userAccount',userAccount);
        // Я знаю все о пользователе!
    });
    /**/