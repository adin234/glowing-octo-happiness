/*global
    define,
    attachments_server,
    template
*/

'use strict';

define(
    [
        'text!components/templates/slider-tpl.html'
    ],
    function(slider_tpl) {

        var items = [],
            options = {},
            date;


        return function Main_Slider(opts) {

            options = $.extend({}, opts);

            return {

                init: function(data) {
                    data.forEach(function (item) {
                        item.onclick = 
                            item.header_location ?
                                'window.location=\'' +
                                    item.header_location + '\'' :
                                '';
                        item.provider = attachments_server;
                        item.style = item.youtube_link ? '' : 'display:none';
                        item.youtube_link = item.youtube_link ? item.youtube_link : '';
                        item.thumb = 'https://i.ytimg.com/vi/' + item.youtube_link.replace(
                            'https://www.youtube.com/watch?v=', '') + '/default.jpg';
                        date = new Date(item.upload_date * 1000);
                        item.link = 'http://cdn.gamers.tm/' + date.getFullYear() + '/' + ('00' + (date.getMonth() + 1))
                            .slice(-2) + '/' + item.data_id + '_' + item.file_hash + '.jpg';
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
                }
            };
        };
    }
);