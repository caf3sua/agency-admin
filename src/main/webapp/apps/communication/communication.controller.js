(function() {
    'use strict';

    angular
        .module('app')
        .controller('CommunicationController', CommunicationController);

    CommunicationController.$inject = ['$scope', '$stateParams', '$controller', 'Principal', '$state', '$rootScope'
    	, 'ProductCommonService', '$ngConfirm', 'CommunicationService', 'DateUtils', '$uibModalInstance', '$window', 'API_SERVICE_URL', '$uibModal'];

    function CommunicationController ($scope, $stateParams, $controller, Principal, $state, $rootScope
    		, ProductCommonService, $ngConfirm, CommunicationService, DateUtils, $uibModalInstance, $window, API_SERVICE_URL, $uibModal) {
        var vm = this;

        vm.policy = {
    		  "title": "",
    		  "imgGycbhContents": null,
    		  "sendEmail": "",
    		  "conversationContent": "",
    		  "gycbhNumber": ""
        };
        vm.hisOrder = [];
        
		 vm.gycbhFiles = [];
		 vm.fileModel = [];
		 vm.isLoading = false;
		 
        // Properties & function declare
		vm.validator = validator;
        vm.saveCommunication = saveCommunication;
        vm.cancel = cancel;
        vm.accessOrder = accessOrder;
        vm.cancelOrder = cancelOrder;
        vm.transport = transport;
        vm.downloadAttachment = downloadAttachment;
        
        angular.element(document).ready(function () {
        	
        });

    	// Init controller
  		(function initController() {
  			// instantiate base controller
  			$controller('ProductBaseController', { vm: vm, $scope: $scope });
  			
  			vm.gycbhNumber = {
	  		    	  "gycbhNumber": ""
		    };
		    vm.gycbhNumber = $rootScope.communication_GycbhNumber;
		    vm.order = $rootScope.communication_Order;
		    
		    // Edit
		    if (vm.gycbhNumber != null && vm.order.agentId) {
  				vm.policy.title = "Bảo Việt: Giám định đơn hàng " + vm.gycbhNumber;
  				
  				CommunicationService.getOrderTransactions({gycbhNumber: vm.gycbhNumber}, onOrderSuccess, onError);
  				
  				// Load file
  				loadFileInEditMode();
  				
  				function onOrderSuccess(result) {
  					vm.hisOrder = result;
  					angular.element('#conversationContent').focus();
  					CommunicationService.getAgency({id: vm.order.agentId}, onSuccess, onError);
  					
  					function onSuccess(data) {
  						if (data.email != null && data.email != ""){
  							vm.policy.sendEmail = data.email;	
  						}
  		  			}
  				}
	  				
	  			function onError() {
	  			}
		    }
		    
		    
  		})();
  		
  		function downloadAttachment(file) {
  			var templateRoute = API_SERVICE_URL + '/api/agency/document/download-attachment/' + file.attachmentId;
            $window.location = templateRoute;
  		}
  		
  		function loadFileInEditMode() {
  			console.log('loadFileInEditMode');
  			if (vm.policy.imgGycbhContents) {
  	  	  		var files = vm.policy.imgGycbhContents;
				angular.forEach(files, function(file, key) {
					let docFile = dataURLtoFile('data:image/*;base64,' + file.content, 'gycbhFile'+key+'.jpg');
					vm.fileModel.push(docFile);
			 	});
				console.log(vm.fileModel);
  			}
  		}
  		
  		function dataURLtoFile(dataurl, filename) {
  		    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
  		        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  		    while(n--){
  		        u8arr[n] = bstr.charCodeAt(n);
  		    }
  		    return new File([u8arr], filename, {type:mime});
  		}
  		
  		// watch
  		$scope.$watch('vm.fileModel', function () {
  			if (vm.fileModel != undefined && vm.fileModel != null && vm.fileModel && vm.fileModel.length > 0) {
  				vm.gycbhFiles = [];
  				var files = vm.fileModel;
  				
  				angular.forEach(files, function(file) {
  					var fileReader = new FileReader();
  					fileReader.readAsDataURL(file);
  	            	fileReader.onload = function (e) {
  	            		var dataUrl = e.target.result;
  	            	  	var base64Data = dataUrl.substr(dataUrl.indexOf('base64,') + 'base64,'.length);
  	            	  	let gycbhFiles = {
  	              			"content": base64Data,
  	              		    "fileType": file.type,
  	              		    "filename": file.name
  	              		};
  	            	  	vm.gycbhFiles.push(gycbhFiles);
  	            	};
  			 	});
  				console.log(vm.gycbhFiles);
  			} else {
  				vm.gycbhFiles = [];
  			}
  		}, true);
  		
  		// Function
  		function accessOrder() {
  			
  			vm.policy.imgGycbhContents = vm.gycbhFiles;
  			vm.policy.gycbhNumber = vm.gycbhNumber;
			console.log('accessOrder' + JSON.stringify(vm.policy));
			// Save
			CommunicationService.accessOrder(vm.policy, onSuccess, onError);
  			
  			function onSuccess(data) {
  				vm.isLoading = false;
  				console.log(data);
  				$rootScope.$broadcast('orderUpdateSuccess');
  				$uibModalInstance.dismiss('cancel');
  				toastr.success("Cấp đơn thành công");
  			}
  			
  			function onError(data) {
  				vm.isLoading = false;
  				toastr.error("Lỗi khi đồng ý cấp đơn.");
  			}
  		}
  		
  		function cancelOrder() {
  			
  			vm.policy.imgGycbhContents = vm.gycbhFiles;
  			vm.policy.gycbhNumber = vm.gycbhNumber;
			console.log('accessOrder' + JSON.stringify(vm.policy));
			// Save
			CommunicationService.cancelOrder(vm.policy, onSuccess, onError);
  			
  			function onSuccess(data) {
  				vm.isLoading = false;
  				console.log(data);
  				$rootScope.$broadcast('orderUpdateSuccess');
  				$uibModalInstance.dismiss('cancel');
  				toastr.success("Từ chối cấp đơn thành công");
  			}
  			
  			function onError(data) {
  				vm.isLoading = false;
  				toastr.error("Lỗi khi từ chối cấp đơn.");
  			}
  		}
  		
  		// transport
  		function transport() {
  			$uibModalInstance.dismiss('cancel');
  			$rootScope.communication_GycbhNumber = vm.gycbhNumber;
            modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'apps/communication/view/communication-dialog.html',
                controller: 'CommunicationController',
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
  		
  		function cancel() {
  			vm.policy.title = "";
  			vm.policy.sendEmail = "";
  			vm.policy.conversationContent= "";
  			vm.fileModel = [];
  		}
  		
  		function saveCommunication() {
  			if (validator()){
	  			if (vm.form.$invalid) {
	  				return;
	  			}
	  			
	  			vm.isLoading = true;
	  			vm.policy.imgGycbhContents = vm.gycbhFiles;
	  			vm.policy.gycbhNumber = vm.gycbhNumber;
	  			
  				console.log('save communication' + JSON.stringify(vm.policy));
				// Save
  				CommunicationService.saveCommunication(vm.policy, onSuccess, onError);
      			
      			function onSuccess(data) {
      				vm.isLoading = false;
      				console.log(data);
      				showSaveSuccess(data);
      			}
      			
      			function onError(data) {
      				vm.isLoading = false;
      				toastr.error("Lỗi khi gửi trao đổi thông tin.");
      			}
	  		}
  		}
  		
  		function showSaveSuccess(data) {
        	var message = "Trao đổi hợp đồng bảo hiểm đã gửi thành công";
        	
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
                        	$rootScope.$broadcast('saveCommunicationSuccess');
                        	$uibModalInstance.dismiss('cancel');
	                    }
                    }
                },
            });
        }
  		
  		function validator() {
        	if(vm.policy.title == "") {
        		toastr.error("Cấn tiêu đề");
        		angular.element('#title').focus();
        		return false;
        	}
//        	if(vm.gycbhFiles.length == 0) {
//        		toastr.error("Cấn nhập giấy yêu cầu bảo hiểm");
//        		angular.element('#upload-1').focus();
//        		return false;
//        	}
        	
        	return true;
        };
  		
    }
})();
