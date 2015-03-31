/*global
    template
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
                items = [
                    {
                        id: 'all',
                        label: 'All'
                    },
                    {
                        id: 'xbox360',
                        label: 'Xbox 360'
                    },
                    {
                        id: 'xbox1',
                        label: 'Xbox One'
                    },
                    {
                        id: 'ps3',
                        label: 'PS3'
                    },
                    {
                        id: 'ps4',
                        label: 'PS4'
                    },
                    {
                        id: 'pc',
                        label: 'PC'
                    },
                    {
                        id: 'mobile_app',
                        label: 'Mobile Game'
                    },
                    {
                        id: 'vlogs',
                        label: 'Vlogs'
                    }
                ],
                options = $.extend({}, defaults, opts),
                $list_container = $('<ul class="clearFix"/>');

            return {

                $el: null,

                init: function() {

                    items.forEach(function(item, i) {
                        item._index = i;
                        $list_container.append(
                            template(
                                '<li>' +
                                    '<a href="#!/console/{{ID}}"" title="{{LABEL}}" data-index="{{_INDEX}}">'+
                                        '{{LABEL}}'+
                                    '</a>' +
                                '</li>',
                                item
                            )
                        );
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
                        options.onChange(items[$(this).data('index')]);
                    });

                }
            };

        };
    }
);