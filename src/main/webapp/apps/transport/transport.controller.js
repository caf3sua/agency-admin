(function() {
    'use strict';

    angular
        .module('app')
        .controller('TransController', TransController);

    TransController.$inject = ['$scope', '$stateParams', '$location', '$window', 'Principal', '$state', '$rootScope', 'TransService', 'DateUtils', 'PAGINATION_CONSTANTS', '$controller', '$ngConfirm', 'OrderService'];

    function TransController ($scope, $stateParams, $location, $window, Principal, $state, $rootScope, TransService, DateUtils, PAGINATION_CONSTANTS, $controller, $ngConfirm, OrderService) {
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
        
        vm.newDate = null;
        vm.cartWarning = false;
        vm.cartCheckBox = false;
        vm.inceptionDateFormat = null;
        vm.expiredDate = null;
        vm.dateUtil = dateUtil;
        vm.sumMoney = 0;
        vm.typeBank = null;
        vm.selectCheckBoxCart = selectCheckBoxCart;
        vm.agreementIds = [];
        vm.checkTypePay = 'agency';
  		
        vm.confirmViewAgreement = confirmViewAgreement;
        vm.confirmCancelCart = confirmCancelCart;
        vm.changeDate = changeDate;
        vm.searchTransport = searchTransport;
        vm.showPayment;
        vm.nextStep = nextStep;
        
    	angular.element(document).ready(function () {
        });

        // Init controller
        (function initController() {
        	$controller('AgreementBaseController', { vm: vm, $scope: $scope });
        	searchTransport();
            vm.newDate = new Date();
        })();
        
  		// Function
        function transition () {
        	vm.isLoading = true;
        	vm.searchCriterial.pageable.page = vm.page - 1;
        	searchTransport();
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
        
        function searchTransport() {
  			if (changeDate()) {
  				TransService.searchTransport(vm.searchCriterial, onGetAllOrderSuccess, onGetAllOrderError);
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