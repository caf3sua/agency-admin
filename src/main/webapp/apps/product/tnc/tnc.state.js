(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('product.tnc', {
            parent: 'product',
            url: '/tnc?id&copy',
            templateUrl: 'apps/product/layout.html',
            data: {
                authorities: ['PERM_PRODUCT_TNC_CREATE'],
                title: 'PRODUCT_TNC'
            },
            controller: "ProductTncController",
            controllerAs: 'vm',
            resolve: {
            		loadPlugin: function ($ocLazyLoad) {
	            		return $ocLazyLoad.load(['apps/product/tnc/tnc.controller.js']);
		        }
            }
        });
    }
})();
