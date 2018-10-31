(function() {
    'use strict';
    angular
        .module('app')
        .controller('ContactNewController', ContactNewController);


    	ContactNewController.$inject = ['$rootScope', '$state', '$scope', '$http', '$filter',
    		'ContactService','$controller', 'ContactCommonDialogService', '$ngConfirm'];
        function ContactNewController($rootScope, $state, $scope, $http, $filter
        		, ContactService, $controller, ContactCommonDialogService, $ngConfirm) {
        	
        	var vm = this;
        	
        	// variable
        	vm.contactRelationId = "";
		    vm.contactRelationName = "";
		    vm.relationId;
        	vm.relationships = [
        		{"relationId": "30", "relationName" : "Bản thân"}, 
        		{"relationId": "31", "relationName" : "Vợ/Chồng"},
        		{"relationId": "32", "relationName" : "Con"},
        		{"relationId": "33", "relationName" : "Bố/Mẹ"},
        		{"relationId": "34", "relationName" : "Bố mẹ của vợ/chồng"},
        		{"relationId": "35", "relationName" : "Anh chị em ruột"},
        		{"relationId": "36", "relationName" : "Anh chị em ruột của vợ/chồng"},
        		{"relationId": "37", "relationName" : "Ông bà"},
        		{"relationId": "38", "relationName" : "Cháu"},
        		{"relationId": "41", "relationName" : "Giới thiệu"}
        	];
        	
        	vm.products = [
        		{"productCode": "CAR", "productName" : "Bảo hiểm ô tô"}, 
        		{"productCode": "BVP", "productName" : "Bảo hiểm An Gia"},
        		{"productCode": "KCR", "productName" : "Bảo hiểm bệnh ung thư"},
        		{"productCode": "TVC", "productName" : "Bảo hiểm du lịch quốc tế"},
        		{"productCode": "TVI", "productName" : "Bảo hiểm du lịch Việt Nam"},
        		{"productCode": "MOT", "productName" : "Bảo hiểm xe máy"},
        		{"productCode": "HOM", "productName" : "Bảo hiểm nhà tư nhân"},
        		{"productCode": "KHC", "productName" : "Bảo hiểm kết hợp con người"},
        		{"productCode": "TNC", "productName" : "Bảo hiểm tai nạn con người"},
        		{"productCode": "HHV", "productName" : "Bảo hiểm hàng hóa vận chuyển"}
        	];
        	vm.reminderProducts = [
//        		{"productCode": "CAR", "productName" : "Bảo hiểm ô tô"}, 
//        		{"productCode": "BVP", "productName" : "Bảo hiểm An Gia"},
//        		{"productCode": "KCR", "productName" : "Bảo hiểm bệnh ung thư"},
//        		{"productCode": "TVC", "productName" : "Bảo hiểm du lịch quốc tế"},
//        		{"productCode": "TVI", "productName" : "Bảo hiểm du lịch Việt Nam"},
//        		{"productCode": "MOT", "productName" : "Bảo hiểm xe máy"},
//        		{"productCode": "HOM", "productName" : "Bảo hiểm nhà tư nhân"},
//        		{"productCode": "KHC", "productName" : "Bảo hiểm kết hợp con người"},
//        		{"productCode": "TNC", "productName" : "Bảo hiểm tai nạn con người"},
//        		{"productCode": "HHV", "productName" : "Bảo hiểm hàng hóa vận chuyển"}
        	];
        	
        	vm.selRelationship = {};
        	vm.selProduct = null;
        	vm.selProductReminder = {};
        	vm.content = "";
        	vm.dateReminder = "";
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
      			}
        	
        	// function
        	vm.saveContact = saveContact;
        	vm.addProduct = addProduct;
        	vm.addRelationship = addRelationship;
        	vm.addReminder = addReminder;
        	vm.openSearchContact = openSearchContact;
        	vm.deleteContactProduct = deleteContactProduct;
        	vm.deleteRelationship = deleteRelationship;
        	vm.deleteReminderProduct = deleteReminderProduct;
        	vm.goBack = goBack;
        	vm.dateBeforeShowDate = dateBeforeShowDate;
        	vm.getAllCategoryReminder = getAllCategoryReminder;
        	
        	angular.element(document).ready(function () {
            });

        	// Init controller
      		(function initController() {
      			// instantiate base controller
      		    console.log('Init ContactNewController');
      		    getAllCategoryReminder();
      		})();
      		
      		$scope.$on('selectedContactChange', function() {
            	if ($rootScope.selectedContact != undefined && $rootScope.selectedContact != null) {
            		console.log($rootScope.selectedContact);
            		vm.contactRelationName = $rootScope.selectedContact.contactName;
            		vm.contactRelationId = $rootScope.selectedContact.contactId;
            	}
            });
      		
      		// Implement function
      		function dateBeforeShowDate(date) {
      			console.log('dateBeforeShowDate');
      			debugger
      		}
      		
      		function getAllCategoryReminder() {
      			ContactService.getAllCategoryReminder().$promise.then(function (data) {
      				vm.reminderProducts = data;
        		});
      		}
      		
      		function goBack() {
      			$state.go('app.contact');
      		}
      		
      		function openSearchContact() {
            	console.log('openSearchContact');
            	ContactCommonDialogService.openSearchDialog();
            }
      		
      		function addProduct() {
      			if (vm.selProduct == null || vm.selProduct == "") {
      				toastr.error('Dữ liệu không hợp lệ');
      				return;
      			}
      			
      			if (vm.contact.listContactProduct.indexOf(vm.selProduct) == -1) {
      				var index = vm.products.indexOf(vm.selProduct);
      				vm.contact.listContactProduct.push(vm.selProduct);
      				vm.products.splice(index, 1);
      			}
    		}
      		
      		function deleteContactProduct(index) {
      			console.log('deleteContactProduct');
      			vm.contact.listContactProduct.splice(index, 1);
    		}
      		
      		function addReminder() {
      			if (vm.selProductReminder == null || vm.selProductReminder == "") {
      				toastr.error('Dữ liệu không hợp lệ');
      				return;
      			}
      			
      			if (vm.selProductReminder != null && vm.dateReminder != null && vm.content != ""
      				&& vm.dateReminder != "") {
      				// Add to list
      				var reminder = {
      				      "contactId": "",
      				      "content": vm.content,
      				      "note": "",
      				      "productCode": vm.selProductReminder.code,
      				      "remindeDate": vm.dateReminder
      				    };
      				
      				vm.contact.listReminders.push(reminder);
      			}
    		}
      		
      		function deleteReminderProduct(index) {
      			console.log('deleteReminderProduct');
      			vm.contact.listReminders.splice(index, 1);
    		}
      		
      		function addRelationship() {
      			// Get relationId
      			if (vm.selRelationship != null && vm.selRelationship.relationId != null && vm.contactRelationId != ""
      				&& vm.contactRelationName != "") {
      				// Add to list
      				var relatioship = {
          			      "contactRelationId": vm.contactRelationId,
          			      "contactRelationName": vm.contactRelationName,
          			      "relationId": vm.selRelationship.relationId,
          			      "relationName": vm.selRelationship.relationName
        			};
      				vm.contact.listRelationship.push(relatioship);
      			} else {
      				toastr.error('Dữ liệu không hợp lệ');
      			}
      			
      			// Get ContactRelationId, contactRelationName
      			vm.contactRelationId = "";
      			vm.contactRelationName = "";
      			vm.selRelationship = {};
    		}
      		
      		function deleteRelationship(index) {
      			console.log('deleteRelationship');
      			vm.contact.listRelationship.splice(index, 1);
    		}
      		
      		
        	function saveContact() {
        		// append address
        		vm.contact.homeAddress = vm.contact.address + "::" + vm.contact.addressDistrict.pkDistrict + "::" 
        				+ vm.contact.addressDistrict.pkProvince + "::" + vm.contact.addressDistrict.pkPostcode;
        		console.log('createNewContact : ' + vm.contact);
        		ContactService.create(vm.contact, onSuccess, onError);
        		
        		function onSuccess(result) {
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
                            	$state.go('app.contact');
    	                    }
                        }
                    },
                });
            }
        }
})();
