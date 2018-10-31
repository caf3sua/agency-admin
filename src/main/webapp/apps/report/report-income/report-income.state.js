(function() {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('report.income', {
            parent: 'report',
            url: '/income',
            templateUrl: 'apps/report/report-income/report-income.html',
            data: {
                authorities: ['PERM_REPORT_INCOME_VIEW'],
                title: 'REPORT_INCOME'
            },
            controller: "ReportIncomeController",
            controllerAs: 'vm',
            resolve: {
            		loadPlugin: function ($ocLazyLoad) {
	            		return $ocLazyLoad.load(['apps/report/report-income/report-income.controller.js', 'apps/product/product-base.controller.js', 'apps/product/product-base.service.js']);
		        }
            }
        });
    }
})();
