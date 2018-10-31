(function() {
    'use strict';
    angular
        .module('app')
        .controller('ContactHistoryPurchaseController', ContactHistoryPurchaseController);


    ContactHistoryPurchaseController.$inject = ['$rootScope', '$scope', '$state', '$http', '$filter',
    		'ContactService','$controller', 'entity', 'ReportService'];
        function ContactHistoryPurchaseController($rootScope, $scope, $state, $http, $filter
        		, ContactService, $controller, entity, ReportService) {
        	
        	var vm = this;
        	vm.contactSelected = entity;
        	
        	vm.his = [];
        	vm.hisInit = [];
        	vm.totalPremium = 0;
        	vm.goBack = goBack;
        	
        	// variable
        	angular.element(document).ready(function () {
            });

        	// Init controller
      		(function initController() {
      			// instantiate base controller
      			loadAll();
      		})();
      		
      		// function
      		function goBack() {
      			$state.go("app.contact", {selected: vm.contactSelected.contactId, groupType: $rootScope.contactGroupType});
      		}
      		
      		function loadAll() {
      			ReportService.getReportHistoryPurchase({contactId: vm.contactSelected.contactId}, onSuccess, onError);
      			
      			function onSuccess(data, headers) {
                	vm.his = data;
                	calculateTotalPremium(vm.his);
                }
                function onError(error) {
                    console.log(error);
                }
      		}
      		
      		function calculateTotalPremium(data) {
      			angular.forEach(data, function(value, key) {
      				vm.totalPremium = vm.totalPremium + value.amount;
  			 	});
      		}
        }
})();
