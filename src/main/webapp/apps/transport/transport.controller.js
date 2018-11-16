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
    			  "createType": "",
    			  "agentId": "",
    			  "departmentId": ""
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
        vm.agreementGycbhs = [];
        vm.checkTypePay = 'agency';
  		
        vm.confirmViewAgreement = confirmViewAgreement;
        vm.confirmTransport = confirmTransport;
        vm.changeDate = changeDate;
        vm.searchTransport = searchTransport;
        vm.showPayment;
        vm.nextStep = nextStep;
        
        vm.selectedDepartmentId;
        vm.selectedAgency;
        
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
  				if (vm.selectedAgency != null && vm.selectedAgency != undefined){
  					vm.searchCriterial.agentId = vm.selectedAgency.ma;	
  				} else {
  					vm.searchCriterial.agentId = "";
  				}
  				
  				if (vm.selectedDepartmentId != null && vm.selectedDepartmentId != undefined){
  					vm.searchCriterial.departmentId = vm.selectedDepartmentId.ma;	
  				} else {
  					vm.searchCriterial.departmentId = "";
  				}
  				
  				TransService.searchTransport(vm.searchCriterial, onSearchOrderSuccess, onSearchOrderError);
  			}
  		}
        
        function onSearchOrderSuccess(result, headers) {
            vm.totalItems = headers('X-Total-Count');
            vm.queryCount = vm.totalItems;
            vm.isLoading = false;
        	
            vm.allOrder = result;
            
            toastr.success('Tìm thấy ' + vm.allOrder.length + ' đơn hàng phù hợp');
        }
        
        function onSearchOrderError() {
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
                vm.agreementGycbhs.push(data.gycbhNumber);
            }else {
                var money = data.totalPremium;
                vm.sumMoney = vm.sumMoney - money;
                var index = vm.agreementGycbhs.indexOf(data.gycbhNumber);
                if (index !== -1) {
            		vm.agreementGycbhs.splice(index, 1);
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
        
        function confirmTransport() {
  			$ngConfirm({
                title: 'Xác nhận',
                theme: 'modern',
                type: 'red',
                content: '<div class="text-center">Bạn chắc chắn muốn chuyển hợp đồng này ?</div>',
                animation: 'scale',
                closeAnimation: 'scale',
                buttons: {
                    ok: {
                    	text: 'Đồng ý',
                        btnClass: "btn-blue",
                        action: function(scope, button){
                        	transportOrder(vm.agreementGycbhs);
	                    }
                    },
                    close: {
                    	text: 'Hủy'
                    }
                },
            });
  		}
		
		function transportOrder(lstGycbhNumbers) {
  			console.log('doTransportOrder');
			TransService.updateTransport({listGYCBH: lstGycbhNumbers}, onSuccess, onError);
  			
  			function onSuccess(result) {
  				toastr.success('Đã chuyển đơn hàng thành công');
  				searchTransport();
  			}
  			
  			function onError() {
  				toastr.error("Lỗi khi chuyển đơn hàng!");
  			}
  		}
    }
})();
