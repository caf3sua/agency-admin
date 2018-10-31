(function() {
    'use strict';

    angular
        .module('app')
        .factory('OrderService', OrderService);

    OrderService.$inject = ['$resource'];
    function OrderService($resource) {
        var service = $resource('', {}, {
        	'createNophi' : {
                method : 'POST',
                url : 'api/agency/product/agreement/create-agreement-nophi'
            },
            'updateNophi' : {
                method : 'POST',
                url : 'api/agency/product/agreement/update-agreement-nophi'
            },
        	'createTaituc' : {
                method : 'GET',
                url : 'api/agency/product/agreement/create-agreement-taituc/:agreementId'
            },
        	'search' : {
                method : 'POST',
                url : 'api/agency/product/agreement/search-order',
                isArray : true
            },
            'searchOrderAgency' : {
                method : 'POST',
                url : 'api/agency/product/agreement/search-order-agency',
                isArray : true
            },
            'searchOrderWait' : {
                method : 'POST',
                url : 'api/agency/product/agreement/search-order-wait',
                isArray : true
            },
            'searchOrderOther' : {
                method : 'POST',
                url : 'api/agency/product/agreement/search-order-other',
                isArray : true
            },
            'searchNophi' : {
                method : 'POST',
                url : 'api/agency/product/agreement/search-order-nophi',
                isArray : true
            },
            'deleteOrder' : {
                method : 'GET',
                url : 'api/agency/product/agreement/delete-agreement-nophi/:id'
            },
            'getById' : {
                method : 'GET',
                url : 'api/agency/product/agreement/get-by-id/:id'
            },
            'getByContactCode' : {
                method : 'POST',
                url : 'api/agency/contact/get-by-code'
            },
            'cancelOrder' : {
                method : 'POST',
                url : 'api/agency/product/agreement/cancel'
            },
            'resendEmail' : {
                method : 'POST',
                url : 'api/agency/product/agreement/resend-confirm-email'
            },
            'getByGycbhNumber' : {
                method : 'POST',
                url : 'api/agency/product/agreement/get-by-gycbhNumber'
            },
            'resendOtp' : {
                method : 'POST',
                url : 'api/agency/product/agreement/resend-confirm-otp'
            }
        });

        return service;
    }
})();
