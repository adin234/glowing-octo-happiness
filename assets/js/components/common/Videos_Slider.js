/*global
    define,
    attachments_server,
    template
*/

'use strict';

define(
    [
        'common/jquery.method.events',
        'text!common/templates/video-slide.html'
    ],
    function(listen_to, video_tpl) {

        return function(opts) {

            var items = [],
                defaults = {
                    max_items: 9
                },
                options = $.extend({}, defaults, opts);

            return {

                $el: null,

                init: function(data) {
                    data = data || [];
                    data.splice(options.max_items, data.length); //limit the data to 9 for now

                    data.forEach(function (item) {
                        item.provider = attachments_server;
                        item.thumb = item.snippet.thumbnails.medium.url;
                        item.title = item.snippet.title;
                        item.bust = 1;
                        item.anytv_comment = item.anytv_comment || 0;
                        item.comments = item.snippet.meta.statistics.commentCount;
                        item.views = item.snippet.meta.statistics.viewCount;
                        item.link = '/youtuber/?user=' + item.user_id + '#!/video/' + item.snippet.resourceId.videoId;
                        //push the item to render later
                        items.push(template(video_tpl, item));
                    });

                    return this;
                },


                mount: function($container) {

                    this.$el = $container;

                    this.$el.html(items);

                    this.$el.bxSlider({
                        captions: true,
                        auto: true
                    });

                    return this;
                }
            };
        };
    }
);