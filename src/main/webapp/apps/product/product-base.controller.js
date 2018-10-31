// code style: https://github.com/johnpapa/angular-styleguide
// Create by: Nam, Nguyen Hoai - ITSOL.vn

(function() {
    '';
    angular
      .module('app')
      .controller('ProductBaseController', ProductBaseController)
        .directive( 'elemReady', ['$parse', function( $parse ) {
            return {
                restrict: 'A',
                link: function( $scope, elem, attrs ) {
                    elem.ready(function(){
                        $scope.$apply(function(){
                            var func = $parse(attrs.elemReady);
                            func($scope);
                        })
                    })
                }
            }
        }]);

    ProductBaseController.$inject = ['vm', '$state', '$stateParams', '$rootScope', '$scope', '$window', '$compile', '$timeout'
    	, 'ContactCommonDialogService', 'ResponseValidateService', 'Principal', 'DateUtils', '$ngConfirm', 'ProductCommonService', '$filter', '$uibModal'];

    function ProductBaseController(vm, $state, $stateParams, $rootScope, $scope, $window, $compile, $timeout
    		, ContactCommonDialogService, ResponseValidateService, Principal, DateUtils, $ngConfirm, ProductCommonService, $filter, $uibModal){
		vm.message = { name: 'default entry from ProductBaseController' };

		var checkCloseStepOne = false;
        var checkCloseStepTwo = false;
        var checkCloseStepThree = false;
        vm.loading = false;
        vm.typeArrowOne = "fa-angle-left";
        vm.typeArrowTwo = "fa-angle-left";
        vm.typeArrowThree = "fa-angle-right";

        vm.typeNameOne = "1";
        vm.typeNameTwo = "2";
        vm.typeNameThree = "3";
        vm.currentAccount;
        vm.contactCode;
        vm.contactName;
        vm.contactDob;
        vm.nextCount = 0;
        vm.receiverUserData = {  
			"address":"",
			"addressDistrict":"",
			"email":"",
			"mobile":"",
			"name":""
		};
        vm.invoiceInfo = {  
				"accountNo":"",
				"address":"",
				"check":"0",
				"company":"",
				"name":"",
				"taxNo":""
        };
        
        // Init controller
  		(function initController() {
  			// instantiate base controller
  		    getAccount();
  		})();
  		
        // declare function
        vm.closeOpenStep = closeOpenStep;
        vm.closeOpenStepMobile = closeOpenStepMobile;
        vm.calculateToDate = calculateToDate;
        vm.openSearchContact = openSearchContact;
		vm.openAddContact = openAddContact;

		vm.getName = getName;
        vm.dobValidator = dobValidator;
        vm.emailValidator = emailValidator;
        vm.validateResponse = validateResponse;
        vm.clearResponseError = clearResponseError;
        vm.registerDisableContactInfoValue = registerDisableContactInfoValue;
        vm.disableContactInfo = disableContactInfo;
        vm.isEditMode = isEditMode;
        vm.isCopyMode = isCopyMode;
        vm.loadPolicyEdit = loadPolicyEdit;
        
        vm.savePolicyBase = savePolicyBase; 
        vm.showSavePolicySuccessInfo = showSavePolicySuccessInfo;
        vm.showOTPSavePolicySuccessInfo = showOTPSavePolicySuccessInfo;
        vm.showWarningEditPolicy = showWarningEditPolicy;
        vm.formatAddressEdit = formatAddressEdit; 
        vm.getAddressByPostCode = getAddressByPostCode;
        
        vm.changeCopyFromContact = changeCopyFromContact;
        
        vm.cleanAllResponseError = cleanAllResponseError;
        
        vm.openSearchContactInvoice = openSearchContactInvoice;
        vm.openSearchContactReceiver = openSearchContactReceiver;
        vm.loadContactForInvoice = false;
    	vm.loadContactForReceiver = false;
    	vm.validateInvoice = validateInvoice;
    	
    	// 15.08
    	vm.checkDate = checkDate;
    	var modalInstance = null;
    	
    	function checkDate(startDate, endDate){
    		var splitStart = startDate.split('/');
    	    var dateStart = new Date(splitStart[2], splitStart[1] - 1, splitStart[0]); //Y M D 
    	    var timesStart = dateStart.getTime();
    		
    		var splitEnd = endDate.split('/');
    	    var dateEnd = new Date(splitEnd[2], splitEnd[1] - 1, splitEnd[0]); //Y M D 
    	    var timesEnd = dateEnd.getTime();
    	    if (timesEnd < timesStart) {
    	        return false;
    	    }
    	    return true;
    	}
    	
    	function validateInvoice() {
    		console.log('validateInvoice');
    		if (vm.policy.invoiceInfo != null){
    			if (vm.policy.invoiceInfo.name != "" && vm.policy.invoiceInfo.company != "" && vm.policy.invoiceInfo.taxNo != "" && vm.policy.invoiceInfo.address != "" && vm.policy.invoiceInfo.accountNo != ""){
    				return true;        				
    			}
    			if (vm.policy.invoiceInfo.name == '' && vm.policy.invoiceInfo.company == '' && vm.policy.invoiceInfo.taxNo == '' && vm.policy.invoiceInfo.address == '' && vm.policy.invoiceInfo.accountNo == ''){
    				return true;        				
    			}
        		return false; 
    		}
    		return true;
    	}
    	
    	function openSearchContactInvoice() {
    		console.log('openSearchContactInvoice');
    		vm.loadContactForInvoice = true;
        	ContactCommonDialogService.openSearchDialog();
    	}
    	
    	function openSearchContactReceiver() {
    		console.log('openSearchContactReceiver');
    		vm.loadContactForReceiver = true;
        	ContactCommonDialogService.openSearchDialog();
    	}
    	
        function changeCopyFromContact() {
        	vm.policy.receiverUser = {};
	      	if (vm.copyFromContact) {
	      		if (vm.lineId == 'BVP') {
	      			var dataBVP = $rootScope.saveNguoiYcBVP;
	      			let address = dataBVP.homeAddress;
	      			vm.policy.receiverUser.name = dataBVP.contactName;
		      		vm.policy.receiverUser.address = address.substring(0, address.indexOf("::"));
		      		vm.policy.receiverUser.mobile = dataBVP.phone;
		      		vm.policy.receiverUser.email = dataBVP.email;

	                let postcode = address.substring(address.lastIndexOf("::") + 2);
	                ProductCommonService.getAddressByPostcode({code: postcode}).$promise.then(function(data) {
	                	vm.policy.receiverUser.addressDistrictData = data;
	                });
		      		
	      		} else {
	      			vm.policy.receiverUser.name = vm.policy.contactName;
		      		vm.policy.receiverUser.address = vm.policy.contactAddress;
		      		vm.policy.receiverUser.addressDistrictData = vm.policy.contactAddressDistrictData;
		      		vm.policy.receiverUser.mobile = vm.policy.contactPhone;
		      		vm.policy.receiverUser.email = vm.policy.contactEmail;
	      		}
	      	}
        }
        // implement function
        function loadPolicyEdit(obj) {
        	if (!isEditMode()) {
        		return;
        	}
        	
        	// Load policy
        	$state.current.data.title = $state.current.data.title + '_EDIT';
        	
        	ProductCommonService.getById({id : $stateParams.id}).$promise.then(function(result) {
        		obj = result;
        		console.log('ProductCommonService');
        		console.log(obj);
            }).catch(function(data, status) {
    			console.log('Error get policy to edit');
    			vm.clearResponseError();
    			vm.validateResponse(data, 'getPolicyToEdit');
		    });
        }
        
        function isEditMode() {
        	if ($stateParams.id != undefined && $stateParams.id != null && $stateParams.id > 0 && $stateParams.copy == "false") {
        		return true;
        	}
        	
        	return false;
        }
        
        function isCopyMode() {
        	if ($stateParams.id != undefined && $stateParams.id != null && $stateParams.id > 0 && $stateParams.copy == "true") {
        		return true;
        	}
        	
        	return false;
        }
        
        function formatAddressEdit(address) {
        	return address.substring(0, address.indexOf("::"));
        }
        
        function getAddressByPostCode(address) {
        	var postcode = address.substring(address.lastIndexOf("::") + 2);
        	return ProductCommonService.getAddressByPostcode({code: postcode}).$promise;
        }
        
        
        function savePolicyBase(productCode, obj) {
        	vm.loading = true;
        	
        	vm.policy.receiverUser.address = vm.policy.receiverUser.address 
    			+ "::" + vm.policy.receiverUser.addressDistrictData.pkDistrict
    			+ "::" + vm.policy.receiverUser.addressDistrictData.pkPostcode;
        	
        	// Save or update
        	if (obj.agreementId != null && obj.agreementId != "") {
        		// Update
        		updatePolicy(productCode, obj);
        	} else {
        		ProductCommonService.getPolicyNumber({lineId: productCode}).$promise.then(function(result) {
        			vm.clearResponseError();
                	console.log('Done get gychbhNumber: ' + result.policyNumber);
                	// Add ychbhNumber
                	obj.gycbhNumber  = result.policyNumber;

                	// Add new
                	createNewPolicy(productCode, obj);
                }).catch(function(data, status) {
        			console.log('Error get gychbhNumber');
        			vm.clearResponseError();
        			vm.validateResponse(data, 'getPolicyNumber');
    		    });
        	}
        }
        
        function createNewPolicy(productCode, obj) {
        	console.log('create new policy: ' + productCode);
        	switch(productCode){
	  	        case "KCR":
	  	        	ProductCommonService.createKcarePolicy(obj, onCreatePolicySuccess, onCreatePolicyError);
	  	            break;
	  	        case "CAR":
	  	        	ProductCommonService.createCarPolicy(obj, onCreatePolicySuccess, onCreatePolicyError);
	  	            break;
	  	        case "BVP":
	  	        	ProductCommonService.createBvpPolicy(obj, onCreatePolicySuccess, onCreatePolicyError);
	  	            break;
	  	        case "KHC":
	  	        	ProductCommonService.createKhcPolicy(obj, onCreatePolicySuccess, onCreatePolicyError);
	  	            break;
	  	        case "TNC":
	  	        	ProductCommonService.createTncPolicy(obj, onCreatePolicySuccess, onCreatePolicyError);
	  	            break;
		  	    case "TVC":
		  	    	ProductCommonService.createTvcPolicy(obj, onCreatePolicySuccess, onCreatePolicyError);
	  	            break;
		  	    case "TVI":
		  	    	ProductCommonService.createTviPolicy(obj, onCreatePolicySuccess, onCreatePolicyError);
		            break;
		  	    case "HOM":
		  	    	ProductCommonService.createHomePolicy(obj, onCreatePolicySuccess, onCreatePolicyError);
		            break;
		  	    case "MOT":
		  	    	ProductCommonService.createMotoPolicy(obj, onCreatePolicySuccess, onCreatePolicyError);
		            break;
		  	    case "HHV":
		  	    	ProductCommonService.createHhvcPolicy(obj, onCreatePolicySuccess, onCreatePolicyError);
		            break;
	  	        default: 
	  	            console.log('invalid product code');
	  	        break;
	  	    }
	
			function onCreatePolicySuccess(data, headers) {
				vm.clearResponseError();
	            vm.loading = false;
				// kiểm tra nếu TH đang soạn thì ko bật otp
//				if (data.statusPolicy == "90"){
					var checkOTP = vm.currentAccount.sendOtp;
		            if (checkOTP == 1){
		            	$rootScope.gycbhNumber = data.gycbhNumber;
		            	vm.showOTPSavePolicySuccessInfo();
		            } else {
		            	vm.showSavePolicySuccessInfo(obj);	
		            }	
//				} else {
//					vm.showSavePolicySuccessInfo(obj);
//				}
	        }
				
	        function onCreatePolicyError(error) {
	            vm.loading = false;
	            vm.validateResponse(error, 'createPolicy');
	        }
        }
        
        function updatePolicy(productCode, obj) {
        	console.log('update policy: ' + productCode);
        	switch(productCode){
	  	        case "KCR":
	  	        	ProductCommonService.updateKcarePolicy(obj, onUpdatePolicySuccess, onUpdatePolicyError);
	  	            break;
	  	        case "CAR":
	  	        	ProductCommonService.updateCarPolicy(obj, onUpdatePolicySuccess, onUpdatePolicyError);
	  	            break;
	  	        case "BVP":
	  	        	ProductCommonService.updateBvpPolicy(obj, onUpdatePolicySuccess, onUpdatePolicyError);
	  	            break;
	  	        case "KHC":
	  	        	ProductCommonService.updateKhcPolicy(obj, onUpdatePolicySuccess, onUpdatePolicyError);
	  	            break;
	  	        case "TNC":
	  	        	ProductCommonService.updateTncPolicy(obj, onUpdatePolicySuccess, onUpdatePolicyError);
	  	            break;
		  	    case "TVC":
		  	    	ProductCommonService.updateTvcPolicy(obj, onUpdatePolicySuccess, onUpdatePolicyError);
	  	            break;
		  	    case "TVI":
		  	    	ProductCommonService.updateTviPolicy(obj, onUpdatePolicySuccess, onUpdatePolicyError);
		            break;
		  	    case "HOM":
		  	    	ProductCommonService.updateHomePolicy(obj, onUpdatePolicySuccess, onUpdatePolicyError);
		            break;
		  	    case "MOT":
		  	    	ProductCommonService.updateMotoPolicy(obj, onUpdatePolicySuccess, onUpdatePolicyError);
		            break;
		  	    case "HHV":
		  	    	ProductCommonService.updateHhvcPolicy(obj, onUpdatePolicySuccess, onUpdatePolicyError);
		            break;
	  	        default: 
	  	            console.log('invalid product code');
	  	        break;
	  	    }
	
			function onUpdatePolicySuccess(data, headers) {
				vm.clearResponseError();
	            vm.loading = false;
	            // kiểm tra nếu TH đang soạn thì ko bật otp
//				if (data.statusPolicy == "90"){
					var checkOTP = vm.currentAccount.sendOtp;
		            if (checkOTP == 1){
		            	$rootScope.gycbhNumber = data.gycbhNumber;
		            	vm.showOTPSavePolicySuccessInfo();
		            } else {
		            	vm.showSavePolicySuccessInfo(obj);	
		            }	
//				} else {
//					vm.showSavePolicySuccessInfo(obj);
//				}
	        }
				
	        function onUpdatePolicyError(error) {
	            vm.loading = false;
	            vm.validateResponse(error, 'updatePolicy');
	        }
        }
        
        function showWarningEditPolicy() {
        	$ngConfirm({
                title: 'Dữ liệu không hợp lệ',
                icon: 'fas fa-exclamation-triangle',
                theme: 'modern',
                type: 'red',
                content: '<div class="text-center">Không tìm thấy hợp đồng</div>',
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
        
        function showOTPSavePolicySuccessInfo() {
            modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'apps/product/partial/partial-OTP.html',
                controller: 'AgreementOtpController',
                controllerAs: 'vm',
                size: 'sg',
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            });
            
    	}
        
        function showSavePolicySuccessInfo(obj) {
        	var message = "";
        	if (obj.agreementId != null && obj.agreementId != "") {
        		// Update
        		message = "Cập nhật hợp đồng " + obj.gycbhNumber + " thành công!";
        	} else {
        		message = "Tạo hợp đồng  " + obj.gycbhNumber + " thành công!";
        	}
        	
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
        
        
		function getAccount() {
  			Principal.identity().then(function(account) {
                vm.currentAccount = account;
            });
  		}
		
        $scope.$on('selectedContactChange', function() {
        	if ($rootScope.selectedContact != undefined && $rootScope.selectedContact != null) {
        		if (vm.loadContactForInvoice) {
        			if (vm.policy.invoiceInfo == null || vm.policy.invoiceInfo == undefined) {
        				vm.policy.invoiceInfo = {};
        			}
        			vm.policy.invoiceInfo.name = $rootScope.selectedContact.contactName;
        			vm.policy.invoiceInfo.address = $filter('address')($rootScope.selectedContact.homeAddress);
                    // reset
                    vm.loadContactForInvoice = false;
            		return;
            	} else if (vm.loadContactForReceiver) {
            		if (vm.policy.receiverUser == null || vm.policy.receiverUser == undefined) {
            			vm.policy.receiverUser = {};
        			}
            		vm.policy.receiverUser.name = $rootScope.selectedContact.contactName;
            		vm.policy.receiverUser.mobile = $rootScope.selectedContact.phone;
            		vm.policy.receiverUser.email = $rootScope.selectedContact.email;
            		
            		let addressReceiver = $rootScope.selectedContact.homeAddress;
            		vm.policy.receiverUser.address = addressReceiver.substring(0, addressReceiver.indexOf("::"));

                    let postcodeReceiver = addressReceiver.substring(addressReceiver.lastIndexOf("::") + 2);
                    ProductCommonService.getAddressByPostcode({code: postcodeReceiver}).$promise.then(function(data) {
                    	vm.policy.receiverUser.addressDistrictData = data;
                    });
            		
                    // reset
                    vm.loadContactForReceiver = false;
            		return;
            	}
        		// xử lý trường hợp chọn contact ở BVP và KCR khi có nhiều selectedContactChange
        		if (vm.lineId == 'BVP' && vm.policy.nguoiycName != ""){
        			
        		} else if (vm.lineId == 'KCR' && vm.policy.contactCode != "" && vm.policy.contactCode != null && vm.policy.contactCode != undefined){
        			
        		} else {
        			
        			vm.policy.contactCode = $rootScope.selectedContact.contactCode;
            		vm.policy.contactName = $rootScope.selectedContact.contactName;
                    vm.policy.contactDob = $rootScope.selectedContact.dateOfBirth;
                    vm.policy.contactPhone = $rootScope.selectedContact.phone;
                    vm.policy.contactEmail = $rootScope.selectedContact.email;
                    vm.policy.contactIdNumber = $rootScope.selectedContact.idNumber;
                    
                    let address = $rootScope.selectedContact.homeAddress;
                    vm.policy.contactAddress = address.substring(0, address.indexOf("::"));

                    let postcode = address.substring(address.lastIndexOf("::") + 2);
                    //vm.policy.contactAddressDistrictData = $rootScope.selectedContact.homeAddress;
                    ProductCommonService.getAddressByPostcode({code: postcode}).$promise.then(function(data) {
                    	vm.policy.contactAddressDistrictData = data;
                    	
                    	// Xy ly load THÔNG TIN CHỦ XE cho rieng CAR
                        if (vm.lineId == 'CAR') {
                        	vm.policy.insuredName = vm.policy.contactName;
                        	vm.policy.insuredAddress = vm.policy.contactAddress;
                        	vm.policy.insuredAddressDistrict = vm.policy.contactAddressDistrictData;
                        } else if (vm.lineId == 'TVI') {
                        	// Bảo hiểm du lịch Việt Nam
                        	vm.policy.listTviAdd[0].insuredName = vm.policy.contactName;
                    		vm.policy.listTviAdd[0].idPasswport = vm.policy.contactIdNumber;
                    		vm.policy.listTviAdd[0].dob = vm.policy.contactDob;
                    		vm.policy.listTviAdd[0].relationshipId = "30"; // Ban than
                        } else if (vm.lineId == 'TVC') {
                        	// Bảo hiểm du lịch Quoc te
                        	vm.policy.listTvcAddBaseVM[0].insuredName = vm.policy.contactName;
                    		vm.policy.listTvcAddBaseVM[0].idPasswport = vm.policy.contactIdNumber;
                    		vm.policy.listTvcAddBaseVM[0].dob = vm.policy.contactDob;
                    		vm.policy.listTvcAddBaseVM[0].relationship = "30"; // Ban than
                        } else if (vm.lineId == 'TNC') {
                        	// Bảo hiểm tai nạn con người
                        	vm.policy.listTncAdd[0].insuredName = vm.policy.contactName;
                    		vm.policy.listTncAdd[0].idPasswport = vm.policy.contactIdNumber;
                    		vm.policy.listTncAdd[0].dob = vm.policy.contactDob;
                        }
                    });
        			
        		}
        	
        	}
        });

        function openSearchContact() {
        	console.log('openSearchContact');
        	ContactCommonDialogService.openSearchDialog();
        }
        
        function openAddContact() {
        	ContactCommonDialogService.openAddDialog();
        }

        function closeOpenStepMobile(type){
            if(isNext) {
                vm.nextCount++;
            }
            if(type == "step1"){
                document.getElementById("bv-step-1").className = 'bv-step-1  col-lg-12  col-md-12 col-sm-12 col-xs-12 padding0 display-flex widthStep98 display-flex OpenStepOne ';
                document.getElementById("bv-step-2").className = 'bv-step-2  padding0 display-flex  closeStepTwo';
                document.getElementById("bv-step-3").className = 'bv-step-3-default  padding0  display-flex';
                if(document.getElementById("includeStep1")) {
                	document.getElementById("includeStep1").className = 'bv-display-step widthStep98';
                    document.getElementById("includeStep2").className = 'bv-display-step';
                    document.getElementById("includeStep3").className = 'bv-display-step';
                }
                document.getElementById("mobile-step-1").className = 'text-center display-inline-block bv-step-mobile active-mobile-tab';
                document.getElementById("mobile-step-2").className = 'text-center display-inline-block bv-step-mobile';
                document.getElementById("mobile-step-3").className = 'text-center display-inline-block bv-step-mobile';
                vm.typeNameOne = "Tính phí";
                vm.typeNameTwo = "2";
                vm.typeNameThree = "3";
                checkCloseStepOne = true;
            }else if(type == "step2"){
                if(vm.nextCount >= 1) {
                    document.getElementById("bv-step-2").className = 'bv-step-2  col-lg-12  col-md-12 col-sm-12 col-xs-12 padding0 display-flex  widthStep98 OpenStepTwo';
                    document.getElementById("bv-step-1").className = 'bv-step-1  padding0 display-flex  closeStepOne';
                    document.getElementById("bv-step-3").className = 'bv-step-3-default  padding0  display-flex';
                    if(document.getElementById("includeStep1")) {
                    	document.getElementById("includeStep1").className = 'bv-display-step';
                        document.getElementById("includeStep2").className = 'bv-display-step widthStep98';
                        document.getElementById("includeStep3").className = 'bv-display-step';
                    }
                    document.getElementById("mobile-step-1").className = 'text-center display-inline-block bv-step-mobile ';
                    document.getElementById("mobile-step-2").className = 'text-center display-inline-block bv-step-mobile active-mobile-tab';
                    document.getElementById("mobile-step-3").className = 'text-center display-inline-block bv-step-mobile';
                    vm.typeNameOne = "1";
                    vm.typeNameTwo = "Thông tin giao hàng";
                    vm.typeNameThree = "3";
                }
            }else if(type == "step3"){
        		if(vm.nextCount >= 2) {
                    document.getElementById("bv-step-2").className = 'bv-step-2  padding0 display-flex  closeStepTwo';
                    document.getElementById("bv-step-1").className = 'bv-step-1  padding0 display-flex  closeStepOne';
                    document.getElementById("bv-step-3").className = 'bv-step-3 display-flex openStepOne col-lg-5  col-md-5 col-sm-12 col-xs-12 padding0 display-flex  widthStep98';
                    if(document.getElementById("includeStep1")) {
                    	document.getElementById("includeStep1").className = 'bv-display-step';
                        document.getElementById("includeStep2").className = 'bv-display-step ';
                        document.getElementById("includeStep3").className = 'bv-display-step widthStep98';
                    }
                    document.getElementById("mobile-step-1").className = 'text-center display-inline-block bv-step-mobile ';
                    document.getElementById("mobile-step-2").className = 'text-center display-inline-block bv-step-mobile ';
                    document.getElementById("mobile-step-3").className = 'text-center display-inline-block bv-step-mobile active-mobile-tab';
                    vm.typeNameOne = "1";
                    vm.typeNameTwo = "2";
                    vm.typeNameThree = "Tóm tắt đơn hàng";
                }            		
            }else{
                document.getElementById("bv-step-1").className = 'bv-step-1 col-lg-12  col-md-12 col-sm-12 col-xs-12 padding0 display-flex widthStep98';
                // document.getElementById("bv-step-2").className = 'bv-step-2 col-lg-5  col-md-5 col-sm-12 col-xs-12 padding0 display-flex widthStep2';
                // document.getElementById("bv-step-3").className = 'bv-step-3-default  padding0  display-flex ';
                checkCloseStepOne = false;
                vm.typeArrowOne = "fa-angle-left";
            }
        }


        function closeOpenStep(type, isNext){
            if(isNext) {
                vm.nextCount++;
            }
            if(type == "step1"){
                document.getElementById("bv-step-1").className = 'bv-step-1  col-lg-12  col-md-12 col-sm-12 col-xs-12 padding0 display-flex widthStep98 display-flex OpenStepOne';
                document.getElementById("bv-step-2").className = 'bv-step-2  padding0 display-flex  closeStepTwo';
                document.getElementById("bv-step-3").className = 'bv-step-3-default  padding0  display-flex';
                if(document.getElementById("includeStep1")) {
                	document.getElementById("includeStep1").className = 'bv-display-step widthStep98';
                    document.getElementById("includeStep2").className = 'bv-display-step';
                    document.getElementById("includeStep3").className = 'bv-display-step';
                }
                vm.typeArrowOne = "fa-angle-left";
                vm.typeArrowThree = "fa-angle-right";
                vm.typeArrowTwo = "fa-angle-right";
                checkCloseStepOne = true;
            }else if(type == "step2"){
                if(vm.nextCount >= 1) {
                    document.getElementById("bv-step-2").className = 'bv-step-2  col-lg-12  col-md-12 col-sm-12 col-xs-12 padding0 display-flex  widthStep98 OpenStepTwo';
                    document.getElementById("bv-step-1").className = 'bv-step-1  padding0 display-flex  closeStepOne';
                    document.getElementById("bv-step-3").className = 'bv-step-3-default  padding0  display-flex';
                    if(document.getElementById("includeStep1")) {
                    	document.getElementById("includeStep1").className = 'bv-display-step';
                        document.getElementById("includeStep2").className = 'bv-display-step widthStep98';
                        document.getElementById("includeStep3").className = 'bv-display-step';
                    }
                    vm.typeArrowOne = "fa-angle-right";
                    vm.typeArrowThree = "fa-angle-right";
                    vm.typeArrowTwo = "fa-angle-left";
                }
            }else if(type == "step3"){
            	if(validateInvoice()){
	                if(vm.nextCount >= 2) {
	                    document.getElementById("bv-step-2").className = 'bv-step-2  padding0 display-flex  closeStepTwo';
	                    document.getElementById("bv-step-1").className = 'bv-step-1  padding0 display-flex  closeStepOne';
	                    document.getElementById("bv-step-3").className = 'bv-step-3 display-flex openStepOne col-lg-5  col-md-5 col-sm-12 col-xs-12 padding0 display-flex  widthStep98';
	                    if(document.getElementById("includeStep1")) {
	                    	document.getElementById("includeStep1").className = 'bv-display-step';
	                        document.getElementById("includeStep2").className = 'bv-display-step ';
	                        document.getElementById("includeStep3").className = 'bv-display-step widthStep98';
	                    }
	                    vm.typeArrowOne = "fa-angle-right";
	                    vm.typeArrowThree = "fa-angle-left";
	                    vm.typeArrowTwo = "fa-angle-right";
	                }
            	} else{
            		toastr.error("Cần nhập đầy đủ thông tin hóa đơn GTGT"); 
            	}
            }else{
                document.getElementById("bv-step-1").className = 'bv-step-1 col-lg-12  col-md-12 col-sm-12 col-xs-12 padding0 display-flex widthStep98';
                // document.getElementById("bv-step-2").className = 'bv-step-2 col-lg-5  col-md-5 col-sm-12 col-xs-12 padding0 display-flex widthStep2';
                // document.getElementById("bv-step-3").className = 'bv-step-3-default  padding0  display-flex ';
                checkCloseStepOne = false;
                vm.typeArrowOne = "fa-angle-left";
            }
        }
        
        function calculateToDate(fromDate) {
  			var fromDateObj = moment(fromDate, 'DD/MM/YYYY');
  			var toDateObj = fromDateObj.add(1, 'y').subtract(1, 'd');
  			var toDate = toDateObj.format('DD/MM/YYYY');
  			
  			return toDate;
  		}
        
        function getName(id, datas) {
  			var filterObj = datas.filter(function(e) {
  			  return e.id == id;
  			});
  			if (filterObj[0] != null && filterObj[0] != undefined) {
  				return filterObj[0].name;
  			}
  		}

  		// FOR DISABLE ALL
		function registerDisableContactInfoValue(model) {
			$scope.$watch(model, function(value) {
		    	if(value > 0) {
		            disableContactInfo(false);
		        } else {
		            disableContactInfo(true);
		        }
		    }, true);
		}
		
        function disableContactInfo(isDisable) {
            if(isDisable) {
                $("#contact-info").addClass("disable-all");
            } else {
                $("#contact-info").removeClass("disable-all");
//                $("#contact-info").find("input,button").prop("disabled",false);
//                $("#contact-info").find(":button").prop("disabled",false);
            }
        }

  		// FOR VALIDATOR
        // Date of birth validator
        function dobValidator(dobStr) {
            if(!dobStr){return;}

            var now = new Date();
            var nowStr = DateUtils.convertDate(now);

            var dateDiff = DateUtils.dateDiff(dobStr, nowStr);
            var yearDiff = DateUtils.yearDiff(dobStr, nowStr);

            if (dateDiff < 15 || yearDiff > 70) {
                return "Ngày Sinh: Chỉ nhận bh cho đối tượng, từ 15 ngày tuổi đến 70 tuổi";
            }
            return true;
        };
        
        function emailValidator() {
            if(!vm.receiverUserData.email){return;}

            if (myForm.input.$error.email) {
                return "Không đúng định dạng email!";
            }
            return true;
        };
        
        function validateResponse(result, type) {
        	vm.errorField = result.data.fieldName;

            var message = ResponseValidateService.validateResponse(result.data);
            if(!message) {
                message = result.data.fieldName + ' dữ liệu không hợp lệ';
            }
            if(type == 'getPremium') {
                message = '' + message;
            } else if(type == 'createPolicy') {
                message = '' + message ;
            } else if(type == 'updatePolicy') {
                message = '' + message ;
            } else if(type == 'getPolicyNumber') {
                message = '' + message ;
            } else if(type == 'getPolicyToEdit') {
                message = '' + message ;
            }
            toastr.error(message);
        }
        
        function clearResponseError() {
        	ResponseValidateService.cleanResponseError(vm.errorField);
        }

        function cleanAllResponseError() {
        	ResponseValidateService.cleanAllResponseError();
        }
        
    }
})();
