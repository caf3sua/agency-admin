(function() {
    'use strict';

    angular
        .module('app')
        .factory('errorHandlerInterceptor', errorHandlerInterceptor);

    errorHandlerInterceptor.$inject = ['$q', '$rootScope', '$injector'];

    function errorHandlerInterceptor ($q, $rootScope, $injector) {
        var service = {
            responseError: responseError
        };

        return service;

        function responseError (response) {
        	// 401 unauthorized
        	if (response.status === 401) {
                var stateService = $injector.get('$state');
                stateService.go('access.signin');
            }
        	
        	if (response.status === 403) {
                var stateService = $injector.get('$state');
                stateService.go('403');
            }
        	
        	if (response.status === 503 || response.status === -1) {
                var stateService = $injector.get('$state');
                stateService.go('503');
            }
        	
            if (!(response.status === 401 && (response.data === '' || (response.data.path && response.data.path.indexOf('/api/account') === 0 )))) {
                $rootScope.$emit('webApp.httpError', response);
            }
            return $q.reject(response);
        }
    }
})();
