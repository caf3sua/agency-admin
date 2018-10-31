(function () {
    'use strict';

    angular
        .module('app')
        .config(pagerConfig);

    pagerConfig.$inject = ['uibPagerConfig', 'PAGINATION_CONSTANTS'];

    function pagerConfig(uibPagerConfig, PAGINATION_CONSTANTS) {
        uibPagerConfig.itemsPerPage = PAGINATION_CONSTANTS.itemsPerPage;
        uibPagerConfig.previousText = '«';
        uibPagerConfig.nextText = '»';
    }
})();
