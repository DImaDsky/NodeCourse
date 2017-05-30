'use strict';

angular.module('myApp')
    .controller('AccountCtrl', function ($scope, AccountService) {
        var vm = this;

        vm.account = {};
        vm.addinfo = function(data) {
            $scope.accountData = {
                name: data.name.$modelValue,
                email: data.email.$modelValue,
                phone: data.phone.$modelValue
            };
            AccountService.save($scope.accountData);
            vm.accountForm.$setPristine();
        };
        $scope.accountData = AccountService.read();
    }).component('accountData', {
        template: '<div>zz: ss</div>',
        controller: function($scope, AccountService) {
        },
    });