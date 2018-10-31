(function() {
    'use strict';

    var bvWardInput = {
		templateUrl : 'views/theme/components/partial.autocomplete-ward.section.html',
        controller: bvWardInputController,
        bindings: {
            label: '@', // Pass string
            isRequired: '<', // binding one way
            placeholder: '@',
            connectionModel: '='
        }
    };

    angular
        .module('app')
        .component('bvWardInput', bvWardInput);

    bvWardInputController.$inject = ['$scope', '$http'];

    function bvWardInputController($scope, $http) {
        var vm = this;
        vm.lstAddress = [];
        vm.connectionModel;
        
        // funcion
        vm.onChange = onChange;
        
        $scope.$on('$destroy', function () {
        	vm.lstAddress = [];
        });
        
        // Init function
        init();
        
        function init() {
//        	$http.get('api/agency/common/getAddress').then(function(result) {
//            	vm.lstAddress = result.data;
//            });
        	$http.get('data/address.json').then(function(result) {
            	vm.lstAddress = result.data;
            });
        }
        
        function onChange(item) {
        	console.log(item);
        }
    }
})();

