(function() {
    'use strict';
    angular
        .module('app')
        .controller('ContactController', ContactController);


    ContactController.$inject = ['$rootScope', '$scope', '$stateParams', '$http', '$filter', 'ContactService', 'ContactCommonDialogService', 'PAGINATION_CONSTANTS', '$ngConfirm'];
    function ContactController($rootScope, $scope, $stateParams, $http, $filter, ContactService, ContactCommonDialogService, PAGINATION_CONSTANTS, $ngConfirm) {
    	var vm = this;
    	vm.contacts = [];
    	vm.selectedContact = null;
    	vm.groupType = 'POTENTIAL';
    	vm.Agreements = [];
    	vm.AgreementsInit = [];
    	
    	// paging
        vm.page = 1;
        vm.totalItems = null;
        vm.itemsPerPage = 5;
        vm.transition = transition;
        
    	// Function declare
    	vm.changeGroupType = changeGroupType;
    	vm.getAgrement = getAgrement;
    	vm.selectContact = selectContact;
    	vm.openMailDialog = openMailDialog;
    	vm.confirmDeleteContact = confirmDeleteContact;
    	
    	angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			loadAll();
  		})();
  		
    	// Implement function
  		function openMailDialog() {
  			ContactCommonDialogService.openMailDialog();
  		}
  		
  		function changeGroupType(type) {
  			vm.groupType = type;
  			$rootScope.contactGroupType = type;
  			resetSelectContact();
  		}
  		
  		function resetSelectContact() {
  			vm.selectedContact = null;
  			angular.forEach(vm.contacts, function(contact) {
  				contact.selected = false;
  				contact.editing = false;
  			});
  		}
  		
  		function selectContact(contact){
  			resetSelectContact();
      		vm.selectedContact = contact;
  			vm.selectedContact.selected = true;
  			
  			// Call service to get agreement by contactcode
  			getAgrement();
  		};
  		
    	function loadAll() {
    		console.log('searchContact');
    		
    		ContactService.getAll({}, onSuccess, onError);
    		
    		function onSuccess(result) {
    			vm.contacts = result;
    			changeGroupType('POTENTIAL');
    			// load state
    			loadSelectedContact()
    		}
    		
    		function onError(result) {
    			
    		}
    	}
    	
    	function findSelectedContact(selectedId) {
    		let selContact;
    		angular.forEach(vm.contacts, function(contact) {
  				if (contact.contactId == selectedId) {
  					selContact = contact;
  				}
  			});
    		return selContact;
    	}
    	
    	function loadSelectedContact() {
    		let groupType = $stateParams.groupType;
    		let selected = $stateParams.selected;
    		if (groupType != null && groupType != undefined && selected != null && selected != undefined) {
    			changeGroupType(groupType);
    			let contact = findSelectedContact(selected);
    			selectContact(contact);
    		}
    	}
    	
    	function getAgrement() {
    		vm.Agreements = [];
    		ContactService.getAgrement({
				contactId: vm.selectedContact.contactId,
    			page: vm.page - 1,
                size: vm.itemsPerPage
            }, onGetAgrementSuccess, onGetAgrementError);
    		
    		function onGetAgrementSuccess(result, headers) {
    			vm.Agreements = result;
    			vm.totalItems = headers('X-Total-Count');
                vm.queryCount = vm.totalItems;
            }

            function onGetAgrementError(result) {
            }
  		}
    	
    	function transition () {
    		getAgrement();
        }
    	
    	
    	function deleteContact(selContact) {
    		console.log(vm.selectedContact);
    		ContactService.delete({contactId: vm.selectedContact.contactId}, onSucess, onError);
    		
    		function onSucess() {
    			loadAll();
    			toastr.success('Xóa khách hàng thành công!');
    		}
    		
    		function onError() {
    			toastr.error('Xóa khách hàng lỗi!');
    		}
    	}
    	
    	function confirmDeleteContact() {
  			$ngConfirm({
                title: 'Xác nhận',
                icon: 'fa fa-times',
                theme: 'modern',
                type: 'red',
                content: '<div class="text-center">Bạn chắc chắn muốn xóa khách hàng này ?</div>',
                animation: 'scale',
                closeAnimation: 'scale',
                buttons: {
                    ok: {
                    	text: 'Đồng ý',
                        btnClass: "btn-blue",
                        action: function(scope, button){
                        	deleteContact();
	                    }
                    },
                    close: {
                    	text: 'Hủy'
                    }
                },
            });
  		}
    }
})();


