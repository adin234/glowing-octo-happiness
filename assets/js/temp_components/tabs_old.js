/*global
    template,
    utilHash
*/

'use strict';

define(
    [
        'text!components/templates/tab-nav.html'
    ],
    function(tab_nav_tpl) {


        return function Tabs(opts) {
            
        var $nav_el = null,
            contents = {},
            defaults = {
                className: 'tab clearFix',
                template: tab_nav_tpl,
                hash_change: true
            },
            options = $.extend({}, defaults, opts),
            hashLocation = utilHash.getHash();

            return {

                $el: null,

                init: function() {
                    $nav_el = $('<ul class="'+options.className+'"/>');
                    return this;
                },

                addTab: function(href, title, id, content) {
                    contents[href] = $('<div id="'+href+'"/>').html(content);

                    $nav_el.append(
                        template(options.template, {
                            href: href,
                            title: title,
                            id: id,
                            label: title
                        })
                    );

                    return this;
                },


                mount: function($container) {
                    this.$el = $container;

                    if (!$nav_el) {
                        this.init();
                    }

                    this.$el.append($nav_el);

                    for (var i in contents) {
                        this.$el.append(contents[i]);
                    }

                    this.$el.tabslet({animation: true});

                    // $nav_el.find('a').first().trigger('click');
                    
                    if (hashLocation !== '') {
                        $nav_el.find('a[href="' + hashLocation + '"]').trigger('click');
                    }

                    this.add_listeners();

                    return this;
                },

                add_listeners: function() {

                    if (options.hash_change) {
                        $nav_el.find('a').on('click', function() {
                            window.location.hash = $(this).attr('href');
                        });
                    }

                }

            };

        };
    }
);
