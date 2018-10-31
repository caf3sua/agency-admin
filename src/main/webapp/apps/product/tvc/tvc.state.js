(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('product.tvc', {
            parent: 'product',
            url: '/tvc?id&copy',
            templateUrl: 'apps/product/layout.html',
            data: {
                authorities: ['PERM_PRODUCT_TVC_CREATE'],
                title: 'PRODUCT_TVC'
            },
            controller: "ProductTvcController",
            controllerAs: 'vm',
            resolve: {
            		loadPlugin: function ($ocLazyLoad) {
	            		return $ocLazyLoad.load(['apps/product/tvc/tvc.controller.js']);
		        }
            }
        });
    }
})();
