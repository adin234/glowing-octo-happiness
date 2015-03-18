'use strict';

var streamers_list = {},
    active_streams = [];

streamers_list.youtube = [];
streamers_list.twitch = [];
streamers_list.hitbox = [];

var stream_slider = $('.bxslider').bxSlider({
        infiniteLoop: false,
        hideControlOnEnd: true,
        minSlides: 2,
        maxSlides: 4,
        slideWidth: 329.5,
    }),

    format_stream_item = function (item) {
        item.class = '';
        if (typeof item.twitch !== 'undefined') {
            item.twitchid = item.field_value[0];
            // dont render if already active
            item.id = 'TW' + item.twitchid;
            item.idraw = item.twitchid;
            item.live = 'live';
            item.link = '/gamer_stream/' + item.user_id + '/' + item.id;
            item.provider = attachments_server;
            item.thumb = item.twitch.preview.large;
            item.title = item.twitch.channel.status;
            item.bust = 1;
            item.views = item.twitch.viewers;
        }
        else if (typeof item.hitbox !== 'undefined') {
            var hitboxData = item.hitbox.livestream[0];

            item.id = 'HB' + hitboxData.media_name;
            item.idraw = item.hitboxid;
            item.live = 'live';
            item.link = '/gamer_stream/' + item.user_id + '/' + item.id;
            item.provider = attachments_server;
            item.thumb = 'http://edge.sf.hitbox.tv/' +
                hitboxData.media_thumbnail_large;
            item.title = hitboxData.media_status;
            item.bust = 1;
            item.views = hitboxData.media_views;
        }
        else {
            item.id = 'YT' + item.youtube.id;
            item.idraw = item.youtube.id;
            item.live = 'live';
            item.link = '/gamer_stream/' + item.user_id + '/' + item.id;
            item.provider = attachments_server;
            item.thumb = item.youtube.snippet.thumbnails.high.url;
            item.title = item.youtube.snippet.title;
            item.bust = 1;
            item.views = '0';
        }

        if ($.inArray(item.id, active_streams) + 1) {
            item.class = 'current';
        }

        return item;
    },

    render_streamers = function () {
        var html = [];
        var streamer_container = $('#streamContainer').html('');

        streamers_list.youtube.forEach(function (item) {
            item = format_stream_item(item);
            html.push(template(JST['streamlist-item-tpl.html'](), item));
        });

        streamers_list.hitbox.forEach(function (item) {
            item = format_stream_item(item);
            html.push(template(JST['streamlist-item-tpl.html'](), item));
        });

        streamers_list.twitch.forEach(function (item) {
            item = format_stream_item(item);
            html.push(template(JST['streamlist-item-tpl.html'](), item));
        });
        $('#lightSlider').html(html.join(''));
        $('#streamContainer').html(html.join(''));
        stream_slider.reloadSlider();
    },

    get_streamers = function () {
        var socket_streamers = io.connect(socket_server);
        socket_streamers.on('message', function (e) {
            streamers_list = e.streamers;
            render_streamers();
        });
    },

    render_stream_video = function (item) {
        active_streams.push(item);
        var streamType = item.substr(0, 2);
        var streamId = item.substr(2);
        if (streamType === 'TW') {
            $('#twitchStreamContainer').append(
                template(
                    JST['twitch-stream-tpl.html'](), {
                        twitchid: streamId
                    }
                )
            );
            $('#twitch-chat-frame-container').append(
                template(
                    JST['twitch-chat-tpl.html'](), {
                        twitchid: streamId
                    }
                )
            );
            $('#twitch-chat-tab-container').append(
                template(
                    JST['twitch-chat-tab-tpl.html'](), {
                        twitchid: streamId
                    }
                )
            );
            $('.tabs').tabslet({
                animation: true,
            });
        }

        if (streamType === 'HB') {
            $('#twitchStreamContainer').append(
                template(
                    JST['hitbox-stream-tpl.html'](), {
                        twitchid: streamId
                    }
                )
            );
            $('#twitch-chat-frame-container').append(
                template(
                    JST['hitbox-chat-tpl.html'](), {
                        twitchid: streamId
                    }
                )
            );
            $('#twitch-chat-tab-container').append(
                template(
                    JST['hitbox-chat-tab-tpl.html'](), {
                        twitchid: streamId
                    }
                )
            );
            $('.tabs').tabslet({
                animation: true,
            });
        }

        if (streamType === 'YT') {
            $('#twitchStreamContainer').append(
                template(
                    JST['youtube-stream-tpl.html'](), {
                        youtubeid: streamId
                    }
                )
            );
            $('#twitch-chat-frame-container').append(
                template(
                    JST['gchat-tpl.html'](), {
                        ChannelId: streamId
                    }
                )
            );
            $('#twitch-chat-tab-container').append(
                template(
                    JST['gchat-tab-tpl.html'](), {
                        ChannelId: streamId
                    }
                )
            );

            var userinfo = '';
            var channelinfo = {
                'id': streamId,
                'title': streamId
            };
            var parentHt = $('#side-container').css('height');

            if (utilCookie.get('user').length > 0) {
                userinfo = $.parseJSON(utilCookie.get('user'));
                $('#gchat-' + streamId).css('height', parentHt);
                $('#gchat-' + streamId).initChatBox(channelinfo, userinfo);
            }
            else {
                $('#gchat-' + streamId).css('height', parentHt);
                $('#gchat-' + streamId).initChatBox(channelinfo, userinfo);
            }

            $('.tabs').tabslet({
                animation: false,
            });
        }
    };

$('.watchList').css('visibility', 'visible');

$(window).load(function () {
    $('#streamArea').mCustomScrollbar({
        theme: 'inset-2',
    });
});

$(function () {
    var stream_ids = utilHash.getHashArr();

    stream_ids.forEach(function (item) {
        render_stream_video(item);
    });

    $('.tabs').tabslet({
        animation: true,
    });
    $('body').on('change', '#view-resize', function (e) {
        var size = $(this).val();
        $('body').removeClass('x1 x2 x3').addClass(size);
    });

    $('body').on('click', '.remove-stream', function (e) {
        var id = $(this).attr('data-id');
        $('#streamContainer li a[data-id=' + id + ']').removeClass('current');
        $('.chat-' + id.substr(2)).remove();
        $('#gchat-' + id.substr(2)).remove();
        utilHash.removeHash(id);
        $(this).parent().parent().remove();
    });

    $('#streamContainer').on('click', 'li a:not(.current)', function (e) {
        $(this).addClass('current');
        var id = $(this).attr('data-id');
        utilHash.addHash(id);
        render_stream_video(id);
    });

    get_streamers();
});

