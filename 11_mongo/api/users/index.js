"use strict";
const express = require('express');
const db = require('../mongodb/database');
const app = module.exports = express();

let users = [{name:'Vova', surname:'Ivanov', tel:24587234978}, {name:'Tom', surname:'ludc', tel:3635682107}, {name:'Alex', surname:'ufca', tel:975476633}];

function setHeader(res) {
    // res.header ('Access-Control-Allow-Origin', '*');
    // res.header ('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
    // res.header ('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    // res.header ('Access-Control-Allow-Credentials', true);
}

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    if ('OPTIONS' == req.method) {
        res.status(200).send();
    } else {
        next();
    }
};
app.use(allowCrossDomain);

function getAllUsers(res) {
    db.read().then(users => {
        res.json(users);
    });
}

app.post('/',(req, res) => {
    db.create({name:req.body.name,surname:req.body.surname,tel:req.body.tel}).then(err => {
        getAllUsers(res);
    });
});
app.get('/',(req, res) => {
    getAllUsers(res);

});
app.get('/:id',(req, res) => {
    let id = req.params.id;
    setHeader(res);
    res.json(users[id]);
});
app.put('/:id',(req, res) => {
    db.update(req.body.id, req.body.values).then( r => {
        console.log('r',r);
        getAllUsers(res);
    });

});
app.delete('/:id',(req, res) => {
    db.delete(req.params.id).then( r => {
        getAllUsers(res);
    });
});


app.all('*', (req, res) => {
    res.status(404).send('Not Found')
});

app.use((err, req, res, next)=>{
    res.status(500).send('Server Error ' + err.message);
});