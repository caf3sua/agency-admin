// Create by: Nam, Nguyen Hoai - ITSOL.vn
(function () {
    'use strict';

    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig ($stateProvider) {
	    	$stateProvider
			.state('product', {
				abstract: true,
				url: '/product',
				views: {
					'': {
						templateUrl: '../views/theme/layout/layout.html'
					}
				},
				resolve: {
		            translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
		                $translatePartialLoader.addPart('product');
		                $translatePartialLoader.addPart('global');
		                return $translate.refresh();
		            }],
		            loadPlugin: function ($ocLazyLoad) {
		            		return $ocLazyLoad.load([
		            			'apps/product/car/car.service.js'
                                , 'scripts/components/form/relation-combo.directive.js'
                                , 'scripts/components/form/contact-panel.directive.js'
                                , 'scripts/components/form/contact-section.directive.js'
		            			, 'apps/product/product-base.service.js'
		            			, 'apps/contact/contact-search-dialog.controller.js'
		            			, 'apps/product/agreement-otp.controller.js'
		            			, 'apps/product/product-base.controller.js']);
			        }
		        }
		});    
    }
})();