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
    // 
    // page_data = {
    //     "streamers":[
    //         {
    //             "user_id":1757,
    //             "field_id":"twitchStreams",
    //             "field_value":[  
    //                 "sing_sing"
    //             ],
    //             "username":"barney",
    //             "email":"barneyeureka@mailtothis.com",
    //             "gender":"male",
    //             "custom_title":"",
    //             "language_id":1,
    //             "style_id":0,
    //             "timezone":"Asia/Hong_Kong",
    //             "visible":1,
    //             "user_group_id":2,
    //             "secondary_group_ids":"",
    //             "display_style_group_id":2,
    //             "permission_combination_id":2,
    //             "message_count":2,
    //             "conversations_unread":0,
    //             "register_date":1418626633,
    //             "last_activity":1421399731,
    //             "trophy_points":1,
    //             "alerts_unread":1,
    //             "avatar_date":1418626633,
    //             "avatar_width":200,
    //             "avatar_height":125,
    //             "gravatar":"",
    //             "user_state":"valid",
    //             "is_moderator":0,
    //             "is_admin":0,
    //             "is_banned":0,
    //             "like_count":0,
    //             "warning_points":0,
    //             "is_staff":0,
    //             "activity_visible":0,
    //             "twitch":{  
    //                 "_id":14290360528,
    //                 "game":"Dota 2",
    //                 "viewers":13701,
    //                 "created_at":"2015-05-05T01:21:28Z",
    //                 "video_height":1080,
    //                 "average_fps":59.9835240275,
    //                 "_links":{  
    //                     "self":"https://api.twitch.tv/kraken/streams/sing_sing"
    //                 },
    //                 "preview":{  
    //                     "small":"http://static-cdn.jtvnw.net/previews-ttv/live_user_sing_sing-80x45.jpg",
    //                     "medium":"http://static-cdn.jtvnw.net/previews-ttv/live_user_sing_sing-320x180.jpg",
    //                     "large":"http://static-cdn.jtvnw.net/previews-ttv/live_user_sing_sing-640x360.jpg",
    //                     "template":"http://static-cdn.jtvnw.net/previews-ttv/live_user_sing_sing-{width}x{height}.jpg"
    //                 },
    //                 "channel":{  
    //                     "_links":{  
    //                         "self":"http://api.twitch.tv/kraken/channels/sing_sing",
    //                         "follows":"http://api.twitch.tv/kraken/channels/sing_sing/follows",
    //                         "commercial":"http://api.twitch.tv/kraken/channels/sing_sing/commercial",
    //                         "stream_key":"http://api.twitch.tv/kraken/channels/sing_sing/stream_key",
    //                         "chat":"http://api.twitch.tv/kraken/chat/sing_sing",
    //                         "features":"http://api.twitch.tv/kraken/channels/sing_sing/features",
    //                         "subscriptions":"http://api.twitch.tv/kraken/channels/sing_sing/subscriptions",
    //                         "editors":"http://api.twitch.tv/kraken/channels/sing_sing/editors",
    //                         "videos":"http://api.twitch.tv/kraken/channels/sing_sing/videos",
    //                         "teams":"http://api.twitch.tv/kraken/channels/sing_sing/teams"
    //                     },
    //                     "background":null,
    //                     "banner":"http://static-cdn.jtvnw.net/jtv_user_pictures/sing_sing-channel_header_image-b59c20a951432198-640x125.png",
    //                     "broadcaster_language":"ru",
    //                     "display_name":"Sing_sing",
    //                     "game":"Dota 2",
    //                     "logo":"http://static-cdn.jtvnw.net/jtv_user_pictures/sing_sing-profile_image-260bffe71ab9475b-300x300.jpeg",
    //                     "mature":true,
    //                     "status":"newbioe strem",
    //                     "partner":true,
    //                     "url":"http://www.twitch.tv/sing_sing",
    //                     "video_banner":null,
    //                     "_id":21390470,
    //                     "name":"sing_sing",
    //                     "created_at":"2011-03-28T14:51:57Z",
    //                     "updated_at":"2015-05-05T03:15:35Z",
    //                     "delay":0,
    //                     "followers":201750,
    //                     "profile_banner":null,
    //                     "profile_banner_background_color":null,
    //                     "views":33651832,
    //                     "language":"en"
    //                 }
    //             }
    //         }
    //     ],
    //     "_live":[],
    //     "_lanparty":[],
    //     "_multiview":[],
    //     "youtube":[],
    //     "hitbox":[],
    //     "twitch":[]
    // };

    var Tabs = require('../components/Tabs/index'),
        List_Slider = require('../components/List_Slider/index'),
        socket = socketConnect(),
        video_tmpl = require('./templates/streamers-video.html'),
        multiview_video_tmpl = require('./templates/streamers-video-multiview.html'),
        live_mounted = false,
        main_tab = new Tabs({hash_change: false}),
        live_slider = new List_Slider({
            per_slider: 9,
            item_template: video_tmpl,
            $list_container: $('<ul class="list clearFix"/>'),
            after_mount: function() {

                $('#container-videos a.addToMultiview').on('click', function(e) {
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

                    var $this = $(this),
                        stream_type = $this.data('stream-type'),
                        key = $this.data('key');

                    $this.parent().hide();

                    page_data._multiview.push(
                        page_data[stream_type][key]
                    );

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
                        stream_id = $this.parent().data('streamid');

                    $this.parent().hide();

                    page_data._multiview = page_data._multiview.filter(function(item) {
                        return item.id !== stream_id;
                    });

                    multiview_slider.reload(page_data._multiview);

                    $('#container-videos, #container-lanparty')
                        .find('a[data-streamid="'+stream_id+'"]')
                        .parent()
                        .show();
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
                item.id = 'YT' + item.youtube.id;
                item.idraw = item.youtube.id;
                item.live = 'live';
                item.link = origin + 'gamer_stream/?user=' + item.user_id + '/#!/' + item.id;
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
            return data.map(function(item, i) {
                item.key = i;
                item.stream_type = 'hitbox';
                item.hitboxid = item.hitbox.livestream[0].media_name;
                item.id = 'HB' + item.hitboxid;
                item.username = item.user.username;
                item.user_id = item.user.user_id;
                item.idraw = item.hitboxid;
                item.live = 'live';
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
                if (~streamer.title.search(/lan/i)) {
                    streamer.link = origin + 'lanparty_stream_multi/#/' + streamer.id;
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
        page_data._live = transform_streamers(e.streamers);
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
