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
				url : 'api/agency/product/adminUser/admin-forgotPassword',
				transformResponse : function(data) {
					data = angular.fromJson({
						result : data
					});
					return data;
				}
			}
		});

		return service;
	}
})();