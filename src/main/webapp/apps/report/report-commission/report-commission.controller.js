(function() {
    'use strict';

    angular
        .module('app')
        .controller('ReportCommissionController', ReportCommissionController);

    ReportCommissionController.$inject = ['$scope', '$controller', 'Principal', '$state', '$rootScope', 'ReportService'];

    function ReportCommissionController ($scope, $controller, Principal, $state, $rootScope, ReportService) {
    	var vm = this;
        
        angular.element(document).ready(function () {
        });

  		// Properties & function declare
        vm.weekConstant = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  		vm.yearConstant = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  		
  		vm.data = {};
        vm.data.categories = [];
        vm.data.incomeData = [];
        vm.data.paymentData = [];
        vm.report;
        vm.isLoading = false;
        
        vm.isSearchCollapsed = true;
        vm.filterDate = '';
        vm.changeFilterDate = changeFilterDate;
        vm.searchReport = searchReport;
        vm.searchCriterial = {
        		  "fromDate": "",
        		  "periodTime": "",
        		  "toDate": ""
  		};
        
        vm.chartOptions = chartCommissionOptions;
        vm.changeDate = changeDate;
        
        // Init controller
  		(function initController() {
  			$controller('ProductBaseController', { vm: vm, $scope: $scope });
  			
  			changeFilterDate('WEEK');
  		})();
          
        // Implement function 
  		function resetData() {
  			vm.chartOptions.xAxis[0].data = vm.weekConstant;
	        vm.chartOptions.series[0].data = [0, 0, 0, 0, 0, 0, 0];
	        vm.chartOptions.series[1].data = [0, 0, 0, 0, 0, 0, 0];
	        
  			vm.data = {};
  	        vm.data.categories = [];
  	        vm.data.incomeData = [];
  	        vm.data.paymentData = [];
  	        vm.report = {};
  		}
  		
  		function changeFilterDate(type) {
    		vm.filterDate = type;
    		
    		if (vm.filterDate != 'ENHANCE') {
    			vm.isSearchCollapsed = true;
    			loadData();
    		} else {
    			vm.isSearchCollapsed = false;
    		}
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
  			
  			ReportService.getReportCommission(vm.searchCriterial, onSearchSuccess, onSearchError);
  			
  			function onSearchSuccess(data) {
//  				loadSummaryReport();
  				vm.isLoading = false;
  				vm.report = data;
  				toastr.success("Dữ liệu đã được cập nhật!");
  				updateChartData(vm.filterDate, data);
  			}
  			
  			function onSearchError() {
  				vm.isLoading = false;
  				toastr.error("Lỗi khi tìm kiếm data báo cáo hoa hồng!");
  			}
  		}
  		
  		function updateChartData(type, data) {
  			// Update chart xAxis
    		switch(type) {
	    	    case "WEEK":
	    	    	vm.chartOptions.xAxis[0].data = vm.weekConstant;
	    	        vm.chartOptions.series[0].data = getYaxisData(data.otherData);
	    	        vm.chartOptions.series[1].data = getYaxisData(data.data);
	    	        break;
	    	    case "MONTH":
	    	        vm.chartOptions.xAxis[0].data = getXaxisData(data.data);
	    	        vm.chartOptions.series[0].data = getYaxisData(data.otherData);
	    	        vm.chartOptions.series[1].data = getYaxisData(data.data);
	    	        break;
	    	    case "YEAR":
	    	    	vm.chartOptions.xAxis[0].data = vm.yearConstant;
	    	        vm.chartOptions.series[0].data = getYaxisData(data.otherData);
	    	        vm.chartOptions.series[1].data = getYaxisData(data.data);
	    	        break;
	    	    case "ENHANCE":
	    	    	vm.chartOptions.xAxis[0].data = getXaxisData(data);
	    	        vm.chartOptions.series[0].data = getYaxisData(data.otherData);
	    	        vm.chartOptions.series[1].data = getYaxisData(data.data);
	    	        break;
	    	    default:
	    	    	break;
	    	}
  		}
  		
  		function getXaxisData(data) {
  			var result = [];
  			angular.forEach(data, function(item) {
  				result.push(item.datePayment);
  			});
  			
  			return result;
  		}
  		
  		function getYaxisData(data) {
  			var result = [];
  			angular.forEach(data, function(item) {
  				result.push(item.tongHoaHong);
  			});
  			
  			return result;
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

