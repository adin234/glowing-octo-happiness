/*global
    define,
    template
*/

'use strict';

define(
    [
        'text!common/templates/tab-nav.html'
    ],
    function(tab_nav_tpl) {
        var nav_el = null,
            contents = [];
        
        return {
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

                contents.push(
                    $('<div id="'+id+'"/>').append($content)
                );
                return this;
            },

            mount: function($container) {
                if (!nav_el) {
                    this.init();
                }

                $container.append(nav_el);
                contents.forEach(function(el) {
                    $container.append(el);
                });

                $container.tabslet({animation: true});

                return this;
            }
        };
    }
);