/*global
    template
*/

'use strict';

define(function() {

    return function Global_Filter(opts) {

        var defaults = {
                onChange: function() {}
            },
            items = [
                {
                    id: 'all',
                    label: 'All',
                    href: '#!/console/all'
                },
                {
                    id: 'xbox360',
                    label: 'Xbox 360',
                    href: '#!/console/xbox360'
                },
                {
                    id: 'xbox1',
                    label: 'Xbox One',
                    href: '#!/console/xbox1'
                },
                {
                    id: 'ps3',
                    label: 'PS3',
                    href: '#!/console/ps3'
                },
                {
                    id: 'ps4',
                    label: 'PS4',
                    href: '#!/console/ps4'
                },
                {
                    id: 'pc',
                    label: 'PC',
                    href: '#!/console/pc'
                },
                {
                    id: 'mobile_app',
                    label: 'Mobile Game',
                    href: '#!/console/mobile_app'
                },
                {
                    id: 'vlogs',
                    label: 'Vlogs',
                    href: '#!/console/vlogs'
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
                                '<a href="{{HREF}}" title="{{LABEL}}" data-index="{{_INDEX}}">'+
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

                this.$el.html($list_container);

                this.refresh_active();
                
                this.init_listeners();

                return this;
            },

            init_listeners: function() {

                // $list_container.find('li > a').on('click', function(e) {
                //     e.preventDefault();
                //     window.location.hash = $(this).attr('href');
                //     options.onChange(items[$(this).data('index')]);
                // });

                $(window).on('hashchange', this.refresh_active);
            },

            refresh_active: function() {
                var active_hash = window.location.hash
                            .split('/')
                            .slice(0, 3)
                            .join('/'),
                    $active =$list_container.find('a[href="'+active_hash+'"]');

                $active = $active.length ? $active : $list_container.find('li > a').first();

                if ($active.parent().hasClass('current')) {
                    return;
                }

                $list_container.find('li').removeClass('current');
                $active.parent().addClass('current');
                options.onChange(items[$active.data('index')]);
            }
        };

    };
});