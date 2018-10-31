// code style: https://github.com/johnpapa/angular-styleguide 
(function() {
    'use strict';

    angular
        .module('app')
        .controller('SigninController', SigninController);


    SigninController.$inject = ['$rootScope', '$state', '$timeout', 'Auth', 'Principal', '$window'];

    function SigninController ($rootScope, $state, $timeout, Auth, Principal, $window) {
    		var vm = this;

        vm.authenticationError = false;
        vm.cancel = cancel;
        vm.credentials = {};
        vm.login = login;
        vm.logout = logout;
        vm.password = null;
        vm.rememberMe = true;
        vm.username = null;
        vm.isLoading = false;
        
        vm.isOpen = false;
        
        // Init controller
  		(function initController() {
            Auth.logout();
  		})();

        $timeout(function (){angular.element('#username').focus();});

        function cancel () {
            vm.credentials = {
                username: null,
                password: null,
                rememberMe: true
            };
            vm.authenticationError = false;
        }

        function login () {
        	vm.isLoading = true;
            Auth.login({
                username: vm.username,
                password: vm.password,
                rememberMe: vm.rememberMe
            }).then(function () {
            	vm.isLoading = false;
            		$rootScope.isAuthentication = true;
                vm.authenticationError = false;
                $rootScope.$broadcast('authenticationSuccess');

                $state.go('app.dashboard');
                toastr.success('Đăng nhập thành công');
            }).catch(function () {
            	vm.isLoading = false;
                vm.authenticationError = true;
                toastr.error('Kiểm tra lại tên và mật khẩu');
            });
        }
        
        function logout() {
            collapseNavbar();
            Auth.logout();
            $state.go('home');
        }
    }
})();
