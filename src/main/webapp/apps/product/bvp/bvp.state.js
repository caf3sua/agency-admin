(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('product.bvp', {
            parent: 'product',
            url: '/bvp?id&copy',
            templateUrl: 'apps/product/layout.html',
            data: {
                authorities: ['PERM_PRODUCT_BVP_CREATE'],
                title: 'PRODUCT_BVP'
            },
            controller: "ProductBvpController",
            controllerAs: 'vm',
            resolve: {
            		loadPlugin: function ($ocLazyLoad) {
	            		return $ocLazyLoad.load(['apps/product/bvp/bvp.controller.js']);
		        }
            }
        });
    }
})();
