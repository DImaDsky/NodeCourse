"use strict";
const express = require('express');
const app = module.exports = express();


let users = [{name:'Vova', score:10}, {name:'Tom', score:7}, {name:'Alex', score:20}];
/*
 --> {jsonrpc: 2.0, method: "mul", params: [2, 3], id: 2}
 <‐‐ {jsonrpc: 2.0, result: 6, id: 2}
 */
const RPC = {
    create(params, cb){
        users.push({name:params.params.name,score:params.params.score});
        if(typeof cb === 'function') {
            cb(null, {jsonrpc: 2.0, result: users});
        }
    },
    read(params, cb){
        let result = users;
        if(!isNaN(params.id)){
            result = users[params.id];
        }
        if(typeof cb === 'function') {
            cb(null, {jsonrpc: 2.0, result: result});
        }
    },
    update(params, cb){
        let id = params.id;
        users[id] = {name:params.params.name,score:params.params.score};
        if(typeof cb === 'function') {
            cb(null,{jsonrpc: 2.0, result: users});
        }
    },
    remove(params, cb){
        let id = params.id;
        users.splice(id,1);
        if(typeof cb === 'function') {
            cb(null,{jsonrpc: 2.0, result: users});
        }
    }
};
function setHeader(res) {
    res.header ('Access-Control-Allow-Origin', '*');
    res.header ('Access-Control-Allow-Credentials', true);
}

app.post('/',(req, res) => {
    const method = RPC[req.body.method];
    setHeader(res);
    if (method === undefined){
        res.send(405, 'Wrong request');
        return;
    }
    method(req.body, function(error, result) {
        res.json(result);
    });
});

app.all('*', (req, res) => {
    res.send(404, 'Not Found')
});

app.use((err, req, res, next)=>{
    res.send(500, 'Server Error')
});