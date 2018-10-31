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
        
  		vm.processPayment = processPayment;
  		vm.getAllOrder = getAllOrder;
        vm.newDate = null;
        vm.cartWarning = false;
        vm.cartCheckBox = false;
        vm.inceptionDateFormat = null;
        vm.expiredDate = null;
        vm.dateUtil = dateUtil;
        vm.sumMoney = null;
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
    	angular.element(document).ready(function () {
        });

        // Init controller
        (function initController() {
        	$controller('AgreementBaseController', { vm: vm, $scope: $scope });
            getAllOrder();
            vm.newDate = new Date();
            
            var paymentResult = $location.search().paymentStatus;
            if(paymentResult) {
            	if(paymentResult == '3') {
            		toastr.success("Thanh toán thành công!");
            	} else {
            		toastr.error("Thanh toán thất bại!");
            	}
            }
        })();
        
        $scope.$watch('vm.checkTypePay', function () {
  			if (vm.checkTypePay == 'agency') {
  				vm.typeBank = 'ViettelPay';
  			} else {
  				vm.typeBank = 'Momo';
  			}
  		});
        
  		// Function
        function getAllOrder() {
            CartService.getAll({
            	page: $stateParams.page - 1,
                size: vm.itemsPerPage
//                sort: sort()
            }, onGetAllOrderSuccess, onGetAllOrderError);
        }
        
        function onGetAllOrderSuccess(result, headers) {
//        	vm.links = ParseLinks.parse(headers('link'));
            vm.totalItems = headers('X-Total-Count');
            vm.queryCount = vm.totalItems;
            vm.page = $stateParams.page;
        	
            vm.allOrder = result;
            for (var i = 0; i <  vm.allOrder.length; i++) {
                switch(vm.allOrder[i].statusPolicyId) {
                    case "89":
                        vm.type89 = true;
                        break;
                    case "90":
                        vm.type90 = true;
                        break;
                    case "91":
                        vm.type91 = true;
                        break;
                    case "92":
                        // vm.type92 = true;
                        vm.type91 = true;
                        break;
                    case "93":
                        // vm.type93 = true;
                        vm.type91 = true;
                        break;
                    case "94":
                        // vm.type94 = true;
                        vm.type91 = true;
                        break;
                    case "95":
                        // vm.type95 = true;
                        vm.type91 = true;
                        break;
                    case "96":
                        // vm.type96 = true;
                        vm.type91 = true;
                        break;
                    case "97":
                        // vm.type97 = true;
                        vm.type91 = true;
                        break;
                    case "98":
                        // vm.type98 = true;
                        vm.type91 = true;
                        break;
                    case "99":
                        // vm.type99 = true;
                        vm.type91 = true;
                        break;
                    case "100":
                        // vm.type100 = true;
                        vm.type91 = true;
                        break;
                    default:
                        break;
                }
            }
        }
        
        function onGetAllOrderError() {
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

        function transition () {
            $state.transitionTo($state.$current, {
                page: vm.page,
                search: vm.currentSearch
            });
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
  				getAllOrder();
  				toastr.success('Đã hủy đơn hàng với mã: ' + result.gycbhNumber);
  			}
  			
  			function onError() {
  				toastr.error("Lỗi khi hủy đơn hàng!");
  			}
  		}
    }
})();
