(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductPrintedPaperDetailController', ProductPrintedPaperController);

    ProductPrintedPaperController.$inject = ['$rootScope', '$scope', '$stateParams', '$controller', 'Principal', '$state'
    	, 'CommonDialogService', 'ContactCommonDialogService', 'ProductCommonService', '$ngConfirm', 'ProductPrintedPaperService', 'ContactService'];

    function ProductPrintedPaperController ($rootScope, $scope, $stateParams, $controller, Principal, $state
    		, CommonDialogService, ContactCommonDialogService, ProductCommonService, $ngConfirm, ProductPrintedPaperService, ContactService) {
        var vm = this;

        vm.isSaveAndNewFlag = false;
        vm.policy = {
      		  "gycbhNumber": "",
      		  "contactCode": "",
      		  "imgGcns": null,
      		  "imgGycbhs": null,
      		  "maSanPham": "",
      		  "ngayCap": "",
      		  "ngayHieulucDen": "",
      		  "ngayHieulucTu": "",
      		  "phiBaoHiem": "",
      		  "soAnchi": "",
      		  "tenAnchi": "",
      		  "tinhTrangCap": "TTCM",
      		  "tongTienTT": ""
      };
        
        vm.gycbhFiles = [];
        vm.gcnFiles = [];
        vm.hoadonFile = null;
        
        vm.gycbhFileModel;
        vm.hoadonFileModel;
        vm.gcnFileModel;
        
        
        vm.isLoading = false;
        // Properties & function declare
        vm.gotoBack = gotoBack;
        
        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			// instantiate base controller
  		    $controller('ProductBaseController', { vm: vm, $scope: $scope });
  		    vm.gycbhNumber = {
  		    	  "gycbhNumber": ""
  		    };
  		    vm.gycbhNumber = $stateParams.id;
  		    
  		    ProductPrintedPaperService.getByGycbhNumber({gycbhNumber: vm.gycbhNumber}, onSuccess, onError);
  			
  			function onSuccess(data) {
  				vm.policy = data;
  				vm.policy.productCode = data.maSanPham;
  				vm.policy.maSanPham = data.maSanPham;
  				ContactService.getByCode({contactCode : data.contactCode} , onGetContactSuccess, onGetContactError);
  				
  				function onGetContactSuccess(result) {
  					vm.policy.contactName = result.contactName;
  	  			}
  				
  				function onGetContactError() {
  	  			}
  				
  				toastr.success('Tải thông tin chi tiết hợp đồng thành công');
  			}
  			
  			function onError() {
  			}
  		})();
  		
  		function gotoBack() {
  			$state.go('printed-paper.used');
  		}
  		
    }
})();
