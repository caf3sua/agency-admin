(function() {
    'use strict';

    angular
        .module('app')
        .factory('ProductPrintedPaperService', ProductPrintedPaperService);

    ProductPrintedPaperService.$inject = ['$resource'];
    function ProductPrintedPaperService($resource) {
        var service = $resource('', {}, {
            'getByGycbhNumber' : {
                method : 'POST',
                url : 'api/agency/product/agreement/getAnchi-by-gycbhNumber'
            }
        });

        return service;
    }
})();
