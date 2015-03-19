/* jshint unused: false */
/* jshint scripturl:true */
/* jshint -W100 */ 
/* global
    page_data: true,
    template,
    JST,
    utilHash,
    origin,
    attachments_server,
    server,
    io,
    socket_server,
    page_maintenance,
    streamersSearch
*/

'use strict';

var slider = {},
    con = 'all',
    YTStreamers = [],
    TWStreamers = [],
    HBStreamers = [],
    onlineStreamers = [],
    streamCount = 0,
    first = true,
    multiview_items = [],
    hash,

    render_featured_games = function (filter) {
        var html = [],
            items = [];

        filter = new RegExp(filter, 'i');

        page_data.featured_games.forEach(function (item, i) {

            if (item.name.search(filter) === -1) {
                return;
            }

            item.game = item.name;
            items.push(
                template(
                    JST['gameTpl.html'](),
                    item
                )
            );

            if (items.length === 12) {
                html.push(
                    template(
                        JST['gameContainerTpl.html'](),
                        {'items': items.join('')}
                    )
                );
                items = [];
            }
        });

        if (items.length !== 0) {
            html.push(
                template(
                    JST['gameContainerTpl.html'](), 
                    {'items': items.join('')}
                )
            );
        }

        if (!html.length) {
            html.push('ç›®å‰æ²’æœ‰éŠæˆ²');
        }

        $('#container-featured-games').html(html.join(''));

        slider.featured_games.reloadSlider({
            startSlide: 0,
            infiniteLoop: false,
            hideControlOnEnd: true
        });
    },

    render_latest_games = function (filter) {
        var html = [],
            items = [];

        filter = new RegExp(filter, 'i');

        page_data.games.forEach(function (item, i) {
            if (item.name.search(filter) === -1) {
                return;
            }

            items.push(
                template(
                    JST['gameTpl.html'](),
                    item
                )
            );

            if (items.length === 12) {
                html.push(
                    template(
                        JST['gameContainerTpl.html'](),
                        {'items': items.join('')}
                    )
                );
                items = [];
            }
        });

        if (items.length !== 0) {
            html.push(
                template(
                    JST['gameContainerTpl.html'](),
                    {'items': items.join('')}
                )
            );
        }

        if (!html.length) {
            html.push('ç›®å‰æ²’æœ‰éŠæˆ²');
        }

        $('#container-latest-games').html(html.join(''));

        slider.latest_games.reloadSlider({
            startSlide: 0,
            infiniteLoop: false,
            hideControlOnEnd: true
        });
    },

    filter_game = function (input) {
        var $this = $(input),
            filterString = $this.val();

        render_featured_games(filterString);
        render_latest_games(filterString);
    },

    get_game = function () {
        var game = utilHash.getHashArr()[0];
        return game === '' ? 'all' : game;
    },

    get_active_for_multiview = function () {
        var videos = $('#container-multiview ul.list > li'),
            ids = [];

        videos.each(function (i, item) {
            ids.push($(item).attr('data-streamid'));
        });

        return ids;
    },

    update_watch_multiview = function () {
        var ids = get_active_for_multiview(),
            stream_link = '/gamer_stream_multi/',
            watch_now_button = $('#watch-now-link'),
            videos = $('#container-multiview ul.list > li');

        if (videos.length) {
            watch_now_button.removeClass('disabled');
        }
        else {
            watch_now_button.addClass('disabled');
        }

        $('#multiview-count').html(videos.length);

        watch_now_button.attr('href', stream_link + utilHash.buildHash(ids));
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

            // if ($('a[data-streamid="'+item.type+item.idraw+'"]')) {
            //     return;
            // }

            flags.push(item.idraw);

            if (!~multiview_items.indexOf(item.idraw)) {
                items.push(template(tplVideo, item));
                ids.push(item.idraw);
            }

            if (items.length === 9) {
                html.push(template(tplVideoContainer, {
                    'items': items.join('')
                }));
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

    filter_videos = function (input) {
        var $this = $('#txtbox-search-videos'),
            filterString = $this.val(),
            game = get_game();
        render_videos(filterString, game);
    },

    render_page = function () {
        $('.tooltip').tooltipster({
            contentAsHTML: true
        });
        $(window).trigger('hashchange');
    },

    filter_category = function (_console, context) {
        con = _console;
        $.getJSON(server + 'streamersdata?console=' + _console, function (results) {
            page_data = results;
            render_page();
        }).done(function () {
            $(context).parent().siblings().removeClass('current');
            $(context).parent().addClass('current');
        });
    },

    add_to_multiview = function () {
        var id = $(this).attr('data-streamidraw'),
            tplVideo = JST['videoMultiTpl.html'](),
            multiview_item,
            streamer = page_data.streamers.filter(function (item) {
                if (typeof item.twitchid !== 'undefined' && item.twitchid === id) {
                    return true;
                }
                if (typeof item.youtube !== 'undefined' && item.youtube.id === id) {
                    return true;
                }
                if (typeof item.hitbox !== 'undefined' && item.hitboxid === id) {
                    return true;
                }
                return false;
            })[0],
            item = streamer;

        multiview_items.push(id);

        $('#container-videos a[data-streamidraw=' + id + ']').parent('li').hide();

        if (typeof item.twitch !== 'undefined') {
            item.twitchid = item.field_value[item.field_value.length - 1];
            // dont render if already active
            item.id = 'TW' + item.twitchid;
            item.idraw = item.twitchid;
            item.live = 'live';
            item.link = origin + 'gamer_stream/?user=' + item.user_id + '#!/' + item.id;
            item.provider = attachments_server;
            item.thumb = item.twitch.preview.large;
            item.title = item.twitch.channel.status;
            item.bust = 1;
            item.type = 'TW';
            item.views = item.twitch.viewers;
        }
        else if (typeof item.hitbox !== 'undefined') {
            var hitboxData = item.hitbox.livestream[0];

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
        else {
            item.id = 'YT' + item.username;
            item.idraw = item.youtube.id;
            item.live = 'live';
            item.link = origin + 'gamer_stream/?user=' + item.user_id + '#!/' + item.id;
            item.provider = attachments_server;
            item.thumb = item.youtube.snippet.thumbnails.high.url;
            item.title = item.youtube.snippet.title;
            item.bust = 1;
            item.type = 'YT';
            item.views = '0';
        }

        multiview_item = template(tplVideo, item);

        $('#container-multiview ul.list').append(multiview_item);
        if (($('#tab-2-1').css('display') === 'block' && !$('#container-videos li.live:visible').length) || ($(
                '#tab-2-2').css('display') === 'block' && !$('#container-lanparty li.live:visible').length)) {
            $('.video.stream a[href=#tab-2-3]').trigger('click');
        }


        update_watch_multiview();
    },

    displayStreamers = function () {
        YTStreamers.forEach(function (item) {
            onlineStreamers.push(item);
        });

        TWStreamers.forEach(function (item) {
            onlineStreamers.push(item);
        });

        HBStreamers.forEach(function (item) {
            onlineStreamers.push(item);
        });
        if ($('a[href$="/streamers"] > sup').text().length > 0) {
            streamCount = parseInt($('a[href$="/streamers"] > sup').text());
        }
        else {
            streamCount = 0;
        }

        if (onlineStreamers.length > 0) {
            $('a[href$="/streamers"] > sup').text(onlineStreamers.length);
            page_data.streamers = onlineStreamers;
            render_videos();
        }
        else {
            if (onlineStreamers.length === 0 &&
                $('a[href$="/streamers"] > sup').text() === '') {
                $('a[href$="/streamers"] > sup').text('');
                $('#container-videos > ul').remove().fadeOut();
            }
        }
    },

    checker = function () {
        var socket = io.connect(socket_server);
        socket.on('message', function(e) {
            YTStreamers = e.streamers.youtube;
            TWStreamers = e.streamers.twitch;
            HBStreamers = e.streamers.hitbox;
            onlineStreamers = [];
            displayStreamers();
        });
    };

page_data = $.parseJSON(page_data);

$(function () {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: server + 'streamers'
    }).done(function (data) {
    }).fail(function () {
        window.location.assign(page_maintenance);
    });
});

$('#txtbox-search-games').on('keydown', function (e) {
    if (e.keyCode === 13) {
        filter_game(this);
    }
});

$('#txtbox-search-videos').on('keydown', function (e) {
    if (e.keyCode === 13) {
        filter_videos(this);
    }
});

$('#txtbox-search-videos').on('keypress', function (e) {
    if (e.keyCode === 13) {
        filter_videos(this);
    }
    else {
        streamersSearch();
    }
});

$(window).on('hashChange', function () {
    filter_videos();
});

$.getJSON(server + 'streamers?lanparty=1', function (e) {
    page_data.lanparty = e.streamers;
    render_videos(undefined, undefined, true);
    $.getJSON(server + 'streamers/youtube?lanparty=1', function (result) {
        result.streamers.forEach(function (item) {
            page_data.lanparty.push(item);
        });
        render_videos(undefined, undefined, 1);
    });
});

$('#container-videos').on('click', '.addToMultiview', add_to_multiview);

$('#container-multiview').on('click', '.remove-multiview', function () {
    var $this = $(this),
        id = $this.parent('li').attr('data-streamidraw'),
        index = multiview_items.indexOf(id);

    $('#container-videos a[data-streamidraw=' + id + ']').parent('li').show();
    $this.parent('li').remove();

    if (index > -1) {
        multiview_items.splice(index, 1);
    }

    update_watch_multiview();
    render_videos();
});

$('.tabs').tabslet({
    animation: true
});
$('.sf-menu').superfish();

slider.container_videos = $('#container-videos').bxSlider({
    infiniteLoop: false,
    hideControlOnEnd: true
});

slider.container_lanparty = $('#container-lanparty').bxSlider({
    infiniteLoop: false,
    hideControlOnEnd: true
});

streamersSearch();
checker();
render_page();

$(document).ready(function() {
    $('.sf-menu').superfish();
});
