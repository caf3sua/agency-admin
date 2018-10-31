(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('printed-paper.new', {
            parent: 'printed-paper',
            url: '/new',
            templateUrl: 'apps/printed-paper/printed-paper-new/printed-paper-new.html',
            data: {
                authorities: ['PERM_AGREEMENT_ANCHI_VIEW'],
                title: 'PRINTED_PAPER_NEW'
            },
            controller: "PrintedPaperNewController",
            controllerAs: 'vm',
            resolve: {
            		loadPlugin: function ($ocLazyLoad) {
	            		return $ocLazyLoad.load([
	            			'apps/printed-paper/printed-paper-base.service.js'
	            			, 'apps/printed-paper/printed-paper-new/printed-paper-new.controller.js'
	            	]);
		        }
            }
        });
    }
})();
