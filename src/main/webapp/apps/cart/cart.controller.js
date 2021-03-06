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
			  "createType": "",
			  "agentId": "",
			  "departmentId": "",
			  "companyId": ""
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
        vm.couponCode = null;
        vm.bankCode = null;
        vm.agreementIds = [];
        vm.checkTypePay = 'agency';
  		
        vm.confirmViewAgreement = confirmViewAgreement;
        vm.changeDate = changeDate;
        vm.searchCart = searchCart;
        vm.showPayment;
        vm.nextStep = nextStep;
        
        vm.selectedDepartmentId;
        vm.selectedAgency;
        
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
  				if (vm.selectedAgency != null && vm.selectedAgency != undefined){
  					vm.searchCriterial.agentId = vm.selectedAgency.ma;	
  				} else {
  					vm.searchCriterial.agentId = "";
  				}
  				
  				if (vm.selectedDepartmentId != null && vm.selectedDepartmentId != undefined){
  					vm.searchCriterial.departmentId = vm.selectedDepartmentId.departmentId;	
  				} else {
  					vm.searchCriterial.departmentId = "";
  				}
  				
  				if (vm.selectedCompanyId != null && vm.selectedCompanyId != undefined){
  					vm.searchCriterial.companyId = vm.selectedCompanyId;	
  				} else {
  					vm.searchCriterial.companyId = "";
  				}
  				
  				CartService.searchCart(vm.searchCriterial, onGetAllOrderSuccess, onGetAllOrderError);
  			}
  		}
        
        function onGetAllOrderSuccess(result, headers) {
            vm.totalItems = headers('X-Total-Count');
            vm.queryCount = vm.totalItems;
            vm.isLoading = false;
        	
            vm.allOrder = result;
            
            toastr.success('Tìm thấy ' + vm.allOrder.length + ' đơn hàng phù hợp');
        }
        
        function onGetAllOrderError() {
        	vm.isLoading = false;
        	toastr.error("Lỗi khi tìm kiếm đơn hàng!");
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
		
    }
})();
