'use strict';

define(function() {

    return function Item_Selector(opts) {
        var defaults = {
            onSelect: function() {}
        },
        options = $.extend({}, defaults, opts),
        active;

        return {

            $el: null,

            applyTo: function($el) {
                console.log($el);
                this.$el = $el;

                $(window).on('hashchange', this.refresh_active.bind(this));

                this.refresh_active();
            },

            refresh_active: function() {
                var active_hash = window.location.hash
                                    .split('/')
                                    .pop(),
                    $active_el = this.$el.find('img[data-id="'+active_hash+'"]');
                    
                if ($active_el.length) {
                    this.$el.find('li').removeClass('active');
                    $active_el.closest('li').addClass('active');
                    active = $active_el.data('id');
                    options.onSelect(active);
                }                
            },

            get_active: function() {
                return active;
            }
        };
    };
});