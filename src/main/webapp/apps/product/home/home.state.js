(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        	.state('product.home', {
	            parent: 'product',
	            url: '/home?id&copy',
	            templateUrl: 'apps/product/layout.html',
	            data: {
	                authorities: ['PERM_PRODUCT_HOM_CREATE'],
	                title: 'PRODUCT_HOME'
	            },
	            controller: "ProductHomeController",
	            controllerAs: 'vm',
	            resolve: {
            		loadPlugin: function ($ocLazyLoad) {
		            		return $ocLazyLoad.load(['apps/product/home/home.controller.js']);
			        }
	            }
	        });
    }
})();
