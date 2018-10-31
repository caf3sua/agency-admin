(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', '$urlRouterProvider', 'MODULE_CONFIG'];

    function stateConfig($stateProvider, $urlRouterProvider, MODULE_CONFIG) {
        $stateProvider.state('app.promotion', {
            parent: 'app',
            url: '/promotion',
            templateUrl: 'apps/promotion/promotion.html',
            data : { 
            	title: 'PROMOTION',
            	authorities : ['PERM_PROMOTION_VIEW']
            },
            controller: "PromotionController",
            controllerAs: 'vm',
            resolve: {
            		translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
        				$translatePartialLoader.addPart('dashboard');
        				return $translate.refresh();
            		}],
            		loadPlugin: function ($ocLazyLoad) {
	            		return $ocLazyLoad.load(['apps/promotion/promotion.service.js', 'apps/promotion/promotion.controller.js']);
		        }
            }
        });
    }
})();
