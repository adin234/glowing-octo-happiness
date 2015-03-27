/*global
    template
*/

'use strict';

define(
    [
        'text!common/templates/tab-nav.html'
    ],
    function(tab_nav_tpl) {

        var nav_el = null,
            contents = {};

        return function Tabs() {

            return {

                $el: null,

                init: function() {
                    nav_el = $('<ul class="tab clearFix"/>');
                    return this;
                },

                addTab: function(id, label, $content) {

                    nav_el.append(
                        template(tab_nav_tpl, {
                            id: id,
                            label: label
                        })
                    );

                    contents[id] = $('<div id="'+id+'"/>').append($content);

                    return this;
                },


                mount: function($container) {
                    this.$el = $container;

                    if (!nav_el) {
                        this.init();
                    }

                    this.$el.append(nav_el);

                    for (var i in contents) {
                        this.$el.append(contents[i]);
                    }

                    this.$el.tabslet({animation: true});

                    return this;
                }

            };

        };
    }
);
