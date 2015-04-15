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
        video_tmpl = require('text!./templates/streamers-video.html'),
        multiview_video_tmpl = require('text!./templates/streamers-video-multiview.html'),
        live_mounted = false,
        multi_view_items = [],
        main_tab = new Tabs({hash_change: false}),
        live_slider = new List_Slider({
            per_slider: 12,
            item_template: video_tmpl,
            $list_container: $('<ul class="list clearFix"/>'),
            after_mount: function() {

                $('a.addToMultiview').on('click', function(e) {
                    e.preventDefault();

                    var $this = $(this),
                        stream_type = $this.data('stream-type'),
                        key = $this.data('key');

                    $this.parent().hide();

                    multi_view_items.push(
                        page_data.streamers[stream_type][key]
                    );

                    multiview_slider.reload(multi_view_items);
                });

            }
        }),
        lanparty_slider = new List_Slider({
            per_slider: 12,
            item_template: video_tmpl,
            $list_container: $('<ul class="list clearFix"/>')
        }),
        multiview_slider = new List_Slider({
            per_slider: 12,
            item_template: multiview_video_tmpl,
            $list_container: $('<ul class="list clearFix"/>'),
            after_mount: function() {

                $('#container-multiview').on('click', '.remove-multiview', function (e) {
                    e.preventDefault();

                    var $this = $(this),
                        stream_id = $this.parent().data('streamid');

                    $this.parent().hide();

                    multi_view_items = multi_view_items.filter(function(item) {
                        return item.id !== stream_id;
                    });

                    multiview_slider.reload(multi_view_items);
                });

            }
        }),
        transform_streamers = function(streamers) {
            return [].concat(transform_youtube_streamers(streamers.youtube || []))
                .concat(transform_twitch_streamers(streamers.twitch || []))
                .concat(transform_hitbox_streamers(streamers.hitbox || []));
        },
        transform_youtube_streamers = function(data) {
            return data.map(function(item, i) {
                item.key = i;
                item.stream_type = 'youtube';
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
            return data.map(function(item, i) {
                item.key = i;
                item.stream_type = 'twitch';
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
            return data.map(function(item, i) {
                item.key = i;
                item.stream_type = 'hitbox';
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
        };

       
    socket.on('message', function(e) {
        if (!live_mounted) {
            live_slider.init(transform_streamers(e.streamers))
                .mount($('#container-videos'));
            live_mounted = true;
        } else {
            live_slider.reload(transform_streamers(e.streamers));
        }

        page_data = e;
    });

    main_tab
        .init()
        .addTab('tab-2-1', '直播', 'tab-2-1', $('<div id="container-videos"/>'))
        .addTab('tab-2-2', 'Lan Party', 'tab-2-2', $('<div id="container-lanparty"/>'))
        .addTab('tab-2-3', '活動內容', 'tab-2-3', $('<div id="container-multiview"/>'))
        .mount($('#video-stream-tabs'));

    multiview_slider
        .init(multi_view_items)
        .mount($('#container-multiview'));

    require('Footer/index');
    require('Sub_Nav/index');
});


require(['streamers']);
