(function() {
    'use strict';

    angular
        .module('app')
        .config(paginationConfig);

    paginationConfig.$inject = ['uibPaginationConfig', 'PAGINATION_CONSTANTS'];

    function paginationConfig(uibPaginationConfig, PAGINATION_CONSTANTS) {
        uibPaginationConfig.itemsPerPage = PAGINATION_CONSTANTS.itemsPerPage;
        uibPaginationConfig.maxSize = 5;
        uibPaginationConfig.boundaryLinks = true;
        uibPaginationConfig.firstText = '«';
        uibPaginationConfig.previousText = '‹';
        uibPaginationConfig.nextText = '›';
        uibPaginationConfig.lastText = '»';
    }
})();
