(function() {
    'use strict';

    angular
        .module('app')
        .factory('ChangePasswordService', ChangePasswordService);

    ChangePasswordService.$inject = ['$resource'];

    function ChangePasswordService ($resource) {
        var service = $resource('api/agency/product/adminUser/admin-change-password', {}, {
            'postChangePassword': { method: 'POST', params: {}, isArray: false,
                interceptor: {
                    response: function(response) {
                        // expose response
                        return response;
                    }
                }
            }
        });

        return service;
    }
})();
