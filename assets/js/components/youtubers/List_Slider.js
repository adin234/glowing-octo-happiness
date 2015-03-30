/*global
    template,
    JST
*/

'use strict';

define([], function() {

    return function List_Slider(opts) {

        var defaults = {
                per_slider: 12,
                $list_container: $('<ul class="game clearFix"/>')
            },
            options = $.extend({}, defaults, opts),
            chunk = function(array, size) {
                var result = [];

                while(array.length) {
                    result.push(array.splice(0, array.length));
                }

                return result;
            };


        return {

            $el: null,

            init: function(collection) {

                collection.forEach(function(item) {
                    item.game = item.name;
                    item.id = item.id.trim();
                    options.$list_container.append(template(JST['gameTpl.html'](), item));
                });

                return this;
            },

            mount: function($container) {
                this.$el = $container;

                this.$el.append(options.$list_container);

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