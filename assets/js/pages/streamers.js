/*global
    io,
    socket_server,
    attachments_server,
    page_data: true
*/

'use strict';

define('streamers', function(require) {

    page_data = $.parseJSON(page_data);

    var Tabs = require('Tabs/index'),
        List_Slider = require('List_Slider/index'),
        socket = io.connect(socket_server),
        main_tab = new Tabs({
            hash_change: false
        }),
        live_slider = new List_Slider({
            per_slider: 12,
            item_template: require('text!./templates/streamers-video.html'),
            $list_container: $('<ul class="list clearFix"/>')
        }),
        transform_streamers = function(streamers) {
            return [].concat(transform_youtube_streamers(streamers.youtube || []))
                .concat(transform_twitch_streamers(streamers.twitch || []))
                .concat(transform_hitbox_streamers(streamers.hitbox || []));
        },
        transform_youtube_streamers = function(data) {
            return data.map(function(item) {
                item.id = 'YT' + item.username;
                item.idraw = item.youtube.id;
                item.live = 'live';
                // item.link = origin +
                //     (lanparty && typeof lanparty !== 'undefined' ?
                //         'lanparty_stream_multi/#/' + item.id :
                //         'gamer_stream/?user=' + item.user_id + '/#!/' + item.id);
                item.provider = attachments_server;
                item.thumb = item.youtube.snippet.thumbnails.high.url;
                item.title = item.youtube.snippet.title;
                item.bust = 1;
                item.type = 'YT';
                item.views = '0';
                return item;
            });
        },
        transform_twitch_streamers = function(data) {
            return data.map(function(item) {
                item.twitchid = item.field_value[item.field_value.length - 1];
                item.id = 'TW' + item.twitchid;
                item.idraw = item.twitchid;
                item.live = 'live';
                // item.link       = origin +
                //     (lanparty && typeof lanparty !== 'undefined' ?
                //     'lanparty_stream_multi/#/' + item.id :
                //     'gamer_stream/?user=' + item.user_id + '/#!/' + item.id);
                item.provider = attachments_server;
                item.thumb = item.twitch.preview.large;
                item.title = item.twitch.channel.status;
                item.bust = 1;
                item.type = 'TW';
                item.views = item.twitch.viewers;
                return item;
            });
        },
        transform_hitbox_streamers = function(data) {
            return data.map(function(item) {
                item.hitboxid = item.hitbox.livestream[0].media_name;
                item.id = 'HB' + item.hitboxid;
                item.username = item.user.username;
                item.user_id = item.user.user_id;
                item.idraw = item.hitboxid;
                item.live = 'live';
                // item.link = origin + 'gamer_stream/?user=' + item.user.user_id + '/#!/' + item.id;
                item.provider = attachments_server;
                item.thumb = 'http://edge.sf.hitbox.tv/' + item.hitbox.livestream[0].media_thumbnail_large;
                item.title = item.hitbox.livestream[0].media_status;
                item.bust = 1;
                item.type = 'HB';
                item.views = item.hitbox.livestream[0].media_views;
                item.provider = attachments_server;
                return item;
            });
        },
        render = function(streamers) {
            live_slider
                .init(transform_streamers(streamers))
                .mount($('#container-videos'));
        };

    socket.on('message', function(e) {
        render(e.streamers);
    });

    main_tab
        .init()
        .addTab('tab-2-1', '直播', 'tab-2-1', $('<div id="container-videos"/>'))
        .addTab('tab-2-2', 'Lan Party', 'tab-2-2', $('<div id="container-lanparty"/>'))
        .addTab('tab-2-3', '活動內容', 'tab-2-3', $('<div id="container-multiview"/>'))
        .mount($('#video-stream-tabs'));

    require('Footer/index');
    require('Sub_Nav/index');
});


require(['streamers']);
