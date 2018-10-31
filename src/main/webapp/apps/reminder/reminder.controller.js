(function() {
    'use strict';
    angular
        .module('app')
        .controller('ReminderController', ReminderController);


    ReminderController.$inject = ['$scope', '$http', '$filter', 'ReminderService'];
    function ReminderController($scope, $http, $filter, ReminderService) {
    	var vm = this;
    	
    	vm.reminders = [];
    	vm.remindersInit = [];
    	
        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			loadAll();
  		})();
  		
  		// Properties & function declare
  		
  		// Function
  		vm.deleteReminder = deleteReminder;
  		
  		function loadAll() {
  			console.log('searchReminder');
    		
  			ReminderService.getAll({}, onSuccess, onError);
    		
    		function onSuccess(result) {
    			vm.reminders = result;
    		}
    		
    		function onError(result) {
    			
    		}
  		}
  		
  		function deleteReminder(id) {
  			console.log('deleteReminder');
  			
  			ReminderService.delete({id: id}, onDeleteSuccess, onDeleteError);
  			
  			function onDeleteSuccess(data) {
  				toastr.success('Xóa nhắc nhở thành công');
  				loadAll();
            }
            function onDeleteError(error) {
                vm.validateResponse(error, 'deleteReminder');
            }
  		}
  		
    }
})();

