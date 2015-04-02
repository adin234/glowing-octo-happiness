'use strict';

define([], function() {

    return function(element, method, cb) {
        var origMethod = $.fn[method];

        $.fn[method] = function () {
            if (cb) {
                return origMethod.apply(this, arguments).one(method, cb).trigger(method);
            } else {
                return origMethod.apply(this, arguments).trigger(method);
            }
        };
    };
});