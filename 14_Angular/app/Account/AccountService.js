angular
    .module('myApp')
    .factory('AccountService', function() {
        return {
            save: function ($scope, data) {
                $scope.accountData = {
                    name: data.name.$modelValue,
                    email: data.email.$modelValue,
                    phone: data.phone.$modelValue
                };
            },
            read: function () {
                console.log('read');
                return {
                    name: sessionStorage.getItem('name'),
                    email: sessionStorage.getItem('email'),
                    phone: sessionStorage.getItem('phone')
                };
            }

        }

    });