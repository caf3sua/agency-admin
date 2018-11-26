(function() {
	'use strict';

	angular
		.module('app')
		.factory('NavCommonService', NavCommonService);

	NavCommonService.$inject = [ '$resource' ];

	function NavCommonService($resource) {
		var service = $resource('', {}, {
			'admGetCountAllOrder' : {
				method : 'GET',
				url : 'api/agency/agency-report/adm-get-count-all-order',
				isArray : false
			},
			'getKcarePremium' : {
				method : 'POST',
				url : 'api/agency/product/kcare/premium'
			},
			'getCarPremium' : {
				method : 'POST',
				url : 'api/agency/product/car/premium'
			},
			'getBvpPremium' : {
				method : 'POST',
				url : 'api/agency/product/bvp/premium'
			},
			'getKhcPremium' : {
				method : 'POST',
				url : 'api/agency/product/khc/premium'
			},
			'getTncPremium' : {
				method : 'POST',
				url : 'api/agency/product/tnc/premium'
			},
			'getTviPremium' : {
				method : 'POST',
				url : 'api/agency/product/tvi/premium'
			},
			'getTvcPremium' : {
				method : 'POST',
				url : 'api/agency/product/tvc/premium'
			},
			'getHomePremium' : {
				method : 'POST',
				url : 'api/agency/product/home/premium'
			},
			'getMotoPremium' : {
				method : 'POST',
				url : 'api/agency/product/moto/premium'
			},
			'getHhvcPremium' : {
				method : 'POST',
				url : 'api/agency/product/hhvc/premium'
			},
			'getCarBranches' : {
				method : 'POST',
				url : 'api/agency/product/car/getCarMakes',
				isArray : true
			},
			'getCarModel' : {
				method : 'GET',
				url : 'api/agency/product/car/getCarModel',
				isArray : true
			},
			'getMaxManufactureYear' : {
				method : 'GET',
				url : 'api/agency/product/car/getMaxManufactureYear',
				transformResponse : function(data) {
					data = angular.fromJson({
						max : data
					});
					return data;
				}
			},
			'getMinManufactureYear' : {
				method : 'GET',
				url : 'api/agency/product/car/getMinManufactureYear',
				transformResponse : function(data) {
					data = angular.fromJson({
						min : data
					});
					return data;
				}
			},
			'getCarPriceWithYear' : {
				method : 'GET',
				url : 'api/agency/product/car/getCarPriceWithYear',
				transformResponse : function(data) {
					data = angular.fromJson({
						price : Number(data)
					});
					return data;
				}
			}
		});

		return service;
	}
})();