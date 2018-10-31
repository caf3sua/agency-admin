(function () {
    'use strict';

    angular
        .module('app')
        .factory('ProductCommonService', ProductCommonService);

    ProductCommonService.$inject = ['$resource'];

    function ProductCommonService ($resource) {
        var service = $resource('api/agency/product/', {}, {
        	// Address
        	'getAddressByPostcode' : {
                method : 'GET',
                url : 'api/agency/common/getAddressByCode'
            },
        	// Ycbh offline
        	'saveYcbhOffline' : {
                method : 'POST',
                url : 'api/agency/product/agreement/createYcbhOffline'
            },
            // An chi
        	'saveAnchiPolicy' : {
                method : 'POST',
                url : 'api/agency/product/agreement/createYcbhAnchi'
            },
        	'getById' : {
                method : 'GET',
                url : 'api/agency/product/agreement/get-by-id/:id'
            },
        	'getPolicyNumber' : {
				method : 'GET',
				url : 'api/agency/common/getPolicyNumber',
				transformResponse : function(data) {
					data = angular.fromJson({
						policyNumber : data
					});
					return data;
				}
			},
			// KCARE
			'getKcarePremium' : {
				method : 'POST',
				url : 'api/agency/product/kcare/premium'
			},
			'createKcarePolicy' : {
				method : 'POST',
				url : 'api/agency/product/kcare/createPolicy'
			},
			'updateKcarePolicy' : {
				method : 'POST',
				url : 'api/agency/product/kcare/update'
			},
			// CAR
			'getCarPremium' : {
				method : 'POST',
				url : 'api/agency/product/car/premium'
			},
			'createCarPolicy' : {
				method : 'POST',
				url : 'api/agency/product/car/createPolicy'
			},
			'updateCarPolicy' : {
				method : 'POST',
				url : 'api/agency/product/car/update'
			},
			// BVP
			'getBvpPremium' : {
				method : 'POST',
				url : 'api/agency/product/bvp/premium'
			},
			'createBvpPolicy' : {
				method : 'POST',
				url : 'api/agency/product/bvp/createPolicy'
			},
			'updateBvpPolicy' : {
				method : 'POST',
				url : 'api/agency/product/bvp/update'
			},
			// KHC
			'getKhcPremium' : {
				method : 'POST',
				url : 'api/agency/product/khc/premium'
			},
			'createKhcPolicy' : {
				method : 'POST',
				url : 'api/agency/product/khc/createPolicy'
			},
			'updateKhcPolicy' : {
				method : 'POST',
				url : 'api/agency/product/khc/update'
			},
			// TNC
			'getTncPremium' : {
				method : 'POST',
				url : 'api/agency/product/tnc/premium'
			},
			'createTncPolicy' : {
				method : 'POST',
				url : 'api/agency/product/tnc/createPolicy'
			},
			'updateTncPolicy' : {
				method : 'POST',
				url : 'api/agency/product/tnc/update'
			},
			// TVC
			'getTvcPremium' : {
                method : 'POST',
                url : 'api/agency/product/tvc/premium'
            },
            'createTvcPolicy' : {
                method : 'POST',
                url : 'api/agency/product/tvc/createPolicy'
            },
            'updateTvcPolicy' : {
                method : 'POST',
                url : 'api/agency/product/tvc/update'
            },
            // TVI
            'getTviPremium' : {
                method : 'POST',
                url : 'api/agency/product/tvi/premium'
            },
            'createTviPolicy' : {
                method : 'POST',
                url : 'api/agency/product/tvi/createPolicy'
            },
            'updateTviPolicy' : {
                method : 'POST',
                url : 'api/agency/product/tvi/update'
            },
            // HOME
            'getHomePremium': {url: 'api/agency/product/home/premium', method: 'POST', isArray: false},
            'createHomePolicy': {
            	url: 'api/agency/product/home/createPolicy',  
            	method:'POST'
            },
            'updateHomePolicy': {
            	url: 'api/agency/product/home/update',  
            	method:'POST'
            },
            // MOTO
            'getMotoPremium' : {
				method : 'POST',
				url : 'api/agency/product/moto/premium'
			},
			'createMotoPolicy' : {
				method : 'POST',
				url : 'api/agency/product/moto/createPolicy'
			},
			'updateMotoPolicy' : {
				method : 'POST',
				url : 'api/agency/product/moto/update'
			},
			// HHVC
			'getHhvcPremium' : {
				method : 'POST',
				url : 'api/agency/product/hhvc/premium'
			},
			'createHhvcPolicy' : {
				method : 'POST',
				url : 'api/agency/product/hhvc/createPolicy'
			},
			'updateHhvcPolicy' : {
				method : 'POST',
				url : 'api/agency/product/hhvc/update'
			},
			'getByGycbhNumber' : {
                method : 'POST',
                url : 'api/agency/product/agreement/get-by-gycbhNumber'
            },
			'checkOTP' : {
                method : 'POST',
                url : 'api/agency/product/agreement/check-OTP'
            }
        });

        return service;
    }
})();
 