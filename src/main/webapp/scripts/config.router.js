/**
 * @ngdoc function
 * @name app.config:uiRouter
 * @description
 * # Config
 * Config for the router
 */
(function() {
    'use strict';
    angular
      .module('app')
      .run(runBlock)
      .config(function (ScrollBarsProvider) {
			ScrollBarsProvider.defaults = {
				axis: 'y' // enable 2 axis scrollbars by default
			};
	  })
      .config(config);

      runBlock.$inject = ['$rootScope', '$state', '$stateParams'];
      function runBlock($rootScope,   $state,   $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;        
      }

      config.$inject =  ['$stateProvider', '$urlRouterProvider', '$locationProvider', 'MODULE_CONFIG'];
      function config( $stateProvider,   $urlRouterProvider,   $locationProvider, MODULE_CONFIG ) {
        
        $urlRouterProvider
        		.otherwise('/app/dashboard');
        $stateProvider
        		.state('app', {
        			abstract: true,
        			url: '/app',
        			views: {
        				'': {
        					templateUrl: '../views/theme/layout/layout.html'
        				}
        			},
        			resolve: {
	                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
	                        $translatePartialLoader.addPart('global');
	                        return $translate.refresh();
	                    }]
        			}
        		})
        		
            .state('404', {
              url: '/404',
              templateUrl: '../views/misc/404.html'
            })
            .state('403', {
              url: '/403',
              templateUrl: '../views/misc/403.html'
            })
            .state('503', {
              url: '/503',
              templateUrl: '../views/misc/503.html'
            })
            .state('505', {
              url: '/505',
              templateUrl: '../views/misc/505.html'
            })
            .state('payment-landing', {
              url: '/payment-landing',
              templateUrl: '../views/misc/payment-landing.html'
            })
            	
        		//$locationProvider.html5Mode(true); //activate HTML5 Mode
          ;

        function load(srcs, callback) {
          return {
              deps: ['$ocLazyLoad', '$q',
                function( $ocLazyLoad, $q ){
                  var deferred = $q.defer();
                  var promise  = false;
                  srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                  if(!promise){
                    promise = deferred.promise;
                  }
                  angular.forEach(srcs, function(src) {
                    promise = promise.then( function(){
                      angular.forEach(MODULE_CONFIG, function(module) {
                        if( module.name == src){
                          src = module.module ? module.name : module.files;
                        }
                      });
                      return $ocLazyLoad.load(src);
                    } );
                  });
                  deferred.resolve();
                  return callback ? promise.then(function(){ return callback(); }) : promise;
              }]
          }
        }

        function getParams(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }
      }
})();
