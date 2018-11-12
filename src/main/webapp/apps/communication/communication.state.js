(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('app.communication', {
            parent: 'app',
            url: '/communication/{id}',
            templateUrl: 'apps/communication/view/communication.html',
            data: {
                authorities: ['PERM_AGREEMENT_OFFLINE_BVP'],
                title: 'COMMUNICATION'
            },
            controller: "CommunicationController",
            controllerAs: 'vm',
            resolve: {
            		loadPlugin: function ($ocLazyLoad) {
	            		return $ocLazyLoad.load(['apps/communication/communication.controller.js', 'apps/communication/communication.service.js']);
		        }
            }
        }) ;
    }
})();
