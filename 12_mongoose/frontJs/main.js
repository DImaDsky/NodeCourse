"use strict";
var users;
function sendReq(type, url, data, cb) {
    $.ajax({
        url: 'http://127.0.0.1:1337/api/' + url,
        type: type,
        success: cb || function (res) {
            if(url.substr(0,5)  == 'tasks'){
                showTaskResponse(res)
            } else {
                showUserResponse(res);
            }
        },
        data: data,
        error: console.log
    });
}

function showUserResponse(res) {
    var list = '';
    var options = '';
    if(!res.forEach){
        console.log('Wrong response / Not Array');
        return;
    }
    res.forEach(function (item, i) {
        list += '<tr data-id="' + item._id + '"><td>' + item.name + '</td><td>' + item.surname + '</td><td>' + item.tel +
            '</td><td class="edit">Edit</td><td class="delete">Remove</td></tr>';
        options += '<option value="' + item._id + '">' + item.name + '</option>'
    });
    $('#usersList').html(list);
    $('#taskUser').html(options);
    users = res;
}

function showTaskResponse(res) {
    var list = '';
    if(!res.forEach){
        console.log('Wrong response / Not Array');
        return;
    }
    res.forEach(function (item, i) {
        list += '<tr data-id="' + item._id + '"><td>' + item.name + '</td><td>' + item.description +
            '</td><td>' + item.status +
            '</td><td>' + item.user +
            '</td><td class="edit">Edit</td><td class="delete">Remove</td></tr>';
    });
    $('#tasksList').html(list);
}

function closeEdit() {
    $('.edit_block').hide();
    $('.shadow_block').hide();
}

(function () {
    var curUser;
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
        curUser = users.find(el => {return el._id == id});
        $('#name').val(curUser.name);
        $('#surname').val(curUser.surname);
        $('#tel').val(curUser.tel);
        $('.users .edit_block').show();
        $('.shadow_block').show();
    });

    //EDIT
    $('#editUser').on('click', function (e) {
        var data = {
            id: curUser._id,
            values: {
                name:$('#name').val(),
                surname:$('#surname').val(),
                tel:$('#tel').val()
            }
        };

        sendReq('PUT', 'users/' + curUser._id, data, function (res) {
            showUserResponse(res);
            closeEdit();
        });
    });
    $('.cancel').on('click', closeEdit);

    //DELETE
    $('#usersList').on('click', '.delete', function (e) {
        var id = $(e.target).parent('tr').data('id');
        sendReq('DELETE', 'users/' + id);
    });
})();

(function () {
    var curTask;
    $('#getAllTasks').on('click', function () {
        sendReq('GET', 'tasks/');
    });

    //ADD NEW
    $('#addNewTask').on('click', function () {
        sendReq('POST', 'tasks/', {
            name:'Name' + (Math.random() + '').substr(2,4),
            description: '',
            status: 'open'
        });
    });

    //Before EDIT
    $('#tasksList').on('click', '.edit', function (e) {
        var id = $(e.target).parent('tr').data('id');
        sendReq('GET', 'tasks/' + id, null, data => {
            curTask = data;
            $('#taskName').val(curTask.name);
            $('#taskDescr').val(curTask.description);
            $('#taskStatus').val(curTask.status);
            $('#taskUser').val(curTask.user || '');
        });
        $('.tasks .edit_block').show();
        $('.shadow_block').show();
    });

    //EDIT
    $('#editTask').on('click', function (e) {
        var data = {
            id: curTask._id,
            values: {
                name:$('#taskName').val(),
                description:$('#taskDescr').val(),
                status:$('#taskStatus').val()
            }
        };
        if( null != $('#taskUser').val()){
            data.values.user = $('#taskUser').val();
        }
        sendReq('PUT', 'tasks/' + curTask._id, data, function (res) {
            showTaskResponse(res);
            closeEdit();
        });
    });
    $('.cancel').on('click', closeEdit);

    //DELETE
    $('#tasksList').on('click', '.delete', function (e) {
        var id = $(e.target).parent('tr').data('id');
        sendReq('DELETE', 'tasks/' + id);
    });

    $('#searchTask').on('click', function () {
        var search = $('#searchFor').val();
        if(search){
            sendReq('GET', 'tasks/search/' + search);
        }
    });
})();

sendReq('GET', 'users/');
sendReq('GET', 'tasks/');