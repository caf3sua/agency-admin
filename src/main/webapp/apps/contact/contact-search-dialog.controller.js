(function() {
    'use strict';
    angular
        .module('app')
        .controller('ContactSearchDialogController', ContactSearchDialogController);


    	ContactSearchDialogController.$inject = ['$rootScope', '$scope', '$state', '$http', '$filter', '$uibModalInstance', 'ContactService', '$uibModal', '$ngConfirm'];
        function ContactSearchDialogController($rootScope, $scope, $state, $http, $filter, $uibModalInstance, ContactService, $uibModal, $ngConfirm) {
        	var vm = this;
        	vm.contactCode;
        	vm.searchContact = searchContact;
        	vm.addNewContact = addNewContact;
        	vm.selectedContact = selectedContact;
        	vm.searchCriterial = {
    			"contactName": "",
    			"phone": "",
    			"idNumber": "",
    			"dateOfBirth": ""
        	}
        	vm.contacts = [];
        	vm.contactsInit = [];
        	var modalInstance = null;
        	
        	vm.contact = {
			  "contactName": "",
			  "contactSex": "1",
			  "dateOfBirth": "",
			  "email": "",
			  "groupType": "POTENTIAL",
			  "homeAddress": "",
			  "idNumber": "",
			  "listContactProduct": [],
			  "listRelationship": [],
			  "listReminders": [],
			  "occupation": "",
			  "phone": "",
			  "facebookId": ""
			};
        	
        	vm.saveContact = saveContact;
        	
        	// Implement function
        	function saveContact() {
        		// append address
        		vm.contact.homeAddress = vm.contact.address + "::" + vm.contact.addressDistrict.pkDistrict + "::" 
        				+ vm.contact.addressDistrict.pkProvince + "::" + vm.contact.addressDistrict.pkPostcode;
        		console.log('createNewContact : ' + vm.contact);
        		ContactService.create(vm.contact, onSuccess, onError);
        		
        		function onSuccess(result) {
        			$rootScope.selectedContact = result;
                    $rootScope.$broadcast('selectedContactChange');
                    modalInstance = null;
        			showSaveContactSuccess();
        		}
        		
        		function onError(result) {
        			let message = result.data.message || 'Lỗi khi tạo khách hàng mới';
        			toastr.error(message);
        		}
        	}
        	
        	function showSaveContactSuccess() {
            	let message = "Tạo khách hàng thành công!";
            	
            	$ngConfirm({
                    title: 'Thông báo',
                    icon: 'fa fa-check',
                    theme: 'modern',
                    type: 'blue',
                    content: '<div class="text-center">' + message + '</div>',
                    animation: 'scale',
                    closeAnimation: 'scale',
                    buttons: {
                        ok: {
                        	text: 'Đóng',
                            btnClass: "btn-blue",
                            action: function(scope, button){
                            	$uibModalInstance.dismiss('cancel');
    	                    }
                        }
                    },
                });
            }
        	
        	function selectedContact(row) {
        		console.log('selected contact:' + row);
        		$uibModalInstance.close(row);
        	}
        	
        	function searchContact() {
        		console.log('searchContact');
        		
        		ContactService.search(vm.searchCriterial, onSuccess, onError);
        		
        		function onSuccess(result) {
        			let count = 1;
        			angular.forEach(result, function(value, key) {
        				value.id = count;
        				count++;
      			 	});
        			vm.contacts = result;
        		}
        		
        		function onError(result) {
        			
        		}
        	}
        	
        	function addNewContact() {
        		$uibModalInstance.dismiss('cancel');
//        		$state.go('app.contact-new');
        		if (modalInstance !== null) return;
                modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'apps/contact/contact-new-dialog.html',
                    controller: 'ContactSearchDialogController',
                    controllerAs: 'vm',
                    size: 'lg',
                    resolve: {
                        translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                            $translatePartialLoader.addPart('global');
                            return $translate.refresh();
                        }]
                    }
                });
        	}
        	
        	vm.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        }
})();
