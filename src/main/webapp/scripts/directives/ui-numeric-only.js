(function() {
  'use strict';
  angular
    .module('app')
    .directive('numericOnly', numericOnly);

  	numericOnly.$inject = [];
    function numericOnly() {
      var directive = {
          require: 'ngModel',
          link: link
      };
      return directive;
      
      function link(scope, element, attrs, modelCtrl) {
    	  modelCtrl.$parsers.push(function (inputValue) {
              var transformedInput = inputValue ? inputValue.replace(/[^\d.-]/g,'') : null;

              if (transformedInput!=inputValue) {
                  modelCtrl.$setViewValue(transformedInput);
                  modelCtrl.$render();
              }

              return transformedInput;
          });
      }
    }
})();
