(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductMotoController', ProductMotoController);

    ProductMotoController.$inject = ['$scope', '$controller', 'DateUtils', 'ProductCommonService', '$state'
    	, '$rootScope', '$stateParams'];

    function ProductMotoController ($scope, $controller, DateUtils, ProductCommonService, $state
    		, $rootScope, $stateParams) {
    	var vm = this;
    	vm.lineId = 'MOT';
    	
        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			// instantiate base controller
  		    $controller('ProductBaseController', { vm: vm, $scope: $scope });
  		})();
  		
  		// Properties & function declare
//  		vm.product = {
//            "chaynoCheck": false,
//            "chaynoPhi": 0,
//            "chaynoStbh": "",
//            "nntxCheck": false,
//            "nntxPhi": 0,
//            "nntxSoNguoi": "",
//            "nntxStbh": "",
//            "tndsbbCheck": false,
//            "tndsbbPhi": 0,
//            "tndstnCheck": false,
//            "tndstnPhi": 0,
//            "tndstnSotien": "",
//            "tongPhi": 0,
//            "typeOfMoto": ""
//        }

        vm.policy = {
			// premium
			"typeOfMoto": "",
			"chaynoCheck": false,
            "chaynoPhi": 0,
            "chaynoStbh": "",
            "nntxCheck": false,
            "nntxPhi": 0,
            "nntxSoNguoi": "",
            "nntxStbh": "",
            "tndsbbCheck": false,
            "tndsbbPhi": 0,
            "tndstnCheck": false,
            "tndstnPhi": 0,
            "tndstnSotien": "",
			//create
            "hieuxe":"",
            "insuredAddress":"",
            "insuredName":"",
            "receiveMethod":"1",
            "registrationNumber":"",
            "sokhung":"",
            "somay":"",
            "thoihanden":"",
            "thoihantu":"",
            "tongPhi":0,
            "invoiceInfo": {  
              	"accountNo":"",
  				"address":"",
  				"check":"0",
  				"company":"",
  				"name":"",
  				"taxNo":""
  	        }
        }

        vm.processComboResult = processComboResult;
        vm.checkedChange = checkedChange;
        vm.getPremium = getPremium;
        vm.savePolicy = savePolicy;
        vm.validatorNntxSoNguoi = validatorNntxSoNguoi;
        vm.validatorNntxStbh = validatorNntxStbh;
        vm.validatorChaynoStbh = validatorChaynoStbh;
        vm.validatorCombo = validatorCombo;
        vm.onThoihanChange = onThoihanChange;
        vm.siValidator = siValidator;
        vm.typeOfMotoOptions = [
            {id: '2', name: 'Xe Mô tô 2 bánh dung tích trên 50cc'},
            {id: '1', name: 'Xe Mô tô 2 bánh dung tích từ 50cc trở xuống'}
        ];
        vm.tndstnSoTienOptions = [
            {id: '50000000', name: '50trđ/người/vụ về người - 50trđ/vụ về tài sản'},
            {id: '100000000', name: '100trđ/người/vụ về người - 100trđ/vụ về tài sản'},
        ];

        vm.isShowTndsbbPhi = false;
        vm.isShowTndstnPhi = false;
        vm.isShowNntxPhi = false;
        vm.isShowChaynoPhi = false;
        vm.isShowPremium = false;
        vm.isShowTotalPremium = false;

        // Initialize
        init();

        // Function
        function init() {
        	var startDate = new Date();
            // add a day
            startDate.setDate(startDate.getDate() + 1);
            vm.policy.thoihantu = DateUtils.convertDate(startDate);

            var endDate = moment(vm.policy.thoihantu, "DD/MM/YYYY").add(1, 'years').add(-1, 'days').format("DD/MM/YYYY");
        	vm.policy.thoihanden = endDate;

        	// Register disable 
            vm.registerDisableContactInfoValue('vm.policy.tongPhi');
            
            // Edit
            if (vm.isEditMode()) {
            	vm.loading = true;
            	// Load policy
            	$state.current.data.title = 'PRODUCT_MOTO_EDIT';
            	
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
            	$state.current.data.title = 'PRODUCT_MOTO';
            	
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
        	result.tndstnSotien = result.tndstnSotien.toString();
  		}
        
        function onThoihanChange() {
        	var endDate = moment(vm.policy.thoihantu, "DD/MM/YYYY").add(1, 'years').add(-1, 'days').format("DD/MM/YYYY");
            // add a day
        	vm.policy.thoihanden = endDate;
        }
        
        function formatAddressEdit() {
  			// Address at step 2
  			var receiverAddress = vm.policy.receiverUser.address;
  			vm.policy.receiverUser.address = vm.formatAddressEdit(receiverAddress);
  			vm.getAddressByPostCode(receiverAddress).then(function (data) {
  				vm.policy.receiverUser.addressDistrictData = data;
    		});
  			
  			// extra
  			var insuredAddress = vm.policy.insuredAddress;
    		vm.policy.insuredAddress = vm.formatAddressEdit(insuredAddress);
    		vm.getAddressByPostCode(insuredAddress).then(function (data) {
    			vm.policy.insuredAddressDistrict = data;
    		});
  		}
        
        function checkedChange() {
            if((!vm.policy.tndsbbCheck && !vm.policy.tndstnCheck && !vm.policy.vcxCheck)) {
                vm.policy.nntxCheck = false;
            }
            getPremium();
        }

        function processComboResult(data, type) {
            console.log(data);
            switch(type){
                case 'moto-type':
                    vm.policy.tndsbbCheck = true;
                case 'moto-tndstn-sotien':
                    getPremium();
                    break;
            }
        }

        function getPremium() {
        	// clean error message
        	vm.cleanAllResponseError();
        	
            vm.loading = true;
            var postData = getPostData(false);
            ProductCommonService.getMotoPremium(postData, onGetPremiumSuccess, onGetPremiumError);
        }

        function getPostData(isCreate) {
            var postData = Object.assign({}, vm.policy);

            if(postData.chaynoCheck == false) {
                postData.chaynoStbh = 0;
                postData.chaynoCheck = false;
                postData.chaynoPhi = 0;
            }

            if(postData.nntxCheck == false) {
                postData.nntxSoNguoi = 0;
                postData.nntxCheck = false;
                postData.nntxStbh = 0;
                postData.nntxPhi = 0;
            }

            if(postData.tndstnCheck == false) {
                postData.tndstnSotien = 0;
                postData.tndstnCheck = false;
                postData.tndstnPhi = 0;
            }

            // Remove unuse
            if(!isCreate) {
                delete postData.receiveMethod;
            }

            return postData;
        }

        function onGetPremiumSuccess(result) {
            vm.loading = false;
            if(vm.policy.tndsbbCheck) {
                vm.isShowTndsbbPhi = true;
                vm.policy.tndsbbPhi = result.tndsbbPhi;
                vm.isShowPremium = true;
                vm.isShowTotalPremium = true;
                vm.policy.tongPhi = result.tongPhi;
            }
            if(vm.policy.tndstnCheck && vm.policy.tndstnSotien) {
                vm.isShowTndstnPhi = true;
                vm.policy.tndstnPhi = result.tndstnPhi;
            }
            if(vm.policy.tndstnCheck == false) {
                vm.isShowTndstnPhi = false;
                vm.policy.tndstnPhi = 0;
            }
            if(vm.policy.nntxCheck) {
                vm.isShowNntxPhi = true;
                vm.policy.nntxPhi = result.nntxPhi;
            }
            if(vm.policy.nntxCheck == false) {
                vm.isShowNntxPhi = false;
                vm.policy.nntxPhi = 0;
            }
            if(vm.policy.chaynoCheck && vm.policy.chaynoStbh) {
                vm.isShowChaynoPhi = true;
                vm.policy.chaynoPhi = result.chaynoPhi;
            }
            if(vm.policy.chaynoCheck == false) {
                vm.isShowChaynoPhi = false;
                vm.policy.chaynoPhi = 0;
            }

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
        	
        	vm.policy.insuredAddress = vm.policy.insuredAddress
				+ "::" + vm.policy.insuredAddressDistrict.pkDistrict + "::" + vm.policy.insuredAddressDistrict.pkPostcode;
        	
            var postData = getPostData(true);
            vm.policy.chaynoCheck = postData.chaynoCheck;
            vm.policy.chaynoPhi = postData.chaynoPhi;
            vm.policy.chaynoStbh = postData.chaynoStbh;
            vm.policy.nntxCheck = postData.nntxCheck;
            vm.policy.nntxSoNguoi = postData.nntxSoNguoi;
            vm.policy.nntxStbh = postData.nntxStbh;
            vm.policy.premium = postData.premium;
            vm.policy.tndsBbPhi = postData.tndsbbPhi;
            vm.policy.tndsTnNntxPhi = postData.nntxPhi;
            vm.policy.tndsTnPhi = postData.tndstnPhi;
            vm.policy.tndsTnSotien = postData.tndstnSotien;
            vm.policy.tndsbbCheck = postData.tndsbbCheck;
            vm.policy.tongPhi = postData.tongPhi;
            vm.policy.typeOfMotoId = postData.typeOfMoto;
            
            // call base
            vm.savePolicyBase("MOT", vm.policy);
        }

        function validatorNntxSoNguoi() {
        	if(!vm.policy.nntxCheck) {
        		return true;
        	}
        	if(!vm.policy.nntxSoNguoi) {
        		return "Chưa chọn số người tham gia bảo hiểm!";
        	}
            return true;
        }
        
        function validatorNntxStbh() {
        	if(!vm.policy.nntxCheck) {
        		return true;
        	}
        	if(!vm.policy.nntxStbh) {
        		return;
        	}
        	if (vm.policy.nntxStbh < 3000000 || vm.policy.nntxStbh > 500000000) {
                return "Số tiền bảo hiểm người ngồi trên xe tối thiểu từ 3 triệu đồng đến tối đa 500 triệu đồng";
            }
            return true;
        }
        
        function validatorChaynoStbh() {
        	if(!vm.policy.chaynoCheck) {
        		return true;
        	}
        	if(!vm.policy.chaynoStbh) {
        		return "Chưa nhâp số tiền bảo hiểm cháy nổ!";
        	}
            return true;
        }
        
        function siValidator() {
        	if(!vm.policy.chaynoCheck) {
        		return true;
        	}
        	if(!vm.policy.chaynoStbh) {
        		return;
        	}
        	if (vm.policy.chaynoStbh < 10000000 || vm.policy.chaynoStbh > 100000000) {
                return "Số tiền bảo hiểm cháy nổ trong khoảng từ 10 triệu đồng đến tối đa 100 triệu đồng";
            }
            return true;
        };
        
        function validatorCombo(name) {
  			switch(name) {
	  			case "typeOfMoto":
	  	            return true;
	  			case "tndstnSotien":
	  				if(!vm.policy.tndstnCheck) {
	  	        		return true;
	  	        	}
	  	        	if(!vm.policy.tndstnSotien) {
	  	        		return "Cần lựa chọn mức trách nhiệm!";
	  	        	}
	  	            return true;
  			}
        }
    }
})();
