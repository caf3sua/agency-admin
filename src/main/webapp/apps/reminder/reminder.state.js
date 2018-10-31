(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', '$urlRouterProvider', 'MODULE_CONFIG'];

    function stateConfig($stateProvider, $urlRouterProvider, MODULE_CONFIG) {
        $stateProvider
	        .state('app.reminder', {
	            url: '/reminder',
	            templateUrl: 'apps/reminder/reminder.html',
	            data : { 
	            	title: 'REMINDER',
	            	authorities : []
	            },
	            controller: "ReminderController",
	            controllerAs: 'vm',
	            resolve: {
	            		translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
	        				$translatePartialLoader.addPart('global');
	        				return $translate.refresh();
	            		}],
	            		loadPlugin: function ($ocLazyLoad) {
		            		return $ocLazyLoad.load(['apps/reminder/reminder.controller.js']);
			        }
	            }
	        });
    }
})();
