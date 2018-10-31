(function() {
    'use strict';

    angular
        .module('app')
        .controller('PrintedPaperNewDialogController', PrintedPaperNewDialogController);

    PrintedPaperNewDialogController.$inject = ['$scope', '$controller', 'Principal'
    	, '$state', '$rootScope', 'PrintedPaperService', '$uibModalInstance'];

    function PrintedPaperNewDialogController ($scope, $controller, Principal
    		, $state, $rootScope, PrintedPaperService, $uibModalInstance) {
    	var vm = this;

    	vm.anchiTypes = [];
        vm.searchCriterial = {
			  "gycbhNumber": "",
			  "number": "",
			  "type": "",
			  "urn": ""
        };
        vm.printedPapersInit = [];
        vm.printedPapers = [];
        vm.isLoading = false;
  		
  		// Properties & function declare
  		vm.search = search;
  		vm.selectedAnchi = selectedAnchi;
        
        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
//  			loadSelectBoxType();
  			vm.searchCriterial.type = $rootScope.product_code_selected;
  		})();
  		
  		// Function
  		function selectedAnchi(row) {
  			console.log('selected contact:' + row);
    		$uibModalInstance.close(row);
  		}
  		
//  		function loadSelectBoxType() {
//  			PrintedPaperService.getListTypes({}, onSearchSuccess, onSearchError);
//  			
//  			function onSearchSuccess(data) {
//  				// convert number -> string
//  				angular.forEach(data, function(item) {
//  					if (item.ACHI_LOAI_ANCHI_ID != null) {
//  						item.ACHI_LOAI_ANCHI_ID = item.ACHI_LOAI_ANCHI_ID.toString();
//  					}
//  	            });
//  				vm.anchiTypes = data;
//  			}
//  			
//  			function onSearchError() {
//  			}
//  		}
  		
  		function search() {
  			vm.isLoading = true;
  			vm.printedPapers = [];
  			
  			PrintedPaperService.searchNew(vm.searchCriterial, onSearchSuccess, onSearchError);
  			
  			function onSearchSuccess(data) {
  				vm.isLoading = false;
  				let count = 0;
  				angular.forEach(data, function(item) {
  					if (!item.anchiUsing) {
  						item.id = count++;
  	  					vm.printedPapers.push(item);
  					}
  	            });
  				
  				toastr.success('Tìm thấy ' + vm.printedPapers.length + ' ấn chỉ phù hợp');
  			}
  			
  			function onSearchError() {
  				vm.isLoading = false;
  				toastr.error("Lỗi khi tìm kiếm danh sách ấn chỉ chưa sử dụng!");
  			}
  		}
  		
    	vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }
})();
