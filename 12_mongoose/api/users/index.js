"use strict";
const express = require('express');
const app = module.exports = express();
const {mongoose, db} = require('../mongodb/mongooseConnect');

let userSchema = new mongoose.Schema({
    name: String,
    surname: String,
    tel: Number
});

let User = db.model('users', userSchema);
User.on('error', function(error) {
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

function getAllUsers(res) {
    User.find({}, null, (err, users)=>{
        if(err){console.log(err)}
        res.json(users);
    });
}

app.post('/',(req, res) => {
    let user = new User({name:req.body.name,surname:req.body.surname,tel:req.body.tel});
    user.save((err, result)=>{
        if(err){console.log(err)}
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
    User.update({_id: mongoose.Types.ObjectId(req.params.id)}, req.body.values, (err, result) => {
        if(err){console.log(err);}
        getAllUsers(res);
    });
});
app.delete('/:id',(req, res) => {
    User.remove({_id: mongoose.Types.ObjectId(req.params.id)}, (err, result) => {
        if(err){console.log(err);}
        getAllUsers(res);
    });
});


app.all('*', (req, res) => {
    res.status(404).send('Not Found')
});

app.use((err, req, res, next)=>{
    res.status(500).send('Server Error ' + err.message);
});