(function() {
    'use strict';

    angular
        .module('app')
        .controller('OrderNophiController', OrderNophiController);

    OrderNophiController.$inject = ['$scope', '$controller', '$stateParams', '$state', '$rootScope', 'OrderService', '$ngConfirm', '$timeout', 'PAGINATION_CONSTANTS'];

    function OrderNophiController ($scope, $controller, $stateParams, $state, $rootScope, OrderService, $ngConfirm, $timeout, PAGINATION_CONSTANTS) {
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
  			  "lstStatusPolicy": [
  			    ""
  			  ],
  			  "phone": "",
  			  "productCode": "",
  			  "toDate": ""
  		};
  		vm.sotiennophi;
  		
  		vm.confirmDeleteOrder = confirmDeleteOrder;
  		vm.searchOrderNophi = searchOrderNophi;
  		vm.confirmKhachhangnophi = confirmKhachhangnophi;
  		vm.gotoDetail = gotoDetail;
  		
        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			// instantiate base controller
  		    $controller('AgreementBaseController', { vm: vm, $scope: $scope });
  		})();
  		
  		// Function

  		function gotoDetail(id) {
  			$state.go("order.order-detail", {id: id});
  		}
  		
  		function deleteOrder(id) {
  			console.log('dodeleteOrder');
  			OrderService.deleteOrder({id: id}, onSuccess, onError);
  			
  			function onSuccess(result) {
  				searchOrderNophi();
  				toastr.success('Hủy thành công');
  			}
  			
  			function onError() {
  				toastr.error("Lỗi khi hủy hợp đồng!");
  			}
  		}
  		
  		function confirmDeleteOrder(id) {
  			$ngConfirm({
                title: 'Xác nhận',
                icon: 'fa fa-times',
                theme: 'modern',
                type: 'red',
                content: '<div class="text-center">Bạn chắc chắn muốn xóa nợ phí?</div>',
                animation: 'scale',
                closeAnimation: 'scale',
                buttons: {
                    ok: {
                    	text: 'Đồng ý',
                        btnClass: "btn-blue",
                        action: function(scope, button){
                        	deleteOrder(id);
	                    }
                    },
                    close: {
                    	text: 'Hủy'
                    }
                },
            });
  		}
  		
  		function searchOrderNophi() {
  			vm.totalItems = null;
  			vm.isLoading = true;
  			vm.orders = [];
  			var order = {};

  			// Keep filter from root scope
  			OrderService.searchNophi(vm.searchCriterial, onSearchSuccess, onSearchError);
  			function onSearchSuccess(result, headers) {
//                vm.page = vm.page - 1;
                
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
  		
  		function search(page) {
  			console.log('transition, page:' + vm.page);
  			vm.isLoading = true;

  			var order = {};
  			order = vm.searchCriterial;
  			order.pageable.page = vm.page - 1;
        	console.log('searchAllTransition, page: ' + order.pageable.page);
        	
  			OrderService.searchNophi(order, onSearchSuccess, onSearchError);
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
        
        function doKhachhangnophi(order, sotiennophi, note) {
        	vm.sotiennophi = sotiennophi;
        	vm.note = note;
        	vm.nophi = {
        			  "id": order.id,
        			  "agreementId": order.agreementId,
        			  "contactId": order.contactId,
        			  "note": vm.note,
        			  "result": false,
        			  "sotien": vm.sotiennophi
        			};
        	OrderService.updateNophi(vm.nophi, onSuccess, onError);
  			
  			function onSuccess(result) {
  				toastr.success("Cập nhật khách hàng nợ phí cho hợp đồng <strong>" + order.gycbhNumber + "</strong> thành công");
  				searchOrderNophi();
  			}
  			
  			function onError() {
  				toastr.error("Lỗi khi cập nhật phí!");
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
                        disabled: false,
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
                    scope.sotiennophi = order.sotien;
                    scope.note = order.note;
//                    scope.textChange = function () {
//                        if (scope.sotiennophi)
//                            self.buttons.ok.setDisabled(false);
//                        else
//                            self.buttons.ok.setDisabled(true);
//                    }
                }
            })
        }
  		
    }
})();
