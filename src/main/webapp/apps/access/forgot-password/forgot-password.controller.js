// code style: https://github.com/johnpapa/angular-styleguide 
(function() {
    'use strict';

    angular
        .module('app')
        .controller('ForgotPasswordController', ForgotPasswordController);


    ForgotPasswordController.$inject = ['$rootScope', '$state', '$timeout', 'Auth', 'Principal', '$window', 'ForgotPasswordService'];

    function ForgotPasswordController ($rootScope, $state, $timeout, Auth, Principal, $window, ForgotPasswordService) {
    		var vm = this;

        vm.authenticationError = false;
        vm.username = null;
        
        vm.isOpen = false;
        
        vm.emailInput ={
        	"email": ""
        }
        
        vm.resetPassword = resetPassword;
        
        // Init controller
  		(function initController() {
            Auth.logout();
  		})();

        $timeout(function (){angular.element('#username').focus();});

        function resetPassword () {
        	vm.emailInput.email = vm.username;
        	ForgotPasswordService.forgotPassword(vm.emailInput, onSuccess, onError);
        	
        	function onSuccess(result) {
        		toastr.success("Thành công");
        	}
        	
        	function onError(result) {
        		toastr.error("Lỗi khi gửi lại mật khẩu.");
        	}
        }
        
    }
})();
