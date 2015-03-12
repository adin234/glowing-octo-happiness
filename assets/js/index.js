var index_data;
var slider_loaded = 0;
var streamersList = [];
/* RDC - 2015.01.15 : Placeholder for all active streamers */
var onlineStreamers = [];

var randomFeaturedVids = [];
var randomLatestVids = [];
var randomMostViewedVids = [];
var currentStreamCount = 0;
var UniqueStreamers = [];
var gamesPerConsole;

var hash = '';
var slider = {};
slider.most_viewed = $("#mostViewed").bxSlider({
    startSlide: 0,
    infiniteLoop: false,
    hideControlOnEnd: true
});
slider.latest_video = $("#latestVideos").bxSlider({
    startSlide: 0,
    infiniteLoop: false,
    hideControlOnEnd: true
});
slider.featured_video = $("#featuredVideos").bxSlider({
    startSlide: 0,
    infiniteLoop: false,
    hideControlOnEnd: true
});
slider.featured_games = $("#featuredGames").bxSlider({
    startSlide: 0,
    infiniteLoop: false,
    hideControlOnEnd: true
});
slider.latest_games = $("#latestGames").bxSlider({
    startSlide: 0,
    infiniteLoop: false,
    hideControlOnEnd: true
});

var load_more = function (selector, page, per_page) {
    $(selector).slice(0, page * per_page).show();
    if ($(selector).length <= page * per_page) {
        $('.load-more[data-selector="' + selector + '"]').hide();
    }
    else {
        $('.load-more[data-selector="' + selector + '"]').show();
    };
    $('.load-more[data-selector="' + selector + '"]').attr('data-page', parseInt(page) + 1);
    $('.load-more[data-selector="' + selector + '"]').attr('data-per-page', per_page);
}

var filterAction = function (action) {
    switch (action) {
    case 'console':
        filter_category(hash.shift());
        filterAction(hash.shift());
        $('html, body').animate({
            scrollTop: 0
        });
        break;
    }
}

/* RDC 2015-02-23 */
// $(document).ready(function() {
//    $.ajax({url: server + 'gamesperconsole',
//            type: 'GET',
//            dataType: 'json'
//           }).success(function(data) {
//                 console.log('Game list successfully acquired.');
//           }).fail(function(xhr, data){
//                 console.log(xhr.status);
//           }).done(function(data){
//             displayGamesPerConsole(data);
//           });
// });



$(document).ready(function () {
    $.ajax({
        async: false,
        type: "GET",
        dataType: "json",
        url: server + "index?console=all",
    }).done(function (data) {
        index_data = data;
        update_index(index_data);
    });

    $(document).on('click', '.slider-item .play', function (e) {
        var vid = $(this).attr('data-vid');
        if (vid.trim().length) {
            vid = vid.split('?')[1].split('=');
            vid = vid[vid.indexOf('v') + 1].split('#')[0];
            var html = template($('#playerTpl').html(), {
                video: '//www.youtube.com/embed/' + vid + '?autoplay=1'
            });
            $('#container .bx-wrapper:first').prepend(html).promise().done(function () {
                $('.bx-wrapper .video-player iframe').css('margin-top', ($(window).height() - $(
                    '.bx-wrapper iframe').height()) / 2);
                $('.bx-wrapper .video-player .close').css('margin-top', ($(window).height() - $(
                    '.bx-wrapper iframe').height()) / 2)
            });
        }
    });

    $(document).on('click', '.bx-wrapper .close', function (e) {
        $('#container .bx-wrapper .video-player').remove();
    });

    showSocialButtons();

    $(window).scroll(function () {
        if ($('body')[0].scrollHeight - $(window).scrollTop() - 50 <= $(window).height()) {
            $('#arrow').removeClass('down').addClass('up');
        }
        else {
            $('#arrow').removeClass('up').addClass('down');
        }
    });

    $('body').on('click', '#arrow.down', function () {
        $('html, body').animate({
            scrollTop: $(document).height()
        });
    });

    $('body').on('click', '#arrow.up', function () {
        $('html, body').animate({
            scrollTop: 0
        });
    });

    $('html').on('click', '.load-more', function () {
        e = $(this);
        var selector = e.attr('data-selector');
        var page = e.attr('data-page');
        var per_page = e.attr('data-per-page');
        load_more(selector, page, per_page);
    });

    $(window).on('hashchange', function (e) {
        hash = window.location.hash.replace('#!/', '');
        hash = hash.split('/');
        filterAction(hash.shift());
    });

    news_shows_playlists();
});


var index_show_streamers = function (streamersList) {
    var html = [];
    if (streamersList.length > 0) {
        if ($('#noonline').length > 0) {
            $('#noonline').remove();
        }

        streamersList.forEach(function (item) {
            if (typeof item.twitch != 'undefined') {
                item.twitchid = item.field_value[item.field_value.length - 1];
                item.id = 'TW' + item.twitchid;
                item.idraw = item.twitchid;
                item.live = 'live';
                item.game = item.twitch.game;

                item.link = origin + 'gamer_stream/?user=' + item.user_id + '/#!/' + item.id;
                item.provider = attachments_server;
                item.thumb = item.twitch.preview.large;
                item.title = item.twitch.channel.status;
                item.bust = 1;
                item.views = item.twitch.viewers;
            }
            else if (typeof item.hitbox != 'undefined') {
                item.hitboxid = item.hitbox.media_name;
                // dont render if already active
                item.id = 'HB' + item.hitboxid;
                item.game = item.hitbox.livestream[0].category_name;
                item.username = item.user.username;
                item.user_id = item.user.user_id;
                item.idraw = item.hitboxid;
                item.live = 'live';

                item.link = origin + 'gamer_stream/?user=' + item.user.user_id + '/#!/HB' + item.hitbox.livestream[
                    0].media_user_name;
                item.provider = attachments_server;
                item.thumb = 'http://edge.sf.hitbox.tv/' + item.hitbox.media_thumbnail_large;
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

                item.link = origin + 'gamer_stream/?user=' + item.user_id + '/#!/' + item.id;
                item.provider = attachments_server;
                item.thumb = item.youtube.snippet.thumbnails.high.url;
                item.title = item.youtube.snippet.title;
                item.bust = 1;
                item.views = '0';
            }

            item.game = item.game == null ? '' : item.game + ' / ';

            if (item.game.length > 10) {
                item.game = item.game.substr(0, 9) + '&#133;' + ' / ';
            }

            if (item.username != null && item.username.length > 10) {
                item.username = item.username.substr(0, 9) + '&#133;';
            }

            html.push(template($('#streamersTpl').html(), item));
        });
    }
    else {
        html.push('<p id="noonline"> 目前沒有人直播 </p>');
    }

    $('#streamers').html(html.join(''));
    load_more('#streamers > li', 1, 5);
};

var add_filter_category = function (string, context) {
    utilHash.changeHashVal('console', string);
}

var filter_category = function (cnsl) {
    $.ajax({
        async: false,
        type: "GET",
        dataType: "json",
        url: server + "index?console=" + cnsl,
    }).done(function (data) {
        var context = $('.species a[data-console=' + cnsl + ']');
        context.parent().siblings().removeClass('current');
        context.parent().addClass('current');
        if (cnsl !== 'all') {
            $('#imageSlider').parent().parent().hide();
        }
        else {
            $('#imageSlider').parent().parent().show();
        }
        index_data = data;
        update_index(data);
    });

    return false;
}

var update_index = function (index_data) {
    var html = [];
    var group = [];
    // slider
    if (!slider_loaded) {
        index_data.slider.forEach(function (item, i) {
            item.onclick = item.header_location ? "window.location='" + item.header_location + "'" : '';
            item.provider = attachments_server;
            item.style = item.youtube_link ? '' : 'display:none';
            item.youtube_link = item.youtube_link ? item.youtube_link : '';
            item.thumb = 'https://i.ytimg.com/vi/' + item.youtube_link.replace(
                'https://www.youtube.com/watch?v=', '') + '/default.jpg';
            var date = new Date(item.upload_date * 1000);
            item.link = 'http://cdn.gamers.tm/' + date.getFullYear() + '/' + ("00" + (date.getMonth() + 1))
                .slice(-2) + '/' + item.data_id + '_' + item.file_hash + '.jpg';
            /* 2015.01.12 : Cursor will change if there's a redirection link on the image inside the image slider */
            item.cursorvalue = item.header_location ? 'cursor: pointer;' : 'cursor: default;';
            html.push(template($('#sliderTpl').html(), item));
        });
        $('#imageSlider').html(html.join(''));
        $(".bxslider").bxSlider({
            captions: true,
            auto: true
        });
        slider_loaded = 1;
    }

    // featured videos
    html = [];
    randomFeaturedVids = shuffle(index_data.featured_videos);
    randomFeaturedVids.forEach(function (item, i) {
        item.provider = attachments_server;
        item.thumb = item.snippet.thumbnails.medium.url;
        item.title = item.snippet.title;
        item.bust = 1;
        item.anytv_comment = item.anytv_comment || 0;
        item.comments = item.snippet.meta.statistics.commentCount;
        item.views = item.snippet.meta.statistics.viewCount;
        item.link = '/youtuber/?user=' + item.user_id + '#!/video/' + item.snippet.resourceId.videoId;
        group.push(template($('#latestVideosTpl').html(), item));
        if (group.length == 9) {
            html.push('<ul class="list clearFix">' + group.join('') + '</ul>');
            group = [];
        }
    });

    if (group.length >= 1) {
        html.push('<ul class="list clearFix">' + group.join('') + '</ul>');
    }

    if (!html.length) {
        html.push('目前沒有影片');
    }
    $('#featuredVideos').html(html.join(''));
    slider.featured_video.reloadSlider({
        startSlide: 0,
        infiniteLoop: false,
        hideControlOnEnd: true
    });

    // latest videos
    html = [];
    group = [];
    var flag = {};
    //randomLatestVids = shuffle(index_data.latest_videos);
    index_data.latest_videos.forEach(function (item, i) {
        var date = item.snippet.publishedAt.substr(0, 10);
        if (!flag[date]) {
            flag[date] = [];
        }
        if (!~flag[date].indexOf(item.user_id)) {
            item.provider = attachments_server;
            item.thumb = item.snippet.thumbnails.medium.url;
            item.title = item.snippet.title;
            item.bust = 1;
            item.anytv_comment = item.anytv_comment || 0;
            item.comments = item.snippet.meta.statistics.commentCount;
            item.views = item.snippet.meta.statistics.viewCount;
            item.link = '/youtuber/?user=' + item.user_id + '/#!/video/' + item.snippet.resourceId.videoId;
            group.push(template($('#latestVideosTpl').html(), item));
            if (group.length == 9) {
                html.push('<ul class="list clearFix">' + group.join('') + '</ul>');
                group = [];
            }
            flag[date].push(item.user_id);
        }
    });

    if (group.length >= 1) {
        html.push('<ul class="list clearFix">' + group.join('') + '</ul>');
    }

    if (!html.length) {
        html.push('目前沒有影片');
    }

    $('#latestVideos').html(html.join(''));
    slider.latest_video.reloadSlider({
        startSlide: 0,
        infiniteLoop: false,
        hideControlOnEnd: true
    });

    // most viewed
    html = [];
    group = [];
    var ids = {};
    //randomMostViewedVids = shuffle(index_data.most_viewed);
    index_data.most_viewed.forEach(function (item, i) {
        ids[item.user_id] = typeof ids[item.user_id] === 'undefined' ? 1 : ids[item.user_id] + 1;
        if (ids[item.user_id] > 2) {
            return;
        }

        item.provider = attachments_server;
        item.thumb = item.snippet.thumbnails.medium.url;
        item.title = item.snippet.title;
        item.bust = 1;
        item.anytv_comment = item.anytv_comment || 0;
        item.comments = item.snippet.meta.statistics.commentCount;
        item.views = item.snippet.meta.statistics.viewCount;
        item.link = '/youtuber/?user=' + item.user_id + '/#!/video/' + item.snippet.resourceId.videoId;
        group.push(template($('#latestVideosTpl').html(), item));
        if (group.length == 9) {
            html.push('<ul class="list clearFix">' + group.join('') + '</ul>');
            group = [];
        }
    });

    if (group.length >= 1) {
        html.push('<ul class="list clearFix">' + group.join('') + '</ul>');
    }

    if (!html.length) {
        html.push('目前沒有影片');
    }

    $('#mostViewed').html(html.join(''));
    slider.most_viewed.reloadSlider({
        startSlide: 0,
        infiniteLoop: false,
        hideControlOnEnd: true
    });

    // latest games
    html = [];
    group = [];
    index_data.games.forEach(function (item, i) {
        item.imgsrc = item.image;
        item.game = item.name;
        group.push(template($('#gameTpl').html(), item));
        if (group.length == 12) {
            html.push('<ul class="game clearFix">' + group.join('') + '</ul>');
            group = [];
        }
    });

    if (group.length >= 1) {
        html.push('<ul class="game clearFix">' + group.join('') + '</ul>')
    }

    if (!html.length) {
        html.push('目前沒有遊戲');
    }
    $('#latestGames').html(html.join(''));
    slider.latest_games.reloadSlider({
        startSlide: 0,
        infiniteLoop: false,
        hideControlOnEnd: true
    });






    //featured games
    html = [];
    group = [];
    index_data.featured_games.forEach(function (item, i) {
        var found_games = index_data.games.filter(function (game) {
            return game.id === item.id;
        });
        if (found_games.length === 1) {
            item.imgsrc = found_games[0].image;
            item.game = found_games[0].name;
            item.chinese = found_games[0].chinese;
            group.push(template($('#gameTpl').html(), item));
            if (group.length == 12) {
                html.push('<ul class="game clearFix">' + group.join('') + '</ul>');
                group = [];
            }
        }
    });

    if (group.length >= 1) {
        html.push('<ul class="game clearFix">' + group.join('') + '</ul>')
    }

    if (!html.length) {
        html.push('目前沒有遊戲');
    }
    $('#featuredGames').html(html.join(''));

    slider.featured_games.reloadSlider({
        startSlide: 0,
        infiniteLoop: false,
        hideControlOnEnd: true
    });









    // featuredUser
    html = [];
    if (index_data.feature_list.feature_list_active === '1') {
        $('.viewer > h2').html(index_data.feature_list.feature_list_header);
        index_data.feature_list.feature_list_items.forEach(function (item, i) {
            html.push(template($('#featureTpl').html(), item));
        });
        if (!html.length) {
            html.push('No feature available.')
        }
        $('#featuredUsers').html(html.join(''));

    }
    else {
        index_data.featured_users.forEach(function (item, i) {
            item.provider = attachments_server;
            html.push(template($('#featuredUsersTpl').html(), item));
        });
        if (!html.length) {
            html.push('No User Available');
        }
        $('#featuredUsers').html('<ul>' + html.join('') + '</ul>');
    }

    // recent forum
    html = [];
    index_data.recent_threads.forEach(function (item, i) {
        var data = {
            posterimage: attachments_server + 'avatar.php?userid=' + item.last_post_user_id + '.jpg',
            title: item.title,
            replies: item.reply_count,
            views: item.view_count,
            link: community + 'index.php?threads/' + item.thread_id + '/',
        }
        html.push(template($('#recentForumItemTpl').html(), data));
    });
    if (!html.length) {
        html.push('No Recent Forum');
    }
    var data = {
        threads: html.join('')
    }
    html = template($('#recentForumTpl').html(), data);
    $('#forumSection').html(html);

    // hot forum
    html = [];
    index_data.threads.forEach(function (item, i) {
        var data = {
            posterimage: attachments_server + 'avatar.php?userid=' + item.last_post_user_id + '.jpg',
            title: item.title,
            replies: item.reply_count,
            views: item.view_count,
            link: community + 'index.php?threads/' + item.title + '.' + item.thread_id + '/',
        }
        html.push(template($('#recentForumItemTpl').html(), data));
    });
    if (!html.length) {
        html.push('No Recent Forum');
    }
    var data = {
        threads: html.join('')
    }
    html = template($('#recentForumTpl').html(), data);
    $('#hotForumSection').html(html);

    $(".viewer .scroll, .streaming .scroll").mCustomScrollbar({
        theme: "inset-2"
    });

    $('.tooltip').tooltipster({
        contentAsHTML: true,
        position: 'top'
    });

};

var news_shows_playlists = function () {
    console.log('jjjjj', index_data);
    var html = [];
    var blocks = '';
    var max_items = 4;
    var ctr = 1;
    var visible_news_playlists = (typeof index_data.visible_news_playlists != 'undefined') ? index_data.visible_news_playlists
        .split(',') : [];
    var visible_shows_playlists = (typeof index_data.visible_shows_playlists != 'undefined') ? index_data.visible_shows_playlists
        .split(',') : [];

    index_data.news_playlists.forEach(function (playlist, index) {
        if (visible_news_playlists.indexOf(playlist.id) == -1) {
            return;
        }
        blocks = '<div id="tab-news-playlist-' + index + '"><ul class="list clearFix">';
        blocks += '</ul></div>';
        $('#news_shows_playlists_block').append(blocks);

        $.ajax({
            url: server + 'news',
            dataType: 'json',
            async: true,
            data: {
                playlist: playlist.id
            },
            success: function (result) {
                ctr = 1;
                result.items.forEach(function (item, i) {
                    var newsShows, newsShowsTpl;
                    if (item.status.privacyStatus === 'public') {
                        if (ctr > max_items) return;
                        if (typeof item.snippet.thumbnails !== 'undefined') {
                            item.thumb = item.snippet.thumbnails.medium.url;
                        }
                        else {
                            item.thumb = null;
                        }
                        item.title = item.snippet.title;
                        item.link = '/news/#!/playlist/' + playlist.id + '/video/' +
                            item.snippet.resourceId.videoId;
                        newsShowsTpl = $('#newsShowsTpl').html() || '';
                        newsShows = template(newsShowsTpl, item);
                        $('#tab-news-playlist-' + index + ' ul').append(newsShows);
                        ctr++;
                    }
                });
            }
        });

        html.push('<li><h2><a href="#tab-news-playlist-' + index + '">' + playlist.snippet.title +
            '</a></h2></li>');
    });

    index_data.shows_playlists.forEach(function (playlist, index) {
        if (visible_shows_playlists.indexOf(playlist.id) == -1) {
            return;
        }
        blocks = '<div id="tab-shows-playlist-' + index + '"><ul class="list clearFix">';
        blocks += '</ul></div>';
        $('#news_shows_playlists_block').append(blocks);

        $.ajax({
            url: server + 'shows',
            dataType: 'json',
            async: true,
            data: {
                playlist: playlist.id
            },
            success: function (result) {
                ctr = 1;
                result.items.forEach(function (item, i) {
                    if (item.status.privacyStatus === 'public') {
                        if (ctr > max_items) return;
                        if (typeof item.snippet.thumbnails !== 'undefined') {
                            item.thumb = item.snippet.thumbnails.medium.url;
                        }
                        else {
                            item.thumb = null;
                        }
                        item.title = item.snippet.title;
                        item.link = '/shows/#!/playlist/' + playlist.id + '/video/' +
                            item.snippet.resourceId.videoId;
                        $('#tab-shows-playlist-' + index + ' ul').append(template($(
                            '#newsShowsTpl').html(), item));
                        ctr++;
                    }
                });
            }
        });

        html.push('<li><h2><a href="#tab-shows-playlist-' + index + '">' + playlist.snippet.title +
            '</a></h2></li>');
    });

    $('#news_shows_playlists').html(html.join(''));
    //$('#news_shows_playlists_block').append(blocks);
    $(".sf-menu").superfish();
    $(".tabs").tabslet({
        animation: true,
    }).on("_before", function () {
        slider.most_viewed.reloadSlider();
        slider.featured_video.reloadSlider();
        slider.latest_video.reloadSlider();
        slider.featured_games.reloadSlider();
        slider.latest_games.reloadSlider();
    });
}

/* RDC */
var YTStreamers = [];
var TWStreamers = [];
var HBStreamers = [];
var onlineStreamers = [];

var checker_index = function () {
    var socket = io.connect(socket_server);
    socket.on('message', function (e) {
        onlineStreamers = [];
        onlineStreamers = onlineStreamers.concat(
            e.streamers.youtube.concat(
                e.streamers.twitch.concat(
                    e.streamers.hitbox
                )
            )
        );
        index_show_streamers(onlineStreamers);
    });
};

var shuffle = function (o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

var displayGamesPerConsole = function (gl) {
    $('#featuredGames').empty();
    // featured games
    html = [];
    group = [];
    gl.forEach(function (item, i) {
        if (item.game.length > 15) {
            item.gamename = item.gamename.replace('_', ' ').substring(0, 12) + '...';
        }

        if (item.imgsrc.indexOf('game-logos') === -1) {
            item.gamename = '';
        }

        group.push(template($('#gameConsoleTpl').html(), item));
        if (group.length == 12) {
            html.push('<ul class="game clearFix">' + group.join('') + '</ul>');
            group = [];
        }
    });

    if (group.length >= 1) {
        html.push('<ul class="game clearFix">' + group.join('') + '</ul>')
    }

    if (!html.length) {
        html.push('目前沒有遊戲');
    }
    $('#featuredGames').html(html.join(''));

    slider.featured_games.reloadSlider({
        startSlide: 0,
        infiniteLoop: false,
        hideControlOnEnd: true
    });
};

//checker_index();

