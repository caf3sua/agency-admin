(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('product.hhvc', {
            parent: 'product',
            url: '/hhvc?id',
            templateUrl: 'apps/product/layout.html',
            data: {
                authorities: ['PERM_PRODUCT_HHV_CREATE'],
                title: 'PRODUCT_HHVC'
            },
            controller: "ProductHhvcController",
            controllerAs: 'vm',
            resolve: {
            		loadPlugin: function ($ocLazyLoad) {
	            		return $ocLazyLoad.load(['apps/product/hhvc/hhvc.controller.js']);
		        }
            }
        });
    }
})();
