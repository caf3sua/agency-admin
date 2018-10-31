(function() {
    'use strict';

    angular
        .module('app')
        .controller('PrintedPaperUsedController', PrintedPaperUsedController);

    PrintedPaperUsedController.$inject = ['$scope', '$controller', 'Principal', '$state', '$rootScope', 'PrintedPaperService'];

    function PrintedPaperUsedController ($scope, $controller, Principal, $state, $rootScope, PrintedPaperService) {
    	var vm = this;
    	
    	// Properties & function declare
    	
    	vm.searchCriterial = {
  			  "gycbhNumber": "",
  			  "number": "",
  			  "type": "",
  			  "urn": ""
          };
        vm.printedPapers = [];
        vm.isLoading = false;
    		
		// Properties & function declare
		vm.search = search;
		
        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  		})();
  		
  		
  		// Function
  		function search() {
  			vm.isLoading = true;
  			vm.printedPapers = [];
  			
  			PrintedPaperService.searchUsed(vm.searchCriterial, onSearchSuccess, onSearchError);
  			
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
