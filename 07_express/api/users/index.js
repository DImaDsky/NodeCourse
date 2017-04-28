"use strict";
const express = require('express');
const app = module.exports = express();

let users = [{name:'Vova', score:10}, {name:'Tom', score:7}, {name:'Alex', score:20}];

function setHeader(res) {
    res.header ('Access-Control-Allow-Origin', '*');
    res.header ('Access-Control-Allow-Credentials', true);
}

app.post('/',(req, res) => {
    users.push({name:req.body.name,score:req.body.score});
    setHeader(res);
    res.json(users);
});
app.get('/',(req, res) => {
    setHeader(res);
    res.json(users);
});
app.get('/:id',(req, res) => {
    let id = req.params.id;
    setHeader(res);
    res.json(users[id]);
});
app.put('/:id',(req, res) => {
    let id = req.params.id;
    users[id] = {name:req.body.name,score:req.body.score};
    setHeader(res);
    debugger
    res.json(users);
});
app.delete('/:id',(req, res) => {
    let id = req.params.id;
    users.splice(id,1);
    setHeader(res);
    debugger
    res.json(users);
});

app.all('*', (req, res) => {
    if(req.method == 'OPTIONS'){ // Вместо PUT / DELETE приходит OPTIONS из Хрома ????
        res.send(405, 'Wrong request');
        return;
    }
    res.send(404, 'Not Found')
});

app.use((err, req, res, next)=>{
    res.send(500, 'Server Error')
});