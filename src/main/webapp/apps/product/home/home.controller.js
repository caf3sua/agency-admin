(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductHomeController', ProductHomeController);

    ProductHomeController.$inject = ['$scope', '$stateParams', '$controller', 'Principal', '$state'
    	, 'ProductCommonService', 'DateUtils', '$timeout'];

    function ProductHomeController ($scope, $stateParams, $controller, Principal, $state
    		, ProductCommonService, DateUtils, $timeout) {
    	var vm = this;
    	vm.lineId = 'HOM';
    	
        vm.changeYear = changeYear;

    	// Init controller
  		(function initController() {
  			// instantiate base controller
  		    $controller('ProductBaseController', { vm: vm, $scope: $scope });
  		})();
  		
  		// Properties & function declare
  		vm.policy = {
  				"bankId": "0",
  				"baovietCompanyId": "",
  				"baovietCompanyName": " ",
  				"bars": "0",
  				"byNight": "",
//  				"contactCode": "DUC001",
  				"expiredDate": "",
  				"gycbhNumber": "",
  				"inceptionDate": "",
  				"insuranceAddress": "",
  				"insuranceName": "",
  				"insuredLocation": "",
  				"invoceNumber": "",
  				"loaiHinh": "0",
  				"policyNumber": "",
  				"premiumDiscount": 0,
  				"premiumHome": 0,
  				"premiumNet": 0,
  				"premiumsi": 0,
  				"premiumsiin": 0,
  				"receiveMethod": "1",
  				"si": "",
  				"siPremium": 0,
  				"siin": "",
  				"siinPremium": 0,
  				"totalUsedArea": "",
  				"userAgent": "",
  				"windowLocks": "0",
  				"yearBuildCode": "1",
  				"invoiceInfo": {  
  	            	"accountNo":"",
  					"address":"",
  					"check":"0",
  					"company":"",
  					"name":"",
  					"taxNo":""
  		        }
  				};
  		
  		vm.getPremium = getPremium;
  		vm.savePolicy = savePolicy;
  		vm.changeToDate = changeToDate;
  		vm.siValidator = siValidator;
  		
  		angular.element(document).ready(function () {
        });
  		
  		// Initialize
  		init();
  		
  		// Function
  		function init() {
            var startDate = new Date();
            // add a day
            startDate.setDate(startDate.getDate() + 1);
            vm.policy.inceptionDate = DateUtils.convertDate(startDate);
            var endDate = new Date();
            // add a day
            endDate.setFullYear(endDate.getFullYear() + 1);
            vm.policy.expiredDate = DateUtils.convertDate(endDate);
            vm.registerDisableContactInfoValue('vm.policy.premiumHome');

            // Edit
            if (vm.isEditMode()) {
            	vm.loading = true;
            	// Load policy
            	$state.current.data.title = 'PRODUCT_HOME_EDIT';
            	
            	ProductCommonService.getById({id : $stateParams.id}).$promise.then(function(result) {
            		// Format to display and calculate premium again
            		formatEditData(result);

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
            	$state.current.data.title = 'PRODUCT_HOME';
            	
            	ProductCommonService.getById({id : $stateParams.id}).$promise.then(function(result) {
            		// Format to display and calculate premium again
            		formatEditData(result);
            		
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
  			result.si = Number(result.si);
    		result.totalUsedArea = Number(result.totalUsedArea);
    		result.premiumHome = "0";
  		}
  		
  		function formatAddressEdit() {
  			// Address at step 2
  			var receiverAddress = vm.policy.receiverUser.address;
  			vm.policy.receiverUser.address = vm.formatAddressEdit(receiverAddress);
  			vm.getAddressByPostCode(receiverAddress).then(function (data) {
  				vm.policy.receiverUser.addressDistrictData = data;
    		});
  			
  			// extra
  			var insuranceAddress = vm.policy.insuranceAddress;
  			var insuredLocation = vm.policy.insuredLocation;
  			
    		vm.policy.insuranceAddress = vm.formatAddressEdit(insuranceAddress);
    		vm.policy.insuredLocation = vm.formatAddressEdit(insuredLocation);
    		
    		vm.getAddressByPostCode(insuranceAddress).then(function (data) {
    			vm.policy.insuranceAddressDistrict = data;
    		});
    		vm.getAddressByPostCode(insuredLocation).then(function (data) {
    			vm.policy.insuredLocationDistrict = data;
    		});
  		}
  		
  		function getPremium() {
        	// clean error message
        	vm.cleanAllResponseError();
        	
            vm.loading = true;
            ProductCommonService.getHomePremium(vm.policy, onGetPremiumSuccess, onGetPremiumError);
  			
  			function onGetPremiumSuccess(data, headers) {
                vm.loading = false;
  				vm.policy.si = data.si;
  				vm.policy.siin = data.siin;
  				vm.policy.premiumsi = data.premiumsi;
  				vm.policy.premiumsiin = data.premiumsiin;
  				vm.policy.premiumNet = data.premiumNet;
  				vm.policy.premiumHome = data.premiumHome;
  				vm.policy.premiumDiscount = data.premiumDiscount;
  				vm.policy.yearBuildCode = data.yearBuildCode;

                vm.clearResponseError();
            }
            function onGetPremiumError(error) {
                vm.loading = false;
                console.log(error.data.message);
                vm.policy.premiumHome = 0;
            	vm.policy.premiumNet = 0;
            	vm.policy.premiumSi= 0;
            	vm.policy.premiumSiin= 0;
                vm.validateResponse(error, 'getPremium');
            }
  		}
  		
//      function savePolicy(type) {		// TH để lưu tạm
  		function savePolicy() {
//      	if (type == "0"){
//      		vm.policy.statusPolicy = "80"; // dang soan
//      	} else {
//      		vm.policy.statusPolicy = "90"; // cho thanh toan
//      	}
  			
  			// Process address
  			vm.policy.insuranceAddress = vm.policy.insuranceAddress 
  				+ "::" + vm.policy.insuranceAddressDistrict.pkDistrict + "::" + vm.policy.insuranceAddressDistrict.pkPostcode;
  			vm.policy.insuredLocation = vm.policy.insuredLocation 
				+ "::" + vm.policy.insuredLocationDistrict.pkDistrict + "::" + vm.policy.insuredLocationDistrict.pkPostcode;

  			// call base
  			vm.savePolicyBase("HOM", vm.policy);
  		}
  		
  		function changeToDate() {
  			var toDate = vm.calculateToDate(vm.policy.inceptionDate);
  			vm.policy.expiredDate = toDate;
  		}
  		
  		
  		function siValidator(siStr) {
            if(!siStr){return;}

            if (siStr < 300000000 || siStr > 5000000000) {
                return "Bảo Việt chỉ bảo hiểm cho phần ngôi nhà trong giới hạn từ 300 triệu đồng đến 5 tỷ đồng";
            }
            return true;
        };
  		function changeYear() {
            if(vm.policy.si != ""){
                getPremium();
            }
        }
    }
})();
