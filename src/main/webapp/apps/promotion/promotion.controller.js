(function() {
    'use strict';

    angular
        .module('app')
        .controller('PromotionController', PromotionController);

    PromotionController.$inject = ['$scope', '$controller', 'Principal', '$state', '$rootScope', 'PromotionService', '$window', 'API_SERVICE_URL'];

    function PromotionController ($scope, $controller, Principal, $state, $rootScope, PromotionService, $window, API_SERVICE_URL) {
    	var vm = this;

    	vm.promotions = [];
    	
        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			loadAll();
  		})();
  		
  		// Properties & function declare
  		
  		// Function

  		function loadAll() {
  			PromotionService.getPromosAll({}, onSuccess, onError);
            
  			function onSuccess(data, headers) {
            	vm.promotions = data;
            }
            
  			function onError(error) {
                console.log(error);
            }
  		}
  		
    }
})();
