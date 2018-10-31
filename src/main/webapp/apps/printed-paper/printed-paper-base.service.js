(function() {
	'use strict';

	angular
		.module('app')
		.factory('PrintedPaperService', PrintedPaperService);

	PrintedPaperService.$inject = [ '$resource' ];

	function PrintedPaperService($resource) {
		var service = $resource('', {}, {
			'getListTypes' : {
				method : 'GET',
				url : 'api/agency/printed-paper/get-type',
				isArray : true
			},
			'searchNew' : {
				method : 'POST',
				url : 'api/agency/printed-paper/search-new',
				isArray : true
			},
			'searchUsed' : {
				method : 'POST',
				url : 'api/agency/printed-paper/search-used',
				isArray : true
			},
			'getByGycbhNumber' : {
                method : 'POST',
                url : 'api/agency/product/agreement/getAnchi-by-gycbhNumber'
            }
		});

		return service;
	}
})();