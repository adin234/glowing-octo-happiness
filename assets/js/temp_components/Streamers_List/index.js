/*global 
    io,
    socket_server,
    attachments_server,
    origin,
    template,
    JST
*/

'use strict';

define(function(require) {

    var socket = io.connect(socket_server),
        online_streamers = [],
        streamers_tpl = require('text!./streamers-tpl.html');

    socket.on('message', function (e) {
        online_streamers = [];
        online_streamers = online_streamers.concat(
            e.streamers.youtube.concat(
                e.streamers.twitch.concat(
                    e.streamers.hitbox
                )
            )
        );
        index_show_streamers(online_streamers);
    });

    var index_show_streamers = function (streamers_list) {
        var html = [];
        if (streamers_list.length > 0) {
            if ($('#noonline').length > 0) {
                $('#noonline').remove();
            }

            streamers_list.forEach(function (item) {
                if (typeof item.twitch !== 'undefined') {
                    item.twitchid = item.field_value[
                        item.field_value.length - 1
                    ];
                    item.id = 'TW' + item.twitchid;
                    item.idraw = item.twitchid;
                    item.live = 'live';
                    item.game = item.twitch.game;
                    item.link = origin + 'gamer_stream/?user=' +
                        item.user_id + '/#!/' + item.id;
                    item.provider = attachments_server;
                    item.thumb = item.twitch.preview.large;
                    item.title = item.twitch.channel.status;
                    item.bust = 1;
                    item.views = item.twitch.viewers;
                }
                else if (typeof item.hitbox !== 'undefined') {
                    item.hitboxid = item.hitbox.media_name;
                    item.id = 'HB' + item.hitboxid;
                    item.game = item.hitbox.livestream[0].category_name;
                    item.username = item.user.username;
                    item.user_id = item.user.user_id;
                    item.idraw = item.hitboxid;
                    item.live = 'live';
                    item.link = origin + 'gamer_stream/?user=' +
                        item.user.user_id + '/#!/HB' +
                        item.hitbox.livestream[0].media_user_name;
                    item.provider = attachments_server;
                    item.thumb = 'http://edge.sf.hitbox.tv/' +
                        item.hitbox.media_thumbnail_large;
                    item.title = item.hitbox.media_status;
                    item.bust = 1;
                    item.type = 'HB';
                    item.views = item.hitbox.media_views;
                    item.provider = attachments_server;
                }
                else {
                    item.id = 'YT' + item.username;
                    item.idraw = item.username;
                    item.live = 'live';
                    item.game = '';
                    item.link = origin + 'gamer_stream/?user=' +
                        item.user_id + '/#!/' + item.id;
                    item.provider = attachments_server;
                    item.thumb = item.youtube.snippet.thumbnails.high.url;
                    item.title = item.youtube.snippet.title;
                    item.bust = 1;
                    item.views = '0';
                }

                item.game = item.game === null ? '' : item.game + ' / ';

                if (item.game.length > 10) {
                    item.game = item.game.substr(0, 9) + '&#133;' + ' / ';
                }

                if (item.username !== null && item.username.length > 10) {
                    item.username = item.username.substr(0, 9) + '&#133;';
                }

                html.push(template(streamers_tpl, item));
            });
        }
        else {
            html.push('<p id="noonline"> 目前沒有人直播 </p>');
        }

        $('#streamers').html(html.join(''));
        
        // load_more('#streamers > li', 1, 5);
        
        $('.streaming .scroll').mCustomScrollbar({
            theme: 'inset-2'
        });
    };

});