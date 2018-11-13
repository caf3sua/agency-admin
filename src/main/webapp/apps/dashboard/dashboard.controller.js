// code style: https://github.com/johnpapa/angular-styleguide 

(function() {
    'use strict';
    angular
      .module('app')
      .controller('DashboardController', DashboardController);
    
    DashboardController.$inject = ['$scope', 'DashboardService', 'ReportService', '$controller', '$state'];

      function DashboardController($scope, DashboardService, ReportService, $controller, $state) {
    	  var vm = this;
        
	        // Declare variable and method
    	  	vm.weekConstant = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    		vm.yearConstant = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    		
    	  	vm.isSearchCollapsed = true;
	        vm.filterDate = '';
	        vm.changeFilterDate = changeFilterDate;
	        vm.isLoading = false;
	        vm.searchCriterial = {
	        		  "fromDate": "",
	        		  "periodTime": "",
	        		  "toDate": ""
    		};
	        vm.report = {
	        		  "totalOrder" : "",
	        		  "numberOrderPaid" : "",
	        		  "numberOrderNotPaid" : "",
	        		  "totalPremmium" : "",
	        		  "premiumPaid" : "",
	        		  "premiumNotPaid" : "",
	        		  "waitAgency" : [],
	        		  "waitBaoviet" : []
    		};
	        
	        
	        vm.chartIncomeOptions = chartIncomeOptions;
//	        vm.chartIncomeOptions.yAxis[0].show = false;
//	        vm.chartIncomeOptions.xAxis[0].show = false;
	        
	        vm.chartCommissionOptions = chartCommissionOptions;
//	        vm.chartCommissionOptions.yAxis[0].show = false;
//	        vm.chartCommissionOptions.xAxis[0].show = false;
	        
	        // paging
	        vm.page = 1;
	        vm.itemsPerPage = 3;
	        
	        vm.totalItemsAgency = 0;
	        vm.totalItemsAgreement = 0;
	        
	        vm.dataIncome = {};
	        vm.dataCommission = {};
	        vm.searchReport = searchReport;
	        vm.changeDate = changeDate;
	        vm.goOrder = goOrder;
	        vm.goOrderWait = goOrderWait;
	        vm.getAllWaitAgency = getAllWaitAgency;
	        vm.getAllWaitAgreement = getAllWaitAgreement;
	        vm.confirmViewAgreement = confirmViewAgreement;
	        
	        vm.AllWaitAgency = [];
	        vm.AllWaitAgreement = [];
	        
	        // Test data
	        angular.element(document).ready(function () {
	        	changeFilterDate("WEEK");
	        });

	    	// Init controller
	  		(function initController() {
	  			$controller('ProductBaseController', { vm: vm, $scope: $scope });
	  			getAllWaitAgency();
	  			getAllWaitAgreement();
	  		})();

	  		// Implement function 
	  		function changeFilterDate(type) {
	  			vm.filterDate = type;
	    		
	    		if (vm.filterDate != 'ENHANCE') {
	    			vm.isSearchCollapsed = true;
	    			loadData();
	    		} else {
	    			vm.isSearchCollapsed = false;
	    		}
	  		}
	  		
	  		function getAllWaitAgency() {
	    		vm.AllWaitAgency = [];
	    		DashboardService.getAllWaitAgency({
	    			page: vm.page - 1,
	                size: vm.itemsPerPage
	            }, onSuccess, onError);
	    		
	    		function onSuccess(result, headers) {
	    			vm.totalItemsAgency = headers('X-Total-Count');
	    			vm.AllWaitAgency = result;
	            }

	            function onError(result) {
	            	
	            }
	  		}
	  		
	  		function getAllWaitAgreement() {
	    		vm.AllWaitAgreement = [];
	    		DashboardService.getAllWaitAgreement({
	    			page: vm.page - 1,
	                size: vm.itemsPerPage
	            }, onSuccess, onError);
	    		
	    		function onSuccess(result, headers) {
	    			vm.totalItemsAgreement = headers('X-Total-Count');
	    			vm.AllWaitAgreement = result;
	            }

	            function onError(result) {
	            	
	            }
	  		}
	  		
	  		function goOrder() {
//	  			$state.go("order.me", {status: 81});
	  			$state.go("order.agency");
	  		}
	  		
	  		function goOrderWait() {
	  			$state.go("order.baoviet");
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
	  		
	  		function resetData() {
	  			vm.dataIncome = {};
		        vm.dataCommission = {};
		        
		        // Income
	  			vm.chartIncomeOptions.xAxis[0].data = vm.weekConstant;
	  			vm.chartIncomeOptions.series[0].data = [0, 0, 0, 0, 0, 0, 0];
	  			vm.chartIncomeOptions.series[1].data = [0, 0, 0, 0, 0, 0, 0];
	  			
	  			// Commission
	  			vm.chartCommissionOptions.xAxis[0].data = vm.weekConstant;
		        vm.chartCommissionOptions.series[0].data = [0, 0, 0, 0, 0, 0, 0];
		        vm.chartCommissionOptions.series[1].data = [0, 0, 0, 0, 0, 0, 0];
	  		}
	  		
	  		function loadData() {
	  			resetData();
	  			vm.isLoading = true;
	  			vm.report = {
		        		  "totalOrder" : "",
		        		  "numberOrderPaid" : "",
		        		  "numberOrderNotPaid" : "",
		        		  "totalPremmium" : "",
		        		  "premiumPaid" : "",
		        		  "premiumNotPaid" : "",
		        		  "waitAgency" : [],
		        		  "waitBaoviet" : []
	    		};
	  			
	  			if (vm.filterDate != 'ENHANCE') {
	  				vm.searchCriterial = {
	  	        		  "fromDate": "",
	  	        		  "periodTime": vm.filterDate,
	  	        		  "toDate": ""
	  				};
	      		} else {
	      			vm.searchCriterial.periodTime = "";
	      		}
	  			
	  			DashboardService.getReportDashboard(vm.searchCriterial, onSearchSuccess, onSearchError);
	  			
	  			function onSearchSuccess(data) {
	  				vm.isLoading = false;
	  				vm.report = data;
//	  				toastr.remove();
//	  				toastr.success("Dữ liệu đã được cập nhật");
	  				loadReportIncome();
	  				loadReportCommission();
	  			}
	  			
	  			function onSearchError() {
	  				vm.isLoading = false;
//	  				toastr.remove();
//	  				toastr.error("Lỗi khi tìm kiếm data báo cáo!");
	  			}
	  		}
	  		
	  		function loadReportIncome() {
	  			ReportService.getReportIncome(vm.searchCriterial, onSearchIncomeSuccess, onSearchIncomeError);
	  			
	  			function onSearchIncomeSuccess(result) {
	  				vm.dataIncome = result;
	  				updateChartDataIncome(vm.filterDate, result.data);
	  			}
	  			
	  			function onSearchIncomeError() {
	  			}
	  		}
	  		
	  		function loadReportCommission() {
	  			ReportService.getReportCommission(vm.searchCriterial, onSearchCommissionSuccess, onSearchCommissionError);
	  			
	  			function onSearchCommissionSuccess(result) {
	  				vm.dataCommission = result;
	  				updateChartDataCommission(vm.filterDate, result);
	  			}
	  			
	  			function onSearchCommissionError() {
	  			}
	  		}
	  		
	  		function updateChartDataIncome(type, data) {
	  			// Update chart xAxis
	    		switch(type) {
		    	    case "WEEK":
		    	    	vm.chartIncomeOptions.xAxis[0].data = vm.weekConstant;
		    	        vm.chartIncomeOptions.series[0].data = getYaxisDataIncome(data);
		    	        vm.chartIncomeOptions.series[1].data = getYaxisDataIncome(data);
		    	        break;
		    	    case "MONTH":
		    	        vm.chartIncomeOptions.xAxis[0].data = getXaxisData(data);
		    	        vm.chartIncomeOptions.series[0].data = getYaxisDataIncome(data);
		    	        vm.chartIncomeOptions.series[1].data = getYaxisDataIncome(data);
		    	        break;
		    	    case "YEAR":
		    	    	vm.chartIncomeOptions.xAxis[0].data = vm.yearConstant;
		    	        vm.chartIncomeOptions.series[0].data = getYaxisDataIncome(data);
		    	        vm.chartIncomeOptions.series[1].data = getYaxisDataIncome(data);
		    	        break;
		    	    case "ENHANCE":
		    	    	vm.chartIncomeOptions.xAxis[0].data = getXaxisData(data);
		    	        vm.chartIncomeOptions.series[0].data = getYaxisDataIncome(data);
		    	        vm.chartIncomeOptions.series[1].data = getYaxisDataIncome(data);
		    	        break;
		    	    default:
		    	    	break;
		    	}
	  		}
	  		
	  		function getYaxisDataIncome(data) {
	  			var result = [];
	  			angular.forEach(data, function(item) {
	  				result.push(item.totalPremium);
	  			});
	  			
	  			return result;
	  		}
	  		
	  		// COmmission
	  		function updateChartDataCommission(type, data) {
	  			// Update chart xAxis
	    		switch(type) {
		    	    case "WEEK":
		    	    	vm.chartCommissionOptions.xAxis[0].data = vm.weekConstant;
		    	        vm.chartCommissionOptions.series[0].data = getYaxisDataCommission(data.otherData);
		    	        vm.chartCommissionOptions.series[1].data = getYaxisDataCommission(data.data);
		    	        break;
		    	    case "MONTH":
		    	        vm.chartCommissionOptions.xAxis[0].data = getXaxisData(data.data);
		    	        vm.chartCommissionOptions.series[0].data = getYaxisDataCommission(data.otherData);
		    	        vm.chartCommissionOptions.series[1].data = getYaxisDataCommission(data.data);
		    	        break;
		    	    case "YEAR":
		    	    	vm.chartCommissionOptions.xAxis[0].data = vm.yearConstant;
		    	        vm.chartCommissionOptions.series[0].data = getYaxisDataCommission(data.otherData);
		    	        vm.chartCommissionOptions.series[1].data = getYaxisDataCommission(data.data);
		    	        break;
		    	    case "ENHANCE":
		    	    	vm.chartCommissionOptions.xAxis[0].data = getXaxisData(data);
		    	        vm.chartCommissionOptions.series[0].data = getYaxisDataCommission(data.otherData);
		    	        vm.chartCommissionOptions.series[1].data = getYaxisDataCommission(data.data);
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
	  		
	  		function getYaxisDataCommission(data) {
	  			var result = [];
	  			angular.forEach(data, function(item) {
	  				result.push(item.tongHoaHong);
	  			});
	  			
	  			return result;
	  		}
      }
      
})();
