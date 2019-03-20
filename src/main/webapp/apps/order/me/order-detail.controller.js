(function() {
    'use strict';

    angular
        .module('app')
        .controller('OrderDetailController', OrderDetailController);

    OrderDetailController.$inject = ['$scope', 'Principal', '$state'
    	, '$stateParams', '$rootScope', 'OrderService', '$ngConfirm', '$timeout', '$window', 'DateUtils', '$controller'];

    function OrderDetailController ($scope, Principal, $state
    		, $stateParams, $rootScope, OrderService, $ngConfirm, $timeout, $window, DateUtils, $controller) {
    	var vm = this;
        
    	vm.policy;
    	vm.contactName;
    	vm.contactDob;
    	vm.insuranceEndDate;
    	vm.gotoBack = gotoBack;
    	vm.isEditMode = isEditMode;
    	vm.gksFile = {
    		"content": ""
	    };
    	vm.isShowPolicyParent = false;
    	vm.checkDongYHD = false;
    	vm.isImageFile = isImageFile;
    	
        angular.element(document).ready(function () {
        });

    	// Init controller
  		(function initController() {
  			// instantiate base controller
  			OrderService.getById({id: $stateParams.id}, onSuccess, onError);
  			
  			function onSuccess(data) {
  				vm.policy = data;
  				// Load contact
  				loadContactInfo(data.contactCode);
  				switch (data.lineId) {
  					case 'BVP':
  						formatBvpData(data);
  						break;
  					case 'CAR':
  						formatCarData(data);
  						break;
  					case 'HOM':
  						formatHomeData(data);
  						break;
  					case 'KCR':
  						formatKcareData(data);
  						break;
  					case 'MOT':
  						formatMotoData(data);
  						break;
  					case 'TNC':
  						formatTncData(data);
  						break;
  					case 'KHC':
  						formatKhcData(data);
  						break;
  					case 'TVC':
  						formatTvcData(data);
  						break;
  					case 'TVI':
  						formatTviData(data);
  						break;
  					case 'HHV':
  						formatHhvcData(data);
  						break;
					default:
						break;
  				}
  				vm.checkDongYHD = false;
  				toastr.success('Tải thông tin chi tiết hợp đồng thành công');
  			}
  			
  			function onError() {
  			}
  		})();
  		
  		function isImageFile(f) {
        	if (f == null || f == undefined || f.fileType == null || f.fileType == undefined ) {
        		return false;
        	}
        	
        	if (f.fileType.indexOf('image/') != -1) {
    			return true;
    		}
        	
        	return false;
        }
  		
  		function isEditMode() {
  			return true;
  		}
  		
  		function formatBvpData(data) {
  			var now = new Date();
            var nowStr = DateUtils.convertDate(now);
            var tuoi = DateUtils.yearDiff(data.nguoidbhNgaysinh, nowStr);
            if (tuoi < 18) {
            	vm.isShowPolicyParent = true;
            } else {
            	vm.isShowPolicyParent = false;
            }
  			vm.gksFile.content = data.files;
  			vm.policy.premiumNet = data.chuongtrinhPhi + data.ngoaitruPhi + data.tncnPhi + data.sinhmangPhi + data.nhakhoaPhi + data.thaisanPhi;
			vm.policy.phiBH = data.chuongtrinhPhi + data.ngoaitruPhi + data.tncnPhi + data.sinhmangPhi + data.nhakhoaPhi + data.thaisanPhi - data.tanggiamPhi;
  		}
  		
  		function formatCarData(data) {
  			vm.policy.nntxSoTien = data.passengersAccidentSi;
  			vm.policy.nntxSoCho = data.passengersAccidentNumber;
  			vm.policy.nntxPhi = data.passengersAccidentPremium;
  			vm.policy.tndsbbPhi = data.thirdPartyPremium;
  			vm.policy.tndstnSoTien = data.tndstnSotien;
  			
  			vm.policy.manufacturer = data.makeName;// hang xe  		
  			vm.policy.model = data.modelName;
  			vm.policy.namSX = data.yearOfMake;
  			vm.policy.vcxSoTien = data.physicalDamageSi; // só tiền tham gia bảo hiểm
  			vm.policy.vcxPhi = data.physicalDamagePremium;
  			
  		}
  		
  		function formatHomeData(data) {
  		}
  		
  		function formatKcareData(data) {
  		}
  		
  		function formatKhcData(data) {
  			vm.policy.premiumKhcList = data.tlAddcollections;
  			OrderService.getByGycbhNumber({gycbhNumber: data.gycbhNumber}, onSuccess, onError);
  			
  			function onSuccess(result) {
  				vm.policy.premiumKhc = result.totalPremium;
  				vm.policy.insuranceStartDate = result.inceptionDate;
  				vm.policy.insuranceEndDate = result.expiredDate;
  				vm.policy.premiumPackage = result.plan * 10000000;
  			}
  			
  			function onError() {
  			}
  		}
  		
  		function formatMotoData(data) {
  			vm.policy.tndsBbPhi = data.tndsbbPhi;
  		}
  		
  		function formatTncData(data) {
  		}
  		
  		function formatTvcData(data) {
  			var a = moment(vm.policy.inceptionDate, 'DD/MM/YYYY');
			var b = moment(vm.policy.expiredDate, 'DD/MM/YYYY');
			vm.policy.songay = b.diff(a, 'days') + 1;
  		}
  		
  		function formatTviData(data) {
  			angular.forEach(vm.policy.listTviAdd, function(value, key) {
  				value.relationshipId = value.relationship;
		 	});
  		}
  		
  		function formatHhvcData(data) {
  		}
  		
  		// Properties & function declare
  		function loadContactInfo(coCode) {
  			vm.contactName = "";
  	    	vm.contactDob = "";
  			OrderService.getByContactCode({contactCode: coCode}, onSuccess, onError);
  			
  			function onSuccess(result) {
  				vm.contactName = result.contactName;
  				vm.contactDob = result.dateOfBirth;
  				toastr.success('Tải thông tin chi tiết hợp đồng thành công');
  			}
  			
  			function onError() {
  			}
  		}
  		
  		function gotoBack() {
  			//$state.go('order.me');
  			$window.history.back();
  		}
    }
})();
