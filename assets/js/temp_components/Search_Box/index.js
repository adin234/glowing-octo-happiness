'use strict';

define(function() {

    return function Search_Box(opts) {

        var defaults = {
                onSelect: function() {}
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
                // this.$el.on('keypress', function (e) {
                //     if (e.which === 13) {
                //         this.$el.val(value.data.user_id);
                //     }
                // });

                return this;
            }
        };
    };

});