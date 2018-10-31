(function() {
    'use strict';

    angular
        .module('app')
        .directive('contactPanel', contactPanel);
    
    function contactPanel () {
        var directive = {
            restrict: 'E',
            scope: {
                id: '@',
                isShowRequesterInfo: '=',
                isSameRequesterInfo: '=',
                title: '@',
                contactName: '=',
                contactRole: '=',
                contactTaxNo: '=',
                contactAddress: '=',
                contactAddressDistrict: '=',
                contactPhone: '=',
                contactEmail: '=',
                getRequesterInfo: '&',
                openSearchContact: '&'
            },
            templateUrl : 'apps/product/partial/partial.contact.panel.html'
        };

        return directive;
    }

})();
