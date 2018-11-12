(function() {
    'use strict';
    
    angular
        .module('app')
        .factory('TransService', TransService);

    TransService.$inject = ['$resource'];
    function TransService($resource) {
        var service = $resource('', {}, {
            'getAll' : {
                method : 'GET',
                url : 'api/agency/product/agreement/get-cart',
                isArray : true
            },
            'searchTransport' : {
                method : 'POST',
                url : 'api/agency/product/adminUser/search-order-transport',
                isArray : true
            },
            'updateTransport' : {
                method : 'POST',
                url : 'api/agency/product/adminUser/update-order-transport',
                isArray : true
            },
            'getBanksByPaymentCode' : {
                method : 'GET',
                url : 'api/agency/payment/getBanksByPaymentCode',
                isArray : false
            },
            'createNewPolicy' : {
                method : 'POST',
                url : 'api/agency/product/bvp/createPolicy'
            },
            'processPayment' : {
                method : 'POST',
                url : 'api/agency/payment/processPayment'
            }
        });

        return service;
    }
})();
