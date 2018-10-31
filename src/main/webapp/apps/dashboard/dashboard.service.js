(function() {
    'use strict';

    angular
        .module('app')
        .factory('DashboardService', DashboardService);

    DashboardService.$inject = ['$resource'];

    function DashboardService ($resource) {
    	var service = $resource('', {}, {
			'getReportDashboard' : {
				method : 'POST',
				url : 'api/agency/agency-report/report-dashboard'
			},
			'getAllWaitAgency' : {
                method : 'GET',
                url : 'api/agency/product/agreement/get-wait-agency',
                isArray : true
            },
			'getAllWaitAgreement' : {
                method : 'GET',
                url : 'api/agency/product/agreement/get-wait-agreement',
                isArray : true
            }
		});

    	return service;
    }
})();
