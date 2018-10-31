(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('product.tvi', {
            parent: 'product',
            url: '/tvi?id&copy',
            templateUrl: 'apps/product/layout.html',
            data: {
                authorities: ['PERM_PRODUCT_TVI_CREATE'],
                title: 'PRODUCT_TVI'
            },
            controller: "ProductTviController",
            controllerAs: 'vm',
            resolve: {
            		loadPlugin: function ($ocLazyLoad) {
	            		return $ocLazyLoad.load(['apps/product/tvi/tvi.controller.js']);
		        }
            }
        });
    }
})();
