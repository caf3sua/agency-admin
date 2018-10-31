(function() {
    'use strict';

    angular
        .module('app')
        .factory('ProductYcbhOfflineService', ProductYcbhOfflineService);

    ProductYcbhOfflineService.$inject = ['$resource'];
    function ProductYcbhOfflineService($resource) {
        var service = $resource('', {}, {
            'getByGycbhNumber' : {
                method : 'POST',
                url : 'api/agency/product/agreement/getYcbhOffline-by-gycbhNumber'
            }
        });

        return service;
    }
})();
