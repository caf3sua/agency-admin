(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('product.kcare', {
            parent: 'product',
            url: '/kcare?id&copy',
            templateUrl: 'apps/product/layout.html',
            data: {
                authorities: ['PERM_PRODUCT_KCR_CREATE'],
                title: 'PRODUCT_KCARE'
            },
            controller: "ProductKcareController",
            controllerAs: 'vm',
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['apps/product/kcare/kcare.controller.js']);
                }
            }
        });
    }
})();
