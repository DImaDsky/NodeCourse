'use strict';

angular.module('myApp')
    .controller('AccountCtrl', function () {
        var vm = this;

        vm.account = {};
        vm.addinfo = function(data) {
            console.log(data);
            console.log(data.name.$modelValue);

            sessionStorage.setItem('name', data.name.$modelValue);
            sessionStorage.setItem('email', data.email.$modelValue);
            if(data.phone.$modelValue){
                sessionStorage.setItem('phone', data.phone.$modelValue);
            }
            vm.accountForm.$setPristine();
        };

    });