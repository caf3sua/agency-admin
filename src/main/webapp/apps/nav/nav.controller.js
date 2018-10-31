(function() {
    'use strict';

    angular
        .module('app')
        .controller('NavController', NavController);

    NavController.$inject = ['$scope', '$localStorage', '$location', '$rootScope', '$anchorScroll'
    	, '$timeout', '$window', 'Auth', '$state', 'Principal', 'ContactCommonDialogService', 'ReminderService', 'CONSTANT_REMINDER_RANGER_DATE'
    	, 'NavCommonService'];

    function NavController ($scope, $localStorage, $location, $rootScope, $anchorScroll
    		, $timeout, $window, Auth, $state, Principal, ContactCommonDialogService, ReminderService, CONSTANT_REMINDER_RANGER_DATE
    		, NavCommonService) {
    	var vm = this;
    	vm.countReminder = 0;
    	vm.maxYear = 0;
    	vm.minYear = 0;
    	vm.processing = true;
    	vm.isCanPremium = false;
    	vm.checkNNTX = "";
    	vm.premiumPackageTvi = "";
    	
    	vm.products = [
    		{"lineId": "", "lineName" : "-- Chọn sản phẩm --"}, 
    		{"lineId": "CAR", "lineName" : "Bảo hiểm ô tô"}, 
    		{"lineId": "BVP", "lineName" : "Bảo Việt An Gia"},
    		{"lineId": "KCARE", "lineName" : "Bảo hiểm bệnh ung thu"},
    		{"lineId": "TVC", "lineName" : "Bảo hiểm du lịch quốc tế"},
    		{"lineId": "TVI", "lineName" : "Bảo hiểm du lịch Việt Nam"},
    		{"lineId": "MOTO", "lineName" : "Bảo hiểm xe máy"},
    		{"lineId": "HOME", "lineName" : "Bảo hiểm nhà tư nhân"},
    		{"lineId": "KHC", "lineName" : "Bảo hiểm kết hợp con người"},
    		{"lineId": "TNC", "lineName" : "Bảo hiểm tai nạn con người"}
//    		,
//    		{"lineId": "HHVC", "lineName" : "Bảo hiểm vận chuyển hàng hóa"}
    	];
    	vm.selProduct = "";
    	vm.premium;
    	vm.urlCreatePolicy;
    	vm.siValidator = siValidator;
    	
    	// Product
    	vm.kcare = {
    		"gioiTinh": "1",
    		"ngayBatDau": "",
    		"ngaySinh": "",
    		"premiumDiscount": 0,
    		"premiumKCare": 0,
    		"premiumNet": 0,
    		"typeOfKcare": ""
    	};
    	
    	vm.makeCars = [];
    	vm.modelCars = [];
    	vm.yearOfMakeCars = [];
    	
    	vm.car = {
    			"GARAGE": true,
    			"agencyRole": "1",
    			"changePremium": 0,
    			"garage": true,
    			"khauHao": false,
    			"khauTru": false,
    			"matCap": false,
    			"namSX": "",
    			"ngapNuoc": false,
    			"nntxCheck": false,
    			"nntxPhi": 0,
    			"nntxSoCho": 0,
    			"nntxSoTien": 0,
    			"premium": 0,
    			"purposeOfUsageId": "15",
    			"tndsSoCho": "1",
    			"tndsbbCheck": true,
    			"tndsbbPhi": 5000000,
    			"tndstnCheck": false,
    			"tndstnPhi": 0,
    			"tndstnSoTien": 0,
    			"totalPremium": 0,
    			"vcxCheck": true,
    			"vcxPhi": 0,
    			"vcxSoTien": 0
    			};
    	// moto
    	vm.moto = {
    			  "chaynoCheck": false,
    			  "chaynoPhi": 0,
    			  "chaynoStbh": 0,
    			  "nntxCheck": false,
    			  "nntxPhi": 0,
    			  "nntxSoNguoi": 1,
    			  "nntxStbh": 20000000,
    			  "tndsbbCheck": true,
    			  "tndsbbPhi": 0,
    			  "tndstnCheck": false,
    			  "tndstnPhi": 0,
    			  "tndstnSotien": 50000000,
    			  "tongPhi": 0,
    			  "typeOfMoto": "1"
    			};
    	// tvi
    	vm.tvi = {
    			"expiredDate": "",
    			"inceptionDate": "",
    			"numberOfDay": "",
    			"numberOfPerson": 1,
    			"planId": "",
    			"premiumDiscount": 0,
    			"premiumNet": 0,
    			"premiumPackage": "1",
    			"premiumPercentDiscount": 0,
    			"premiumTvi": 0
    			};
    	// tvc
    	vm.tvc = {
    			"destination": "",
    			"ngayDi": "",
    			"ngayVe": "",
    			"numberOfPerson": 1,
    			"planId": "",
    			"premiumDiscount": 0,
    			"premiumNet": 0,
    			"premiumPackage": "",
    			"premiumTvc": 0,
    			"songay": ""
    			};
    	
    	// KHC, TNC, HOME
    	vm.khc = {
    			"endDate": "",
    			"insuranceStartDate": "",
    			"numberMonth": 12,
    			"numberPerson": 1,
    			"premiumDiscount": 0,
    			"premiumKhc": 0,
    			"premiumKhcList": [
	    			{
	    			"dob": "",
	    			"personName": "Đức",
	    			"premiumPerson": 0
	    			}
    			],
    			"premiumNet": 0,
    			"premiumPackage": ""
    			};
    	vm.tnc = {
    			"endDate": "",
    			"insurancestartdate": "",
    			"numbermonth": 12,
    			"numberperson": "",
    			"premiumPackage": "",
    			"premiumdiscount": 0,
    			"premiumnet": 0,
    			"premiumtnc": 0
    			};
    	vm.home = {
    			"premiumDiscount": 0,
    			"premiumHome": 0,
    			"premiumNet": 0,
    			"premiumSi": 0,
    			"premiumSiin": 0,
    			"si": 300000000,
    			"siin": "",
    			"yearBuildCode": "" // Thoi han bao hiem
    			};
    	vm.bvp = {
    		"chuongTrinh": "1",
    		"ngaySinh": "",
    		"tuoi": 36,
    		"ngoaitruChk": false,
    		"ngoaitruPhi": 0,
    		"tncnChk": false,
    		"tncnSi": 0,
    		"tncnPhi": 0,
    		"smcnChk": true,
    		"smcnSi": 0,
    		"smcnPhi": 0,
    		"nhakhoaChk": false,
    		"nhakhoaPhi": 0,
    		"thaisanChk": false,
    		"thaisanPhi": 0,
    		"thoihanbhTu": "",
    		"qlChinhPhi": 0,
    		"phiBH": 0,
    		"premiumNet": 0,
    		"premiumDiscount": 0,
    		"pagencyRole": "1"
    	};
    	
    	// Function declare
    	vm.logout = logout;
    	vm.calculatePremium = calculatePremium;
    	vm.onCarMakesSel = onCarMakesSel;
    	vm.onCarModelSel = onCarModelSel;
    	vm.onYearSel = onYearSel;
    	
    	vm.isCollapsedQuickPremium = true;
    	
    	// Init controller
  		(function initController() {
  			console.log('NavController initController');
  			countReminder();
  			// Load init for car
  			NavCommonService.getCarBranches({}, getCarBranchesSuccess, getCarBranchesError);
  		})();
  		

    	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    		vm.isCollapsedQuickPremium = true;
    	});

  		$scope.$watch('vm.khc.insuranceStartDate', function (value) {
  			console.log('change vm.khc.insuranceStartDate' + vm.khc.insuranceStartDate);
  			var isValid = moment(vm.khc.insuranceStartDate, "DD/MM/YYYY", true).isValid();
  			
  			if (isValid) {
  				var fromDateObj = moment(vm.khc.insuranceStartDate, 'DD/MM/YYYY');
  	  			var toDateObj = fromDateObj.add(1, 'y').subtract(1, 'd');
  	  			var toDate = toDateObj.format('DD/MM/YYYY');
  	  			vm.khc.endDate = toDate;
  			} else {
  				vm.khc.endDate = "";
  			}
  		});
  		
  		$scope.$watch('vm.tnc.insurancestartdate', function (value) {
  			console.log('change vm.tnc.insurancestartdate' + vm.tnc.insurancestartdate);
  			var isValid = moment(vm.tnc.insurancestartdate, "DD/MM/YYYY", true).isValid();
  			
  			if (isValid) {
  				var fromDateObj = moment(vm.tnc.insurancestartdate, 'DD/MM/YYYY');
  	  			var toDateObj = fromDateObj.add(1, 'y').subtract(1, 'd');
  	  			var toDate = toDateObj.format('DD/MM/YYYY');
  	  			vm.tnc.endDate = toDate;
  			} else {
  				vm.tnc.endDate = "";
  			}
  		});
  		
  		function getCarBranchesSuccess(result) {
  			result.forEach(function(item, index, arr) {
  				vm.makeCars.push({id: item, name: item});
  			})
    	}
  		
    	
    	function getCarBranchesError(error) {
    	}

    	function onCarMakesSel(makeId) {
    		vm.modelCars = [];
    		vm.yearOfMakeCars = [];
    		vm.car.vcxSoTien = 0;
    		NavCommonService.getCarModel({model : makeId}, onSuccess, onError);
  			
  			function onSuccess(result) {
  				result.forEach(function(item, index, arr) {
  					vm.modelCars.push({carId: item.carId, carName: item.carName});
  	  			})
            }
            function onError(error) {
                vm.validateResponse(error, 'Lỗi khi lấy dữ liệu hãng xe!');
            }
  		}
    	
    	function onCarModelSel(modelId) {
    		vm.maxYear = 0;
        	vm.minYear = 0;
        	vm.yearOfMakeCars = [];
        	vm.car.vcxSoTien = 0;
    		NavCommonService.getMaxManufactureYear({carId : modelId}, function(maxYear) {
    			vm.maxYear = maxYear.max;
        		NavCommonService.getMinManufactureYear({carId : modelId}, function(minYear) {
        			vm.minYear = minYear.min
        			for (vm.minYear; vm.minYear <= vm.maxYear; vm.minYear++){
        				vm.yearOfMakeCars.push({year: vm.minYear});
        			}
        		}, onError);
        	}, onError);
    		
            function onError(error) {
                vm.validateResponse(error, 'Lỗi khi lấy dữ liệu hãng xe!');
            }
  		}
    	
    	function onYearSel(year) {
    		vm.car.vcxSoTien = 0;
    		NavCommonService.getCarPriceWithYear({carId : vm.car.modelId,year : year}, onSuccess, onError);
  			
  			function onSuccess(result) {
  				vm.car.vcxSoTien = result.price;
            }
            function onError(error) {
                vm.validateResponse(error, 'Lỗi khi lấy dữ liệu năm sản xuất của xe!');
            }
  		}
    	
    	function siValidator(siStr) {
            if (siStr < 300000000 || siStr > 5000000000) {
            	vm.home.si = 300000000;
            }
        };
    	
  		function calculatePremium() {
  			vm.isCanPremium = false;
  			vm.urlCreatePolicy = "";
  			switch(vm.selProduct){
	  	        case "KCARE":
	  	            console.log('calculate premium KCARE');
	  	            NavCommonService.getKcarePremium(vm.kcare, function (data) {
		  	            	vm.isCanPremium = true;
		  	            	vm.premium = data.premiumKCare;
		  	            	vm.urlCreatePolicy = "product.kcare";
	  	            	}, function () {
	  	            	});
	  	            break;
	  	        case "CAR":
	  	        	console.log('calculate premium CAR');
	  	            NavCommonService.getCarPremium(vm.car, function (data) {
		  	            	vm.isCanPremium = true;
		  	            	vm.premium = data.totalPremium;
		  	            	vm.urlCreatePolicy = "product.car";
	  	            	}, function () {
	  	            	});
	  	            break;
	  	        case "BVP":
	  	        	console.log('calculate premium BVP');
	  	            NavCommonService.getBvpPremium(vm.bvp, function (data) {
		  	            	vm.isCanPremium = true;
		  	            	vm.premium = data.premiumNet;
		  	            	vm.urlCreatePolicy = "product.bvp";
	  	            	}, function () {
	  	            	});
	  	            break;
	  	        case "KHC":
	  	        	console.log('calculate premium KHC');
	  	            NavCommonService.getKhcPremium(vm.khc, function (data) {
		  	            	vm.isCanPremium = true;
		  	            	vm.premium = data.premiumKhc;
		  	            	vm.urlCreatePolicy = "product.khc";
	  	            	}, function () {
	  	            	});
	  	            break;
	  	        case "TNC":
	  	        	console.log('calculate premium TNC');
	  	            NavCommonService.getTncPremium(vm.tnc, function (data) {
		  	            	vm.isCanPremium = true;
		  	            	vm.premium = data.premiumtnc;
		  	            	vm.urlCreatePolicy = "product.tnc";
	  	            	}, function () {
	  	            	});
	  	            break;
		  	    case "TVC":
		  	    	console.log('calculate premium TVC');
		  	    	var ngayDi = moment().format('DD/MM/YYYY');
		  	    	var ngayVe = moment().add(vm.tvc.songay, 'd').format('DD/MM/YYYY');
		  	    	vm.tvc.ngayDi = ngayDi;
		  	    	vm.tvc.ngayVe = ngayVe;
		  	    	if (vm.tvc.premiumPackage == 1){
		  	    		vm.tvc.numberOfPerson = 1;
		  	    	} else {
		  	    		vm.tvc.numberOfPerson = 2;
		  	    	}
	  	            NavCommonService.getTvcPremium(vm.tvc, function (data) {
		  	            	vm.isCanPremium = true;
		  	            	vm.premium = data.premiumTvc;
		  	            	vm.urlCreatePolicy = "product.tvc";
	  	            	}, function () {
	  	            	});
	  	            break;
		  	    case "TVI":
		  	    	console.log('calculate premium TVI');
		  	    	var inceptionDate = moment().format('DD/MM/YYYY');
		  	    	var expiredDate = moment().add(vm.tvi.numberOfDay, 'd').format('DD/MM/YYYY');
		  	    	vm.tvi.inceptionDate = inceptionDate;
		  	    	vm.tvi.expiredDate = expiredDate;
	  	            NavCommonService.getTviPremium(vm.tvi, function (data) {
		  	            	vm.isCanPremium = true;
		  	            	vm.premium = data.premiumTvi;
		  	            	vm.urlCreatePolicy = "product.tvi";
	  	            	}, function () {
	  	            	});
		            break;
		  	    case "HOME":
		  	    	console.log('calculate premium HOME');
	  	            NavCommonService.getHomePremium(vm.home, function (data) {
		  	            	vm.isCanPremium = true;
		  	            	vm.premium = data.premiumHome;
		  	            	vm.urlCreatePolicy = "product.home";
	  	            	}, function () {
	  	            	});
		            break;
		  	    case "MOTO":
		  	    	console.log('calculate premium MOTO');
		  	    	if (vm.checkNNTX == 1){
		  	    		vm.moto.nntxCheck = true;
		  	    	} else {
		  	    		vm.moto.nntxCheck = false;
		  	    	}
	  	            NavCommonService.getMotoPremium(vm.moto, function (data) {
		  	            	vm.isCanPremium = true;
		  	            	vm.premium = data.tongPhi;
		  	            	vm.urlCreatePolicy = "product.moto";
	  	            	}, function () {
	  	            	});
		            break;
		  	    case "HHVC":
		            break;
	  	        default: 
	  	            console.log('default');
	  	        break;
	  	    }
  		}
  		
  		function countReminder() {
//  			ReminderService.getCountReminder({numberDay: CONSTANT_REMINDER_RANGER_DATE}, onSuccess, onError);
  			ReminderService.getCountAllReminder(onSuccess, onError);
    		
    		function onSuccess(result) {
    			vm.countReminder = result.count;
    		}
    		function onError(result) {
    			
    		}
  		}
  		
    	function logout() {
    		console.log('logout');
            $state.go('access.signin');
        }
    }
})();
