(function() {
    'use strict';

    angular
        .module('app')
        .controller('OrderAgencyController', OrderAgencyController);

    OrderAgencyController.$inject = ['$scope', '$stateParams', '$controller', '$state', '$rootScope', 'OrderService', '$ngConfirm', '$timeout', 'PAGINATION_CONSTANTS', '$uibModal'];

    function OrderAgencyController ($scope, $stateParams, $controller, $state, $rootScope, OrderService, $ngConfirm, $timeout, PAGINATION_CONSTANTS, $uibModal) {
    	var vm = this;
        
    	// Properties & function declare
        // paging
    	vm.page = 1;
        vm.totalItems = null;
        vm.itemsPerPage = PAGINATION_CONSTANTS.itemsPerPage;
        vm.transition = transition;
        
  		vm.isLoading = false;
  		vm.orders = [];
  		vm.searchCriterial = {
			  "pageable": {
			    "page": 0,
			    "size": vm.itemsPerPage
			  },
  			  "contactCode": "",
  			  "contactName": "",
  			  "email": "",
  			  "fromDate": "",
  			  "gycbhNumber": "",
  			  "statusPolicy": "",
  			  "phone": "",
  			  "productCode": "",
  			  "toDate": "",
  			  "createType": ""
  		};
  		vm.sotiennophi;
  		
  		vm.searchAgencyOrder = searchAgencyOrder;
  		vm.confirmResendEmail = confirmResendEmail;
  		vm.confirmKhachhangnophi = confirmKhachhangnophi;
  		vm.confirmTaituc = confirmTaituc;
  		vm.confirmViewAgreement = confirmViewAgreement;
  		vm.changeDate = changeDate;
  		vm.confirmResendOTP = confirmResendOTP;
  		vm.showOTPSavePolicySuccessInfo = showOTPSavePolicySuccessInfo;
  		
        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			// instantiate base controller
  			$controller('ProductBaseController', { vm: vm, $scope: $scope });
  			
  		    $controller('AgreementBaseController', { vm: vm, $scope: $scope });
  		   
  		    searchAgencyOrder();
  		})();
  		
  		function changeDate(){
  			if (vm.searchCriterial.fromDate != "" && vm.searchCriterial.toDate != ""){
  				if(!vm.checkDate(vm.searchCriterial.fromDate, vm.searchCriterial.toDate)){
  					toastr.error("Thời gian từ ngày - đến ngày không phù hợp");
  					return false;
  				}
  			}
  			return true;
  		}
  		
  		function searchAgencyOrder() {
  			if (changeDate()) {
  				vm.totalItems = null;
  	  			vm.isLoading = true;
  	  			vm.orders = [];
  	  			var order = {};

  	  			OrderService.searchOrderAgency(vm.searchCriterial, onSearchSuccess, onSearchError);
  	  			function onSearchSuccess(result, headers) {
  	  				// Paging
  	  				vm.orders = result;
  	  				vm.isLoading = false;
  	                
  	  				vm.totalItems = headers('X-Total-Count');
  	                vm.queryCount = vm.totalItems;
  	                
  	  				toastr.success('Tìm thấy ' + vm.orders.length + ' đơn hàng phù hợp');
  	  	        }
  	  	        function onSearchError() {
  	  	        	vm.isLoading = false;
  	  	            toastr.error("Lỗi khi tìm kiếm đơn hàng!");
  	  	        }
  			}
  		}
  		
  		function search(page) {
  			console.log('transition, page:' + vm.page);
  			vm.isLoading = true;

  			var order = {};
  			order = vm.searchCriterial;
  			order.pageable.page = vm.page - 1;
        	console.log('searchAllTransition, page: ' + order.pageable.page);
        	
  			OrderService.searchOrderAgency(order, onSearchSuccess, onSearchError);
  			function onSearchSuccess(result, headers) {
  				// Paging
  				vm.orders = result;
  				vm.isLoading = false;
  				toastr.success('Tìm thấy ' + vm.orders.length + ' đơn hàng phù hợp');
  	        }
  	        function onSearchError() {
  	        	vm.isLoading = false;
  	            toastr.error("Lỗi khi tìm kiếm đơn hàng!");
  	        }
  		}
  		
        function transition () {
        	// search
        	search();
        }
        
        function confirmResendEmail(gycbhNumber) {
  			$ngConfirm({
                title: 'Xác nhận',
                icon: 'fa fa-envelope',
                theme: 'modern',
                type: 'red',
                content: '<div class="text-center">Bạn chắc chắn muốn gửi lại email ?</div>',
                animation: 'scale',
                closeAnimation: 'scale',
                buttons: {
                    ok: {
                    	text: 'Đồng ý',
                        btnClass: "btn-blue",
                        action: function(scope, button){
                        	resendEmail(gycbhNumber);
	                    }
                    },
                    close: {
                    	text: 'Hủy'
                    }
                },
            });
  		}
        
        function taitucPolicy(agreementId) {
  			console.log('taitucPolicy, agreementId:' + agreementId);
  			OrderService.createTaituc({agreementId: agreementId}, onSuccess, onError);
  			
  			function onSuccess(result) {
  				toastr.success('Tái tục đơn hàng thành công');
  			}
  			
  			function onError() {
  				toastr.error("Lỗi khi tái tục đơn hàng");
  			}
        }
        
        function confirmTaituc(agreementId) {
  			$ngConfirm({
                title: 'Xác nhận',
                icon: 'fa fa-history',
                theme: 'modern',
                type: 'blue',
                content: '<div class="text-center">Bạn chắc chắn muốn tái tục hợp đồng này ?</div>',
                animation: 'scale',
                closeAnimation: 'scale',
                buttons: {
                    ok: {
                    	text: 'Đồng ý',
                        btnClass: "btn-blue",
                        action: function(scope, button){
                        	taitucPolicy(agreementId);
	                    }
                    },
                    close: {
                    	text: 'Hủy'
                    }
                },
            });
  		}
        
        function doKhachhangnophi(order, sotiennophi, note) {
        	vm.sotiennophi = sotiennophi;
        	vm.note = note;
        	vm.nophi = {
        			  "agreementId": order.agreementId,
        			  "contactId": order.contactId,
        			  "note": vm.note,
        			  "result": false,
        			  "sotien": vm.sotiennophi
        			};
        	OrderService.createNophi(vm.nophi, onSuccess, onError);
  			
  			function onSuccess(result) {
  				toastr.success("Bổ xung khách hàng nợ phí cho hợp đồng <strong>" + order.gycbhNumber + "</strong> thành công");
  			}
  			
  			function onError() {
  				toastr.error("Lỗi khi tạo nợ phí!");
  			}
        	
        	console.log('Khách hàng nợ phí,' + vm.sotiennophi);
        	
        }
        
        function confirmKhachhangnophi(order) {
        	$ngConfirm({
                title: 'Khách hàng nợ phí',
                columnClass: 'col-md-6 col-md-offset-3',
                contentUrl: 'views/theme/blocks/form-khachhangnophi.html',
                buttons: {
                    ok: {
                        text: 'Đồng ý',
                        disabled: true,
                        btnClass: 'btn-green',
                        action: function (scope) {
                        	doKhachhangnophi(order, scope.sotiennophi, scope.note);
                        }
                    },
                    close: {
                    	text: 'Hủy'
                    }
                },
                onScopeReady: function (scope) {
                    var self = this;
                    scope.textChange = function () {
                        if (scope.sotiennophi)
                            self.buttons.ok.setDisabled(false);
                        else
                            self.buttons.ok.setDisabled(true);
                    }
                }
            })
        }
        
  		function resendEmail(number) {
  			console.log('doResendEmail');
  			OrderService.resendEmail({gycbhNumber: number}, onSuccess, onError);
  			
  			function onSuccess(result) {
  				toastr.success('Đã gửi lại email với mã đơn hàng: ' + result.gycbhNumber);
  			}
  			
  			function onError() {
  				toastr.error("Lỗi khi gửi lại email đơn hàng!");
  			}
  		}
  		
  		function confirmViewAgreement(order) {
  			if (order.createType == "0"){
  				$state.go("order.order-detail", {id: order.agreementId});
  			} else if (order.createType == "2") {
  				$state.go("product.printed-paper-detail", {id: order.gycbhNumber});
  			} else {
  				$state.go("product.ycbh-offline-detail", {id: order.gycbhNumber});
  			}
  		}
  		
  		function confirmResendOTP(gycbhNumber) {
  			$ngConfirm({
                title: 'Xác nhận',
                icon: 'fas fa-sync-alt',
                theme: 'modern',
                type: 'red',
                content: '<div class="text-center">Bạn chắc chắn muốn gửi lại otp ?</div>',
                animation: 'scale',
                closeAnimation: 'scale',
                buttons: {
                    ok: {
                    	text: 'Đồng ý',
                        btnClass: "btn-blue",
                        action: function(scope, button){
                        	resendOTP(gycbhNumber);
	                    }
                    },
                    close: {
                    	text: 'Hủy'
                    }
                },
            });
  		}
  		
  		function resendOTP(number) {
  			console.log('resendOTP');
  			$rootScope.gycbhNumber = number;
  			OrderService.resendOtp({gycbhNumber: number}, onSuccess, onError);
  			
  			function onSuccess(result) {
  				showOTPSavePolicySuccessInfo();
  				toastr.success('Đã gửi lại otp với mã đơn hàng: ' + result.gycbhNumber);
  			}
  			
  			function onError() {
  				toastr.error("Lỗi khi gửi lại otp đơn hàng!");
  			}
  		}
  		
  		var modalInstance = null;
  		function showOTPSavePolicySuccessInfo() {
            modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'apps/product/partial/partial-OTP.html',
                controller: 'AgreementOtpController',
                controllerAs: 'vm',
                size: 'sg',
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            });
            
    	}
  		
  		
    }
})();
