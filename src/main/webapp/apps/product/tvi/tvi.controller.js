(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductTviController', ProductTviController);

    ProductTviController.$inject = ['$scope', '$controller', 'Principal', '$state', '$rootScope', 'ProductCommonService'
    	, '$stateParams', 'DateUtils'];

    function ProductTviController ($scope, $controller, Principal, $state, $rootScope, ProductCommonService
    		, $stateParams, DateUtils) {
        var vm = this;
        vm.lineId = 'TVI';
        
        vm.policy = {
            bankId: "",
            changePremium: 0,
            contactCode: "",
            dateOfPayment: "",
            departureId: "",
            destinationId: "1",
            expiredDate: "",
            feeReceive: 0,
            gycbhNumber: "",
            inceptionDate: "",
            invoiceInfo: {},
            listTviAdd: [
		        ],
            netPremium: 0,
            paymentMethod: "",
            planId: "1",
            policyNumber: "",
            premium: 0,
            propserAddress: "",
            propserCellphone: "",
            propserCmt: "",
            propserEmail: "",
            propserHomephone: "",
            propserId: "",
            propserName: "",
            propserNgaysinh: "",
            propserProvince: "",
            propserTitle: "",
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
            soGycbh: "",
            statusPolicyId: "",
            teamId: "",
            travelWithId: "",
            tviPackage: "",
            userAgent: ""
        };

        vm.getPremium = getPremium;
        vm.onchangePlan = onchangePlan;
        vm.infoPerson = infoPerson;
        vm.onchangeReceiveMethod = false;
        vm.savePolicy = savePolicy;
        vm.showChangePremium = showChangePremium;
        vm.addOrRemovePerson =addOrRemovePerson
        vm.addNewPerson = addNewPerson;
        vm.removePerson = removePerson;
        vm.isShowChangePremium = false;
        vm.onchangeTravel = onchangeTravel;
        vm.isShowChangeTravel = false;
        vm.ngYcbhDicung = true;
        vm.changeNgYcbhDicung = changeNgYcbhDicung;
        
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
            	$state.current.data.title = 'PRODUCT_TVI_EDIT';
            	
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
            	$state.current.data.title = 'PRODUCT_TVI';
            	
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
        
        function changeNgYcbhDicung() {
        	if (vm.ngYcbhDicung) {
        		vm.policy.listTviAdd[0].insuredName = vm.policy.contactName;
        		vm.policy.listTviAdd[0].idPasswport = vm.policy.contactIdNumber;
        		vm.policy.listTviAdd[0].dob = vm.policy.contactDob;
        		vm.policy.listTviAdd[0].relationshipId = "30"; // Ban than
        	} else {
        		vm.policy.listTviAdd[0] = {};
        	}
        }
        
        function formatAddressEdit() {
  			// Address at step 2
  			var receiverAddress = vm.policy.receiverUser.address;
  			vm.policy.receiverUser.address = vm.formatAddressEdit(receiverAddress);
  			vm.getAddressByPostCode(receiverAddress).then(function (data) {
  				vm.policy.receiverUser.addressDistrictData = data;
    		});
  			
  			// extra
  		}
        
        function formatEditData(result) {
        	result.numberOfPerson = result.listTviAdd.length;
        	angular.forEach(result.listTviAdd, function(data) {
        		data.relationshipId = data.relationship;
        	});
  		}
        
        function showChangePremium() {
            if(vm.policy.destinationId != "") {
                return true;
            } else {
                return false;
            }
        }
        // Properties & function declare

        // Function
        
        function onchangeTravel() {
            if (vm.policy.travelWithId == '1'){
            	vm.policy.numberOfPerson = 1;
            	addOrRemovePerson();
            	vm.isShowChangeTravel = true;
            } else{
            	vm.policy.numberOfPerson = 2;
            	addOrRemovePerson();
            	vm.isShowChangeTravel = false;
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
            getPremium();
        }
        
        function getPremium() {
        	// clean error message
        	vm.cleanAllResponseError();
        	
            vm.loading = true;
            
            vm.policy.destination =  vm.policy.destinationId;
            vm.policy.premiumNet  =  0;
            vm.policy.premiumPackage  =  vm.policy.travelWithId;
            vm.policy.premiumTvi  = 0;
            vm.policy.premiumDiscount = 0;

            if(vm.policy.premiumPercentDiscount > 0 ){
                vm.policy.premiumPercentDiscount = vm.policy.premiumPercentDiscount;
            }else{
                vm.policy.premiumPercentDiscount  = 0;
            }
            vm.policy.numberOfDay = 0;
            ProductCommonService.getTviPremium(vm.policy, onGetPremiumSuccess, onGetPremiumError);
        }
        function onGetPremiumSuccess(result) {
            vm.loading = false;
            vm.policy.premium  = result.premiumTvi;
            vm.policy.netPremium   = result.premiumNet;
            vm.policy.changePremium  = result.premiumPercentDiscount;
            if(result.premiumDiscount > 0){
                vm.isShowChangePremium = true;
                vm.sumPremiumDiscount =   result.premiumDiscount ;
            }
            vm.clearResponseError();
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
            vm.policy.tvcPackage = vm.policy.travelWithId;
            vm.policy.receiverMoible =  vm.policy.receiverUser.mobile;
            vm.policy.chaynoStbh = 0;
            
            // call base
            vm.savePolicyBase("TVI", vm.policy);
        }

        function addOrRemovePerson() {
            if(vm.policy.numberOfPerson> vm.policy.listTviAdd.length) {
                addNewPerson();
            } else if(vm.policy.numberOfPerson< vm.policy.listTviAdd.length) {
                removePerson();
            }
        }

        function addNewPerson() {
            var lineAdd = vm.policy.numberOfPerson- vm.policy.listTviAdd.length;
            for (var i=0; i < lineAdd; i++) {
                vm.policy.listTviAdd.push({
                    "address": "",
                    "cellPhone": "",
                    "city": "",
                    "dayTreatment": "",
                    "detailTreatment": "",
                    "diagnose": "",
                    "dob": "",
                    "emailAdress": "",
                    "homePhone": "",
                    "idPasswport": "",
                    "insuredName": "",
                    "nameDoctor": "",
                    "relationship": "",
                    "relationshipId": "",
                    "relationshipName": "",
                    "resultTreatment": "",
                    "title": "",
                    "travaelcareId": "",
                    "tviAddId": "",
                    "tviCareId": ""
                });
            }
        };

        function removePerson() {
            vm.policy.listTviAdd.splice(vm.policy.numberOfPerson, vm.policy.listTviAdd.length)
        };
    }
})();
