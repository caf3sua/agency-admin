(function() {
	'use strict';

	angular
		.module('app')
		.factory('CarService', CarService);

	CarService.$inject = [ '$resource' ];

	function CarService($resource) {
		var service = $resource('', {}, {
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
			},
			'getPremium' : {
				method : 'POST',
				url : 'api/agency/product/car/premium'
			},
			'createNewPolicy' : {
				method : 'POST',
				url : 'api/agency/product/car/createPolicy'
			}
		});

		return service;
	}
})();