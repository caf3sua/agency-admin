(function() {
    'use strict';

    angular
        .module('app')
        .factory('CartService', CartService);

    CartService.$inject = ['$resource'];
    function CartService($resource) {
        var service = $resource('', {}, {
            'searchCart' : {
                method : 'POST',
                url : 'api/agency/product/adminUser/search-admin-cart',
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
