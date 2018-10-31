(function() {
    'use strict';

    angular
        .module('app')
        .factory('DocumentService', DocumentService);

    DocumentService.$inject = ['$resource'];

    function DocumentService ($resource) {
    	var service = $resource('', {}, {
			'getAll' : {
				method : 'GET',
				url : 'api/agency/document/get-all',
				isArray : true
			},
			'download': {
				url: 'api/agency/document/download/:id'
				, method: 'GET'
			}
		});

		return service;
    }
})();
