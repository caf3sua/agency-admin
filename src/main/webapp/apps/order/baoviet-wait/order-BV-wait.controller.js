(function() {
    'use strict';

    angular
        .module('app')
        .controller('OrderBVController', OrderBVController);

    OrderBVController.$inject = ['$scope', '$stateParams', '$controller', '$state', '$rootScope', 'OrderService', '$ngConfirm', '$timeout', 'PAGINATION_CONSTANTS', '$uibModal'];

    function OrderBVController ($scope, $stateParams, $controller, $state, $rootScope, OrderService, $ngConfirm, $timeout, PAGINATION_CONSTANTS, $uibModal) {
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
  			  "createType": "",
  			  "agentId": "",
			  "departmentId": "",
			  "companyId": ""
  		};
  		vm.sotiennophi;
  		
  		vm.searchOrderWait = searchOrderWait;
  		vm.confirmKhachhangnophi = confirmKhachhangnophi;
  		vm.confirmViewAgreement = confirmViewAgreement;
  		vm.changeDate = changeDate;
  		
  		vm.selectedDepartmentId;
        vm.selectedAgency;
  		var modalInstance = null;
  		
        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			// instantiate base controller
  			$controller('ProductBaseController', { vm: vm, $scope: $scope });
  			
  		    $controller('AgreementBaseController', { vm: vm, $scope: $scope });
  		   
  		    searchOrderWait();
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
  		
  		$scope.$on('orderUpdateSuccess', function() {
  			searchOrderUpdate();
        });
  		
  		$scope.$on('saveCommunicationSuccess', function() {
  			searchOrderUpdate();
        });
  		
  		function searchOrderWait() {
  			if (changeDate()) {
  				vm.totalItems = null;
  	  			vm.isLoading = true;
  	  			vm.orders = [];
  	  			var order = {};
  	  			
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

  	  			OrderService.searchOrderWait(vm.searchCriterial, onSearchSuccess, onSearchError);
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
        	
  			OrderService.searchOrderWait(order, onSearchSuccess, onSearchError);
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
  		
  		// tìm kiếm order khi giám định thành công (Bỏ số tìm thấy)
  		function searchOrderUpdate() {
  			if (changeDate()) {
  				vm.totalItems = null;
  	  			vm.isLoading = true;
  	  			vm.orders = [];
  	  			var order = {};
  	  			
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

  	  			OrderService.searchOrderWait(vm.searchCriterial, onSearchSuccess, onSearchError);
  	  			function onSearchSuccess(result, headers) {
  	  				// Paging
  	  				vm.orders = result;
  	  				vm.isLoading = false;
  	                
  	  				vm.totalItems = headers('X-Total-Count');
  	                vm.queryCount = vm.totalItems;
  	  	        }
  	  	        function onSearchError() {
  	  	        	vm.isLoading = false;
  	  	            toastr.error("Lỗi khi tìm kiếm đơn hàng!");
  	  	        }
  			}
  		}
  		
        function transition () {
        	// search
        	search();
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
                title: 'Thông tin giám định đơn hàng - ' + order.gycbhNumber,
                columnClass: 'col-md-8 col-md-offset-3',
                contentUrl: 'apps/order/baoviet-wait/view/form-thongtingiamdinh.html',
                buttons: {
                    ok: {
                        text: 'Đồng ý',
                        disabled: true,
                        btnClass: 'btn-green',
                        action: function (scope) {
                        	doKhachhangnophi(order, scope.sotiennophi, scope.note);
                        }
                    },
                    transport: {
                        text: 'Trao đổi',
                        disabled: true,
                        btnClass: 'btn-blue',
                        action: function (scope) {
                        	doKhachhangnophi(order, scope.sotiennophi, scope.note);
                        }
                    },
                    cancel: {
                        text: 'Không đồng ý',
                        disabled: true,
                        btnClass: 'btn-red',
                        action: function (scope) {
                        	doKhachhangnophi(order, scope.sotiennophi, scope.note);
                        }
                    },
                    close: {
                    	text: 'Quay lại'
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
