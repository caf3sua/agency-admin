(function() {
	'use strict';

	angular
		.module('app')
		.factory('ReportService', ReportService);

	ReportService.$inject = [ '$resource' ];

	function ReportService($resource) {
		var service = $resource('', {}, {
			'getReportTransfer' : {
				method : 'POST',
				url : 'api/agency/agency-report/report-transfer',
				isArray : true
			},
			'getReportIncome' : {
				method : 'POST',
				url : 'api/agency/agency-report/report-income'
			},
			'getReportDashboard' : {
				method : 'POST',
				url : 'api/agency/agency-report/report-dashboard'
			},
			'getReportCommission' : {
				method : 'POST',
				url : 'api/agency/agency-report/report-commission'
			},
			'getReportHistoryPurchase' : {
				method : 'GET',
				url : 'api/agency/agency-report/report-history-purchase/:contactId',
				isArray: true
			}
		});

		return service;
	}
})();