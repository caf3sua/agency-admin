(function() {
    'use strict';

    angular
        .module('app')
        .factory('ContactService', ContactService)
	    .factory('ContactCommonDialogService', ContactCommonDialogService);
	
    ContactCommonDialogService.$inject = ['$rootScope', '$uibModal'];

    function ContactCommonDialogService ($rootScope, $uibModal) {
        var service = {
    		openSearchDialog: openSearchDialog,
    		openAddDialog: openAddDialog,
    		openMailDialog: openMailDialog
        };

        var modalInstance = null;
        var resetModal = function () {
            modalInstance = null;
        };

        return service;

        function openSearchDialog () {
            if (modalInstance !== null) return;
            modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'apps/contact/contact-search-dialog.html',
                controller: 'ContactSearchDialogController',
                controllerAs: 'vm',
                size: 'lg',
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            });
            
            modalInstance.result.then(function (contactObj) {
                $rootScope.selectedContact = contactObj;
                $rootScope.$broadcast('selectedContactChange');
                modalInstance = null;
              }, function () {
                console.log('Modal dismissed at: ' + new Date());
                modalInstance = null;
              });
        }
        
        function openMailDialog () {
            if (modalInstance !== null) return;
            modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'apps/contact/contact-mail-dialog.html',
                controller: 'ContactMailDialogController',
                controllerAs: 'vm',
                size: 'lg',
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            });
            
            modalInstance.result.then(function (contactObj) {
                $rootScope.selectedContact = contactObj;
                $rootScope.$broadcast('selectedContactChange');
                modalInstance = null;
              }, function () {
                console.log('Modal dismissed at: ' + new Date());
                modalInstance = null;
              });
        }
        
        function openAddDialog () {
            if (modalInstance !== null) return;
            modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'apps/contact/contact-add-dialog.html',
                controller: 'ContactAddDialogController',
                controllerAs: 'vm',
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }],
                    loadPlugin: function ($ocLazyLoad) {
	            		return $ocLazyLoad.load(['apps/contact/contact-add-dialog.controller.js']);
                    }
                }
            });
            
            modalInstance.result.then(function (contactObj) {
                $rootScope.selectedContact = contactObj;
                $rootScope.$broadcast('selectedContactChange');
                modalInstance = null;
              }, function () {
                console.log('Modal dismissed at: ' + new Date());
                modalInstance = null;
              });
        }
    }

    ContactService.$inject = ['$resource'];
    function ContactService ($resource) {
    	var resourceUrl =  'api/agency/contact/:id';

    	return $resource(resourceUrl, {}, {
        	'get': {url : 'api/agency/contact/get-by-id/:id', method: 'GET'},
        	'search': {url : 'api/agency/contact/search', method: 'POST', isArray: true},
            'getAll': {url : 'api/agency/contact/get-all-ower', method: 'GET', isArray: true},
            'add': { method:'POST' },
            'delete': {url : 'api/agency/contact/delete-contact/:contactId', method: 'GET'},
            'create': {url : 'api/agency/contact/create', method: 'POST'},
            'update': {url : 'api/agency/contact/update', method: 'POST'},
            'getAllCategoryReminder': {url : 'api/agency/contact/getCategoryReminder', method: 'GET', isArray: true},
            'getAgrement' : {
            	method : 'GET', 
            	url : 'api/agency/product/agreement/get-by-contactId/:contactId',
            	isArray: true
            },
            'getByCode' : {
            	method : 'POST', 
            	url : 'api/agency/contact/get-by-code'
            },
            'getByCodeAdmin' : {
            	method : 'POST', 
            	url : 'api/agency/product/adminUser/adm-get-contact-by-code'
            },
            'getAddressByPostcode' : {
                method : 'GET',
                url : 'api/agency/common/getAddressByCode'
            }
        });
    }
})();


