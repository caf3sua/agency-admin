(function () {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig ($stateProvider) {
        $stateProvider
        		.state('access', {
        			url: '/access',
        			template: '<div class=" bg-auto w-full"><div ui-view class="fade-in-right-big smooth pos-rlt"></div></div>',
        			resolve: {
        				translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
        					$translatePartialLoader.addPart('account');
        					return $translate.refresh();
        				}]
	        		}
        		})
        		.state('access.signin', {
        			url: '/signin',
        			templateUrl: 'apps/access/signin/signin.html',
        			data : { 
    					title: 'SignIn',
    					authorities : []
        			},
        			controller: "SigninController",
        			controllerAs: 'vm',
        			resolve: {
        				loadPlugin: function ($ocLazyLoad) {
        		    			return $ocLazyLoad.load(['apps/access/signin/signin.controller.js']);
        				}
	        		}
        		})
//        		.state('access.signup', {
//        			url: '/signup',
//        			templateUrl: 'apps/access/signup/signup.html'
//        		})
        		.state('access.forgot-password', {
        			url: '/forgot-password',
        			templateUrl: 'apps/access/forgot-password/forgot-password.html',
        			data : { title: 'SignIn' },
        			controller: "ForgotPasswordController",
        			controllerAs: 'vm',
        			resolve: {
        				loadPlugin: function ($ocLazyLoad) {
        		    			return $ocLazyLoad.load(['apps/access/forgot-password/forgot-password.service.js', 'apps/access/forgot-password/forgot-password.controller.js']);
        				}
	        		}
        		});
//        		.state('access.lockme', {
//        			url: '/lockme',
//        			templateUrl: 'apps/access/lockme/lockme.html'
//        		})
//        		;
    }
})();
