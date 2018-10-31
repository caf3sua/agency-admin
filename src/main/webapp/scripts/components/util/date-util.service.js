(function() {
    'use strict';

    angular
        .module('app')
        .factory('DateUtils', DateUtils);

    DateUtils.$inject = ['$filter'];

    function DateUtils($filter) {

        var service = {
            convertDateTimeFromServer: convertDateTimeFromServer,
            convertLocalDateFromServer: convertLocalDateFromServer,
            convertLocalDateToServer: convertLocalDateToServer,
            dateformat: dateformat,
            convertDate: convertDate,
            monthDiff : monthDiff,
            yearDiff : yearDiff,
            dateDiff : dateDiff,
            parseDate : parseDate,
        };

        return service;

        function convertDateTimeFromServer(date) {
            if (date) {
                return new Date(date);
            } else {
                return null;
            }
        }

        function convertLocalDateFromServer(date) {
            if (date) {
                var dateString = date.split('-');
                return new Date(dateString[0], dateString[1] - 1, dateString[2]);
            }
            return null;
        }

        function convertLocalDateToServer(date) {
            if (date) {
                return $filter('date')(date, 'yyyy-MM-dd');
            } else {
                return null;
            }
        }

        function dateformat() {
            return 'yyyy-MM-dd';
        }

        function convertDate(d) {
            var month = String(d.getMonth() + 1);
            var day = String(d.getDate());
            const year = String(d.getFullYear());

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            return day + "/" + month + "/" + year;
        }

        function monthDiff(date1, date2) {
            var from = date1.split("/");
            var to = date2.split("/");
            var d1 = new Date(from[2], from[1] - 1, from[0]);
            var d2 = new Date(to[2], to[1] - 1, to[0]);

            var months;
            months = (d2.getFullYear() - d1.getFullYear()) * 12;
            months -= d1.getMonth() + 1;
            months += d2.getMonth();
            return months <= 0 ? 0 : months;
        }

        function yearDiff(date1, date2) {
            var from = date1.split("/");
            var to = date2.split("/");
            var d1 = new Date(from[2], from[1] - 1, from[0]);
            var d2 = new Date(to[2], to[1] - 1, to[0]);

            var years;
            years = d2.getFullYear() - d1.getFullYear();
            return years;
        }

        function dateDiff(date1Str, date2Str) {
            var date1 = parseDate(date1Str);
            var date2 = parseDate(date2Str);
            date1.setHours(0);
            date1.setMinutes(0, 0, 0);
            date2.setHours(0);
            date2.setMinutes(0, 0, 0);
            var datediff = Math.abs(date1.getTime() - date2.getTime()); // difference
            return parseInt(datediff / (24 * 60 * 60 * 1000), 10); //Convert values days and return value
        }

        function parseDate(d) {
            var dateStr = d.split("/");
            return new Date(dateStr[2], dateStr[1] - 1, dateStr[0]);
        }
    }

})();
