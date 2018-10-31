(function() {
    'use strict';

    angular
        .module('app')
        .controller('ReportTransferController', ReportTransferController);

    ReportTransferController.$inject = ['$scope', '$controller', 'Principal', '$state'
    	, '$rootScope', 'ReportService'];

    function ReportTransferController ($scope, $controller, Principal, $state
    		, $rootScope, ReportService) {
    	var vm = this;

    	vm.transfers = [];
    	vm.transfersInit = [];
    	
    	vm.isSearchCollapsed = true;
        vm.filterDate = '';
        vm.changeFilterDate = changeFilterDate;
        vm.searchReport = searchReport;
        vm.searchCriterial = {
        		  "fromDate": "",
        		  "periodTime": "",
        		  "toDate": ""
  		};
        
    	// Properties & function declare
        vm.changeDate = changeDate;
  		
        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			$controller('ProductBaseController', { vm: vm, $scope: $scope });
  			
  			changeFilterDate('WEEK');
  		})();
  		
  		// Function
  		
  		function changeFilterDate(type) {
    		vm.filterDate = type;
    		
    		if (vm.filterDate != 'ENHANCE') {
    			vm.isSearchCollapsed = true;
    			loadData();
    		} else {
    			vm.isSearchCollapsed = false;
    		}
        }

  		function resetData() {
  			vm.transfers = [];
  		}
  		
  		function loadData() {
  			resetData();
  			
  			vm.isLoading = true;
  			
  			if (vm.filterDate != 'ENHANCE') {
  				vm.searchCriterial = {
  	        		  "fromDate": "",
  	        		  "periodTime": vm.filterDate,
  	        		  "toDate": ""
  				};
      		} else {
      			vm.searchCriterial.periodTime = "";
      		}
  			
  			ReportService.getReportTransfer(vm.searchCriterial, onSuccess, onError);
            function onSuccess(data, headers) {
            	vm.transfers = data;
            	toastr.success("Cập nhật dữ liệu thành công");
            }
            function onError(error) {
            	toastr.error("Lỗi khi lấy giao dịch chuyển tiền");
            }
  		}

  		function searchReport() {
  			console.log('search report,' + vm.searchCriterial);
        	
        	// validate
        	if (vm.searchCriterial.fromDate == '' || vm.searchCriterial.toDate == '') {
        		toastr.error('Không đủ dữ liệu để tìm kiếm!');
        		return;
        	}
        	
         	if(changeDate()){
        		// Search
            	loadData();	
        	} 
  		}
  		
  		function changeDate(){
  			if (vm.searchCriterial.fromDate != "" && vm.searchCriterial.toDate != ""){
  				if(!vm.checkDate(vm.searchCriterial.fromDate, vm.searchCriterial.toDate)){
  					toastr.error("Thời gian tìm kiếm từ ngày - đến ngày không phù hợp");
  					return false;
  				}
  				return true;
  			}
  		}
  		
    }
})();
