// code style: https://github.com/johnpapa/angular-styleguide
// Create by: Nam, Nguyen Hoai - ITSOL.vn

(function() {
    '';
    angular
      .module('app')
      .controller('AgreementBaseController', AgreementBaseController);

    AgreementBaseController.$inject = ['vm', '$state', '$stateParams', '$rootScope', '$scope', '$timeout'
    	, '$ngConfirm', 'OrderService'];

    function AgreementBaseController(vm, $state, $stateParams, $rootScope, $scope, $timeout
    		, $ngConfirm, OrderService){
		vm.message = { name: 'default entry from AgreementBaseController' };

		vm.confirmCancelOrder = confirmCancelOrder;
		vm.confirmEditAgreement = confirmEditAgreement;
		vm.confirmCopyAgreement = confirmCopyAgreement;
		vm.searchOrder = searchOrder;
		
		function confirmCopyAgreement(order) {
  			$ngConfirm({
                title: 'Xác nhận',
                icon: 'fas fa-copy',
                theme: 'modern',
                type: 'blue',
                content: '<div class="text-center">Bạn chắc chắn sao chép hợp đồng ' + order.gycbhNumber + ' này ?</div>',
                animation: 'scale',
                closeAnimation: 'scale',
                buttons: {
                    ok: {
                    	text: 'Đồng ý',
                        btnClass: "btn-blue",
                        action: function(scope, button){
                        	editAgreement(order, true);
	                    }
                    },
                    close: {
                    	text: 'Hủy'
                    }
                },
            });
  		}
		
		
		function confirmEditAgreement(order) {
  			$ngConfirm({
                title: 'Xác nhận',
                icon: 'fa fa-edit',
                theme: 'modern',
                type: 'blue',
                content: '<div class="text-center">Bạn chắc chắn sửa hợp đồng ' + order.gycbhNumber + ' này ?</div>',
                animation: 'scale',
                closeAnimation: 'scale',
                buttons: {
                    ok: {
                    	text: 'Đồng ý',
                        btnClass: "btn-blue",
                        action: function(scope, button){
                        	editAgreement(order, false);
	                    }
                    },
                    close: {
                    	text: 'Hủy'
                    }
                },
            });
  		}
		
		function editAgreement(order, copy) {
  			switch (order.lineId) {
				case 'BVP':
					if (order.createType == "0"){
						$state.go("product.bvp", {id: order.agreementId, copy: copy});
		  			} else if (order.createType == "2"){
		  				$state.go("product.printed-paper-edit", {id: order.gycbhNumber, copy: copy});
		  			} else{
		  				$state.go("product.ycbh-offline-edit", {id: order.gycbhNumber, copy: copy});
		  			}
					break;
				case 'CAR':
					if (order.createType == "0"){
						$state.go("product.car", {id: order.agreementId, copy: copy});
		  			} else if (order.createType == "2"){
		  				$state.go("product.printed-paper-edit", {id: order.gycbhNumber, copy: copy});
		  			} else{
		  				$state.go("product.ycbh-offline-edit", {id: order.gycbhNumber, copy: copy});
		  			}
					break;
				case 'HOM':
					if (order.createType == "0"){
						$state.go("product.home", {id: order.agreementId, copy: copy});
					} else if (order.createType == "2"){
						$state.go("product.printed-paper-edit", {id: order.gycbhNumber, copy: copy});
		  			} else{
		  				$state.go("product.ycbh-offline-edit", {id: order.gycbhNumber, copy: copy});
		  			}
					break;
				case 'KCR':
					if (order.createType == "0"){
						$state.go("product.kcare", {id: order.agreementId, copy: copy});
					} else if (order.createType == "2"){
						$state.go("product.printed-paper-edit", {id: order.gycbhNumber, copy: copy});
		  			} else{
		  				$state.go("product.ycbh-offline-edit", {id: order.gycbhNumber, copy: copy});
		  			}
					break;
				case 'MOT':
					if (order.createType == "0"){
						$state.go("product.moto", {id: order.agreementId, copy: copy});
					} else if (order.createType == "2"){
						$state.go("product.printed-paper-edit", {id: order.gycbhNumber, copy: copy});
		  			} else{
		  				$state.go("product.ycbh-offline-edit", {id: order.gycbhNumber, copy: copy});
		  			}
					break;
				case 'TNC':
					if (order.createType == "0"){
						$state.go("product.tnc", {id: order.agreementId, copy: copy});
					} else if (order.createType == "2"){
						$state.go("product.printed-paper-edit", {id: order.gycbhNumber, copy: copy});
		  			} else{
		  				$state.go("product.ycbh-offline-edit", {id: order.gycbhNumber, copy: copy});
		  			}
					break;
				case 'KHC':
					if (order.createType == "0"){
						$state.go("product.khc", {id: order.agreementId, copy: copy});
					} else if (order.createType == "2"){
						$state.go("product.printed-paper-edit", {id: order.gycbhNumber, copy: copy});
		  			} else{
		  				$state.go("product.ycbh-offline-edit", {id: order.gycbhNumber, copy: copy});
		  			}
					break;
				case 'TVC':
					if (order.createType == "0"){
						$state.go("product.tvc", {id: order.agreementId, copy: copy});
					} else if (order.createType == "2"){
						$state.go("product.printed-paper-edit", {id: order.gycbhNumber, copy: copy});
		  			} else{
		  				$state.go("product.ycbh-offline-edit", {id: order.gycbhNumber, copy: copy});
		  			}
					break;
				case 'TVI':
					if (order.createType == "0"){
						$state.go("product.tvi", {id: order.agreementId, copy: copy});
					} else if (order.createType == "2"){
						$state.go("product.printed-paper-edit", {id: order.gycbhNumber, copy: copy});
		  			} else{
		  				$state.go("product.ycbh-offline-edit", {id: order.gycbhNumber, copy: copy});
		  			}
					break;
				case 'HHV':
					$state.go("product.hhvc", {id: order.agreementId});
					break;
				default:
					break;
			}
  		}
		
		function confirmCancelOrder(gycbhNumber) {
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
  				searchOrder();
  				toastr.success('Đã hủy đơn hàng với mã: ' + result.gycbhNumber);
  			}
  			
  			function onError() {
  				toastr.error("Lỗi khi hủy đơn hàng!");
  			}
  		}
		
		function searchOrder() {
  			vm.totalItems = null;
  			vm.isLoading = true;
  			vm.orders = [];
  			var order = {};

  			OrderService.search(vm.searchCriterial, onSearchSuccess, onSearchError);
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
})();
