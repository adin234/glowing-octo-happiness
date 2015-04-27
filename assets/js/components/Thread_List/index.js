/*global
    community,
    attachments_server,
    template
*/

'use strict';

define(function(require) {
    var thread_item_tpl = require('./thread-item.html');

    return function Thread_List() {
        var $thread_container = $('<ul class="thread-list"/>');

        return {

            $el: null,
            
            init: function(collection) {

                collection.forEach(function(item) {
                    item.link = community + 'index.php?threads/' + item.thread_id;
                    item.userlink = community + 'index.php?members/' + item.username;
                    item.posterimage = attachments_server +
                                        'avatar.php?userid=' +
                                        item.last_post_user_id + '.jpg';
                    $thread_container.append(template(thread_item_tpl, item));
                });

                return this;
            },

            mount: function($container) {

                this.$el = $container;

                this.$el.html($thread_container);

                return this;
            }
        };
    };
});