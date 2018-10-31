(function() {
    'use strict';
    angular
        .module('app')
        .controller('AgreementOtpController', AgreementOtpController);


    	AgreementOtpController.$inject = ['$rootScope', '$scope', '$state', '$http', '$filter', '$uibModalInstance', 'ContactService', 'ProductCommonService'];
        function AgreementOtpController($rootScope, $scope, $state, $http, $filter, $uibModalInstance, ContactService, ProductCommonService) {
        	var vm = this;
        	
        	vm.updateAgreement = updateAgreement;
        	vm.otpOptions = "1";
        	vm.otp;
        	
        	// Implement function
        	function updateAgreement() {
        		var gycbhNumber = $rootScope.gycbhNumber;
        		vm.checkOtp = {  
        				"otp": vm.otp,
        				"gycbhNumber": gycbhNumber
        			};
        		
        		ProductCommonService.checkOTP(vm.checkOtp, onSuccess, onError);
        		
        		function onSuccess(data, headers) {
        			$state.go('app.cart');
            		$uibModalInstance.dismiss('cancel');
        		}
    				
    	        function onError(error) {
    	        	toastr.error('Mã xác thực không chính xác. Đề nghị kiểm tra lại');
    	        }
        	}
        	
        	vm.cancel = function () {
        		$state.go('app.cart');
                $uibModalInstance.dismiss('cancel');
            };
            
        }
})();
