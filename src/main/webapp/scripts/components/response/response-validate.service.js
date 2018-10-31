(function() {
    'use strict';

    angular
        .module('app')
        .factory('ResponseValidateService', ResponseValidateService);

    ResponseValidateService.$inject = [];

    function ResponseValidateService () {
        var service = {
            validateResponse: validateResponse,
            cleanResponseError: cleanResponseError,
            cleanAllResponseError: cleanAllResponseError
        };

        return service;
        
        function cleanAllResponseError() {
        	$('.validationMessage').remove();
        }
        
        function cleanResponseError(fieldName) {
        	var modelName = 'vm.product.' + fieldName;
        	var element = angular.element('[ng-model="' + modelName + '"]');
        	
        	// Remove old validation message
        	element.parent().children('.control-label.has-error.validationMessage').remove();
        	element.parent().removeClass('has-error');
        }

        function validateResponse(data) {
        	var modelName = 'vm.product.' + data.fieldName;
        	var element = angular.element('[ng-model="' + modelName + '"]');

        	// Remove old validation message
        	element.parent().children('.control-label.has-error.validationMessage').remove();
        	element.parent().removeClass('has-error');
        	$('#response-error-id').remove();
        	
        	// Build and append new message
        	element.parent().addClass('has-error');
        	element.addClass('data-invalid');
        	var elementName = "[name='" + data.fieldName + "']";
        	var message = data.message;
        	if(!message) {
                message = "Dữ liệu không hợp lệ!";
            }
        	
        	$("<label id='response-error-id' class='control-label has-error validationMessage'>" + message + "</label>").insertAfter(elementName);

        	return data.message;
        }
    }
})();
