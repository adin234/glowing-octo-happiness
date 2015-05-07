'use strict';

define(function() {

    return function Search_Box(opts) {

        var defaults = {
                onSelect: function() {},
                onResetInput: function() {}
            },
            options = $.extend({}, defaults, opts);

        return {
            $el: null,

            init: function(items) {
                options.lookup = items;

                return this;
            },

            applyTo: function($el) {
                this.$el = $el;

                this.$el
                    .autocomplete(options);

                this.$el.on('keyup', function () {
                    if ($(this).val() === '') {
                        options.onResetInput();
                    }
                });

                return this;
            }
        };
    };

});