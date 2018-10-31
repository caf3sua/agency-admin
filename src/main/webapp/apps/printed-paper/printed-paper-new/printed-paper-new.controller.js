(function() {
    'use strict';

    angular
        .module('app')
        .controller('PrintedPaperNewController', PrintedPaperNewController);

    PrintedPaperNewController.$inject = ['$scope', '$controller', 'Principal'
    	, '$state', '$rootScope', 'PrintedPaperService'];

    function PrintedPaperNewController ($scope, $controller, Principal
    		, $state, $rootScope, PrintedPaperService) {
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
        
        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			loadSelectBoxType();
  		})();
  		
  		// Function
  		function loadSelectBoxType() {
  			PrintedPaperService.getListTypes({}, onSearchSuccess, onSearchError);
  			
  			function onSearchSuccess(data) {
  				// convert number -> string
  				angular.forEach(data, function(item) {
  					if (item.ACHI_LOAI_ANCHI_ID != null) {
  						item.ACHI_LOAI_ANCHI_ID = item.ACHI_LOAI_ANCHI_ID.toString();
  					}
  	            });
  				vm.anchiTypes = data;
  			}
  			
  			function onSearchError() {
  			}
  		}
  		
  		function search() {
  			vm.isLoading = true;
  			vm.printedPapers = [];
  			
  			PrintedPaperService.searchNew(vm.searchCriterial, onSearchSuccess, onSearchError);
  			
  			function onSearchSuccess(data) {
  				vm.isLoading = false;
  				vm.printedPapers = data;
  				toastr.success('Tìm thấy ' + data.length + ' ấn chỉ phù hợp');
  			}
  			
  			function onSearchError() {
  				vm.isLoading = false;
  				toastr.error("Lỗi khi tìm kiếm danh sách ấn chỉ chưa sử dụng!");
  			}
  		}
    }
})();
