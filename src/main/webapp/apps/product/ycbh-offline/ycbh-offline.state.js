(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('product.ycbh-offline', {
            parent: 'product',
            url: '/ycbh-offline/{productCode}',
            templateUrl: 'apps/product/ycbh-offline/view/ycbh-offline.html',
            data: {
                authorities: ['PERM_AGREEMENT_OFFLINE_BVP','PERM_AGREEMENT_OFFLINE_CAR','PERM_AGREEMENT_OFFLINE_HOM','PERM_AGREEMENT_OFFLINE_KCR','PERM_AGREEMENT_OFFLINE_MOT','PERM_AGREEMENT_OFFLINE_KHC','PERM_AGREEMENT_OFFLINE_TNC','PERM_AGREEMENT_OFFLINE_TVC','PERM_AGREEMENT_OFFLINE_TVI','PERM_AGREEMENT_OFFLINE_HHV'],
                title: 'PRODUCT_YCBH_OFFLINE'
            },
            controller: "ProductYcbhOfflineController",
            controllerAs: 'vm',
            resolve: {
            		loadPlugin: function ($ocLazyLoad) {
	            		return $ocLazyLoad.load(['apps/product/ycbh-offline/ycbh-offline.controller.js', 'apps/product/ycbh-offline/ycbh-offline.service.js']);
		        }
            }
        })
        
        .state('product.ycbh-offline-edit', {
            parent: 'product',
            url: '/ycbh-offline-edit?id&copy',
            templateUrl: 'apps/product/ycbh-offline/view/ycbh-offline.html',
            data: {
                authorities: ['PERM_AGREEMENT_OFFLINE_BVP','PERM_AGREEMENT_OFFLINE_CAR','PERM_AGREEMENT_OFFLINE_HOM','PERM_AGREEMENT_OFFLINE_KCR','PERM_AGREEMENT_OFFLINE_MOT','PERM_AGREEMENT_OFFLINE_KHC','PERM_AGREEMENT_OFFLINE_TNC','PERM_AGREEMENT_OFFLINE_TVC','PERM_AGREEMENT_OFFLINE_TVI','PERM_AGREEMENT_OFFLINE_HHV'],
                title: 'PRODUCT_YCBH_OFFLINE'
            },
            controller: "ProductYcbhOfflineController",
            controllerAs: 'vm',
            resolve: {
            		loadPlugin: function ($ocLazyLoad) {
	            		return $ocLazyLoad.load(['apps/product/ycbh-offline/ycbh-offline.controller.js', 'apps/product/ycbh-offline/ycbh-offline.service.js']);
		        }
            }
        })
        
        .state('product.ycbh-offline-detail', {
            parent: 'product',
            url: '/ycbh-offline-detail/{id}',
            templateUrl: 'apps/product/ycbh-offline/view/ycbh-offline-detail.html',
            data: {
                authorities: ['PERM_AGREEMENT_OFFLINE_BVP','PERM_AGREEMENT_OFFLINE_CAR','PERM_AGREEMENT_OFFLINE_HOM','PERM_AGREEMENT_OFFLINE_KCR','PERM_AGREEMENT_OFFLINE_MOT','PERM_AGREEMENT_OFFLINE_KHC','PERM_AGREEMENT_OFFLINE_TNC','PERM_AGREEMENT_OFFLINE_TVC','PERM_AGREEMENT_OFFLINE_TVI','PERM_AGREEMENT_OFFLINE_HHV'],
                title: 'PRODUCT_YCBH_OFFLINE'
            },
            controller: "ProductYcbhOfflineController",
            controllerAs: 'vm',
            resolve: {
            		loadPlugin: function ($ocLazyLoad) {
	            		return $ocLazyLoad.load(['apps/product/ycbh-offline/ycbh-offline.controller.js', 'apps/product/ycbh-offline/ycbh-offline.service.js']);
		        }
            }
        });
    }
})();
