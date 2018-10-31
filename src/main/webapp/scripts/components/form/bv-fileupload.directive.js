(function() {
    'use strict';

    angular
        .module('app')
        .directive('bvFileupload', bvFileupload);
    
    function bvFileupload () {
        var directive = {
            restrict: 'E',
//            replace: true,
            require:  '^form',
            scope: {
            	inputId: '@',
            	placeHolder: '@',
            	label: '@',
            	multiple : '=',
//            	funcUploadCallback: '&',
            	keepMode : '=',
            	isRequired: '=',
            	fileModel: '='
            },
            templateUrl : 'views/theme/components/partial.fileupload.section.html',
            link: function(scope, elem, attr) {
            	scope.error = elem.find('input').controller('ngModel').$error;
//            	scope.callback = function($file, $invalidFiles) {
//            		debugger
//                    scope.funcUploadCallback($file, $invalidFiles);
//            	} 
            	scope.$watch("fileModel", function() {
                    console.log("Changed");
                    printFilename();
                 }, true);
            	
            	scope.remove = function(f) {
            		let index = scope.fileModel.indexOf(f);
            		scope.fileModel.splice(index, 1);
            		console.log(scope.fileModel);
            		printFilename();
            	}
            	
            	scope.removeInvalid = function(f) {
            		let index = scope.invalidFiles.indexOf(f);
            		scope.invalidFiles.splice(index, 1);
            	}
            	
            	function printFilename() {
            		if (scope.fileModel != undefined && scope.fileModel.length > 0) {
            			console.log(scope.fileModel);
            			let filenames = [];
            			angular.forEach(scope.fileModel, function(value, key) {
            				filenames.push(value.name);
          			 	});
            			
            			scope.fileNameInput = filenames.join(", ");
            		} else {
            			scope.fileNameInput = "";
            		}
            	}
            	
//            	scope.printFilename = function() {
//            		if (scope.fileModel != undefined) {
//            			debugger
//            			console.log(scope.fileModel);
//            			let filenames = [];
//            			angular.forEach(data, function(value, key) {
//            				filenames.push(value.name);
//          			 	});
//            			
//            			return filenames.join(", ");
//            		}
//            		
//            		return "";
//            	}
            }
        };

        return directive;
    }

})();
