"use strict";
const express = require('express'),
    app = express(),
    http = require('http').createServer(app),
    io = require('socket.io')(http),
    port = process.env.PORT || 1337;


http.listen(port, ()=>{
    console.log('listen at port', port);
});

app.use(express.static(__dirname + '/frontend'));

let usersQnt = 0;

io.on('connection', socket => {

    socket.on('send message', function (msg) {
        socket.broadcast.emit('add message', {
            username: socket.username,
            msg: msg
        });
    });

    socket.on('add user', (username) => {
        usersQnt++;
        socket.username = username;

        socket.broadcast.emit('new user', {
            username: socket.username
        });
        socket.emit('users change', {
            qnt: usersQnt
        });
    });
});