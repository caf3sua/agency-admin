// Create by: Nam, Nguyen Hoai - ITSOL.vn
(function () {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig ($stateProvider) {
	    	$stateProvider
				.state('printed-paper', {
					abstract: true,
					url: '/printed-paper',
					views: {
						'': {
							templateUrl: '../views/theme/layout/layout.html'
						}
					},
					resolve: {
			            translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
			                $translatePartialLoader.addPart('printed-paper');
			                $translatePartialLoader.addPart('global');
			                return $translate.refresh();
			            }],
			            loadPlugin: function ($ocLazyLoad) {
			            		return $ocLazyLoad.load([
			            			'apps/printed-paper/printed-paper-base.service.js'
			            			]);
				        }
			        }
			});
    }
})();