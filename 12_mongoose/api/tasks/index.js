"use strict";
const express = require('express');
const app = module.exports = express();
const {mongoose, db} = require('../mongodb/mongooseConnect');

let taskSchema = new mongoose.Schema({
    name: String,
    description: String,
    status: String,
    user: mongoose.Schema.Types.ObjectId
});

let Task = db.model('tasks', taskSchema);
Task.on('error', function(error) {
    console.log(error);
});

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

function getAllRows(res) {
    Task.find({}, null, (err, tasks)=>{
        if(err){console.log(err)}
        res.json(tasks);
    });
}

app.post('/',(req, res) => {
    let task = new Task({name:req.body.name,description:req.body.description,status:req.body.status});
    task.save((err, result)=>{
        if(err){console.log(err)}
        getAllRows(res);
    });
});
app.get('/',(req, res) => {
    getAllRows(res);
});
app.get('/:id',(req, res) => {
    Task.findById(req.params.id, null, null, (err, tasks)=>{
        if(err){console.log(err)}
        res.json(tasks);
    });
});
app.get('/search/:val',(req, res) => {
    Task.find({name: new RegExp(req.params.val, 'g')}, null, null, (err, tasks)=>{//`/${req.params.val}/i`
        if(err){console.log(err)}
        res.json(tasks);
    });
});
app.put('/:id',(req, res) => {
    Task.update({_id: mongoose.Types.ObjectId(req.params.id)}, {$set:req.body.values}, (err, result) => {
        if(err){console.log(err);}
        getAllRows(res);
    });
});
app.delete('/:id',(req, res) => {
    Task.remove({_id: mongoose.Types.ObjectId(req.params.id)}, (err, result) => {
        if(err){console.log(err);}
        getAllRows(res);
    });
});

app.all('*', (req, res) => {
    res.status(404).send('Not Found tasks')
});

app.use((err, req, res, next)=>{
    debugger
    res.status(500).send('Server Error ' + err.message);
});