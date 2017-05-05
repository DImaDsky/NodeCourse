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
    var txt = '';
    res.forEach(function (item, i) {
        txt += '<tr data-id="' + item.id + '"><td>' + item.name + '</td><td>' + item.surname + '</td><td>' + item.tel +
            '</td><td class="edit">Edit</td><td class="delete">Remove</td></tr>';
    });
    $('#usersList').html(txt);
    users = res;
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
    $('.right').show();
});

//EDIT
$('#edit').on('click', function (e) {
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
        $('.right').hide();
    });
});

//DELETE
$('#usersList').on('click', '.delete', function (e) {
    var id = $(e.target).parent('tr').data('id');
    sendReq('DELETE', 'users/' + id);
});
