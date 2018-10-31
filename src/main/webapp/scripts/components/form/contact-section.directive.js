(function() {
    'use strict';

    angular
        .module('app')
        .directive('contactSection', contactSection);
    
    function contactSection () {
        var directive = {
            restrict: 'E',
            scope: {
            	name: '@',
            	isShowExtendInfo: '=',
            	isShowExtendInfoNth: '=',
                title: '@',
                contactName: '=',
                contactDob: '=',
                contactExtendInfo: '=',
                openSearchContact: '&'
            },
            templateUrl : 'apps/product/partial/partial.contact.section.html'
        };

        return directive;
    }

})();
