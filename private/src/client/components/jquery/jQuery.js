/**
 * Created by syzer on 9/22/2014.
 */
angular
    .module('jQuery', [])
    .factory('$', function () {
        'use strict';

        if (!window.$) {
            console.error('No jquery!');
        }

        return window.$; // assumes underscore has already been loaded on the page
    });
