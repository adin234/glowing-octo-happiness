/*global
    define
*/

'use strict';

define(
    [

    ],
    function() {

        return function Global_Filter(opts) {

            var defaults = {
                    onChange: function() {}
                },
                items = ['All', 'Xbox 360', 'Xbox One', 'PS3', 'PS4', 'PC', 'Mobile Game', 'Vlogs'],
                options = $.extend({}, defaults, opts),
                $list_container = $('<ul class="clearFix"/>'),
                stringToSlug = function(str) {
                    return str
                        .toLowerCase()
                        .replace(/[^\w ]+/g,'')
                        .replace(/ +/g,'-');
                };

            return {

                $el: null,

                init: function() {

                    items.forEach(function(category) {
                        $list_container.append(
                            '<li>' +
                                '<a href="#!/'+stringToSlug(category)+'" title="'+category+'">'+category+'</a>' +
                            '</li>');
                    });

                    return this;
                },

                mount: function($container) {

                    this.$el = $container;

                    this.$el.append($list_container);

                    this.init_listeners();

                    $list_container.find('li').first().addClass('current');

                    return this;
                },

                init_listeners: function() {

                    $list_container.find('li > a').on('click', function(e) {
                        e.preventDefault();
                        $list_container.find('li').removeClass('current');
                        $(this).parent().addClass('current');
                        window.location.hash = $(this).attr('href');
                        options.onChange(this.title);
                    });

                }
            };

        };
    }
);