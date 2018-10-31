(function() {
    'use strict';
    angular
        .module('app')
        .controller('ContactAddDialogController', ContactAddDialogController);


    	ContactAddDialogController.$inject = ['$scope', '$http', '$filter', '$uibModalInstance', 'ContactService'];
        function ContactAddDialogController($scope, $http, $filter, $uibModalInstance, ContactService) {
        	
        	var vm = this;
        	
        	vm.addNewContact = addNewContact;
        	vm.cancel = cancel;
        	vm.selectedContact = selectedContact;
        	
        	vm.contactAdd = {
			  "contactName": "Tên khách hàng",
			  "contactSex": "1",
			  "dateOfBirth": "24/06/1989",
			  "email": "email@gmail.com",
			  "groupType": "POTENTIAL",
			  "homeAddress": "Địa chỉ",
			  "idNumber": "CMT14141001",
			  "listContactProduct": [
			    {
			      "productCode": "CAR",
			      "productName": "Bảo hiểm ô tô"
			    }
			  ],
			  "listRelationship": [
			    {
			      "contactRelationId": "string",
			      "contactRelationName": "string",
			      "relationId": "30"
			    }
			  ],
			  "occupation": "Công nghệ thông tin",
			  "phone": "0989888999",
			  "facebookId": ""
			}
        	
        	vm.contacts = [];
        	vm.contactsInit = [];
        	vm.relationshipOptions = [
        	      {id: '30', name: 'Bản thân'},
        	      {id: '31', name: 'Vợ/Chồng'},
        	      {id: '32', name: 'Con'},
        	      {id: '33', name: 'Bố/Mẹ'},
        	      {id: '34', name: 'Bố mẹ của vợ/chồng'},
        	      {id: '35', name: 'Anh chị em ruột'},
        	      {id: '36', name: 'Anh chị em ruột của vợ/chồng'},
        	      {id: '37', name: 'Ông bà'},
        	      {id: '38', name: 'Cháu'},
        	      {id: '41', name: 'Giới thiệu'}
        	    ];
        	
        	angular.element(document).ready(function () {
            });

        	// Init controller
      		(function initController() {
      			// instantiate base controller
      		    console.log('Init ContactAddDialogController');
      		})();
      		
        	// Implement function
        	function selectedContact(row) {
        		console.log('selected contact:' + row);
        		$uibModalInstance.close(row);
        	}
        	
        	
        	function addNewContact() {
        		console.log('addNewContact');
        		
        		ContactService.create(vm.contactAdd, onSuccess, onError);
        		
        		function onSuccess(result) {
        			toastr.success('Tạo khách hàng thành công');
        			$uibModalInstance.dismiss('cancel');
        		}
        		
        		function onError(result) {
        			toastr.error('Lỗi khi tạo khách hàng mới');
        			$uibModalInstance.dismiss('cancel');
        		}
        	}
        	
        	function cancel() {
    			$uibModalInstance.dismiss('cancel');
    		}
        	
        }
})();
