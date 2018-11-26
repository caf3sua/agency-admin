(function() {
    'use strict';

    angular
        .module('app')
        .controller('NavMenuController', NavMenuController);

    NavMenuController.$inject = ['$scope', '$localStorage', '$location', '$rootScope', '$anchorScroll'
    	, '$timeout', '$window', 'Auth', '$state', 'Principal', 'ContactCommonDialogService', 'ReminderService', 'CONSTANT_REMINDER_RANGER_DATE'
    	, 'NavCommonService','DateUtils'];

    function NavMenuController ($scope, $localStorage, $location, $rootScope, $anchorScroll
    		, $timeout, $window, Auth, $state, Principal, ContactCommonDialogService, ReminderService, CONSTANT_REMINDER_RANGER_DATE
    		, NavCommonService, DateUtils) {
    	var vm = this;
    	vm.countInfo;
    	
    	// Init controller
  		(function initController() {
  			console.log('NavMenuController initController');
  			
  			getCountInfo();
  		})();

  		function getCountInfo() {
  			NavCommonService.admGetCountAllOrder({}, onSuccess, onError);
  			
  			function onSuccess(result) {
  				console.log(result);
  				vm.countInfo = result;
            }
            function onError(error) {
            }
  		}
  		
		$rootScope.$on('agreementChangeSuccess', function() {
			console.log('rootscope agreementChangeSuccess');
			getCountInfo();
	    });
    }
})();
