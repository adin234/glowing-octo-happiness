/*global
    origin,
    socketConnect,
    attachments_server,
    page_data: true
*/

'use strict';

define('streamers', function(require) {

    page_data = $.parseJSON(page_data);
    page_data._live = [];
    page_data._lanparty = [];
    page_data._multiview = [];

    var Tabs = require('Tabs/index'),
        List_Slider = require('List_Slider/index'),
        socket = socketConnect(),
        video_tmpl = require('text!./templates/streamers-video.html'),
        multiview_video_tmpl = require('text!./templates/streamers-video-multiview.html'),
        live_mounted = false,
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

                    page_data._multiview.push(
                        page_data[stream_type][key]
                    );

                    multiview_slider.reload(page_data._multiview);

                    //open the multiview tab when all videos is added
                    if (page_data._live.length === page_data._multiview.length) {
                        $('#video-stream-tabs').find('a[href="#tab-2-3"]').trigger('click');
                    }
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

                $('#container-multiview .remove-multiview').on('click', function (e) {
                    e.preventDefault();

                    var $this = $(this),
                        stream_id = $this.parent().data('streamid');

                    $this.parent().hide();

                    page_data._multiview = page_data._multiview.filter(function(item) {
                        return item.id !== stream_id;
                    });

                    multiview_slider.reload(page_data._multiview);

                    $('#container-videos a[data-streamid="'+stream_id+'"]').parent().show();
                });

                $('#multiview-count').html(page_data._multiview.length);

                if (page_data._multiview.length) {
                    $('#watch-now-link').attr(
                        'href',
                        '/gamer_stream_multi/#!/' + page_data._multiview.map(function(item) {
                            return item.id;
                        }).join('/')
                    );
                } else {
                     $('#watch-now-link').attr('href', '#');
                }
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
                item.idraw = item.username;
                item.live = 'live';
                item.link = origin + '/gamer_stream/?user=' + item.user_id + '/#!/' + item.id;
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
                item.link = origin + '/gamer_stream/?user=' + item.user_id + '/#!/' + item.id;
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
                item.link = origin + '/gamer_stream/?user=' + item.user.user_id + '/#!/' + item.id;
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
        filter_lanparty = function(collection) {
            var new_collection = [];
            collection.forEach(function(streamer, i) {
                if (~streamer.title.search(/lanparty/i)) {
                    streamer.link = origin + 'lanparty_stream_multi/#/' + streamer.id;
                    new_collection.push(streamer);
                    delete collection[i];
                }
            });
            return new_collection;
        },
        separate_lan_party_streams = function (streamers) {
            page_data.youtube = streamers.youtube;
            page_data.hitbox = streamers.hitbox;
            page_data.twitch = streamers.twitch;
            page_data._live = transform_streamers(streamers);
            page_data._lanparty = filter_lanparty(page_data._live);
        };

       
    socket.on('message', function(e) {

        separate_lan_party_streams(e.streamers);

        if (!live_mounted) {
            live_slider.init(page_data._live)
                .mount($('#container-videos'));
            live_mounted = true;
        } else {
            live_slider.reload(page_data._live);
        }

        lanparty_slider.reload(page_data._lanparty);
    });

    main_tab
        .init()
        .addTab('tab-2-1', '直播', 'tab-2-1', $('<div id="container-videos"/>'))
        .addTab('tab-2-2', 'Lan Party', 'tab-2-2', $('<div id="container-lanparty"/>'))
        .addTab(
            'tab-2-3',
            'Multiview <small id="multiview-count">0</small>',
            'tab-2-3',
            $('<div id="container-multiview"/>'
        ))
        .mount($('#video-stream-tabs'));

    //append the watchnow link
    $('#tab-2-3').append(
        '<a href="#" id="watch-now-link" title="Watch Now" class="watchNow disabled">觀看直播</a>'
    );

    multiview_slider
        .init(page_data._multiview)
        .mount($('#container-multiview'));

    lanparty_slider
        .init(page_data._lanparty)
        .mount($('#container-lanparty'));

    require('Footer/index');
    require('Sub_Nav/index');
});


require(['streamers']);
