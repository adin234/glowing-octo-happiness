/* jshint unused: false */
/* jshint -W100 */ 
/* global
    JST,
    page_data,
    origin,
    attachments_server,
    slider,
    template,
    multiview_items,
    first : true,
    utilHash
*/

'use strict';

var get_active_for_multiview = function () {
        var videos = $('#container-multiview ul.list > li'),
            ids = [];

        videos.each(function (i, item) {
            ids.push($(item).attr('data-streamid'));
        });

        return ids;
    },

    render_videos = function (filter, game, lanparty) {
        var html = [],
            items = [],
            ids = [],
            flags = [],
            recent_videos,
            tplVideo = JST['videoTpl.html'](),
            tplVideoContainer = JST['videoContainerTpl.html'](),
            activeMultiView = get_active_for_multiview(),
            filterRegExp = new RegExp(filter, 'i'),
            filterGame = (
                typeof game === 'undefined' ||
                game === '' ||
                game === 'all') ?
                    'all' :
                    $('a.game[data-id=' +
                        game +']').first().attr('data-name'),
            filterGameRegExp = new RegExp(filterGame, 'i'),
            temToComplete = 9,
            source = lanparty && typeof lanparty !== 'undefined' ?
                page_data.lanparty :
                page_data.streamers,
            activeSlider = !lanparty ?
                slider.container_videos :
                slider.container_lanparty,
            currentSlide = activeSlider.getCurrentSlide();

        source.forEach(function (item, i) {
            if (typeof item.twitch !== 'undefined') {
                if (typeof filter !== 'undefined' &&
                    item.twitch.channel.status &&
                    !~item.twitch.channel.status.search(filterRegExp) &&
                    !~item.username.search(filterRegExp)) {
                    return;
                }

                item.twitchid = item.field_value[item.field_value.length - 1];
                // dont render if already active
                if (filterGame !== 'all' && ~item.twitch.game.trim().search(filterGameRegExp)) {
                    return;
                }
                item.id = 'TW' + item.twitchid;
                item.idraw = item.twitchid;
                item.live = 'live';
                item.link = origin +
                    (lanparty && typeof lanparty !== 'undefined' ?
                    'lanparty_stream_multi/#/' + item.id :
                    'gamer_stream/?user=' + item.user_id + '/#!/' + item.id);
                item.provider = attachments_server;
                item.thumb = item.twitch.preview.large;
                item.title = item.twitch.channel.status;
                item.bust = 1;
                item.type = 'TW';
                item.views = item.twitch.viewers;
            }
            else if (typeof item.hitbox !== 'undefined') { //we have hitbox
                var hitboxData = item.hitbox.livestream[0];

                if (typeof filter !== 'undefined' &&
                    !~hitboxData.media_status.search(filterRegExp) &&
                    !~item.user
                    .username.search(filterRegExp)) {
                    return;
                }

                item.hitboxid = hitboxData.media_name;
                // dont render if already active
                item.id = 'HB' + item.hitboxid;
                item.username = item.user.username;
                item.user_id = item.user.user_id;
                item.idraw = item.hitboxid;
                item.live = 'live';
                item.link = origin + 'gamer_stream/?user=' + item.user.user_id + '/#!/' + item.id;
                item.provider = attachments_server;
                item.thumb = 'http://edge.sf.hitbox.tv/' + hitboxData.media_thumbnail_large;
                item.title = hitboxData.media_status;
                item.bust = 1;
                item.type = 'HB';
                item.views = hitboxData.media_views;
                item.provider = attachments_server;

            }
            else if (typeof item.youtube !== 'undefined') {
                if (typeof filter !== 'undefined' &&
                    !~item.username.search(filterRegExp)) {
                    return;
                }

                item.id = 'YT' + item.username;
                item.idraw = item.youtube.id;
                item.live = 'live';
                item.link = origin +
                    (lanparty && typeof lanparty !== 'undefined' ?
                        'lanparty_stream_multi/#/' + item.id :
                        'gamer_stream/?user=' + item.user_id + '/#!/' + item.id);
                item.provider = attachments_server;
                item.thumb = item.youtube.snippet.thumbnails.high.url;
                item.title = item.youtube.snippet.title;
                item.bust = 1;
                item.type = 'YT';
                item.views = '0';
            }

            flags.push(item.idraw);

            if (!~multiview_items.indexOf(item.idraw)) {
                items.push(template(tplVideo, item));
                ids.push(item.idraw);
            }

            if (items.length === 9) {
                html.push(
                    template(
                        tplVideoContainer,
                        {'items': items.join('')}
                    )
                );
                items = [];
            }
        });

        if (items.length !== 0) {
            html.push(
                template(
                    tplVideoContainer, {
                        'items': items.join('')
                    }
                )
            );
        }

        if (first && html.length) {
            $('#container-videos').html(html.join('')).promise()
                .done(function () {
                    activeSlider.reloadSlider({
                        activeSlide: currentSlide,
                        infiniteLoop: false,
                        hideControlOnEnd: true
                    });
                });
            first = false;
        }

        if (!lanparty) {
            recent_videos = [];

            $('#tab-2-1 [data-streamidraw]')
                .each(function (i, item) {
                    recent_videos.push(item.getAttribute('data-streamidraw'));
                });

            $('#tab-2-3 [data-streamidraw]')
                .each(function (i, item) {
                    recent_videos.push(item.getAttribute('data-streamidraw'));
                });

            if ($(recent_videos).not(flags).length !== 0 || $(flags).not(recent_videos).length !== 0) {

                $('#container-videos').html(html.join('')).promise()
                    .done(function () {
                        activeSlider.reloadSlider({
                            activeSlide: currentSlide,
                            infiniteLoop: false,
                            hideControlOnEnd: true
                        });
                    });
            }
        }
        else {
            $('#container-lanparty').html(html.join(''));
        }

        if (typeof (filter) !== 'undefined') {
            if (!html.length && $('#container-videos').html().trim().length === 0) {
                html.push('ç„¡æ³•æ‰¾åˆ°ä½ æŒ‡å®šçš„å¯¦æ³ä¸»');
                if (!lanparty) {
                    $('#container-videos').html(html.join('')).promise()
                        .done(function () {
                            activeSlider.reloadSlider({
                                activeSlide: currentSlide,
                                infiniteLoop: false,
                                hideControlOnEnd: true
                            });
                        });
                }
                else {
                    $('#container-lanparty').html(html.join(''));
                }
            }
        }
        else {
            if (!html.length && $('#container-videos').html().trim().length === 0) {
                html.push('ç›®å‰æ²’æœ‰æ­£åœ¨ç›´æ’­çš„å¯¦æ³ä¸»');
                if (!lanparty) {
                    $('#container-videos').html(html.join('')).promise()
                        .done(function () {
                            activeSlider.reloadSlider({
                                activeSlide: currentSlide,
                                infiniteLoop: false,
                                hideControlOnEnd: true
                            });
                        });
                }
                else {
                    $('#container-lanparty').html(html.join(''));
                }
            }

        }

        if (slider.container_videos.getSlideCount() < 2) {
            if (!lanparty) {
                $('#tab-2-1 .bx-controls').css('opacity', 0);
            }
            else {
                $('#tab-2-2 .bx-controls').css('opacity', 0);
            }
        }
        else {
            if (!lanparty) {
                $('#tab-2-1 .bx-controls').css('opacity', 100);
            }
            else {
                $('#tab-2-2 .bx-controls').css('opacity', 100);
            }
        }

        $('#container-videos .uploader > img').on('load', function (e) {
            if ($(this).width() > $(this).height()) {
                $(this).height('100%');
                $(this).css('margin-left', -(($(this).width() - 68) / 2));
            }
            else {
                $(this).width('100%');
                $(this).css('margin-top', -(($(this).height() - 68) / 2));
            }
        });
    },

    get_game = function () {
        var game = utilHash.getHashArr()[0];
        return game === '' ? 'all' : game;
    },

    filter_videos = function (input) {
        var $this = $('#txtbox-search-videos'),
            filterString = $this.val(),
            game = get_game();
        render_videos(filterString, game);
    };
