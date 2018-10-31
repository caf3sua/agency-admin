(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductYcbhOfflineController', ProductYcbhOfflineController);

    ProductYcbhOfflineController.$inject = ['$scope', '$stateParams', '$controller', 'Principal', '$state', '$rootScope'
    	, 'ContactCommonDialogService', 'ProductCommonService', '$ngConfirm', 'ProductYcbhOfflineService', 'ContactService', 'DateUtils'];

    function ProductYcbhOfflineController ($scope, $stateParams, $controller, Principal, $state, $rootScope
    		, ContactCommonDialogService, ProductCommonService, $ngConfirm, ProductYcbhOfflineService, ContactService, DateUtils) {
        var vm = this;

        vm.policy = {
    		  "gycbhNumber": "",
    		  "contactCode": "",
    		  "imgDocumentContents": null,
    		  "imgGycbhContents": null,
    		  "imgKhaisinhContents": null,
    		  "maSanPham": "",
    		  "totalPremium": "",
    		  "statusPolicy": "93"
        };
		 vm.gycbhFiles = [];
		 vm.documentFiles = [];
		 vm.khaisinhFiles = [];
        
		 vm.gycbhFileModel = [];
		 vm.documentFileModel = [];
		 vm.khaisinhFileModel = [];
		 
		 vm.isLoading = false;
		 vm.isShowGKS = false;
		 
        // Properties & function declare
		vm.validator = validator;
        vm.saveYcbhOffline = saveYcbhOffline;
        vm.cancel = cancel;
        vm.openSearchContact = openSearchContact;
        
        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			// instantiate base controller
  			$controller('ProductBaseController', { vm: vm, $scope: $scope });
  			
  			console.log($stateParams.productCode);
  			vm.policy.maSanPham = $stateParams.productCode;
  			
  			vm.gycbhNumber = {
	  		    	  "gycbhNumber": ""
		    };
		    vm.gycbhNumber = $stateParams.id;
		    
		    // Edit
		    if (vm.gycbhNumber != null) {
		    	
		    	ProductYcbhOfflineService.getByGycbhNumber({gycbhNumber: vm.gycbhNumber}, onSuccess, onError);
	  			
	  			function onSuccess(data) {
	  				vm.policy = data;
	  				vm.policy.maSanPham = data.maSanPham;
	  				
	  				// Load file
	  				loadFileInEditMode();
	  				
	  				ContactService.getByCode({contactCode : data.contactCode} , onGetContactSuccess, onGetContactError);
	  				function onGetContactSuccess(result) {
	  					vm.policy.contactName = result.contactName;
	  					vm.policy.dateOfBirth = result.dateOfBirth;
	  	  			}
	  				
	  				function onGetContactError() {
	  	  			}
	  				
	  				toastr.success('Tải thông tin chi tiết hợp đồng thành công');
	  			}
	  			
	  			function onError() {
	  			}
		    }
		    
  		})();
  		
  		function loadFileInEditMode() {
  			console.log('loadFileInEditMode');
  			if (vm.policy.imgDocumentContents) {
  				var files = vm.policy.imgDocumentContents;
  				angular.forEach(files, function(file, key) {
  					let docFile = dataURLtoFile('data:image/*;base64,' + file.content, 'document'+key+'.jpg');
  					vm.documentFileModel.push(docFile);
  			 	});
  				console.log(vm.documentFileModel);
  			}
  	  		
  			if (vm.policy.imgGycbhContents) {
  	  	  		var files = vm.policy.imgGycbhContents;
				angular.forEach(files, function(file, key) {
					let docFile = dataURLtoFile('data:image/*;base64,' + file.content, 'gycbhFile'+key+'.jpg');
					vm.gycbhFileModel.push(docFile);
			 	});
				console.log(vm.gycbhFileModel);
  			}
  			
  			if (vm.policy.imgKhaisinhContents) {
  				var files = vm.policy.imgKhaisinhContents;
				angular.forEach(files, function(file, key) {
					let docFile = dataURLtoFile('data:image/*;base64,' + file.content, 'khaisinh'+key+'.jpg');
					vm.khaisinhFileModel.push(docFile);
			 	});
				console.log(vm.khaisinhFileModel);
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
  		$scope.$watch('vm.gycbhFileModel', function () {
  			if (vm.gycbhFileModel != undefined && vm.gycbhFileModel != null && vm.gycbhFileModel && vm.gycbhFileModel.length > 0) {
  				vm.gycbhFiles = [];
  				var files = vm.gycbhFileModel;
  				
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
  		
  		$scope.$watch('vm.documentFileModel', function () {
  			if (vm.documentFileModel != undefined && vm.documentFileModel != null && vm.documentFileModel && vm.documentFileModel.length > 0) {
  				vm.documentFiles = [];
  				var files = vm.documentFileModel;
  				
  				angular.forEach(files, function(file) {
  					var fileReader = new FileReader();
  					fileReader.readAsDataURL(file);
  	            	fileReader.onload = function (e) {
  	            		var dataUrl = e.target.result;
  	            	  	var base64Data = dataUrl.substr(dataUrl.indexOf('base64,') + 'base64,'.length);
  	            	  	let docFiles = {
  	              			"content": base64Data,
  	              		    "fileType": file.type,
  	              		    "filename": file.name
  	              		};
  	            	  vm.documentFiles.push(docFiles);
  	            	};
  			 	});
  				console.log(vm.documentFiles);
  			} else {
  				vm.documentFiles = [];
  			}
  		}, true);
  		
  		$scope.$watch('vm.khaisinhFileModel', function () {
  			if (vm.khaisinhFileModel != undefined && vm.khaisinhFileModel != null && vm.khaisinhFileModel && vm.khaisinhFileModel.length > 0) {
  				vm.khaisinhFiles = [];
  				var files = vm.khaisinhFileModel;
  				
  				angular.forEach(files, function(file) {
  					var fileReader = new FileReader();
  					fileReader.readAsDataURL(file);
  	            	fileReader.onload = function (e) {
  	            		var dataUrl = e.target.result;
  	            	  	var base64Data = dataUrl.substr(dataUrl.indexOf('base64,') + 'base64,'.length);
  	            	  	let khaisinhFiles = {
  	              			"content": base64Data,
  	              		    "fileType": file.type,
  	              		    "filename": file.name
  	              		};
  	            	  vm.khaisinhFiles.push(khaisinhFiles);
  	            	};
  			 	});
  				console.log(vm.khaisinhFiles);
  			} else {
  				vm.khaisinhFiles = [];
  			}
  		}, true);
  		
  		$scope.$on('selectedContactChange', function() {
        	if ($rootScope.selectedContact != undefined && $rootScope.selectedContact != null) {
        		vm.policy.contactCode = $rootScope.selectedContact.contactCode;
        		vm.policy.contactName = $rootScope.selectedContact.contactName;
        		vm.policy.dateOfBirth = $rootScope.selectedContact.dateOfBirth;
        		
        		var now = new Date();
                var nowStr = DateUtils.convertDate(now);
                vm.policy.tuoi = DateUtils.yearDiff(vm.policy.dateOfBirth, nowStr);
                
                if (vm.policy.tuoi < 18){
                	vm.isShowGKS = true;
                } else{
                	vm.isShowGKS = false;
                }
        	}
        });
  		
  		// Function
  		function openSearchContact() {
        	console.log('openSearchContact');
        	ContactCommonDialogService.openSearchDialog();
        }
  		
  		function cancel() {
  			$state.go("app.order");
  		}
  		
  		function saveYcbhOffline(type) {
  			if (validator()){
  			
  			if (vm.form.$invalid) {
  				return;
  			}
  			
        	if (type == "0"){
        		vm.policy.statusPolicy = "80"; // dang soan
	    	} else {
	    		vm.policy.statusPolicy = "93"; // gửi BV giám định
	    	}
  			
  			vm.isLoading = true;
  			console.log('saveYcbhOffline');
  			vm.policy.imgDocumentContents = vm.documentFiles;
  			vm.policy.imgGycbhContents = vm.gycbhFiles;
  			vm.policy.imgKhaisinhContents = vm.khaisinhFiles;
  			
  			var copyAgreement = $stateParams.copy;
  			if (copyAgreement == "true"){
  				vm.policy.agreementId = null;
  				vm.policy.gycbhNumber =  null;
  			}
  			
  			// Edit
  			if (vm.policy.agreementId != null && vm.policy.agreementId != undefined) {
  				console.log('Update ycbh offline' + JSON.stringify(vm.policy));
  				// Edit
				// Save ycbh offline
      			ProductCommonService.saveYcbhOffline(vm.policy, onSuccess, onError);
      			
      			function onSuccess(data) {
      				vm.isLoading = false;
      				console.log(data);
      				showUpdateYcbhInfo(data);
      			}
      			
      			function onError(data) {
      				vm.isLoading = false;
      				toastr.error("Lỗi khi cập nhật yêu cầu bảo hiểm offline.");
      			}
  			} else {
  				ProductCommonService.getPolicyNumber({lineId: vm.policy.maSanPham}).$promise.then(function(result) {
  	            	console.log('Done get gychbhNumber: ' + result.policyNumber);
  	            	// Add ychbhNumber
  	            	vm.policy.gycbhNumber  = result.policyNumber;

  	            	// Save ycbh offline
  	      			ProductCommonService.saveYcbhOffline(vm.policy, onSuccess, onError);
  	      			
  	      			function onSuccess(data) {
  	      				vm.isLoading = false;
  	      				console.log(data);
  	      				showSaveSaveYcbhInfo(data);
  	      			}
  	      			
  	      			function onError(data) {
  	      				vm.isLoading = false;
  	      				toastr.error("Lỗi khi tạo yêu cầu bảo hiểm offline.");
  	      			}
  	            }).catch(function(data, status) {
  	    			console.log('Error get gychbhNumber');
  	    			toastr.error("Lỗi khi lấy số GYCBH");
  			    });
  			}
  			}
  		}
  		
  		function showSaveSaveYcbhInfo(data) {
        	var message = "Hợp đồng bảo hiểm offline <strong>" + data.gycbhNumber + "</strong> đã tạo thành công";
        	
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
                        	$state.go('app.cart');
	                    }
                    }
                },
            });
        }
  		
  		function showUpdateYcbhInfo(data) {
        	var message = "Hợp đồng bảo hiểm offline <strong>" + data.gycbhNumber + "</strong> đã cập nhật thành công";
        	
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
                        	$state.go('app.cart');
	                    }
                    }
                },
            });
        }
  		
  		function validator() {
        	if(vm.policy.totalPremium <= 0) {
        		toastr.error("Cấn nhập số tiền bảo hiểm");
        		angular.element('#totalPremium').focus();
        		return false;
        	}
        	if(vm.gycbhFiles.length == 0) {
        		toastr.error("Cấn nhập giấy yêu cầu bảo hiểm");
        		angular.element('#upload-1').focus();
        		return false;
        	}
        	
        	var now = new Date();
            var nowStr = DateUtils.convertDate(now);
            vm.policy.tuoi = DateUtils.yearDiff(vm.policy.dateOfBirth, nowStr);
            
            if (vm.policy.tuoi < 18){
            	vm.isShowGKS = true;
            	if(vm.khaisinhFiles.length == 0) {
            		toastr.error("Cấn nhập giấy khai sinh");
            		angular.element('#upload-3').focus();
            		return false;
            	}
            } else{
            	vm.isShowGKS = false;
            }
        	
        	return true;
        };
  		
    }
})();
