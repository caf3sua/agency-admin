(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('product.printed-paper', {
            parent: 'product',
            url: '/printed-paper?productCode&anchiId',
            templateUrl: 'apps/product/printed-paper/view/printed-paper.html',
            data: {
                authorities: ['PERM_AGREEMENT_ANCHI_BVP','PERM_AGREEMENT_ANCHI_CAR','PERM_AGREEMENT_ANCHI_HOM','PERM_AGREEMENT_ANCHI_KCR','PERM_AGREEMENT_ANCHI_MOT','PERM_AGREEMENT_ANCHI_KHC','PERM_AGREEMENT_ANCHI_TNC','PERM_AGREEMENT_ANCHI_TVC','PERM_AGREEMENT_ANCHI_TVI','PERM_AGREEMENT_ANCHI_HHV'],
                title: 'PRODUCT_PRINTED_PAPER'
            },
            controller: "ProductPrintedPaperController",
            controllerAs: 'vm',
            resolve: {
            		loadPlugin: function ($ocLazyLoad) {
	            		return $ocLazyLoad.load([
	            			'apps/product/printed-paper/printed-paper.controller.js'
	            			, 'apps/product/printed-paper/printed-paper.service.js'
	            			, 'apps/printed-paper/printed-paper-base.service.js'
	            			, 'apps/product/product-base.controller.js', 'apps/product/product-base.service.js'
            			]);
		        }
            }
        })
        
        .state('product.printed-paper-edit', {
            parent: 'product',
            url: '/printed-paper-edit?id&copy',
            templateUrl: 'apps/product/printed-paper/view/printed-paper.html',
            data: {
                authorities: ['PERM_AGREEMENT_ANCHI_BVP','PERM_AGREEMENT_ANCHI_CAR','PERM_AGREEMENT_ANCHI_HOM','PERM_AGREEMENT_ANCHI_KCR','PERM_AGREEMENT_ANCHI_MOT','PERM_AGREEMENT_ANCHI_KHC','PERM_AGREEMENT_ANCHI_TNC','PERM_AGREEMENT_ANCHI_TVC','PERM_AGREEMENT_ANCHI_TVI','PERM_AGREEMENT_ANCHI_HHV'],
                title: 'PRODUCT_PRINTED_PAPER'
            },
            controller: "ProductPrintedPaperController",
            controllerAs: 'vm',
            resolve: {
            		loadPlugin: function ($ocLazyLoad) {
	            		return $ocLazyLoad.load([
	            			'apps/product/printed-paper/printed-paper.controller.js',
	            			'apps/product/printed-paper/printed-paper.service.js'
	            			, 'apps/product/product-base.controller.js', 'apps/product/product-base.service.js'
            			]);
		        }
            }
        })
        
        .state('product.printed-paper-detail', {
            parent: 'product',
            url: '/printed-paper-detail/{id}',
            templateUrl: 'apps/product/printed-paper/view/printed-paper-detail.html',
            data: {
                authorities: ['PERM_AGREEMENT_ANCHI_BVP','PERM_AGREEMENT_ANCHI_CAR','PERM_AGREEMENT_ANCHI_HOM','PERM_AGREEMENT_ANCHI_KCR','PERM_AGREEMENT_ANCHI_MOT','PERM_AGREEMENT_ANCHI_KHC','PERM_AGREEMENT_ANCHI_TNC','PERM_AGREEMENT_ANCHI_TVC','PERM_AGREEMENT_ANCHI_TVI','PERM_AGREEMENT_ANCHI_HHV'],
                title: 'PRODUCT_PRINTED_PAPER'
            },
            controller: "ProductPrintedPaperDetailController",
            controllerAs: 'vm',
            resolve: {
            		loadPlugin: function ($ocLazyLoad) {
	            		return $ocLazyLoad.load([
	            			'apps/product/printed-paper/printed-paper-detail.controller.js',
	            			'apps/product/printed-paper/printed-paper.service.js'
            			]);
		        }
            }
        });
    }
})();
