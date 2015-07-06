/*global
    define,
    attachments_server,
    template
*/

'use strict';

define(function(require) {

    var slider_tpl = require('./slider-tpl.html'),
        player_tpl = require('./player-tpl.html'),
        items = [],
        options = {},
        date;


    return function Main_Slider(opts) {

        options = $.extend({}, opts);

        return {

            init: function(data) {
                data.forEach(function (item) {
                    item.onclick = item.header_location ? 'window.location=' + item.header_location : '';
                    item.provider = attachments_server;
                    item.style = item.youtube_link ? '' : 'display:none';
                    item.youtube_link = item.youtube_link ? item.youtube_link : '';
                    item.thumb = 'https://i.ytimg.com/vi/' + item.youtube_link.replace('https://www.youtube.com/watch?v=', '') + '/default.jpg';
                    date = new Date(item.upload_date * 1000);
                    item.link = 'http://cdn.gamers.tm/' + date.getFullYear() + '/' + ('00' + (date.getMonth() + 1)).slice(-2) + '/' + item.data_id + '_' + item.file_hash + '.jpg';
                    item.cursorvalue = item.header_location ? 'cursor: pointer;' : 'cursor: default;';
                    //push the item to render later
                    items.push(template(slider_tpl, item));
                });
                return this;
            },

            mount: function($container) {
                $container.html(items);
                $container.bxSlider({
                    captions: true,
                    auto: true
                });

                $container.find('.tooltip').tooltipster({contentAsHTML: true});

                $(document).on('click', '.slider-item .play', function() {
                    var vid = $(this).attr('data-vid');
                    if (vid.trim().length) {
                        vid = vid.split('?')[1].split('=');
                        vid = vid[vid.indexOf('v') + 1].split('#')[0];
                        var html = template(player_tpl, {
                            video: '//www.youtube.com/embed/' + vid + '?autoplay=1'
                        });
                        $('#container .bx-wrapper:first').prepend(html).promise().done(function() {
                            $('.bx-wrapper .video-player iframe').css('margin-top', ($(window).height() - $(
                                '.bx-wrapper iframe').height()) / 2);
                            $('.bx-wrapper .video-player .close').css('margin-top', ($(window).height() - $(
                                '.bx-wrapper iframe').height()) / 2);
                        });
                    }
                });

                $(document).on('click', '.bx-wrapper .close', function() {
                    $('#container .bx-wrapper .video-player').remove();
                });
            }
        };
    };
});
