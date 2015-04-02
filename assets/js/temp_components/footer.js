/*global
    template,
    utilHash
*/

'use strict';

define(
    [
        'text!components/templates/footer.html'
    ],
    function() {


        return function Footer(opts) {
            
        var nav_el = null,
            contents = {},
            hashLocation = utilHash.getHash();

            return {

                $el: null,

                createFooter: function(href, content) {
                    contents[href] = $('<footer class="clearFix"/>').html(content);
                    return this;
                },


                mount: function($container) {
                    this.$el = $container;

                    this.$el.append(nav_el);

                    for (var i in contents) {
                        this.$el.append(contents[i]);
                    }

                    this.$el.tabslet({animation: true});
                    
                    if (hashLocation !== '') {
                        $('[href=' + hashLocation + ']', this.$el).trigger('click');
                    }

                    this.add_listeners();

                    return this;
                },

                add_listeners: function() {

                    if (options.hash_change) {
                        nav_el.find('a').on('click', function() {
                            window.location.hash = $(this).attr('href');
                        });
                    }

                }

            };

        };
    }
);
