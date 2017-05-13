'use strict';

angular.module('myApp')
    .controller('AccountCtrl', function ($scope, AccountService) {
        var vm = this;

        vm.account = {};
        vm.addinfo = function(data) {

            AccountService.save($scope, data);

            vm.accountForm.$setPristine();
        };
        //$scope.accountData = AccountService.read();
    }).component('accountData', {

        //template: '<div>zz: {{sessionStorage.getItem("name")}}</div>',
        controller: function($scope, AccountService) {

        },
    });