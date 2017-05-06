"use strict";
const express = require('express');
const db = require('../mongodb/database');
const app = module.exports = express();

let allowCrossDomain = function(req, res, next) {
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
    db.read('users').then(users => {
        res.json(users);
    });
}

app.post('/',(req, res) => {
    db.create('users', {name:req.body.name,surname:req.body.surname,tel:req.body.tel}).then(err => {
        getAllUsers(res);
    });
});
app.get('/',(req, res) => {
    getAllUsers(res);
});
app.get('/:id',(req, res) => {
    let id = req.params.id;
    res.json(users[id]);
});
app.put('/:id',(req, res) => {
    db.update('users', req.body.id, req.body.values).then( r => {
        console.log('r',r);
        getAllUsers(res);
    });

});
app.delete('/:id',(req, res) => {
    db.delete('users', req.params.id).then( r => {
        getAllUsers(res);
    });
});


app.all('*', (req, res) => {
    res.status(404).send('Not Found')
});

app.use((err, req, res, next)=>{
    res.status(500).send('Server Error ' + err.message);
});