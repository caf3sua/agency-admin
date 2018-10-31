(function() {
  'use strict';
  angular
    .module('app')
    .directive('format', format);

  	format.$inject = ['$filter'];
    function format($filter) {
	      var directive = {
    		  require: '?ngModel',
	          link: link
	      };
	      return directive;
	      
	      function link(scope, elem, attrs, ctrl) {
	    	  	if (!ctrl) return;

	            var symbol = ""; // dummy usage
	            
	            ctrl.$formatters.unshift(function (a) {
	                return $filter(attrs.format)(ctrl.$modelValue) + symbol;
	            });

	            ctrl.$parsers.unshift(function (viewValue) {
	                var plainNumber = viewValue.replace(/(?!-)[^0-9]/g, '');
	                elem.val($filter('number')(plainNumber) + symbol);
	                return plainNumber;
	            });
	      }
    }
})();
