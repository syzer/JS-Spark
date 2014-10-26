/**
 * Created by syzer on 5/12/2014.
 */
// assumes underscore has already been loaded on the page
angular
    .module('_', [])
    .factory('_', function () {
        var _ = window._;
        var isNumerical = function (string) {
            return !_.isNaN(_.parseInt(string));
        };
        // new Date will not interpolate
        var isISODate = function (string) {
            return !_.isNaN(Date.parse(string));
        };
        _.mixin({
            isNumerical: isNumerical,
            isISODate: isISODate
        });

        return _;
    });
