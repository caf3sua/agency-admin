// Create by: Nam, Nguyen Hoai - ITSOL.vn
(function () {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig ($stateProvider) {
    	$stateProvider
			.state('account', {
				abstract: true,
				url: '/account',
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
		            		return $ocLazyLoad.load([]);
			        }
		        }
			})
			.state('account.change-password', {
	            parent: 'account',
	            url: '/change-password',
	            templateUrl: 'apps/account/change-password/change-password.html',
	            data: {
	                authorities: [],
	                title: 'ACCOUNT_CHANGE_PASSWORD'
	            },
	            controller: "ChangePasswordController",
	            controllerAs: 'vm',
	            resolve: {
	            		loadPlugin: function ($ocLazyLoad) {
		            		return $ocLazyLoad.load(['apps/account/change-password/change-password.controller.js', 'apps/account/change-password/change-password.service.js']);
			        }
	            }
	        });
    }
})();