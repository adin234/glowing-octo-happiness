/* global
    server,
    template,
    twitch,
    page_data: true,
    JST,
    Masonry,
    params
*/

'use strict';

var streamerId,
    viewers = 0,
    
    information_masonry = function() {
        $('#tab-2').width($('#streamArea aside').width() - $('.streamer').width() - 40);

        new Masonry(
            '#tab-2',
            {
                columnWidth: 350,
                itemSelector: '.panel'
            }
        );
    },
    
    render_stream = function(streamType, streamId) {
        viewers = 0;

        if (streamType === 'TW') {
            getViewersCount(server + 'get_views/' + twitch);

            $('#twitchStream').replaceWith(template(
                JST['twitch-stream-tpl.html'](),
                { twitchid: streamId, number: viewers }
            ));

            $('#twitchTalk').html(template(
                JST['twitch-chat-tpl.html'](),
                {
                    twitchid: streamId,
                    advert: page_data.custom_fields && page_data.custom_fields.advertisement
                }
            ));

            $('object').height(
                $('#streamView').height()
            );
        }

        //if we got hitbox
        if (streamType === 'HB') {

            getViewersCount(server + 'get_hitbox_views/' + streamId);

            $('#twitchStream').replaceWith(template(
                JST['hitbox-stream-tpl.html'](),
                { twitchid: streamId, number: viewers }
            ));

            $('#twitchTalk').html(template(
                JST['hitbox-chat-tpl.html'](),
                {
                    twitchid: streamId,
                    advert: page_data.custom_fields && page_data.custom_fields.advertisement
                }
            ));

            $('object').height( $('#streamView').height() );

            $.getJSON(server + 'scrape/' + streamId, function(e) {
                e.forEach(function(item) {
                    item.data.html = item.html_description;
                    item.data.link = item.data.link || '';
                    $('#tab-2').append(template(JST['panelTpl.html'](), item.data));
                });

                setTimeout(function() {
                    $('img[src=""]').hide();
                }, 100);
            });
        }

        if (streamType === 'YT') {

            getViewersCount(server + 'get_views/' + twitch);

            var found = false,
                userId = params.user.replace('/', '');

            $.getJSON(server + 'streamers/youtube/?user=' + userId, function(e) {
                var streamerId = '';

                e.streamers.forEach(function(item) {
                    found = true;
                    streamerId = item.youtube.id;

                    $('.streamer #about-streamer').html(
                        item.youtube.snippet.description.replace(/(?:\r\n|\r|\n)/g, '<br />')
                    );

                    $('embed').height( $('#streamView').height() );
                });

                if (found) {
                    $('#twitchStream')
                        .replaceWith(template(
                            JST['youtube-stream-tpl.html'](), {youtubeid: streamerId})
                        );
                }
                else {
                    $('#twitchStream')
                        .replaceWith(
                                '<div id="twitchStream">'+
                                        '<img class="offline-placeholder" ' +
                                            'src="/assets/images/streamer-offline.png"/>'+
                                '</div>'
                        );
                }

                if (!found) {
                    $('aside .streamer').hide();
                }

                $('#tab-2').html(page_data.custom_fields.youtube_activity);
            });

            var userinfo = '',
                channelinfo = { id: twitch, title: twitch };

            if (utilCookie.get('user').length > 0) {
                userinfo = $.parseJSON(utilCookie.get('user'));
                $('#twitchTalk').initChatBox(channelinfo, userinfo, 'gamers-stream');
            } else {
                $('#twitchTalk').initChatBox(channelinfo, userinfo, 'gamers-stream');
            }
        }
    },

    resize_video_stream = function () {
        var size = $('#view-resize').val();
        if (size === 'x3') {
            $('embed').height($('#streamView').height());
            $('object').height($('#streamView').height());
        } else {
            $('embed').height('100%');
            $('object').height('100%');
        }
    },

    updateStatus = function(streamType, streamId, isOnline) {
        if (isOnline) {
            render_stream(streamType, streamId);
        }
        else {
            $('#twitchStream')
                .replaceWith(
                    '<div id="twitchStream"><img class="offline-placeholder" src="/assets/images/streamer-offline.png"/></div>'
                );
        }
    },

    getViewersCount = function (url) {
        $.getJSON(url, function(e) {
            if (e && e.stream && e.stream.viewers) {
                viewers = e.stream.viewers || 0;
                $('#twitchStream .views').html(e.stream.viewers + ' Views');
            }
        });
    },

    check_if_online = function (userId) {
        var found = false;
        $.getJSON(server + 'streamers/youtube/?user=' + userId, function(e) {
            e.streamers.forEach(function(item) {
                    found = true;
                    streamerId = item.youtube.id;
            });

            if (found) {
                $('#twitchStream')
                    .replaceWith(template(
                                $('#youtube-stream-tpl').html(),
                                { youtubeid: streamerId }
                    ));

                setTimeout(function() {
                    check_if_online(userId);
                }, 30000);
            }
            else {
                $('#twitchStream')
                    .replaceWith('<div id="twitchStream">' +
                        '<img class="offline-placeholder" ' +
                        'src="/assets/images/streamer-offline.png"/></div>');
                setTimeout(function() {
                    check_if_online(userId);
                }, 30000);
            }

        });
    },

    sched_template = function(string) {
        var list = string.split(/<br ?\/?>/).filter(function(e) {
            return e.trim().length;
        }).map(function(e) {
            return e + '<br/>';
        });
        return $('<li/>', {html : list.join('')})[0].outerHTML;
    },

    toggleChat = function () {
        var advertisementContainer = $('#advertisement-container'),
            twitchContainer = $('#twitch-container'),
            size = advertisementContainer.attr('data-status'),
            toggleButton = advertisementContainer.children('.minify-advert');

        if (size !== 'full') {
            twitchContainer.height(twitchContainer.parent().height() - 250);

            advertisementContainer
                .css('overflow', 'auto')
                .css('height', '')
                .attr('data-status', 'full');

            twitchContainer.height(
                twitchContainer.parent().height() - 250
            );

            toggleButton.html('縮小');

        }
        else {
            advertisementContainer
                .css('overflow', 'hidden')
                .css('height', '100')
                .attr('data-status', 'minified');

            twitchContainer.height(
                twitchContainer.parent().height() - 50
            );

            toggleButton.html('增大');
        }

        advertisementContainer.show();
    },

    checker = setInterval(function() {
        var found = false;
        if (twitch.substr(0,2) === 'YT') {
            $.getJSON(server + 'streamers/youtube/?user=' + page_data.user_id, function(e) {
                e.streamers.forEach(function(item) {
                        found = true;
                        streamerId = item.youtube.id;
                        $('.streamer #about-streamer').html(
                            item.youtube.snippet.description.
                                replace(/(?:\r\n|\r|\n)/g, '<br />')
                        );
                        $('embed').height($('#streamView').height());
                });

                if (!found) {
                    if ($('div .videoWrapper').length > 0) {
                        $('#twitchStream').replaceWith(
                            '<div id="twitchStream">' +
                            '<img class="offline-placeholder" ' +
                            'src="/assets/images/streamer-offline.png"/>' +
                            '</div>').fadeTo('slow');
                    }
                } else {
                    if ($('div .videoWrapper').length === 0) {
                        $('#twitchStream').replaceWith(
                            template(
                                JST['youtube-stream-tpl.html'](),
                                    {youtubeid: streamerId}
                            )
                        ).fadeIn('slow');
                    }
                }
            });
        }
    }, 5000);
