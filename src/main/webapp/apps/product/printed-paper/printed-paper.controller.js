(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductPrintedPaperController', ProductPrintedPaperController);

    ProductPrintedPaperController.$inject = ['$rootScope', '$scope', '$stateParams', '$controller', 'Principal', '$state'
    	, 'CommonDialogService', 'ContactCommonDialogService', 'ProductCommonService', '$ngConfirm', 'ProductPrintedPaperService', 'ContactService'
    	, 'PrintedPaperService', 'DateUtils'];

    function ProductPrintedPaperController ($rootScope, $scope, $stateParams, $controller, Principal, $state
    		, CommonDialogService, ContactCommonDialogService, ProductCommonService, $ngConfirm, ProductPrintedPaperService, ContactService
    		, PrintedPaperService, DateUtils) {
        var vm = this;

        vm.isSaveAndNewFlag = false;
        vm.policy = {
        		  "gycbhNumber": "",
        		  "contactCode": "",
        		  "imgGcns": null,
        		  "imgGycbhs": null,
        		  "maSanPham": "",
        		  "ngayCap": "",
        		  "ngayHieulucDen": "",
        		  "ngayHieulucTu": "",
        		  "phiBaoHiem": "",
        		  "soAnchi": "",
        		  "tenAnchi": "",
        		  "tinhTrangCap": "TTCM",
        		  "tongTienTT": ""
        };
        
        vm.gycbhFiles = [];
        vm.gcnFiles = [];
        
        vm.gycbhFileModel = [];
        vm.gcnFileModel = [];
        
        vm.dataAnChiModel = [];
        
        vm.isLoading = false;
        // Properties & function declare
        vm.saveAnchiPolicyCart = saveAnchiPolicyCart;
        vm.saveAnchiPolicyReload = saveAnchiPolicyReload;
        vm.openSearchAnchi = openSearchAnchi;
        vm.openSearchContact = openSearchContact;
        vm.cancel = cancel;
        vm.changeDate = changeDate;
        
        vm.onChange = onChange; // anchi
        vm.selected;
        
        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			// instantiate base controller
  		    $controller('ProductBaseController', { vm: vm, $scope: $scope });
  		    
  		    console.log($stateParams.productCode);
			vm.policy.productCode = $stateParams.productCode;
			vm.policy.maSanPham = $stateParams.productCode;
			//  save to global
  			$rootScope.product_code_selected = $stateParams.productCode;
  			
  			loadAllAnchi();
  			
			var startDate = new Date();
			vm.policy.ngayCap = DateUtils.convertDate(startDate);
            // add a day
            startDate.setDate(startDate.getDate() + 1);
            vm.policy.ngayHieulucTu = DateUtils.convertDate(startDate);

            var endDate = moment(vm.policy.ngayHieulucTu, "DD/MM/YYYY").add(1, 'years').add(-1, 'days').format("DD/MM/YYYY");
            vm.policy.ngayHieulucDen = endDate;
			
            var anchiId = $stateParams.anchiId;
            if (anchiId != undefined && anchiId != null) {
            	
            	loadAnchiInfo($stateParams.anchiId);            	
            }
            
			vm.gycbhNumber = {
				"gycbhNumber": ""
  		    };
  		    vm.gycbhNumber = $stateParams.id;
  		    if (vm.gycbhNumber != null) {
  		    	ProductPrintedPaperService.getByGycbhNumber({gycbhNumber: vm.gycbhNumber}, onSuccess, onError);
	  			
	  			function onSuccess(data) {
	  				vm.policy = data;
	  				vm.policy.productCode = data.maSanPham;
	  				vm.policy.maSanPham = data.maSanPham;
	  				
	  				var copyAgreement = $stateParams.copy;
	  	  			if (copyAgreement == "false"){
	  	  				vm.selected = {
		  					"ACHI_SO_ANCHI": vm.policy.soAnchi,
		  	        		"ACHI_TEN_ANCHI": vm.policy.tenAnchi
		  				}
	  	  			} else {
	  	  				vm.policy.agreementId = null; // copy đơn
	  	  			}
	  				
	  				// Load file
	  				loadFileInEditMode();
	  				
	  				ContactService.getByCode({contactCode : data.contactCode} , onGetContactSuccess, onGetContactError);
	  				function onGetContactSuccess(result) {
	  					vm.policy.contactName = result.contactName;
	  	  			}
	  				
	  				function onGetContactError() {
	  	  			}
	  				
	  				toastr.success('Tải thông tin chi tiết hợp đồng thành công');
	  			}
	  			
	  			function onError() {
	  			}
  		    }
  		})();
  		
  		function onChange(item) {
        	console.log(item);
        	vm.policy.soAnchi = item.ACHI_SO_ANCHI;
        	vm.policy.tenAnchi = item.ACHI_TEN_ANCHI;
        }
  		
  		function loadAnchiInfo(anchiId) {
  			if (anchiId == null || anchiId == undefined) {
  				return;
  			}
  			vm.searchNew = {
				"number" : decodeURIComponent(anchiId),
				"type" : vm.policy.maSanPham
  			};
  			
  			PrintedPaperService.searchNew(vm.searchNew, onSuccessNew, onErrorNew);
  			
  			function onSuccessNew(data) {
  				if (data != null && data.length == 1) {
  					let item = data[0];
  					vm.policy.soAnchi = item.ACHI_SO_ANCHI;
  	        		vm.policy.tenAnchi = item.ACHI_TEN_ANCHI;
  	        		
  	        		vm.selected = {
	  					"ACHI_SO_ANCHI": vm.policy.soAnchi,
	  	        		"ACHI_TEN_ANCHI": vm.policy.tenAnchi
	  				};
  				}
  			}
  			
  			function onErrorNew() {
  			}
  		}
  		
  		function loadAllAnchi() {
  			vm.searchAll = {
				"number" : "",
				"type" : vm.policy.productCode
  			};
  			PrintedPaperService.searchNew(vm.searchAll, onSuccessAll, onErrorAll);
  			
  			function onSuccessAll(data) {
  				if (data != null && data.length > 0) {
  					vm.dataAnChiModel = data;
  					
  				}
  			}
  			
  			function onErrorAll() {
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

  		function loadFileInEditMode() {
  			if (vm.policy.imgGcns) {
  	  	  		var files = vm.policy.imgGcns;
				angular.forEach(files, function(file, key) {
					let docFile = dataURLtoFile('data:image/*;base64,' + file.content, 'gnc'+key+'.jpg');
					vm.gcnFileModel.push(docFile);
			 	});
				console.log(vm.gcnFileModel);
  			}
  			
  			if (vm.policy.imgGycbhs) {
	  	  	  	var files = vm.policy.imgGycbhs;
				angular.forEach(files, function(file, key) {
					let docFile = dataURLtoFile('data:image/*;base64,' + file.content, 'gnc'+key+'.jpg');
					vm.gycbhFileModel.push(docFile);
			 	});
				console.log(vm.gycbhFileModel);
  			}
  		}
  		
  		// watch
  		$scope.$watch('vm.gcnFileModel', function () {
  			if (vm.gcnFileModel != undefined && vm.gcnFileModel != null && vm.gcnFileModel) {
  				vm.gcnFiles = [];
  				var files = vm.gcnFileModel;
  				
  				angular.forEach(files, function(file) {
  					var fileReader = new FileReader();
  					fileReader.readAsDataURL(file);
  	            	fileReader.onload = function (e) {
  	            		var dataUrl = e.target.result;
  	            	  	var base64Data = dataUrl.substr(dataUrl.indexOf('base64,') + 'base64,'.length);
  	            	  	let gcnFile = {
  	              			"content": base64Data,
  	              		    "fileType": file.type,
  	              		    "filename": file.name
  	              		};
  	            	  	vm.gcnFiles.push(gcnFile);
  	            	};
  			 	});
  				console.log(vm.gcnFiles);
  			} else {
  				vm.gcnFiles = [];
  			}
  		}, true);
  		
  		$scope.$watch('vm.gycbhFileModel', function () {
  			if (vm.gycbhFileModel != undefined && vm.gycbhFileModel != null && vm.gycbhFileModel) {
  				vm.gycbhFiles = [];
  				var files = vm.gycbhFileModel;
            	
  				angular.forEach(files, function(file) {
  					var fileReader = new FileReader();
  					fileReader.readAsDataURL(file);
  	            	fileReader.onload = function (e) {
  	            		var dataUrl = e.target.result;
  	            	  	var base64Data = dataUrl.substr(dataUrl.indexOf('base64,') + 'base64,'.length);
  	            	  	let gycbhFile = {
  	              			"content": base64Data,
  	              		    "fileType": file.type,
  	              		    "filename": file.name
  	              		};
  	            	  	vm.gycbhFiles.push(gycbhFile);
  	            	};
  			 	});
  				console.log(vm.gycbhFiles);
  			} else {
  				vm.gycbhFiles = [];
  			}
  		}, true);
  		
  		$scope.$on('selectedAnchiChange', function() {
        	if ($rootScope.selectedAnchi != undefined && $rootScope.selectedAnchi != null) {
        		console.log($rootScope.selectedAnchi);
        		vm.selected = $rootScope.selectedAnchi;
        		vm.policy.soAnchi = $rootScope.selectedAnchi.ACHI_SO_ANCHI;
        		vm.policy.tenAnchi = $rootScope.selectedAnchi.ACHI_TEN_ANCHI;
        	}
        });
  		
  		$scope.$on('selectedContactChange', function() {
        	if ($rootScope.selectedContact != undefined && $rootScope.selectedContact != null) {
        		vm.policy.contactCode = $rootScope.selectedContact.contactCode;
        		vm.policy.contactName = $rootScope.selectedContact.contactName;
        	}
        });
  		
  		// Function
  		function openSearchAnchi() {
  			console.log('openSearchAnchi');
  			CommonDialogService.openSearchAnchiDialog();
  		}
  		
  		function openSearchContact() {
        	console.log('openSearchContact');
        	ContactCommonDialogService.openSearchDialog();
        }
  		
  		function cancel() {
  			$state.go('app.order');
  		}
  		
  		function changeDate(){
  			if (vm.policy.ngayHieulucTu != "" && vm.policy.ngayHieulucDen != ""){
  				if(!vm.checkDate(vm.policy.ngayHieulucTu, vm.policy.ngayHieulucDen)){
  					toastr.error("Thời gian từ ngày - đến ngày không phù hợp");
  					return false;
  				}
  				
  				let endDate = moment(vm.policy.ngayHieulucTu, "DD/MM/YYYY").add(1, 'years').add(-1, 'days').format("DD/MM/YYYY");
  	            vm.policy.ngayHieulucDen = endDate;
  				return true;
  			}
  		}
  		
  		function saveAnchiPolicyCart() {
  			if(changeDate()){
  				vm.isSaveAndNewFlag = false;
  	  			saveBase();	
  			} 
  		}
  		
  		function saveAnchiPolicyReload() {
  			if(changeDate()){
  				vm.isSaveAndNewFlag = true;
  	  			saveBase();	
  			}
  		}
  		
  		function saveBase() {
  			if (vm.form.$invalid) {
  				return;
  			}
  			console.log('saveAnchiPolicy');
  			vm.isLoading = true;
  			vm.policy.imgGcns = vm.gcnFiles;
  			vm.policy.imgGycbhs = vm.gycbhFiles;
  			vm.policy.tongTienTT = vm.policy.phiBaoHiem;
  			
  			var copyAgreement = $stateParams.copy;
  			if (copyAgreement == "true"){
  				vm.policy.agreementId = null;
  				vm.policy.gycbhNumber =  null;
  			}
  			
  			if (vm.policy.agreementId != null && vm.policy.agreementId != undefined) {
  				// Edit
  				ProductCommonService.saveAnchiPolicy(vm.policy, onSuccess, onError);
      			
      			function onSuccess(data) {
      				vm.isLoading = false;
      				console.log(data);
      				showUpdateAnchiPolicy(data);
      			}
      			
      			function onError(result) {
      				vm.isLoading = false;
      				let message = result.data.message || "Lỗi khi cấp đơn ấn chỉ kiểm tra lại số ấn chỉ đã sử dụng.";
      				toastr.error(message);
      			}
  			} else{
  				ProductCommonService.getPolicyNumber({lineId: vm.policy.maSanPham}).$promise.then(function(result) {
  	            	console.log('Done get gychbhNumber: ' + result.policyNumber);
  	            	// Add ychbhNumber
  	            	vm.policy.gycbhNumber  = result.policyNumber;

  	            	// Save ycbh offline
  	      			ProductCommonService.saveAnchiPolicy(vm.policy, onSuccess, onError);
  	      			
  	      			function onSuccess(data) {
  	      				vm.isLoading = false;
  	      				console.log(data);
  	      				showSaveAnchiPolicy(data);
  	      			}
  	      			
  	      			function onError(result) {
  	      				vm.isLoading = false;
  	      				let message = result.data.message || "Lỗi khi cấp đơn ấn chỉ kiểm tra lại số ấn chỉ đã sử dụng.";
  	      				toastr.error(message);
  	      			}
  	            }).catch(function(data, status) {
  	    			toastr.error("Lỗi khi lấy số GYCBH");
  			    });
  			}
  		}
  		
  		function gotoAfterSave() {
  			if (vm.isSaveAndNewFlag == true) {
  				// reload
  				$state.reload();
  			} else {
  				$state.go('app.cart');
  			}
  		}
  		
  		function showSaveAnchiPolicy(data) {
        	var message = "Cấp đơn Ấn chỉ <strong>" + data.gycbhNumber + "</strong> thành công";
        	
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
                        	gotoAfterSave();
	                    }
                    }
                },
            });
        }
  		
  		function showUpdateAnchiPolicy(data) {
        	var message = "Cập nhật đơn Ấn chỉ <strong>" + data.gycbhNumber + "</strong> thành công";
        	
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
                        	gotoAfterSave();
	                    }
                    }
                },
            });
        }
  		
    }
})();
