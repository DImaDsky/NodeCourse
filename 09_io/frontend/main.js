"use strict";
var $usernameInput = $('.usernameInput');
var $messages = $('.messages');
var $inputMessage = $('.inputMessage');

var username;

var socket = io();

function addMsg(data) {
    var newMsg = '<div><span class="usr">' + data.username + ':</span> ' + data.msg + '</div>';
    $messages.append(newMsg);
}

$(window).keydown(function (e) {
    if(e.keyCode == 13){
        if (username){
            var msg = $inputMessage.val();
            $inputMessage.val('');
            socket.emit('send message', msg);
            addMsg({username:username, msg: msg})
        } else {
            username = $usernameInput.val();
            $('#chatBlock').show();
            $('#loginBlock').hide();
            socket.emit('add user', username);
            $inputMessage.focus();
        }
    }
});

socket.on('add message', addMsg);

socket.on('new user', function (o) {
    $messages.append('<div class="newUser">' + o.username + ' here </div>');
});

socket.on('users change', function (o) {
    $messages.append('<div>users online: ' + o.qnt + '</div>');
});