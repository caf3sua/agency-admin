(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', '$urlRouterProvider', 'MODULE_CONFIG'];

    function stateConfig($stateProvider, $urlRouterProvider, MODULE_CONFIG) {
    	$stateProvider
			.state('order', {
				abstract: true,
				url: '/order',
				views: {
					'': {
						templateUrl: '../views/theme/layout/layout.html'
					}
				},
				resolve: {
		            translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
		                $translatePartialLoader.addPart('global');
		                return $translate.refresh();
		            }],
		            loadPlugin: function ($ocLazyLoad) {
		            		return $ocLazyLoad.load([
		            			'apps/order/order.service.js'
		            			, 'apps/agreement-base.controller.js'
	            			]);
			        }
		        }
		})
		
		.state('order.me', {
            parent: 'order',
            url: '/me?status',
            templateUrl: 'apps/order/me/order.html',
            data : { 
            	title: 'ORDER_ME',
            	authorities : ['PERM_AGREEMENT_VIEW']
            },
            controller: "OrderController",
            controllerAs: 'vm',
            params: {
                page: {
                    value: '1',
                    squash: true
                },
                sort: {
                    value: 'id,asc',
                    squash: true
                },
                search: null
            },
            resolve: {
            		translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
        				$translatePartialLoader.addPart('dashboard');
        				return $translate.refresh();
            		}],
            		loadPlugin: function ($ocLazyLoad) {
	            		return $ocLazyLoad.load([
	            			'apps/order/me/order.controller.js', 'apps/product/product-base.controller.js', 'apps/product/product-base.service.js', 'apps/product/agreement-otp.controller.js'
	            		]);
		        }
            }
        })
        
        .state('order.agency', {
            parent: 'order',
            url: '/agency-waiting',
            templateUrl: 'apps/order/agency-wait/order-wait.html',
            data : { 
            	title: 'ORDER_AGENCY',
            	authorities : ['PERM_AGREEMENT_VIEW']
            },
            controller: "OrderAgencyController",
            controllerAs: 'vm',
            params: {
                page: {
                    value: '1',
                    squash: true
                },
                sort: {
                    value: 'id,asc',
                    squash: true
                },
                search: null
            },
            resolve: {
            		translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
        				$translatePartialLoader.addPart('dashboard');
        				return $translate.refresh();
            		}],
            		loadPlugin: function ($ocLazyLoad) {
	            		return $ocLazyLoad.load([
	            			'apps/order/agency-wait/order-wait.controller.js', 'apps/product/product-base.controller.js', 'apps/product/product-base.service.js', 'apps/product/agreement-otp.controller.js'
	            		]);
		        }
            }
        })
        
        .state('order.baoviet', {
            parent: 'order',
            url: '/baoviet-waiting',
            templateUrl: 'apps/order/baoviet-wait/order-BV-wait.html',
            data : { 
            	title: 'ORDER_BAOVIET',
            	authorities : ['PERM_AGREEMENT_VIEW']
            },
            controller: "OrderBVController",
            controllerAs: 'vm',
            params: {
                page: {
                    value: '1',
                    squash: true
                },
                sort: {
                    value: 'id,asc',
                    squash: true
                },
                search: null
            },
            resolve: {
            		translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
        				$translatePartialLoader.addPart('dashboard');
        				return $translate.refresh();
            		}],
            		loadPlugin: function ($ocLazyLoad) {
	            		return $ocLazyLoad.load([
	            			'apps/order/baoviet-wait/order-BV-wait.controller.js', 'apps/product/product-base.controller.js', 'apps/product/product-base.service.js', 'apps/product/agreement-otp.controller.js'
	            		]);
		        }
            }
        })
        
        .state('order.other', {
            parent: 'order',
            url: '/other',
            templateUrl: 'apps/order/other/order-other-wait.html',
            data : { 
            	title: 'ORDER_OTHER',
            	authorities : ['PERM_AGREEMENT_VIEW']
            },
            controller: "OrderOtherController",
            controllerAs: 'vm',
            params: {
                page: {
                    value: '1',
                    squash: true
                },
                sort: {
                    value: 'id,asc',
                    squash: true
                },
                search: null
            },
            resolve: {
            		translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
        				$translatePartialLoader.addPart('dashboard');
        				return $translate.refresh();
            		}],
            		loadPlugin: function ($ocLazyLoad) {
	            		return $ocLazyLoad.load([
	            			'apps/order/other/order-other-wait.controller.js', 'apps/product/product-base.controller.js', 'apps/product/product-base.service.js', 'apps/product/agreement-otp.controller.js'
	            		]);
		        }
            }
        })
        
        .state('order.nophi', {
            parent: 'order',
            url: '/nophi',
            templateUrl: 'apps/order/nophi/order-nophi.html',
            data : { 
            	title: 'ORDER_NOPHI',
            	authorities : ['PERM_AGREEMENT_VIEW']
            },
            controller: "OrderNophiController",
            controllerAs: 'vm',
            params: {
                page: {
                    value: '1',
                    squash: true
                },
                sort: {
                    value: 'id,asc',
                    squash: true
                },
                search: null
            },
            resolve: {
            		translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
        				$translatePartialLoader.addPart('dashboard');
        				return $translate.refresh();
            		}],
            		loadPlugin: function ($ocLazyLoad) {
	            		return $ocLazyLoad.load([
	            			'apps/order/nophi/order-nophi.controller.js'
	            		]);
		        }
            }
        })
        .state('order.order-detail', {
	        	parent: 'order',
	            url: '/order-detail/{id}',
	            templateUrl: 'apps/order/me/order-detail.html',
	            data : { title: 'ORDER_DETAIL' },
	            controller: "OrderDetailController",
	            controllerAs: 'vm',
	            resolve: {
	            		translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
	        				$translatePartialLoader.addPart('global');
	        				return $translate.refresh();
	            		}],
	            		loadPlugin: function ($ocLazyLoad) {
		            		return $ocLazyLoad.load([
		            			'apps/order/me/order-detail.controller.js'
		            	]);
			        }
	            }
        });
    }
})();
