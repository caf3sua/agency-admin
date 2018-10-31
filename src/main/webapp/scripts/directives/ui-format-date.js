(function() {
  'use strict';
  angular
    .module('app')
    .directive('formatDate', formatDate);

  formatDate.$inject = [];
    function formatDate() {
      var directive = {
          require: 'ngModel',
          link: link
      };
      return directive;
      
      function link(scope, element, attrs, modelCtrl) {
//	        element.bind('blur', function (e) {
//	        	attrs
//	        	element
//	        	this
//	        	modelCtrl
//	             debugger
//	             console.log('blur');
//	        });
      
//    	  modelCtrl.$parsers.push(function (inputValue) {
//              var transformedInput = inputValue ? inputValue.replace(/[^\d.-]/g,'') : null;
//
//              if (transformedInput!=inputValue) {
//                  modelCtrl.$setViewValue(transformedInput);
//                  modelCtrl.$render();
//              }
//
//              return transformedInput;
//          });
      }
      
    }
})();
