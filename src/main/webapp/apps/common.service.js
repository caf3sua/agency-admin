(function() {
    'use strict';

    angular
        .module('app')
	    .factory('CommonDialogService', CommonDialogService);
	
    CommonDialogService.$inject = ['$rootScope', '$uibModal'];

    function CommonDialogService ($rootScope, $uibModal) {
        var service = {
    		openSearchAnchiDialog: openSearchAnchiDialog
        };

        var modalInstance = null;
        var resetModal = function () {
            modalInstance = null;
        };

        return service;

        function openSearchAnchiDialog () {
            if (modalInstance !== null) return;
            modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'apps/printed-paper/printed-paper-new/printed-paper-search-product-dialog.html',
                controller: 'PrintedPaperNewDialogController',
                controllerAs: 'vm',
                size: 'lg',
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }],
		            loadPlugin: function ($ocLazyLoad) {
		                return $ocLazyLoad.load([ 
		                	'apps/printed-paper/printed-paper-base.service.js'
		                	, 'apps/printed-paper/printed-paper-new/printed-paper-new-dialog.controller.js'
	                	]);
		            }
                }
            });
            
            modalInstance.result.then(function (anchiObj) {
                $rootScope.selectedAnchi = anchiObj;
                $rootScope.$broadcast('selectedAnchiChange');
                modalInstance = null;
              }, function () {
                console.log('Modal dismissed at: ' + new Date());
                modalInstance = null;
              });
        }
    }
})();


