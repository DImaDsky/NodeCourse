angular
    .module('myApp')
    .factory('AccountService', function() {
        return {
            save: function (data) {
                sessionStorage.setItem('name', data.name);
                sessionStorage.setItem('email', data.email);
                sessionStorage.setItem('phone', data.phone);
            },
            read: function () {
                var name = sessionStorage.getItem('name');
                var accountData;
                if(name){
                    accountData = {
                        name: name,
                        email: sessionStorage.getItem('email'),
                        phone: sessionStorage.getItem('phone')
                    };
                }
                return accountData;
            }

        }

    });