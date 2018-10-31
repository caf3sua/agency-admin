(function() {
    'use strict';

    angular
        .module('app')
        .controller('DocumentController', DocumentController);

    DocumentController.$inject = ['$scope', '$controller', 'Principal', '$state'
    	, '$rootScope', 'DocumentService', '$window', 'API_SERVICE_URL'];

    function DocumentController ($scope, $controller, Principal, $state
    		, $rootScope, DocumentService, $window, API_SERVICE_URL) {
    	var vm = this;

    	vm.docs = [];
    	vm.docsInit = [];
    	
        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			loadAll();
  		})();
  		
  		// Properties & function declare
  		vm.downloadDocument = downloadDocument;
  		
  		// Function
  		function downloadDocument(doc) {
  			var templateRoute = API_SERVICE_URL + '/api/agency/document/download/' + doc.id;
            $window.location = templateRoute;
            doc.numberDownload++;
  		}
  		
  		function loadAll() {
  			DocumentService.getAll({}, onSuccess, onError);
            function onSuccess(data, headers) {
            	vm.docs = data;
            }
            function onError(error) {
                console.log(error);
            }
  		}

    }
})();
