/*global
    template
*/

'use strict';

define([], function() {

    return function List_Slider(opts) {

        var defaults = {
                template: '',
                per_slider: 12,
                $list_container: $('<ul />')
            },
            options = $.extend({}, defaults, opts),
            array_chunk = function(array, size) {
                var result = [];
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
                            .append(template(options.template, item))
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

                this.$el.find('li > img').tooltipster({contentAsHTML: true});

                this.$el.reloadSlider({
                    startSlide: 0,
                    infiniteLoop: false,
                    hideControlOnEnd: true
                });
            },

            mount: function($container) {

                this.$el.children().appendTo($container);

                this.$el = $container;

                this.$el.find('li > img').tooltipster({contentAsHTML: true});

                this.$el.bxSlider({
                    startSlide: 0,
                    infiniteLoop: false,
                    hideControlOnEnd: true
                });

                return this;
            }
        };
    };
});