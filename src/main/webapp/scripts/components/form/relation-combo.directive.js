(function() {
    'use strict';

    angular
        .module('app')
        .directive('relationCombo', relationCombo);
    
    relationCombo.$inject = ['CarService'];

    function relationCombo (CarService) {
        var directive = {
            restrict: 'E',
            scope: {
                name: '@',
            	selectedItem: '=ngModel',
            	options: '=',
            	loadRelationFinished: '&onfinished'
            },
            require: 'ngModel',
            template : getTemplate,
            link: linkFunc
        };

        return directive;
        
        function getTemplate(element, attrs, ctrl) {
        	var defaultOption = '';

            switch(attrs.type){
	            case 'bvp-insurance-type':
	                defaultOption = "--- Chọn chương trình bảo hiểm ---";
	                break;
	            case 'bvp-tncn':
	                defaultOption = "--- Chọn số tiền bảo hiểm tai nạn cá nhân ---";
	                break;
	            case 'bvp-smcn':
	                defaultOption = "--- Chọn số tiền bảo hiểm sinh mạng cá nhân ---";
	                break;
                case 'hhvc-item-group':
                    defaultOption = "--- Chọn nhóm/loại sản phẩm ---";
                    break;
                case 'hhvc-item-name':
                    defaultOption = "--- Chọn tên sản phẩm ---";
                    break;
                case 'hhvc-insurance-term':
                    defaultOption = "--- Chọn điều khoản bảo hiểm ---";
                    break;
                case 'hhvc-shipping-wrap-type':
                    defaultOption = "--- Chọn phương thức đóng gói ---";
                    break;
                case 'hhvc-shipping-way':
                    defaultOption = "--- Chọn hành trình vận chuyển ---";
                    break;
                case 'hhvc-shipping-vehicle':
                    defaultOption = "--- Chọn phương tiện vận chuyển ---";
                    break;
                case 'hhvc-money-type':
                    break;
                case 'khc-money':
                case 'tnc-money':
                    defaultOption = "--- Cần số tiền bảo hiểm ---";
                    break;
                case 'moto-type':
                    defaultOption = "--- Cần lựa chọn loại xe ---";
                    break;
	            case 'car-socho':
	            	defaultOption = "--- Lựa chọn số chỗ/trọng tải xe ---";
	                break;
                case 'moto-tndstn-sotien':
	            case 'car-tndstn-sotien':
	            	defaultOption = "--- Cần lựa chọn mức trách nhiệm ---";
	                break;
	            case 'car-nntx-sotien':
	            	defaultOption = "--- Cần lựa chọn mức trách nhiệm ---";
	                break;
                case 'car-manufacturer':
                	defaultOption = "--- Cần lựa chọn hãng xe ---";
                    break;
                case 'car-model':
                	defaultOption = "--- Cần lựa chọn dòng xe ---";
                    break;
                case 'car-year':
                	defaultOption = "--- Cần lựa năm sản xuất ---";
                    break;
            }

            if(attrs.type == 'hhvc-money-type') {
                var template = '<select name="{{name}}" class="bv-select-box form-control" ng-model="selectedItem" ng-change="changeEvent()"'
                	+ 'validator="vm.validatorCombo(\'{{name}}\') === true" invalid-message="vm.validatorCombo(\'{{name}}\')">'
                    + '<option ng-repeat="option in options" value="{{option.id}}">{{option.name}}</option>'
                    + '</select>';
			} else {
                var template = '<select name="{{name}}" class="bv-select-box form-control" ng-model="selectedItem" ng-change="changeEvent()"'
                	+ 'validator="vm.validatorCombo(\'{{name}}\') === true" invalid-message="vm.validatorCombo(\'{{name}}\')">'
                    + '<option value="" disabled selected>' + defaultOption + '</option>'
                    + '<option ng-repeat="option in options" value="{{option.id}}">{{option.name}}</option>'
                    + '</select>';
			}

            return template;
        }

        function linkFunc (scope, element, attrs, ngModel) {
        	scope.changeEvent = function () {
                console.log(scope.selectedItem);
                
                ngModel.$setViewValue(scope.selectedItem);
                
                switch(attrs.type){
                	case 'bvp-insurance-type':
                	case 'bvp-tncn':
                	case 'bvp-smcn':
                    case 'hhvc-item-group':
                    case 'hhvc-item-name':
                    case 'hhvc-insurance-term':
                    case 'hhvc-shipping-wrap-type':
                    case 'hhvc-shipping-way':
                    case 'hhvc-shipping-vehicle':
                    case 'hhvc-money-type':
                    case 'khc-money':
                    case 'tnc-money':
                    case 'moto-type':
	                case 'car-socho':
                    case 'moto-tndstn-sotien':
	                case 'car-tndstn-sotien':
	                case 'car-nntx-sotien':
	                	onSuccess(null);
	                    break;
	                case 'car-manufacturer':
	                	CarService.getCarModel({model : scope.selectedItem}, onSuccess, onError);
	                    break;
	                case 'car-model':
	                	CarService.getMaxManufactureYear({carId : scope.selectedItem}, function(maxYear) {
	                		scope.maxYear = maxYear.max;
	                		CarService.getMinManufactureYear({carId : scope.selectedItem}, function(minYear) {
	                			scope.loadRelationFinished({data : {min : minYear.min, max : scope.maxYear}, type : attrs.type});
		                	}, onError);
	                	}, onError);
	                    break;
	                case 'car-year':
	                	var data = scope.selectedItem.split(":");
	                	CarService.getCarPriceWithYear({year : data[0], carId : data[1]}, onSuccess, onError);
	                    break;
	            }
            }
        	
        	function onSuccess(result) {
        		scope.loadRelationFinished({data : result, type : attrs.type});
        	}
        	
        	function onError(result) {
        		toastr.error('Get data error!', 'Error');
        	}
        }

    }

})();
