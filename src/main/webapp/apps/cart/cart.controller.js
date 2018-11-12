(function() {
    'use strict';

    angular
        .module('app')
        .controller('CartController', CartController);

    CartController.$inject = ['$scope', '$stateParams', '$location', '$window', 'Principal', '$state', '$rootScope', 'CartService', 'DateUtils', 'PAGINATION_CONSTANTS', '$controller', '$ngConfirm', 'OrderService'];

    function CartController ($scope, $stateParams, $location, $window, Principal, $state, $rootScope, CartService, DateUtils, PAGINATION_CONSTANTS, $controller, $ngConfirm, OrderService) {
    	var vm = this;
        
        // paging
        vm.page = 1;
        vm.totalItems = null;
        vm.itemsPerPage = PAGINATION_CONSTANTS.itemsPerPage;
        vm.transition = transition;
        vm.loadPage = loadPage;

  		// Properties & function declare
        vm.allOrderInit = [];
        vm.allOrder = [];
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
        
  		vm.processPayment = processPayment;
        vm.newDate = null;
        vm.cartWarning = false;
        vm.cartCheckBox = false;
        vm.inceptionDateFormat = null;
        vm.expiredDate = null;
        vm.dateUtil = dateUtil;
        vm.sumMoney = 0;
        vm.getListBank = getListBank;
        vm.getListBankObj = [];
        vm.typeBank = null;
        vm.selectCheckBoxCart = selectCheckBoxCart;
        vm.type89 = false;
        vm.type90= false;
        vm.type91 = false;
        vm.type92 = false;
        vm.type93 = false;
        vm.type94 = false;
        vm.type95 = false;
        vm.type96 = false;
        vm.type97 = false;
        vm.type98 = false;
        vm.type99 = false;
        vm.type100 = false;
        vm.couponCode = null;
        vm.bankCode = null;
        vm.agreementIds = [];
        vm.checkTypePay = 'agency';
  		
        vm.confirmViewAgreement = confirmViewAgreement;
        vm.confirmCancelCart = confirmCancelCart;
        vm.changeDate = changeDate;
        vm.searchCart = searchCart;
        vm.showPayment;
        vm.nextStep = nextStep;
        
    	angular.element(document).ready(function () {
        });

        // Init controller
        (function initController() {
        	$controller('AgreementBaseController', { vm: vm, $scope: $scope });
        	searchCart();
            vm.newDate = new Date();
            
            var paymentResult = $location.search().paymentStatus;
        })();
        
        
  		// Function
        
        function transition () {
        	vm.isLoading = true;
        	vm.searchCriterial.pageable.page = vm.page - 1;
        	searchCart();
        }
        
        function nextStep() {
        	vm.showPayment = true;
        }
        
        function changeDate(){
  			if (vm.searchCriterial.fromDate != "" && vm.searchCriterial.toDate != ""){
  				if(!vm.checkDate(vm.searchCriterial.fromDate, vm.searchCriterial.toDate)){
  					toastr.error("Thời gian từ ngày - đến ngày không phù hợp");
  					return false;
  				}
  			}
  			return true;
  		}
        
        function searchCart() {
  			if (changeDate()) {
  				CartService.searchCart(vm.searchCriterial, onGetAllOrderSuccess, onGetAllOrderError);
  			}
  		}
        
        function onGetAllOrderSuccess(result, headers) {
            vm.totalItems = headers('X-Total-Count');
            vm.queryCount = vm.totalItems;
            vm.isLoading = false;
        	
            vm.allOrder = result;
        }
        
        function onGetAllOrderError() {
        	vm.isLoading = false;
            toastr.error("Lỗi khi lấy đơn hàng");
        }
        
        function dateUtil(date) {
            return DateUtils.convertLocalDateToServer(date);
        }
        
        function selectCheckBoxCart(data) {
            if(data.check == true){
                var money = data.totalPremium;
                vm.sumMoney = vm.sumMoney + money;
                vm.agreementIds.push(data.agreementId);
            }else {
                var money = data.totalPremium;
                vm.sumMoney = vm.sumMoney - money;
                var index = vm.agreementIds.indexOf(data.agreementId);
                if (index !== -1) {
            		vm.agreementIds.splice(index, 1);
                }
            }

        }
        
        function getListBank() {
            CartService.getBanksByPaymentCode({paymentCode:vm.typeBank}, onGetListBankSuccess, onGetListBankError)
        }
        
        function onGetListBankSuccess(result) {
            vm.getListBankObj = result.paymentBanks;
        }
        
        function onGetListBankError() {
            toastr.error("Lỗi khi lấy danh sách ngân hàng");
        }

        function processPayment() {
        	if(vm.agreementIds.length == 0) {
        		toastr.error("Bạn cần chọn đơn hàng!");
        		return;
        	}
        	
        	if(!vm.typeBank) {
        		toastr.error("Bạn cần chọn phương thức thanh toán");
        		return;
        	} else if(vm.typeBank == '123pay' || vm.typeBank == 'VnPay') {
        		if(!vm.bankCode) {
        			toastr.error("Bạn cần chọn ngân hàng hỗ trợ!");
            		return;
        		}
        	}
        	
    		var paymentData = {
    			"agreementIds" : vm.agreementIds,
    			"bankCode": vm.bankCode,
    			"couponCode": vm.couponCode,
    			"paymentFee": vm.sumMoney,
    			"paymentType": vm.typeBank
        	}
        	CartService.processPayment(paymentData, onProcessPaymentSuccess, onProcessPaymentError)
        }
        
        function onProcessPaymentSuccess(result) {
        	$window.location.href = result.redirectUrl;
        }
        
        function onProcessPaymentError() {
        	toastr.error("Có lỗi xảy ra khi thanh toán!");
        }
        
        function loadPage (page) {
            vm.page = page;
            vm.transition();
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
        
        function confirmCancelCart(gycbhNumber) {
  			$ngConfirm({
                title: 'Xác nhận',
                icon: 'fa fa-times',
                theme: 'modern',
                type: 'red',
                content: '<div class="text-center">Bạn chắc chắn muốn hủy hợp đồng này ?</div>',
                animation: 'scale',
                closeAnimation: 'scale',
                buttons: {
                    ok: {
                    	text: 'Đồng ý',
                        btnClass: "btn-blue",
                        action: function(scope, button){
                        	cancelOrder(gycbhNumber);
	                    }
                    },
                    close: {
                    	text: 'Hủy'
                    }
                },
            });
  		}
		
		function cancelOrder(number) {
  			console.log('doCancelOrder');
  			OrderService.cancelOrder({gycbhNumber: number}, onSuccess, onError);
  			
  			function onSuccess(result) {
  				toastr.success('Đã hủy đơn hàng với mã: ' + result.gycbhNumber);
  			}
  			
  			function onError() {
  				toastr.error("Lỗi khi hủy đơn hàng!");
  			}
  		}
    }
})();
