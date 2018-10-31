(function() {
    'use strict';

    angular
        .module('app')
        .controller('ChangePasswordController', ChangePasswordController);

    ChangePasswordController.$inject = ['$scope', '$controller', 'Principal', '$state', '$rootScope', 'ChangePasswordService'];

    function ChangePasswordController ($scope, $controller, Principal, $state, $rootScope, ChangePasswordService) {
    	var vm = this;
        vm.changePassword ={
        };
        vm.showReqCheckPassword = false;
        vm.actionChangePassword = actionChangePassword;
        vm.checkPasswordNew = checkPasswordNew;
        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  		})();
  		
  		// Properties & function declare
  		
  		
  		// Function
        function checkPasswordNew() {
            if(vm.changePassword.newPassword.valueOf() == vm.passWordCheck.valueOf()){
                vm.showReqCheckPassword = false;
            }else {
                vm.showReqCheckPassword = true;
            }
        }
        function actionChangePassword() {
            vm.changePassword.result = false;
            ChangePasswordService.postChangePassword(vm.changePassword, onActionChangePasswordSuccess, onActionChangePasswordError);
        }
        function onActionChangePasswordSuccess(result) {
            toastr.success('Đổi mật khẩu thành công');

        }

        function onActionChangePasswordError(result) {
            toastr.error('Đổi mật khẩu lỗi');
        }


    }
})();
