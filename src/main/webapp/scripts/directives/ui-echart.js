(function() {
  'use strict';
  angular
    .module('app')
    .directive('eChart', eChart);

  	eChart.$inject = ['$ocLazyLoad', '$document'];
    function eChart($ocLazyLoad, $document) {
      var directive = {
          restrict: 'AC',
          link: link
      };
      return directive;
      
      function link(scope, elem, attrs) {
    	  $ocLazyLoad.load('../libs/js/echarts/build/dist/echarts-all.js'
    			  ,'../libs/js/echarts/build/dist/theme.js'
    	          ,'../libs/js/echarts/build/dist/jquery.echarts.js').then(function(){
    		  // directive is called once for each chart
              var myChart = echarts.init(elem[0]);
              // listen to option changes
              if (attrs.echartOptions) {
                  scope.$watch(attrs['echartOptions'], function() {
                      var option = scope.$eval(attrs.echartOptions);
                      if (angular.isObject(option)) {
                          myChart.setOption(option, true);
                      }
                  }, true); // deep watch
              }
          });
      }
    }
})();
