'use strict';

define(
    function() {
        return function Will_Play() {
            return ~window.location.hash.indexOf('video/');
        };
    }
);
