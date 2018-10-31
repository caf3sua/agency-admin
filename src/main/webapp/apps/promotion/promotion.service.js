(function() {
    'use strict';

    angular
        .module('app')
        .factory('PromotionService', PromotionService);

    PromotionService.$inject = ['$resource'];

    function PromotionService ($resource) {
        var service = $resource('', {}, {
        	'getPromos' : {
				method : 'GET',
				url : 'api/agency/promotion/getPromos',
				isArray : true
			},
        	'getPromosAll' : {
				method : 'GET',
				url : 'api/agency/promotion/get-all',
				isArray : true
			},
			'getPromosDetail' : {
				method : 'GET',
				url : 'api/agency/promotion/getPromosDetail',
				isArray : true
			}
			
			
        });

        return service;
    }
})();
