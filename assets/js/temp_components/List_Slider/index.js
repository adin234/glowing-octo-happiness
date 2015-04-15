/*global
    template
*/

'use strict';

define(function() {

    return function List_Slider(opts) {

        var defaults = {
                per_slider: 12,
                item_template: '',
                $list_container: $('<ul />'),

                // callbacks
                after_mount: function() {},
                onSlideNext: function() {}
            },
            options = $.extend({}, defaults, opts),
            slider = null,
            array_chunk = function(array, size) {
                var result = [];
                    array = array.slice();
                while(array.length) {
                    result.push(array.splice(0, size));
                }
                return result;
            };


        return {

            $el: $('<div/>'),

            init: function(collection) {

                var self = this,
                    temp_list = null;

                collection = array_chunk(collection, options.per_slider);

                collection.forEach(function(chunk) {

                    temp_list = options.$list_container.clone();

                    chunk.forEach(function(item) {
                        temp_list
                            .append(template(options.item_template, item))
                            .appendTo(self.$el);
                    });
                });

                return this;
            },

            reload: function(collection) {

                var $old_cont = this.$el;

                this.$el.empty();

                this.$el = $('<div/>');

                this.init(collection);

                $old_cont.html(this.$el.html());

                this.$el = $old_cont;

                this.$el.reloadSlider({
                    startSlide: 0,
                    infiniteLoop: false,
                    hideControlOnEnd: true,
                    onSlideNext: options.onSlideNext
                });

                options.after_mount();

                return this;
            },

            push: function(data) {

                this.init(data);

                this.$el.reloadSlider({
                    startSlide: this.get_current_slide(),
                    infiniteLoop: false,
                    hideControlOnEnd: true,
                    onSlideNext: options.onSlideNext
                });
            },

            mount: function($container) {

                this.$el.children().appendTo($container);

                this.$el = $container;

                slider = this.$el.bxSlider({
                    startSlide: 0,
                    infiniteLoop: false,
                    hideControlOnEnd: true,
                    onSlideNext: options.onSlideNext
                });

                options.after_mount();

                return this;
            },

            get_slide_count: function() {
                return slider.getSlideCount();
            },

            get_current_slide: function() {
                return slider.getCurrentSlide();
            }
        };
    };
});