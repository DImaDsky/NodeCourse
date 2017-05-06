"use strict";
var users;
var buffer;
function sendReq(type, url, data, cb) {
    var url = 'http://127.0.0.1:1337/api/' + url;
    $.ajax({
        url: url,
        type: type,
        success: cb || function (res) {
            showResponse(res);
        },
        data: data,
        error: console.log
    });
}

function showResponse(res) {
    var list = '';
    var options = '';
    if(!res.forEach){
        console.log('Wrong response / Not Array');
        return
    }
    res.forEach(function (item, i) {
        list += '<tr data-id="' + item.id + '"><td>' + item.name + '</td><td>' + item.surname + '</td><td>' + item.tel +
            '</td><td class="edit">Edit</td><td class="delete">Remove</td></tr>';
        options += '<option value="' + item.id + '">' + item.name + '</option>'
    });
    $('#usersList').html(list);
    $('#taskUser').html(options);
    users = res;
}
function closeEdit() {
    $('.edit_block').hide();
    $('.shadow_block').hide();
}

$('#getAll').on('click', function () {
    sendReq('GET', 'users/');
});

//ADD NEW
$('#addNew').on('click', function () {
    sendReq('POST', 'users/', {name:'Name' + (Math.random() + '').substr(2,4), surname:'newName', tel:0});
});

//Before EDIT
$('#usersList').on('click', '.edit', function (e) {
    var id = $(e.target).parent('tr').data('id');
    buffer = users.find(el => {return el.id == id});
    $('#userId').val(id);
    $('#name').val(buffer.name);
    $('#surname').val(buffer.surname);
    $('#tel').val(buffer.tel);
    $('.users .edit_block').show();
    $('.shadow_block').show();
});

//EDIT
$('#editUser').on('click', function (e) {
    var id = $('#userId').val();
    var data = {
        id: buffer.id,
        values: {
            name:$('#name').val(),
            surname:$('#surname').val(),
            tel:$('#tel').val()
        }
    };

    sendReq('PUT', 'users/' + id, data, function (res) {
        showResponse(res);
        closeEdit();
    });
});
$('.cancel').on('click', closeEdit);

//DELETE
$('#usersList').on('click', '.delete', function (e) {
    var id = $(e.target).parent('tr').data('id');
    sendReq('DELETE', 'users/' + id);
});


sendReq('GET', 'users/');
sendReq('GET', 'tasks/');