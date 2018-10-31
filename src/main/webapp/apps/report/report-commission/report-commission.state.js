(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('report.commission', {
            parent: 'report',
            url: '/commission',
            templateUrl: 'apps/report/report-commission/report-commission.html',
            data: {
                authorities: ['PERM_REPORT_COMMISSION_VIEW'],
                title: 'REPORT_COMMISSION'
            },
            controller: "ReportCommissionController",
            controllerAs: 'vm',
            resolve: {
            		loadPlugin: function ($ocLazyLoad) {
	            		return $ocLazyLoad.load(['apps/report/report-commission/report-commission.controller.js', 'apps/product/product-base.controller.js', 'apps/product/product-base.service.js']);
		        }
            }
        });
    }
})();
