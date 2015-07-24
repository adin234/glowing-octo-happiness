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


    var Tabs = require('../components/Tabs/index'),
        List_Slider = require('../components/List_Slider/index'),
        socket = socketConnect(),
        video_tmpl = require('./templates/streamers-video.html'),
        multiview_video_tmpl = require('./templates/streamers-video-multiview.html'),
        main_tab = new Tabs({hash_change: false}),
        live_slider = new List_Slider({
            per_slider: 9,
            item_template: video_tmpl,
            $list_container: $('<ul class="list clearFix"/>'),
            after_mount: function() {

                $('#container-videos a.addToMultiview').on('click', function(e) {
                    e.preventDefault();

                    var index = $('#container-videos > ul > li').index( $(this).parent() );

                    page_data._multiview.push(
                        page_data._live.splice(index, 1)[0]
                    );

                    live_slider.reload(page_data._live);
                    multiview_slider.reload(page_data._multiview);

                    //open the multiview tab when all videos is added
                    if (page_data._live.length === $('#container-videos > ul > li:hidden').length) {
                        $('#video-stream-tabs').find('a[href="#tab-2-3"]').trigger('click');
                    }
                });

            }
        }),
        lanparty_slider = new List_Slider({
            per_slider: 9,
            item_template: video_tmpl,
            $list_container: $('<ul class="list clearFix"/>'),
            after_mount: function() {

                $('#container-lanparty a.addToMultiview').on('click', function(e) {
                    e.preventDefault();

                    var index = $('#container-lanparty > ul > li').index( $(this).parent() );

                    page_data._multiview.push(
                        page_data._lanparty.splice(index, 1)[0]
                    );

                    lanparty_slider.reload(page_data._lanparty);
                    multiview_slider.reload(page_data._multiview);

                    //open the multiview tab when all videos is added
                    if (page_data._lanparty.length === $('#container-lanparty > ul > li:hidden').length) {
                        $('#video-stream-tabs').find('a[href="#tab-2-3"]').trigger('click');
                    }
                });

            }
        }),
        multiview_slider = new List_Slider({
            per_slider: 9,
            item_template: multiview_video_tmpl,
            $list_container: $('<ul class="list clearFix"/>'),
            after_mount: function() {

                $('#container-multiview .remove-multiview').on('click', function (e) {
                    e.preventDefault();

                    var $this = $(this),
                        data = null,
                        collection = $this.parent().data('collection'),
                        slider = collection === 'lanparty' ? lanparty_slider : live_slider,
                        stream_id = $this.parent().data('streamid'),
                        key = $this.parent().data('key'); //this is the reference key from either lanparty or live

                    $this.parent().hide();

                    page_data._multiview = page_data._multiview.filter(function(item) {
                        if (item.id === stream_id) {
                            data = item;
                        }
                        return item.id !== stream_id;
                    });

                    multiview_slider.reload(page_data._multiview);

                    //restore the data back to the collection
                    page_data['_'+collection].splice(key, 0, data);

                    slider.reload(page_data['_' + collection]);
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
            return data.map(function(item) {
                item.stream_type = 'youtube';
                item.id = 'YT' + item.username;
                item.idraw = item.username;
                item.live = 'live';
                item.collection = 'live';
                item.link = origin + 'gamer_stream/?user=' + item.user_id + '/#!/YT' + item.username;
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
                item.stream_type = 'twitch';
                item.twitchid = item.field_value[item.field_value.length - 1];
                item.id = 'TW' + item.twitchid;
                item.idraw = item.twitchid;
                item.live = 'live';
                item.collection = 'live';
                item.link = origin + 'gamer_stream/?user=' + item.user_id + '/#!/' + item.id;
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
                item.stream_type = 'hitbox';
                item.hitboxid = item.hitbox.livestream[0].media_name;
                item.id = 'HB' + item.hitboxid;
                item.username = item.user.username;
                item.user_id = item.user.user_id;
                item.idraw = item.hitboxid;
                item.live = 'live';
                item.collection = 'live';
                item.link = origin + 'gamer_stream/?user=' + item.user.user_id + '/#!/' + item.id;
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
                if (streamer.title && ~streamer.title.search(/lan/i)) {
                    streamer.link = origin + 'lanparty_stream_multi/#/' + streamer.id;
                    streamer.collection = 'lanparty';
                    streamer.key = i;
                    new_collection.push(streamer);
                    collection.splice(i, 1);
                }
            });
            return new_collection;
        };

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
        .init([])
        .mount($('#container-multiview'));

    lanparty_slider
        .init([])
        .mount($('#container-lanparty'));

    live_slider
        .init([])
        .mount($('#container-videos'));


    socket.on('message', function(e) {
        //separate lan party streams
        page_data.youtube = e.streamers.youtube;
        page_data.hitbox = e.streamers.hitbox;
        page_data.twitch = e.streamers.twitch;

        var multiview_ids = page_data._multiview.map(function(item) {
            return item.idraw;
        });

        //generate the key to be used in restoring state later
        page_data._live = transform_streamers(e.streamers).map(function(item, i) {
            item.key = i;
            return item;
        }).filter(function(item) {
            return !~multiview_ids.indexOf(item.idraw);
        });
        page_data._lanparty = filter_lanparty(page_data._live);

        live_slider.reload(page_data._live);
        lanparty_slider.reload(page_data._lanparty);
    });


    $('#txtbox-search-videos').autocomplete({
        lookup: function(query, done) {
            var result = page_data._live.filter(function(item) {
                return (typeof item.title !== 'undefined' &&
                    ~item.title.indexOf(query));
            }).map(function(item) {
                return {
                    value: item.title,
                    data: item
                };
            });

            done({
                suggestions: result
            });
        },
        onSelect: function (item) {
            $('#txtbox-search-videos').val(item.value);
            // console.log('selected', item.value);
            // filter_videos(item.value);
        }
    });

    require('../components/Footer/index');
    require('../components/Sub_Nav/index');


});

require(['streamers']);
