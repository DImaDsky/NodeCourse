var users;
function sendReq(type, url, data, cb) {
    var url = 'http://127.0.0.1:1337/api/' + url;
    $.ajax({
        url: url,
        type: type,
        success: cb || function (res) {
            showResponse(res);
        },
        data:data,
        error:console.log
    });
}
function sendReqRPC(data) {
    sendReq('POST', 'rpc/', data);//JSON.stringify(data)
}

function showResponse(res) {
    var txt = '';
    if ($('.apiType:checked').val() === 'rpc'){
        res = res.result;
    }
    res.forEach(function (item, i) {
        txt += '<tr data-id="' + i + '"><td>' + item.name + '</td><td>' + item.score +
            '</td><td class="edit">Edit</td><td class="delete">Remove</td></tr>';
    });
    $('#usersList').html(txt);
    users = res;
}

$('#getAll').on('click', function () {
    if ($('.apiType:checked').val() === 'rpc'){
        sendReqRPC({jsonrpc: 2.0, method: "read"});
        return;
    }
    sendReq('GET', 'users/');
});

//ADD NEW
$('#addNew').on('click', function () {
    if ($('.apiType:checked').val() === 'rpc'){
        sendReqRPC({jsonrpc: 2.0, method: "create", params:{name:'NewName',score:0}});
        return;
    }
    sendReq('POST', 'users/', {name:'NewName',score:0});
});

//Before EDIT
$('#usersList').on('click', '.edit', function (e) {
    var id = $(e.target).parent('tr').data('id');
    $('#userId').val(id);
    $('#name').val(users[id].name);
    $('#score').val(users[id].score);
    $('.right').show();
});

//EDIT
$('#edit').on('click', function (e) {
    var id = $('#userId').val();
    var data = {name:$('#name').val(),score:$('#score').val(), id:id};
    if ($('.apiType:checked').val() === 'rpc'){
        sendReqRPC({jsonrpc: 2.0, method: "update", params: data, id: id});
        return;
    }
    sendReq('PUT', 'users/' + id, data, function (res) {
        showResponse(res);
        $('.right').hide();
    });
});

//DELETE
$('#usersList').on('click', '.delete', function (e) {
    var id = $(e.target).parent('tr').data('id');
    if ($('.apiType:checked').val() === 'rpc'){
        sendReqRPC({jsonrpc: 2.0, method: "remove", id: id});
        return;
    }
    sendReq('DELETE', 'users/' + id);
});
