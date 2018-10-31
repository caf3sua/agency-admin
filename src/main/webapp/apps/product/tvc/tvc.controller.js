(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductTvcController', ProductTvcController);

    ProductTvcController.$inject = ['$scope', '$controller', 'Principal', '$state', '$rootScope', 'ProductCommonService'
    	, '$stateParams' , 'DateUtils'];

    function ProductTvcController ($scope, $controller, Principal, $state, $rootScope, ProductCommonService
    		, $stateParams, DateUtils) {
    	var vm = this;
    	vm.lineId = 'TVC';
    	
    	vm.policy = {
    			// premium
    			premiumDiscount: "",
    			//
                agreementId: "",
                changePremium: null,
                contactCode: "",
                destinationId: "",
                expiredDate: "",
                gycbhNumber: "",
                inceptionDate: "",
                invoiceInfo: {
                    check: "0",
                 },
                listTvcAddBaseVM: [
                ],
                loaitien: "USD",
                netPremium: 0,
                paymentMethod:"paymentMethod",
                planId:"2",
                policyNumber: "",
                premium: 0,
                propserCellphone: "",
                propserName: "",
                propserNgaysinh: "",
                receiveMethod: "1",
                receiverUser: {
                    address: "",
                    addressDistrict: "",
                    email: "",
                    mobile: "",
                    name: ""
                },
                invoiceInfo:{  
					accountNo:"",
					address:"",
					check:"0",
					company:"",
					name:"",
					taxNo:""
  		        },
	            soNguoiThamGia: 0,
	            travelCareId: 1,
	            travelWithId: "",
	            tvcPackage: ""
        };
        vm.product = {};
        vm.getPremium = getPremium;
        vm.onchangePlan = onchangePlan;
        vm.infoPerson = infoPerson;
        vm.onchangeReceiveMethod = false;
        vm.savePolicy = savePolicy;
        vm.showChangePremium = showChangePremium;
        vm.addOrRemovePerson =addOrRemovePerson;
        vm.addNewPerson = addNewPerson;
        vm.removePerson = removePerson;
        vm.isShowChangePremium = false;
        vm.onchangeTravel = onchangeTravel;
        vm.isShowChangeTravel = false;
        vm.isShowUSD = true;
        vm.isShowEUR = false;
        vm.changeLoaitien = changeLoaitien;
        vm.ngYcbhDicung = true;
        vm.changeNgYcbhDicung = changeNgYcbhDicung;
        
        // vm.checkNycbhcdc = checkNycbhcdc;
        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			// instantiate base controller
  		    $controller('ProductBaseController', { vm: vm, $scope: $scope });
            vm.registerDisableContactInfoValue('vm.policy.premium');

            var startDate = new Date();
            // add a day
            startDate.setDate(startDate.getDate() + 1);
            vm.policy.inceptionDate = DateUtils.convertDate(startDate);
            
            // Edit
            if (vm.isEditMode()) {
            	vm.loading = true;
            	// Load policy
            	$state.current.data.title = 'PRODUCT_TVC_EDIT';
            	
            	ProductCommonService.getById({id : $stateParams.id}).$promise.then(function(result) {
            		// Format to display and calculate premium again
            		formatEditData(result);
            		
            		vm.loading = false;
            		vm.policy = result;
            		// Open view and step - calculate premium again
            		getPremium();
            		vm.nextCount = 2;
            		formatAddressEdit();
                }).catch(function(data, status) {
                	vm.loading = false;
                	vm.showWarningEditPolicy();
    		    });
            }
            
            // Copy
            if (vm.isCopyMode()) {
            	vm.loading = true;
            	// Load policy
            	$state.current.data.title = 'PRODUCT_TVC';
            	
            	ProductCommonService.getById({id : $stateParams.id}).$promise.then(function(result) {
            		// Format to display and calculate premium again
            		formatEditData(result);
            		
            		vm.loading = false;
            		vm.policy = result;
            		
            		// copy
            		vm.policy.agreementId = null;
            		vm.policy.gycbhId = null;
            		vm.policy.gycbhNumber =  null;
            		
            		// Open view and step - calculate premium again
            		getPremium();
            		vm.nextCount = 2;
            		formatAddressEdit();
                }).catch(function(data, status) {
                	vm.loading = false;
                	vm.showWarningEditPolicy();
    		    });
            }
            
  		})();
  		
  		function formatAddressEdit() {
  			// Address at step 2
  			var receiverAddress = vm.policy.receiverUser.address;
  			vm.policy.receiverUser.address = vm.formatAddressEdit(receiverAddress);
  			vm.getAddressByPostCode(receiverAddress).then(function (data) {
  				vm.policy.receiverUser.addressDistrictData = data;
    		});
  			
  			// extra
  		}
  		
        function showChangePremium() {
            if(vm.policy.destinationId != "") {
                return true;
            } else {
                return false;
            }
        }
  		// Properties & function declare

        function formatEditData(result) {
        	result.contactDob = result.propserNgaysinh;
  		}
        
  		// Function
        function changeNgYcbhDicung() {
        	if (vm.ngYcbhDicung) {
        		vm.policy.listTvcAddBaseVM[0].insuredName = vm.policy.contactName;
        		vm.policy.listTvcAddBaseVM[0].idPasswport = vm.policy.contactIdNumber;
        		vm.policy.listTvcAddBaseVM[0].dob = vm.policy.contactDob;
        		vm.policy.listTvcAddBaseVM[0].relationship = "30"; // Ban than
        	} else {
        		vm.policy.listTvcAddBaseVM[0] = {};
        	}
        }
        
        function onchangeTravel() {
            if (vm.policy.travelWithId == '1'){
            	vm.policy.soNguoiThamGia = 1;
            	addOrRemovePerson();
            	vm.isShowChangeTravel = true;
            } else{
            	vm.policy.soNguoiThamGia = 2;
            	addOrRemovePerson();
            	vm.isShowChangeTravel = false;
            }
        }
        
        function changeLoaitien() {
  			var loaitien = vm.policy.loaitien;
  			
  			if (loaitien == "USD") {
  				vm.isShowUSD = true;
  	  	        vm.isShowEUR = false;
  			} else if (loaitien == "EUR") {
  				vm.isShowUSD = false;
  	  	        vm.isShowEUR = true;
  			} else {
  				vm.isShowUSD = false;
  	  	        vm.isShowEUR = false;
  			}
  		}
        
        function onchangePlan() {
        	if (vm.policy.expiredDate != ""){
        		if (vm.checkDate(vm.policy.inceptionDate, vm.policy.expiredDate)){
        			getPremium();	
        		} else{
        	        toastr.error('Thời gian ngày khởi hành - ngày trở về không phù hợp');
        		}
        	}
        }
        
        function getPremium() {
        	// clean error message
        	vm.cleanAllResponseError();
        	
            vm.loading = true;
            vm.product.destination =  vm.policy.destinationId;
            vm.product.ngayDi =  vm.policy.inceptionDate;
            vm.product.ngayVe  =  vm.policy.expiredDate;
            vm.product.numberOfPerson  =  vm.policy.soNguoiThamGia;
            vm.product.planId  =  vm.policy.planId;
            vm.product.premiumNet  =  0;
            vm.product.premiumPackage  =  vm.policy.travelWithId;
            vm.product.premiumTvc  = 0;
            if(vm.product.premiumDiscount > 0 ){
                vm.product.premiumDiscount = vm.policy.premiumDiscount;
            }else{
                vm.product.premiumDiscount  = 0;
            }
            vm.product.songay  = 0;
            ProductCommonService.getTvcPremium(vm.product, onGetPremiumSuccess, onGetPremiumError);
        }
        function onGetPremiumSuccess(result) {
            vm.loading = false;
            vm.policy.premium  = result.premiumTvc;
            vm.policy.soNguoiThamGia  = result.numberOfPerson;
            vm.policy.netPremium   = result.premiumNet;
            vm.policy.changePremium  = result.premiumDiscount;
            if(result.premiumDiscount > 0){
                vm.isShowChangePremium = true;
                vm.sumPremiumDiscount =  vm.policy.netPremium - vm.policy.premium ;
            }

            vm.clearResponseError();
            // "premiumTvc": 104500,
            //     "premiumNet": 110000,sumPremiumDiscount
        }

        function onGetPremiumError(result) {
            vm.loading = false;
            vm.validateResponse(result, 'getPremium');
        }
        function infoPerson() {
            vm.policy.listTvcAddBaseVM.push(vm.tvcAddBaseVM);
            vm.tvcAddBaseVM = {};
            console.log(vm.policy);
        }

//      function savePolicy(type) {		// TH để lưu tạm
        function savePolicy() {
//      	if (type == "0"){
//      		vm.policy.statusPolicy = "80"; // dang soan
//      	} else {
//      		vm.policy.statusPolicy = "90"; // cho thanh toan
//      	}
        	
            vm.loading = true;
            vm.policy.propserName = vm.policy.contactName;
            vm.policy.propserNgaysinh = vm.policy.contactDob;
            vm.policy.propserCellphone  = vm.policy.contactPhone;
            vm.policy.tvcPackage = vm.policy.travelWithId;
            vm.policy.receiverMoible =  vm.policy.receiverUser.mobile;
            
            // call base
            vm.savePolicyBase("TVC", vm.policy);
        }

        function addOrRemovePerson() {
            if(vm.policy.soNguoiThamGia> vm.policy.listTvcAddBaseVM.length) {
                addNewPerson();
            } else if(vm.policy.soNguoiThamGia< vm.policy.listTvcAddBaseVM.length) {
                removePerson();
            }
        }

        function addNewPerson() {
            var lineAdd = vm.policy.soNguoiThamGia- vm.policy.listTvcAddBaseVM.length;
            for (var i=0; i < lineAdd; i++) {
                vm.policy.listTvcAddBaseVM.push({
                    "dob": "",
                    "insuredName": "",
                    "idPasswport": null,
                    "relationship" : "",
            });
            }
        };

        function removePerson() {
            vm.policy.listTvcAddBaseVM.splice(vm.policy.soNguoiThamGia, vm.policy.listTvcAddBaseVM.length)
        };
        // function checkNycbhcdc(idx) {
        //     if(idx == true){
        //         var personObj = {};
        //         personObj.dob = vm.contactDob;
        //         personObj.idPasswport ="";
        //         personObj.insuredName = vm.contactName;
        //         personObj.relationship = "30";
        //         vm.policy.listTvcAddBaseVM.push(personObj);
        //     }else{
        //         for (var i= 0; i< vm.policy.listTvcAddBaseVM.length; i++){
        //             if(vm.policy.listTvcAddBaseVM[i].insuredName == vm.contactName){
        //                 vm.policy.listTvcAddBaseVM.splice(i);
        //             }
        //         }
        //     }
        //
        // }
    }
})();
