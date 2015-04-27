/*global
    template,
    utilHash
*/

'use strict';

define(function(require) {

    var tab_nav_tpl = require('./tab-tpl.html');

    return function Tabs(opts) {
        
    var $nav_el = null,
        contents = {},
        defaults = {
            className: 'tab clearFix',
            template: tab_nav_tpl,
            hash_change: true,

            //callbacks
            after_mount: function() {}
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

                this.$el.html($nav_el);

                for (var i in contents) {
                    this.$el.append(contents[i]);
                }

                this.$el.tabslet({animation: true});
                
                if (hashLocation !== '') {
                    $nav_el.find('a[href="' + hashLocation + '"]').trigger('click');
                }

                this.add_listeners();

                options.after_mount();

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
});
