(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductBvpController', ProductBvpController);

    ProductBvpController.$inject = ['$rootScope', '$scope', '$controller', 'DateUtils', 'ProductCommonService'
    	, '$state', '$stateParams', 'ContactService', 'ResponseValidateService'];

    function ProductBvpController ($rootScope, $scope, $controller, DateUtils, ProductCommonService
    		, $state, $stateParams, ContactService, ResponseValidateService) {
    	var vm = this;
    	vm.lineId = 'BVP';
    	
        vm.tvc ={
        };
        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			// instantiate base controller
  		    $controller('ProductBaseController', { vm: vm, $scope: $scope });
  		})();
  		
  		// Properties & function declare
        vm.policy = {
        		// check sp BVP
        		"lineId": "BVP",
  				// premium
  				"chuongTrinh": "",
  				"ngaySinh": "",
  				"tuoi": 0,
  				"ngoaitruChk": false,
  				"tncnChk": false,
  				"tncnSi": "",
  				"smcnChk": false,
  				"smcnSi": "",
  				"smcnPhi": 0,
  				"nhakhoaChk": false,
  				"thaisanChk": false,
  				"thoihanbhTu": "",
  				"thoihanbhDen": "",
  				"qlChinhPhi": 0,
  				"phiBH": 0,
  				"premiumNet": 0,
  				"premiumDiscount": 0,
  				"pagencyRole": "1",
  				
  				// create policy
    		"chuongtrinhBh": "0",
    		"chuongtrinhPhi": 0,
    		"discount": 0,
    		"expiredDate": "",
    		"files":"",
    		"hasExtracare": false,
    		"hasNguoinhantien": false,
    		"hasNguoithuhuong": false,
    		"inceptionDate": "",
    		"lstAdd": [
	    		{
		    		"benhvienorbacsy": "",
		    		"chitietdieutri": "",
		    		"chuandoan": "",
		    		"ketqua": "",
		    		"ngaydieutri": ""
	    		},
	    		{
		    		"benhvienorbacsy": "",
		    		"chitietdieutri": "",
		    		"chuandoan": "",
		    		"ketqua": "",
		    		"ngaydieutri": ""
	    		},
	    		{
		    		"benhvienorbacsy": "",
		    		"chitietdieutri": "",
		    		"chuandoan": "",
		    		"ketqua": "",
		    		"ngaydieutri": ""
	    		}
    		],
    		"ngoaitru": "1",
    		"ngoaitruPhi": 0,
    		"nguoidbhCmnd": "",
    		"nguoidbhName": "",
    		"nguoidbhNgaysinh": "",
    		"nguoidbhQuanhe": "",
    		"nguoidbhGioitinh": "",		// add 08/03/2019
    		"nguoidbhDiachi": "",		// add 08/03/2019
    		"nguoidbhDienthoai": "",	// add 08/03/2019
    		"nguoidbhEmail": "",		// add 08/03/2019
    		"nguoinhanCmnd": "",
    		"nguoinhanName": "",
    		"nguoinhanQuanhe": "",
    		"nguointNgaysinh": "",
    		"nguointDienthoai": "",	// add 08/03/2019
    		"nguointDiachi": "",	// add 08/03/2019
    		"nguointEmail": "",		// add 08/03/2019
    		"nguoithCmnd": "",
    		"nguoithName": "",
    		"nguoithNgaysinh": "",
    		"nguoithQuanhe": "",
    		"nguoithDienthoai": "",	// add 08/03/2019
    		"nguoithDiachi": "",	// add 08/03/2019
    		"nguoithEmail": "",	// add 08/03/2019
    		"nguoiycName": "",
    		"nguoiycNgaysinh": "",
    		"nguoiycCmnd": "",	// add 06/03/2019
    		"nhakhoa": "0",
    		"nhakhoaPhi": 0,
    		"policyNumber": "",
    		"policyParent": "",
    		"q1": "",
    		"q2": "",
    		"q3": "",
    		"receiveMethod": "",
    		"sinhmang": "1",
    		"sinhmangPhi": 0,
    		"sinhmangPhiSi": 0,
    		"sinhmangSotienbh": 0,
    		"tanggiamPhi": 0,
    		"tanggiamPhiNoidung": "",
    		"thaisan": "0",
    		"thaisanPhi": 0,
    		"tncn": "0",
    		"tncnPhi": 0,
    		"tncnPhiSi": 0,
    		"tncnSotienbh": 0,
	        "invoiceInfo": {  
              	"accountNo":"",
  				"address":"",
  				"addressDistrict":"",
  				"check":"0",
  				"company":"",
  				"name":"",
  				"taxNo":""
  	        },
	        "insuranceTarget": "New",
	        "imgGks": {
	            "attachmentId": "",
	            "content": "",
	            "fileType": "",
	            "filename": ""
	          }
		}
  		
  		$rootScope.nguoidbh = {
			"cmnd" : "", 
			"quanhe" : ""
		}
  		
  		$rootScope.nguoith = {
			"cmnd" : "", 
			"quanhe" : ""
		}
        
        $rootScope.nguoint = {
    			"cmnd" : "", 
    			"quanhe" : ""
    		}

  		vm.onDobChange = onDobChange;
        vm.isHealthyPersonChange = isHealthyPersonChange;
  		vm.openSearchContactForPanel = openSearchContactForPanel;
        vm.processComboResult = processComboResult;
        vm.getPremium = getPremium;
        vm.savePolicy = savePolicy;
        vm.validatorCombo = validatorCombo;
        vm.onThoihanChange = onThoihanChange;
        vm.changeCopyFromNth = changeCopyFromNth;
        vm.changeCopyFromNdbh = changeCopyFromNdbh;
//        vm.changeCopyFromNdbhtoNth = changeCopyFromNdbhtoNth;
        vm.checkGycbh = checkGycbh;
        vm.checkGycbhParent = checkGycbhParent;
//        vm.validatorTTKB = validatorTTKB;
        vm.checkCMT = checkCMT;
        vm.checkBanthan = checkBanthan;
        
        vm.checkThaiSanNhaKhoa = checkThaiSanNhaKhoa;
        
        vm.checkAgeNDBH = false;
        vm.gksFile = null;
        vm.gksFileModel;
        
        vm.lstAdd = [
    		{
	    		"benhvienorbacsy": "",
	    		"chitietdieutri": "",
	    		"chuandoan": "",
	    		"ketqua": "",
	    		"ngaydieutri": ""
    		},
    		{
	    		"benhvienorbacsy": "",
	    		"chitietdieutri": "",
	    		"chuandoan": "",
	    		"ketqua": "",
	    		"ngaydieutri": ""
    		},
    		{
	    		"benhvienorbacsy": "",
	    		"chitietdieutri": "",
	    		"chuandoan": "",
	    		"ketqua": "",
	    		"ngaydieutri": ""
    		}
		];
        
        vm.insuranceTypeOptions = [
            {id: '1', name: 'Đồng'},
            {id: '2', name: 'Bạc'},
            {id: '3', name: 'Vàng'},
            {id: '4', name: 'Bạch Kim'},
            {id: '5', name: 'Kim Cương'}
        ];
        vm.siOptions = [
            {id: '50000000', name: '50 triệu'},
            {id: '100000000', name: '100 triệu'},
            {id: '200000000', name: '200 triệu'},
            {id: '300000000', name: '300 triệu'},
            {id: '400000000', name: '400 triệu'},
            {id: '500000000', name: '500 triệu'},
            {id: '600000000', name: '600 triệu'},
            {id: '700000000', name: '700 triệu'},
            {id: '800000000', name: '800 triệu'},
            {id: '900000000', name: '900 triệu'},
            {id: '1000000000', name: '1 tỷ'}
        ];
        vm.relationOptions = [
            {id: '30', name: 'Bản thân'},
            {id: '31', name: 'Vợ/Chồng'},
            {id: '32', name: 'Con'},
            {id: '33', name: 'Bố/Mẹ'},
            {id: '34', name: 'Bố mẹ của Vợ/Chồng'}
        ];
        vm.relationOptions = [
            {id: 'New', name: 'Mới'},
            {id: 'Reuse', name: 'Tái tục'}
        ];

        vm.isShowPersonList = false;
        vm.isShowPremium = false;
        vm.isShowTotalPremium = false;
        vm.isHealthyPerson = false;
        vm.isShowPolicyParent = false;

        // Initialize
        init();

        // Function
        function init() {
            var startDate = new Date();
            // add a day
            startDate.setDate(startDate.getDate() + 1);
            vm.policy.thoihanbhTu = DateUtils.convertDate(startDate);
            vm.policy.inceptionDate = vm.policy.thoihanbhTu;

            var endDate = new Date();
            // add a day
            endDate.setFullYear(endDate.getFullYear() + 1);
            vm.policy.thoihanbhDen = DateUtils.convertDate(endDate);
            vm.policy.expiredDate = vm.policy.thoihanbhDen;

            vm.registerDisableContactInfoValue('vm.policy.phiBH');
            // Edit
            if (vm.isEditMode()) {
            	vm.loading = true;
            	// Load policy
            	$state.current.data.title = 'PRODUCT_BVP_EDIT';
            	
            	ProductCommonService.getById({id : $stateParams.id}).$promise.then(function(result) {
            		// Format to display and calculate premium again
            		formatEditData(result);
            		
            		vm.loading = false;
            		vm.policy = result;
            		$rootScope.nguoint = {
    	        			cmnd : vm.policy.nguoinhanCmnd,
    	        			quanhe: vm.policy.nguoinhanQuanhe
    	        	}
            		if (vm.policy.tuoi < 18){
            			vm.isShowPolicyParent = true;
            			loadFileInEditMode();
            		}
            		
            		// Open view and step - calculate premium again
            		getPremium();
            		vm.nextCount = 2;
            		formatAddressEdit();
                }).catch(function(data, status) {
                	vm.loading = false;
                	vm.showWarningEditPolicy();
    		    });
            }
            
            // copy
            if (vm.isCopyMode()) {
            	vm.loading = true;
            	// Load policy
            	$state.current.data.title = 'PRODUCT_BVP';
            	
            	ProductCommonService.getById({id : $stateParams.id}).$promise.then(function(result) {
            		// Format to display and calculate premium again
            		formatEditData(result);
            		
            		vm.loading = false;
            		vm.policy = result;
            		
            		// copy
            		vm.policy.agreementId = null;
            		vm.policy.gycbhId = null;
            		vm.policy.gycbhNumber =  null;
            		
            		$rootScope.nguoint = {
    	        			cmnd : vm.policy.nguoinhanCmnd,
    	        			quanhe: vm.policy.nguoinhanQuanhe
    	        	}
            		if (vm.policy.tuoi < 18){
            			vm.isShowPolicyParent = true;
            			loadFileInEditMode();
            		}
            		
            		// Open view and step - calculate premium again
            		getPremium();
            		vm.nextCount = 2;
            		formatAddressEdit();
                }).catch(function(data, status) {
                	vm.loading = false;
                	vm.showWarningEditPolicy();
    		    });
            }
            
            // Load contact
  		    selectedContactModeBVP();
        }
        
        function selectedContactModeBVP() {
        	if ($stateParams.selContactId != undefined && $stateParams.selContactId != null) {
        		ContactService.get({id : $stateParams.selContactId}).$promise.then(function(result) {
        			// Store into rootScope
          			$rootScope.selectedContact = result;
          			vm.panelType = 'contact';
          			selectedContactChange();
          			
                }).catch(function(data, status) {
        			console.log('Error get gychbhNumber');
    		    });
        	}
        }
        
        // watch
  		$scope.$watch('vm.gksFileModel', function () {
  			if (vm.gksFileModel != undefined && vm.gksFileModel != null && vm.gksFileModel) {
  				var file = vm.gksFileModel;
            	var fileReader = new FileReader();
            	fileReader.readAsDataURL(file);
            	fileReader.onload = function (e) {
            		var dataUrl = e.target.result;
            	  	var base64Data = dataUrl.substr(dataUrl.indexOf('base64,') + 'base64,'.length);
            	  	vm.gksFile = {
              			"content": base64Data,
              		    "fileType": file.type,
              		    "filename": file.name
              		};
            	};
  				console.log(vm.gksFile);
  			} else {
  				vm.gksFile = null;
  			}
  		});

		function loadFileInEditMode() {
			if (vm.policy.imgGks.content) {
  				let docFile = dataURLtoFile('data:image/*;base64,' + vm.policy.imgGks.content, vm.policy.imgGks.filename);
  				vm.gksFileModel = docFile;
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
        
        function formatEditData(result) {

        	result.pagencyRole = "1";
        	result.chuongTrinh = result.chuongtrinhBh;
        	if (result.ngoaitru == 1){
        		result.ngoaitruChk	= true;
        	} else{
        		result.ngoaitruChk	= false;
        	}
        	if (result.tncn == 1){
        		result.tncnChk	= true;
        	} else{
        		result.tncnChk	= false;
        	}
        	result.tncnSi = result.tncnPhiSi.toString();
        	if (result.sinhmang == 1){
        		result.smcnChk	= true;
        	} else{
        		result.smcnChk	= false;
        	}
        	result.smcnSi = result.sinhmangPhiSi.toString();
        	//result.smcnPhi = result.sinhmangPhi.toString();
        	if (result.nhakhoa == 1){
        		result.nhakhoaChk	= true;
        	} else{
        		result.nhakhoaChk	= false;
        	}
        	if (result.thaisan == 1){
        		result.thaisanChk	= true;
        	} else{
        		result.thaisanChk	= false;
        	}
//        	result.thoihanbhTu = result.inceptionDate;
//        	result.thoihanbhDen = result.expiredDate;
        	var startDate = new Date();
        	var endDate = new Date();
        	// add a day
            startDate.setDate(startDate.getDate() + 1);
            result.thoihanbhTu = DateUtils.convertDate(startDate);
            // add a day
            endDate.setFullYear(endDate.getFullYear() + 1);
            result.thoihanbhDen = DateUtils.convertDate(endDate);
        	
        	result.qlChinhPhi = result.chuongtrinhPhi;
        	result.ngaySinh = result.nguoidbhNgaysinh;
        	
        	var now = new Date();
            var nowStr = DateUtils.convertDate(now);
            result.tuoi = DateUtils.yearDiff(result.ngaySinh, nowStr);
            result.premiumDiscount = result.discount;
            if (result.oldGycbhNumber == null){
  				result.insuranceTarget = "New";	
  			}
            
            $rootScope.nguoith.cmnd = result.nguoithCmnd;
            $rootScope.nguoith.quanhe = result.nguoithQuanhe;
            
            $rootScope.nguoint.cmnd = result.nguoinhanCmnd;
            $rootScope.nguoint.quanhe = result.nguoinhanQuanhe;
            
            $rootScope.nguoidbh.cmnd = result.nguoidbhCmnd;
            $rootScope.nguoidbh.quanhe = result.nguoidbhQuanhe;
            
            vm.registerDisableContactInfoValue('vm.policy.phiBH');
            
  		}
        
        function formatAddressEdit() {
  			// Address at step 2
  			var receiverAddress = vm.policy.receiverUser.address;
  			vm.policy.receiverUser.address = vm.formatAddressEdit(receiverAddress);
  			vm.getAddressByPostCode(receiverAddress).then(function (data) {
  				vm.policy.receiverUser.addressDistrictData = data;
    		});
  			
  			// invoice
  			var invoiceInfoAddress = vm.policy.invoiceInfo.address;
  			if (invoiceInfoAddress != null && invoiceInfoAddress != undefined) {
  				vm.policy.invoiceInfo.address = vm.formatAddressEdit(invoiceInfoAddress);
  	  			vm.getAddressByPostCode(invoiceInfoAddress).then(function (data) {
  	  				vm.policy.invoiceInfo.addressDistrictData = data;
  	    		});
  			}
  			
  			var contactAddress = vm.policy.contactAddress;
    		vm.policy.contactAddress = vm.formatAddressEdit(contactAddress);
    		vm.getAddressByPostCode(contactAddress).then(function (data) {
    			vm.policy.contactAddressDistrictData = data;
    		});
  		}
        
        function onThoihanChange() {
        	var endDate = moment(vm.policy.thoihanbhTu, "DD/MM/YYYY").add(1, 'years').add(-1, 'days').format("DD/MM/YYYY");
            // add a day
        	vm.policy.thoihanbhDen = endDate;
        	vm.policy.inceptionDate = vm.policy.thoihanbhTu;
        	vm.policy.expiredDate = vm.policy.thoihanbhDen;
        }
        
        function checkThaiSanNhaKhoa() {
        	if (vm.policy.thaisanChk){
        		if (vm.policy.tuoi < 18 || vm.policy.tuoi > 45) {
        			vm.policy.thaisanChk = false;
        			toastr.error("Người được BH nằm ngoài độ tuổi tham gia thai sản");
            	} else {
            		getPremium();
            	}	
        	}
        	
        	if (vm.policy.nhakhoaChk){
    			var now = new Date();
                var nowStr = DateUtils.convertDate(now);
                var month = DateUtils.monthDiff(vm.policy.ngaySinh, nowStr);
                if (month < 12){
                	vm.policy.nhakhoaChk = false;
        			toastr.error("Người được BH nằm ngoài độ tuổi tham gia BH nha khoa");	
                } else {
            		getPremium();
            	}	
        	}
        }
        
        // watch
        $scope.$watch('$root.nguoith', function () {
        	vm.policy.nguoithCmnd = $rootScope.nguoith.cmnd;
        	vm.policy.nguoithQuanhe = $rootScope.nguoith.quanhe;
  		}, true);
        
        $scope.$watch('$root.nguoint', function () {
        	vm.policy.nguoinhanCmnd = $rootScope.nguoint.cmnd;
        	vm.policy.nguoinhanQuanhe = $rootScope.nguoint.quanhe;
  		}, true);
        
        $scope.$watch('$root.nguoidbh', function () {
        	vm.policy.nguoidbhCmnd = $rootScope.nguoidbh.cmnd;
        	vm.policy.nguoidbhQuanhe = $rootScope.nguoidbh.quanhe;
  		}, true);

        function selectedContactChange() {
            if ($rootScope.selectedContact != undefined && $rootScope.selectedContact != null) {
                switch (vm.panelType) {
                    case 'contact':
                    	vm.policy.nguoiycName = $rootScope.selectedContact.contactName;
                    	vm.policy.nguoiycNgaysinh = $rootScope.selectedContact.dateOfBirth;
                    	vm.policy.nguoiycCmnd = $rootScope.selectedContact.idNumber;
                    	vm.policy.contactCode = $rootScope.selectedContact.contactCode;
                		vm.policy.contactName = $rootScope.selectedContact.contactName;
                		vm.policy.dateOfBirth = $rootScope.selectedContact.dateOfBirth;
                    	$rootScope.saveNguoiYcBVP = $rootScope.selectedContact;
                        break;
                    case 'insured':
                    	vm.policy.nguoidbhName = $rootScope.selectedContact.contactName;
                    	vm.policy.nguoidbhNgaysinh = $rootScope.selectedContact.dateOfBirth;
                    	$rootScope.nguoidbh = {
        	        			cmnd : $rootScope.selectedContact.idNumber
        	        	}
                    	vm.policy.nguoidbhCmnd = $rootScope.selectedContact.idNumber;
                    	if (vm.policy.nguoidbhNgaysinh != vm.policy.ngaySinh){
                    		toastr.error("Ngày sinh người được BH phải giống Ngày sinh trong gói BH tính phí");
            				angular.element('#ngaySinh').focus();
                    	}
                        break;
                    case 'requirement':
                    	vm.policy.nguoithName = $rootScope.selectedContact.contactName;
                    	vm.policy.nguoithNgaysinh = $rootScope.selectedContact.dateOfBirth;
                    	$rootScope.nguoith = {
        	        			cmnd : $rootScope.selectedContact.idNumber
        	        	}
                    	vm.policy.nguoithCmnd = $rootScope.selectedContact.idNumber;
                    	// add 08/03/2019
                    	vm.policy.nguoithDienthoai = $rootScope.selectedContact.phone;
        	        	vm.policy.nguoithDiachi = $rootScope.selectedContact.homeAddress;
        	        	vm.policy.nguoithEmail = $rootScope.selectedContact.email;
                    	
                        break;
                    case 'receive':
                    	vm.policy.nguoinhanName = $rootScope.selectedContact.contactName;
                    	vm.policy.nguointNgaysinh = $rootScope.selectedContact.dateOfBirth;
                    	$rootScope.nguoint = {
        	        			cmnd : $rootScope.selectedContact.idNumber
        	        	}
                    	vm.policy.nguoinhanCmnd = $rootScope.selectedContact.idNumber;
                    	// add 08/03/2019
                    	vm.policy.nguointDienthoai = $rootScope.selectedContact.phone;
        	        	vm.policy.nguointDiachi = $rootScope.selectedContact.homeAddress;
        	        	vm.policy.nguointEmail = $rootScope.selectedContact.email;
                    	
                        break;
                }
            }
        }
        
        $scope.$on('selectedContactChange', selectedContactChange);
        
        function isHealthyPersonChange() {
        	if(vm.isHealthyPerson) {
        		vm.policy.q1 = "0";
        		vm.policy.q2 = "0";
        		vm.policy.q3 = "0";
        	} else {
        		vm.policy.q1 = "";
        		vm.policy.q2 = "";
        		vm.policy.q3 = "";
        	}
        }
        
        function onDobChange() {
        	if (vm.copyFromNdbh == false || vm.copyFromNdbh == undefined){
        		vm.policy.nguoidbhNgaysinh = vm.policy.ngaySinh;	
        	}

            vm.policy.tuoi = DateUtils.yearDiff(vm.policy.ngaySinh, vm.policy.inceptionDate);
            
            if (vm.policy.tuoi < 18){
            	vm.isShowPolicyParent = true;
            } else{
            	vm.isShowPolicyParent = false;
            }

            if(vm.policy.chuongTrinh) {
            	if (vm.policy.nguoidbhNgaysinh != undefined && vm.policy.nguoidbhNgaysinh != null && vm.policy.nguoidbhNgaysinh != "") {
            		if (vm.policy.nguoidbhNgaysinh != vm.policy.ngaySinh){
                		toastr.error("Ngày sinh người được BH phải giống Ngày sinh trong gói BH tính phí");
        				angular.element('#ngaySinh').focus();
                	}
            	}
            	getPremium();
            }
        }
        
        function processComboResult(data, type) {
            console.log(data);
            switch(type){
                case 'bvp-insurance-type':
                case 'bvp-tncn':
            	case 'bvp-smcn':
                    getPremium();
                    break;
            }
        }

        function getPremium() {
        	
//        	if (vm.policy.tuoi < 18) {
//        		checkGycbhParent();
//        	} else {
//        		vm.checkAgeNDBH = true;
//        	}
//        	
//        	if (vm.checkAgeNDBH){
        		// clean error message
            	vm.cleanAllResponseError();
            	
                var postData = getPostData(false);

                if (vm.isShowPolicyParent == true){
                	vm.policy.imgGks = vm.gksFile;
                }
                
                if(postData.chuongTrinh) {
                	vm.loading = true;
                	ProductCommonService.getBvpPremium(postData, onGetPremiumSuccess, onGetPremiumError);
                } else {
                    vm.policy.premiumNet = 0;
                    vm.policy.phiBH = 0;
                }
//        	}
        }

        function getPostData() {
            var postData = Object.assign({}, vm.policy);
            
            if(postData.chuongTrinh == 1 || postData.chuongTrinh == 2 || postData.chuongTrinh == 3) {
            	postData.thaisanChk = false;
            }
            
            if(postData.tncnSi == "") {
            	postData.tncnChk = false;
            	postData.tncnSi = 0;
            }
            if(postData.smcnSi == "") {
            	postData.smcnChk = false;
            	postData.smcnSi = 0;
            }
            
            if (vm.policy.tncnChk == false) {
            	postData.tncnSi = 0;
            }
            
            if (vm.policy.smcnChk == false) {
            	postData.smcnSi = 0;
            }
            
            return postData;
        }

        function onGetPremiumSuccess(result) {
            vm.loading = false;
            vm.policy.premiumNet = result.premiumNet;
            vm.policy.phiBH = result.phiBH;
            vm.policy.qlChinhPhi = result.qlChinhPhi;
            vm.policy.ngoaitruPhi = result.ngoaitruPhi;
            vm.policy.tncnPhi = result.tncnPhi;
            vm.policy.nhakhoaPhi = result.nhakhoaPhi;
            vm.policy.sinhmangPhi = result.smcnPhi;
            vm.policy.chuongtrinhBh = result.chuongTrinh;
            vm.policy.thaisanPhi = result.thaisanPhi;
            vm.policy.chuongtrinhPhi = result.qlChinhPhi;

            if(vm.policy.chuongTrinh) {
                vm.isShowPremium = true;
                vm.isShowTotalPremium = true;
            } else {
                vm.isShowPremium = false;
                vm.isShowTotalPremium = false;
            }

            vm.clearResponseError();
        }

        function onGetPremiumError(result) {
            vm.loading = false;
            vm.clearResponseError();
    		resetDataPremium();
//            vm.validateResponse(result, 'getPremium');
    		ResponseValidateService.validateResponse(result.data);
        }
        
        function resetDataPremium() {
        	vm.policy.phiBH = 0;
        	vm.policy.premiumNet = 0;
        }

        function savePolicy() {
            var postData = getPostData(true);
            if (vm.gksFile != null && vm.gksFile.content.length > 0){
            	vm.policy.imgGks = vm.gksFile;	
            }
            
            if(vm.isHealthyPerson) {
        		vm.policy.q1 = "0";
        		vm.policy.q2 = "0";
        		vm.policy.q3 = "0";
        	}
            vm.policy.chuongtrinhBh = postData.chuongTrinh;
            vm.policy.chuongtrinhPhi = vm.policy.qlChinhPhi;
            vm.policy.expiredDate = postData.thoihanbhDen;
            vm.policy.inceptionDate = postData.thoihanbhTu;
            vm.policy.ngoaitruPhi =vm.policy.ngoaitruPhi;
            vm.policy.tncnPhi =vm.policy.tncnPhi;
            vm.policy.smcnPhi =vm.policy.smcnPhi;
            vm.policy.nhakhoaPhi =vm.policy.nhakhoaPhi;
            vm.policy.sinhmangPhi = postData.sinhmangPhi;
            vm.policy.thaisanPhi = postData.thaisanPhi;

            if(vm.policy.ngoaitruChk) {
            	vm.policy.ngoaitru = '1';
            } else {
            	vm.policy.ngoaitru = '0';
            }
            
            if(vm.policy.nhakhoaChk) {
            	vm.policy.nhakhoa = '1';
            } else {
            	vm.policy.nhakhoa = '0';
            }
            
            if(vm.policy.thaisanChk) {
            	vm.policy.thaisan = '1';
            } else {
            	vm.policy.thaisan = '0';
            }
            
            if(vm.policy.smcnChk) {
            	vm.policy.sinhmang = '1';
            	vm.policy.sinhmangSotienbh = vm.policy.smcnSi;
            } else {
            	vm.policy.sinhmang = '0';
            	vm.policy.sinhmangSotienbh = 0;
            }
            
            if(vm.policy.tncnChk) {
            	vm.policy.tncn = '1';
            	vm.policy.tncnSotienbh = vm.policy.tncnSi;
            } else {
            	vm.policy.tncn = '0';
            	vm.policy.tncnSotienbh = 0;
            }
            
            vm.savePolicyBase("BVP", vm.policy);
        }
        
        function openSearchContactForPanel(type) {
            vm.panelType = type;
            if (type == 'contact'){
            	vm.openSearchContact();
            } else {
//        		vm.openSearchContactOther();	// comment 26/02/2019
            	// add 26/02/2019
            	if (type == 'receive' || type == 'requirement'){
            		vm.openSearchContactPerson();	
            	} else {
            		vm.openSearchContactOther();
            	}
            }
        }

        function onGetPolicyNumberSuccess(result) {
            vm.policy.gycbhNumber  = result.policyNumber;
            vm.clearResponseError();
        }

        function onGetPolicyNumberError(result) {
            vm.validateResponse(result, 'getPolicyNumber');
        }
        
        function validatorCombo(name) {
  			switch(name) {
	  			case "chuongTrinh":
	  	        	if(!vm.policy.chuongTrinh) {
	  	        		return "Cần lựa chọn chương trình bảo hiểm!";
	  	        	}
	  	            return true;
	  			case "tncnSi":
	  				if(!vm.policy.tncnChk) {
	  	        		return true;
	  	        	}
	  	        	if(!vm.policy.tncnSi) {
	  	        		return "Cần lựa chọn số tiền bảo hiểm tai nạn cá nhân!";
	  	        	}
	  	            return true;
	  			case "smcnSi":
	  				if(!vm.policy.smcnChk) {
	  	        		return true;
	  	        	}
	  	        	if(!vm.policy.smcnSi) {
	  	        		return "Cần lựa chọn số tiền bảo hiểm sinh mạng cá nhân!";
	  	        	}
	  	            return true;
  			}
        }
        
        function changeCopyFromNth() {
        	vm.policy.nguoinhanName = "";
        	vm.policy.nguointNgaysinh = "";
        	vm.policy.nguoinhanCmnd = "";
        	vm.policy.nguoinhanQuanhe = "";
        	vm.policy.nguointDienthoai = "";
        	vm.policy.nguointDiachi = "";
        	vm.policy.nguointEmail = "";
	      	if (vm.copyFromNth) {
	      		vm.policy.nguoinhanName = vm.policy.nguoithName;
	        	vm.policy.nguointNgaysinh = vm.policy.nguoithNgaysinh;
	        	$rootScope.nguoint = {
	        			cmnd : vm.policy.nguoithCmnd,
	        			quanhe: vm.policy.nguoithQuanhe
	        	}
	        	vm.policy.nguoinhanCmnd = vm.policy.nguoithCmnd;
	        	vm.policy.nguoinhanQuanhe = vm.policy.nguoithQuanhe;
	        	
	        	vm.policy.nguointDienthoai = vm.policy.nguoithDienthoai;
	        	vm.policy.nguointDiachi = vm.policy.nguoithDiachi;
	        	vm.policy.nguointEmail = vm.policy.nguoithEmail;
	      	} else {
	      		$rootScope.nguoint = {
	        			cmnd : "",
	        			quanhe: ""
	        	}
	      	}
        }
        
        function changeCopyFromNdbh() {
        	vm.policy.nguoidbhName = "";
        	vm.policy.nguoidbhCmnd = "";
        	vm.policy.nguoidbhQuanhe = "";
        	vm.policy.nguoidbhNgaysinh = vm.policy.ngaySinh;
        	vm.policy.nguoidbhGioitinh = ""; // add 08/03/2019
        	vm.policy.nguoidbhDiachi = "";	// add 08/03/2019
        	vm.policy.nguoidbhDienthoai = "";	// add 08/03/2019
        	vm.policy.nguoidbhEmail = "";	// add 08/03/2019
        	
	      	if (vm.copyFromNdbh) {
	        	if (vm.policy.nguoidbhNgaysinh != undefined && vm.policy.nguoidbhNgaysinh != null && vm.policy.nguoidbhNgaysinh != "") {
            		if (vm.policy.nguoiycNgaysinh != vm.policy.ngaySinh){
            			vm.copyFromNdbh = false;	
            			toastr.error("Ngày sinh người được BH phải giống Ngày sinh trong gói BH tính phí");
        				angular.element('#ngaySinh').focus();
                	} else {
                		vm.policy.nguoidbhName = vm.policy.nguoiycName;
        	        	vm.policy.nguoidbhNgaysinh = vm.policy.nguoiycNgaysinh;
        	        	vm.policy.nguoidbhQuanhe = "30";
        	        	vm.policy.nguoidbhCmnd = $rootScope.saveNguoiYcBVP.idNumber; //vm.policy.contactIdNumber;
        	        	$rootScope.nguoidbh = {
        	        			cmnd : $rootScope.saveNguoiYcBVP.idNumber,
        	        			quanhe: "30"
        	        	}
        	        	debugger
        	        	vm.policy.nguoidbhGioitinh = $rootScope.saveNguoiYcBVP.contactSex; // add 08/03/2019
        	        	vm.policy.nguoidbhDiachi = $rootScope.saveNguoiYcBVP.homeAddress;	// add 08/03/2019
        	        	vm.policy.nguoidbhDienthoai = $rootScope.saveNguoiYcBVP.phone;	// add 08/03/2019
        	        	vm.policy.nguoidbhEmail = $rootScope.saveNguoiYcBVP.email;	// add 08/03/2019
                	}
            	}
	      	}
        }
        
        function checkGycbh() {
            if(vm.policy.insuranceTarget == 'Reuse') {
            	vm.gycbhNumber = {
        		    	  "gycbhNumber": ""
        		    };
    		    vm.gycbhNumber = vm.policy.policyNumber;
    		    ProductCommonService.getByGycbhNumber({gycbhNumber: vm.gycbhNumber}, onSuccess, onError);
    			
    			function onSuccess() {
    			}
    			
    			function onError() {
    				toastr.error("Số hợp đồng bảo hiểm cũ không tồn tại");
    				angular.element('#policyNumber').focus();
    			}
            } 
        }
        
        function checkCMT() {
            if((vm.copyFromNdbh == undefined || vm.copyFromNdbh == false) && vm.policy.nguoidbhQuanhe != 30) {
    			if (vm.policy.nguoidbhCmnd == vm.policy.contactIdNumber) {
    				toastr.error("Thông tin CMT/Hộ chiếu trùng với Người yêu cầu bảo hiểm");
    				angular.element('#nguoidbhCmnd').focus();
    			}
            } 
        }
        
        function checkBanthan() {
            if(vm.policy.nguoidbhQuanhe == 30) {
            	vm.copyFromNdbh = true;
            	vm.changeCopyFromNdbh();
            } 
        }
        
        function checkGycbhParent() {
        	vm.gycbhNumber = {
    		    	  "gycbhNumber": ""
    		    };
        	
		    vm.gycbhNumber = vm.policy.policyParent;
		    ProductCommonService.getByGycbhNumber({gycbhNumber: vm.gycbhNumber}, onSuccess, onError);
			
			function onSuccess() {
				vm.checkAgeNDBH = true;
			}
			
			function onError() {
				vm.checkAgeNDBH = false;
				toastr.error("Số HĐBH/GCNBH/Thẻ/Mã đơn hàng Bố(Mẹ) không tồn tại");
			}
        }
        
    }
})();
