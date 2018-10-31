(function() {
	'use strict';

	angular
		.module('app')
		.factory('ForgotPasswordService', ForgotPasswordService);

	ForgotPasswordService.$inject = [ '$resource' ];

	function ForgotPasswordService($resource) {
		var service = $resource('', {}, {
			'forgotPassword' : {
				method : 'POST',
				url : 'api/agency/account/forgotPassword'
			}
		});

		return service;
	}
})();