(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', '$urlRouterProvider', 'MODULE_CONFIG'];

    function stateConfig($stateProvider, $urlRouterProvider,   MODULE_CONFIG) {
        $stateProvider.state('app.cart', {
            parent: 'app',
            url: '/cart?page',
            templateUrl: 'apps/cart/cart.html',
            data : { 
            	title: 'CART',
            	authorities : ['PERM_CART_VIEW']
            },
            controller: "CartController",
            controllerAs: 'vm',
            params: {
                page: {
                    value: '1',
                    squash: true
                },
                sort: {
                    value: 'id,asc',
                    squash: true
                }
            },
            resolve: {
            		translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
        				$translatePartialLoader.addPart('dashboard');
        				return $translate.refresh();
            		}],
            		loadPlugin: function ($ocLazyLoad) {
	            		return $ocLazyLoad.load(['apps/cart/cart.service.js', 'apps/cart/cart.controller.js', 'apps/agreement-base.controller.js', 'apps/order/order.service.js',
	            			'apps/product/printed-paper/printed-paper.service.js']);
		        }
            }
        });
    }
})();
