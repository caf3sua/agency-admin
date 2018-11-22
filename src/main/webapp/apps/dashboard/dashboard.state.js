(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', '$urlRouterProvider', 'MODULE_CONFIG'];

    function stateConfig($stateProvider, $urlRouterProvider,   MODULE_CONFIG) {
        $stateProvider.state('app.dashboard', {
            parent: 'app',
            url: '/dashboard',
            templateUrl: 'apps/dashboard/dashboard.html',
            data : { 
            	title: 'DASHBOARD',
        		authorities : []
            },
            controller: "DashboardController",
            controllerAs: 'vm',
            resolve: {
            		translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
        				$translatePartialLoader.addPart('dashboard');
        				return $translate.refresh();
            		}],
            		loadPlugin: function ($ocLazyLoad) {
	            		return $ocLazyLoad.load(['apps/report/report-base.service.js', 'apps/dashboard/dashboard.service.js', 'apps/dashboard/dashboard.controller.js', 'apps/product/product-base.controller.js', 'apps/product/product-base.service.js'
	            			, 'apps/communication/communication.controller.js'
	            			, 'apps/communication/communication.service.js'
	            			]);
		        }
            }
        });
    }
})();
