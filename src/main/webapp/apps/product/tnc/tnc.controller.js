(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductTncController', ProductTncController);

    ProductTncController.$inject = ['$scope', '$controller', 'DateUtils', 'ProductCommonService', '$state', '$rootScope', '$stateParams'];

    function ProductTncController ($scope, $controller, DateUtils, ProductCommonService, $state, $rootScope, $stateParams) {
    	var vm = this;
    	vm.lineId = 'TNC';
    	
        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			// instantiate base controller
  		    $controller('ProductBaseController', { vm: vm, $scope: $scope });
  		})();
  		
  		// Properties & function declare
//        vm.product = {
//            "insurancestartdate":"18/05/2018",
//            "numbermonth": 0,
//            "numberperson": "",
//            "premiumPackage": "",
//            "premiumdiscount": 0,
//            "premiumnet": 0,
//            "premiumtnc": 0
//        }

        vm.policy = {
            "insuranceexpireddate":"",
            "insurancestartdate":"",
            "listTncAdd":[],
            "numbermonth":12,
            "numberperson": "",
            "premiumPackage":"",
            "premiumPackageplanid":2,
            "premiumdiscount":0,
            "premiumnet":0,
            "premiumtnc":0,
            "receiveMethod":"1"
        }

        vm.validatorCombo = validatorCombo;
        vm.addOrRemovePerson = addOrRemovePerson;
        vm.processComboResult = processComboResult;
        vm.getPremium = getPremium;
        vm.savePolicy = savePolicy;
        vm.premiumPackageOptions = [
            {id: '20000000', name: '20.000.000 VND'},
            {id: '30000000', name: '30.000.000 VND'},
            {id: '40000000', name: '40.000.000 VND'},
            {id: '50000000', name: '50.000.000 VND'},
            {id: '60000000', name: '60.000.000 VND'},
            {id: '70000000', name: '70.000.000 VND'},
            {id: '80000000', name: '80.000.000 VND'},
            {id: '90000000', name: '90.000.000 VND'},
            {id: '100000000', name: '100.000.000 VND'}
        ];

        vm.isShowPremium = false;
        vm.isShowTotalPremium = false;
        vm.ngYcbhDicung = true;
        vm.changeNgYcbhDicung = changeNgYcbhDicung;
        
        // Initialize
        init();

        // Function
        function init() {
            // add a day
            vm.policy.insurancestartdate = moment().add(1, 'days').format("DD/MM/YYYY");
            // add a day
            vm.policy.insuranceexpireddate = moment(vm.policy.insurancestartdate, "DD/MM/YYYY").add(1, 'years').add(-1, 'days').format("DD/MM/YYYY");

            // Register disable 
            vm.registerDisableContactInfoValue('vm.policy.premiumtnc');
            
            // Edit
            if (vm.isEditMode()) {
            	vm.loading = true;
            	// Load policy
            	$state.current.data.title = "PRODUCT_TNC_EDIT";
            	
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
            	$state.current.data.title = "PRODUCT_TNC";
            	
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
            
        }
        
        function formatEditData(result) {
        	result.premiumPackage = result.premiumPackage.toString();
        	result.premiumdiscount = 0;
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
        
        function changeNgYcbhDicung() {
        	if (vm.ngYcbhDicung) {
        		vm.policy.listTncAdd[0].insuredName = vm.policy.contactName;
        		vm.policy.listTncAdd[0].idPasswport = vm.policy.contactIdNumber;
        		vm.policy.listTncAdd[0].dob = vm.policy.contactDob;
        	} else {
        		vm.policy.listTncAdd[0] = {};
        	}
        }
        
        function addOrRemovePerson() {
            if(vm.policy.numberperson > vm.policy.listTncAdd.length) {
                addNewPerson();
            } else if(vm.policy.numberperson < vm.policy.listTncAdd.length) {
                removePerson();
            }
            getPremium();
        }

        function addNewPerson() {
            var lineAdd = vm.policy.numberperson - vm.policy.listTncAdd.length;
            for (var i=0; i < lineAdd; i++) {
                vm.policy.listTncAdd.push({
                    "dob":"",
                    "idPasswport":"",
                    "insuredName":"",
                    "title":""
                });
            }
        };

        function removePerson() {
            vm.policy.listTncAdd.splice(vm.policy.numberperson, vm.policy.listTncAdd.length)
        };

        function processComboResult(data, type) {
            console.log(data);
            switch(type){
                case 'tnc-money':
                    getPremium();
                    break;
            }
        }

        function getPremium() {
        	// clean error message
        	vm.cleanAllResponseError();
        	
        	var endDate = moment(vm.policy.insurancestartdate, "DD/MM/YYYY").add(1, 'years').add(-1, 'days').format("DD/MM/YYYY");
            // add a day
        	vm.policy.insuranceexpireddate = endDate;
        	vm.policy.numbermonth = DateUtils.monthDiff(vm.policy.insurancestartdate, vm.policy.insuranceexpireddate);
        	
            if(vm.policy.numberperson > 0 && vm.policy.premiumPackage > 0) {
                vm.loading = true;
                ProductCommonService.getTncPremium(vm.policy, onGetPremiumSuccess, onGetPremiumError);
            } else {
                vm.policy.premiumnet = 0;
                vm.policy.premiumtnc = 0;
                vm.policy.premiumAverage = 0;
            }
        }

        function onGetPremiumSuccess(result) {
            vm.loading = false;
            if(vm.policy.numberperson > 0) {
            	vm.policy.premiumnet = result.premiumnet;
                vm.policy.premiumtnc = result.premiumtnc;
                vm.isShowPremium = true;
                vm.isShowTotalPremium = true;
            } else {
            	vm.policy.premiumnet = 0;
                vm.policy.premiumtnc = 0;
                vm.isShowPremium = false;
                vm.isShowTotalPremium = false;
            }
            vm.policy.premiumAverage = vm.policy.premiumtnc / vm.policy.numberperson;
            vm.clearResponseError();
        }

        function onGetPremiumError(result) {
            vm.loading = false;
            vm.validateResponse(result, 'getPremium');
        }

//      function savePolicy(type) {		// TH để lưu tạm
        function savePolicy() {
//      	if (type == "0"){
//      		vm.policy.statusPolicy = "80"; // dang soan
//      	} else {
//      		vm.policy.statusPolicy = "90"; // cho thanh toan
//      	}
        	
            // call base
            vm.savePolicyBase("TNC", vm.policy);
        }

        function validatorCombo(name) {
        	switch(name) {
  			case "premiumPackage":
  	            return true;
			}
        }
    }
})();
