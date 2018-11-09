(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', '$urlRouterProvider', 'MODULE_CONFIG'];

    function stateConfig($stateProvider, $urlRouterProvider,   MODULE_CONFIG) {
        $stateProvider.state('app.trans', {
            parent: 'app',
            url: '/trans?page',
            templateUrl: 'apps/transport/transport.html',
            data : { 
            	title: 'TRANSPORT',
            	authorities : ['']
            },
            controller: "TransController",
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
	            		return $ocLazyLoad.load(['apps/transport/transport.service.js', 'apps/transport/transport.controller.js', 'apps/agreement-base.controller.js', 'apps/order/order.service.js',
	            			'apps/product/printed-paper/printed-paper.service.js']);
		        }
            }
        });
    }
})();
