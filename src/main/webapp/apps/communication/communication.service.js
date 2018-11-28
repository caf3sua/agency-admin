(function() {
    'use strict';

    angular
        .module('app')
        .factory('CommunicationService', CommunicationService);

    CommunicationService.$inject = ['$resource'];
    function CommunicationService($resource) {
        var service = $resource('', {}, {
            'getByGycbhNumber' : {
                method : 'POST',
                url : 'api/agency/product/agreement/get-by-gycbhNumber'
            },
            'saveCommunication': {url : 'api/agency/product/adminUser/admin-createCommunication', method: 'POST'},
            'getOrderTransactions' : {
                method : 'POST',
                url : 'api/agency/product/adminUser/admin-get-orderHis-by-gycbhNumber',
                isArray : true
            },
            'accessOrder': {url : 'api/agency/product/adminUser/admin-access-order', method: 'POST'},
            'getAgency': {url : 'api/agency/account/get-agency-by-id/:id', method: 'GET'},
            'cancelOrder': {url : 'api/agency/product/adminUser/admin-cancel-order', method: 'POST'}
        });

        return service;
    }
})();
