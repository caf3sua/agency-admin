(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', '$urlRouterProvider', 'MODULE_CONFIG'];

    function stateConfig($stateProvider, $urlRouterProvider, MODULE_CONFIG) {
        $stateProvider.state('app.document', {
            parent: 'app',
            url: '/document',
            templateUrl: 'apps/document/document.html',
            data : { 
        		title: 'DOCUMENT',
        		authorities : ['PERM_DOCUMENT_VIEW']
            },
            controller: "DocumentController",
            controllerAs: 'vm',
            resolve: {
            		translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
        				$translatePartialLoader.addPart('dashboard');
        				return $translate.refresh();
            		}],
            		loadPlugin: function ($ocLazyLoad) {
	            		return $ocLazyLoad.load(['apps/document/document.service.js', 'apps/document/document.controller.js']);
		        }
            }
        });
    }
})();
