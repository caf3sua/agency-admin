(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('printed-paper.used', {
            parent: 'printed-paper',
            url: '/used',
            templateUrl: 'apps/printed-paper/printed-paper-used/printed-paper-used.html',
            data: {
                authorities: ['PERM_AGREEMENT_ANCHI_VIEW'],
                title: 'PRINTED_PAPER_USED'
            },
            controller: "PrintedPaperUsedController",
            controllerAs: 'vm',
            resolve: {
            		loadPlugin: function ($ocLazyLoad) {
	            		return $ocLazyLoad.load(['apps/printed-paper/printed-paper-used/printed-paper-used.controller.js']);
		        }
            }
        });
    }
})();
