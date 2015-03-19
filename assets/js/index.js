/* jshint unused: false */
/* global 
    utilHash,
    server,
    template,
    JST,
    origin,
    attachments_server,
    community
*/

'use strict';

var index_data,
    slider_loaded = 0,
    random_featured_vids = [],
    hash = '',
    slider = {},
    shuffled_games = [],
    shuffled_latest = [],

    load_more = function (selector, page, per_page) {
        $(selector).slice(0, page * per_page).show();
        if ($(selector).length <= page * per_page) {
            $('.load-more[data-selector="' + selector + '"]').hide();
        }
        else {
            $('.load-more[data-selector="' + selector + '"]').show();
        }
        $('.load-more[data-selector="' + selector + '"]').attr('data-page', parseInt(page) + 1);
        $('.load-more[data-selector="' + selector + '"]').attr('data-per-page', per_page);
    },

    shuffle = function (o) {
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x) {}
        return o;
    },

    renderFeaturedGames = function (string, trigger) {
        document.getElementById('featuredGames').innerHTML = '';
        if (string === 'all') {
            $.ajax({
                url: server + 'gamesdata?console=all'
            }).done(function(res) {

                if (trigger === 1) {
                    shuffled_games = shuffle(res.featured_games);
                } else {
                    shuffled_games = res.featured_games;
                }

                var html = [],
                    group = [];
                shuffled_games.forEach(function (item) {
                    var found_games = shuffled_games.filter(function (game) {
                        return game.id === item.id;
                    });
                    if (found_games.length === 1) {
                        item.imgsrc = found_games[0].image;
                        item.game = found_games[0].name;
                        item.chinese = found_games[0].chinese;
                        group.push(template(JST['gameTpl.html'](), item));
                        if (group.length === 5) {
                            html.push('<ul class="game clearFix">' + group.join('') + '</ul>');
                            group = [];
                        }
                    }
                });
                if (group.length >= 1) {
                    html.push(
                        '<ul class="game clearFix">' +
                        group.join('') + '</ul>'
                    );
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
                $('.tooltip').tooltipster({
                    contentAsHTML: true,
                    position: 'top'
                });

                var html2 = [],
                    group2 = [];

                if (trigger === 1) {
                    shuffled_latest = shuffle(shuffled_games);
                } else {
                    shuffled_latest = shuffled_games;
                }

                shuffled_latest.forEach(function (item) {
                    item.imgsrc = item.image;
                    item.game = item.name;
                    group2.push(
                        template(
                            JST['gameTpl.html'](),
                            item
                        )
                    );
                    if (group2.length === 5) {
                        html2.push('<ul class="game clearFix">' + group2.join('') + '</ul>');
                        group2 = [];
                    }
                });

                if (group2.length >= 1) {
                    html2.push(
                        '<ul class=\'game clearFix\'>' +
                        group2.join('') + '</ul>'
                    );
                }

                if (!html2.length) {
                    html2.push('目前沒有遊戲');
                }

                $('#latestGames').html(html2.join(''));
                slider.latest_games.reloadSlider({
                    startSlide: 0,
                    infiniteLoop: false,
                    hideControlOnEnd: true
                });

            });
        }
        else {
            $.ajax({
                url: server + 'gamesdata?console=' + string
            }).done(function(res) {

                if (trigger === 1) {
                    shuffled_games = shuffle(res.games);
                } else {
                    shuffled_games = res.games;
                }
                var html = [],
                    group = [];
                shuffled_games.forEach(function (item) {
                    var found_games = shuffled_games.filter(function (game) {
                        return game.id === item.id;
                    });
                    if (found_games.length === 1) {
                        item.imgsrc = found_games[0].image;
                        item.game = found_games[0].name;
                        item.chinese = found_games[0].chinese;
                        group.push(template(JST['gameTpl.html'](), item));
                        if (group.length === 5) {
                            html.push('<ul class="game clearFix">' + group.join('') + '</ul>');
                            group = [];
                        }
                    }
                });

                if (group.length >= 1) {
                    html.push(
                        '<ul class=\'game clearFix\'>' +
                        group.join('') + '</ul>'
                    );
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

                $('.tooltip').tooltipster({
                    contentAsHTML: true,
                    position: 'top'
                });

                var html2 = [],
                    group2 = [];

                if (trigger === 1) {
                    shuffled_latest = shuffle(shuffled_games);
                }
                else {
                    shuffled_latest = shuffled_games;
                }

                shuffled_latest.forEach(function (item) {
                    item.imgsrc = item.image;
                    item.game = item.name;
                    group2.push(template(JST['gameTpl.html'](), item));
                    if (group2.length === 5) {
                        html2.push('<ul class="game clearFix">' + group2.join('') + '</ul>');
                        group2 = [];
                    }
                });

                if (group2.length >= 1) {
                    html2.push(
                        '<ul class=\'game clearFix\'>' +
                        group2.join('') + '</ul>');
                }

                if (!html2.length) {
                    html2.push('目前沒有遊戲');
                }

                $('#latestGames').html(html2.join(''));
                slider.latest_games.reloadSlider({
                    startSlide: 0,
                    infiniteLoop: false,
                    hideControlOnEnd: true
                });

            });
        }
    },

    shuffleTriggerFunction = function (trigger) {
        switch (window.location.href) {
            case origin:
                renderFeaturedGames('all', trigger);
                break;
            case origin + '#!/console/all':
                renderFeaturedGames('all', trigger);
                break;
            case origin + '#!/console/xbox360':
                renderFeaturedGames('xbox360', trigger);
                break;
            case origin + '#!/console/xbox1':
                renderFeaturedGames('xbox1', trigger);
                break;
            case origin + '#!/console/ps3':
                renderFeaturedGames('ps3', trigger);
                break;
            case origin + '#!/console/ps4':
                renderFeaturedGames('ps4', trigger);
                break;
            case origin + '#!/console/pc':
                renderFeaturedGames('pc', trigger);
                break;
            case origin + '#!/console/mobile_app':
                renderFeaturedGames('mobile_app', trigger);
                break;
            case origin + '#!/console/vlogs':
                renderFeaturedGames('vlogs', trigger);
                break;
        }
    },

    update_index = function (_index_data) {
        var html = [];
        var group = [];

        if (!slider_loaded) {
            _index_data.slider.forEach(function (item) {
                item.onclick = 
                    item.header_location ?
                        'window.location=\'' +
                            item.header_location + '\'' :
                        '';
                item.provider = attachments_server;
                item.style = item.youtube_link ? '' : 'display:none';
                item.youtube_link = item.youtube_link ? item.youtube_link : '';
                item.thumb = 'https://i.ytimg.com/vi/' + item.youtube_link.replace(
                    'https://www.youtube.com/watch?v=', '') + '/default.jpg';
                var date = new Date(item.upload_date * 1000);
                item.link = 'http://cdn.gamers.tm/' + date.getFullYear() + '/' + ('00' + (date.getMonth() + 1))
                    .slice(-2) + '/' + item.data_id + '_' + item.file_hash + '.jpg';
                item.cursorvalue = item.header_location ? 'cursor: pointer;' : 'cursor: default;';
                html.push(template(JST['sliderTpl.html'](), item));
            });
            $('#imageSlider').html(html.join(''));
            $('.bxslider').bxSlider({
                captions: true,
                auto: true
            });
            slider_loaded = 1;
        }

        html = [];
        random_featured_vids = shuffle(_index_data.featured_videos);
        random_featured_vids.forEach(function (item) {
            item.provider = attachments_server;
            item.thumb = item.snippet.thumbnails.medium.url;
            item.title = item.snippet.title;
            item.bust = 1;
            item.anytv_comment = item.anytv_comment || 0;
            item.comments = item.snippet.meta.statistics.commentCount;
            item.views = item.snippet.meta.statistics.viewCount;
            item.link = '/youtuber/?user=' + item.user_id + '#!/video/' + item.snippet.resourceId.videoId;
            group.push(template(JST['latestVideosTpl.html'](), item));
            if (group.length === 9) {
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

        html = [];
        group = [];
        var flag = {};

        _index_data.latest_videos.forEach(function (item) {
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
                item.link = '/youtuber/?user=' +
                    item.user_id + '/#!/video/' +
                    item.snippet.resourceId.videoId;
                group.push(template(JST['latestVideosTpl.html'](), item));
                if (group.length === 9) {
                    html.push('<ul class="list clearFix">' + group.join('') + '</ul>');
                    group = [];
                }
                flag[date].push(item.user_id);
            }
        });

        if (group.length >= 1) {
            html.push('<ul class="list clearFix">' +
                group.join('') + '</ul>');
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

        html = [];
        group = [];
        var ids = {};

        _index_data.most_viewed.forEach(function (item) {
            ids[item.user_id] = 
                typeof ids[item.user_id] === 'undefined' ?
                    1 :
                    ids[item.user_id] + 1;

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
            item.link = '/youtuber/?user=' +
                item.user_id + '/#!/video/' +
                item.snippet.resourceId.videoId;
            group.push(template(JST['latestVideosTpl.html'](), item));
            if (group.length === 9) {
                html.push(
                    '<ul class="list clearFix">' +
                    group.join('') + '</ul>'
                );
                group = [];
            }
        });

        if (group.length >= 1) {
            html.push(
                '<ul class="list clearFix">' +
                group.join('') + '</ul>'
            );
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

        var shuffleTrigger = 0,
            tCounterCorrect = 0,
            tCounterWrong = 0;
        window.setInterval(function() {
            var date = new Date();
            if (date.getHours() === 24 &&
                date.getMinutes() === 0 &&
                date.getSeconds() === 0) {
                    shuffleTrigger = 1;
                    tCounterCorrect++;
                    if (tCounterCorrect === 1) {
                        shuffleTriggerFunction(shuffleTrigger);
                    }
            }
            else {
                shuffleTrigger = 0;
                tCounterWrong++;
                if (tCounterWrong === 1) {
                    shuffleTriggerFunction(shuffleTrigger);
                }
            }
        }, 1000);

        html = [];
        if (_index_data.feature_list.feature_list_active === '1') {
            $('.viewer > h2').html(_index_data.feature_list.feature_list_header);
            _index_data.feature_list.feature_list_items.forEach(function (item) {
                html.push(template(JST['featureTpl.html'](), item));
            });

            if (!html.length) {
                html.push('No feature available.');
            }

            $('#featuredUsers').html(html.join(''));
        }
        else {
            _index_data.featured_users.forEach(function (item) {
                item.provider = attachments_server;
                html.push(template(JST['featuredUsersTpl.html'](), item));
            });
            if (!html.length) {
                html.push('No User Available');
            }
            $('#featuredUsers').html('<ul>' + html.join('') + '</ul>');
        }

        html = [];
        _index_data.recent_threads.forEach(function (item) {
            var data = {
                posterimage: attachments_server +
                    'avatar.php?userid=' +
                    item.last_post_user_id + '.jpg',
                title: item.title,
                replies: item.reply_count,
                views: item.view_count,
                link: community + 'index.php?threads/' + item.thread_id + '/',
            };
            html.push(template(JST['recentForumItemTpl.html'](), data));
        });
        if (!html.length) {
            html.push('No Recent Forum');
        }
        var data = {
            threads: html.join('')
        };
        html = template(JST['recentForumTpl.html'](), data);
        $('#forumSection').html(html);

        // hot forum
        html = [];
        _index_data.threads.forEach(function (item) {
            var _data = {
                posterimage: attachments_server + 'avatar.php?userid=' + item.last_post_user_id + '.jpg',
                title: item.title,
                replies: item.reply_count,
                views: item.view_count,
                link: community + 'index.php?threads/' + item.title + '.' + item.thread_id + '/',
            };
            html.push(template(JST['recentForumItemTpl.html'](), _data));
        });
        if (!html.length) {
            html.push('No Recent Forum');
        }
        var data2 = {
            threads: html.join('')
        };
        html = template(JST['recentForumTpl.html'](), data2);
        $('#hotForumSection').html(html);

        $('.viewer .scroll, .streaming .scroll').mCustomScrollbar({
            theme: 'inset-2'
        });

        $('.tooltip').tooltipster({
            contentAsHTML: true,
            position: 'top'
        });
    },

    filter_category = function (cnsl) {
        $.ajax({
            async: false,
            type: 'GET',
            dataType: 'json',
            url: server + 'index?console=' + cnsl,
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
    },

    filterAction = function (action) {
        switch (action) {
        case 'console':
            filter_category(hash.shift());
            filterAction(hash.shift());
            $('html, body').animate({
                scrollTop: 0
            });
            break;
        }
    },

    add_filter_category = function (string) {
        utilHash.changeHashVal('console', string);
        renderFeaturedGames(string);
    },

    news_shows_playlists = function () {
        var html = [],
            blocks = '',
            max_items = 4,
            ctr = 1,
            visible_news_playlists = (
                (typeof index_data.visible_news_playlists !== 'undefined') ?
                    index_data.visible_news_playlists.split(',') :
                    []
            ),
            visible_shows_playlists = (
                (typeof index_data.visible_shows_playlists !== 'undefined') ?
                    index_data.visible_shows_playlists.split(',') :
                    []
            );

        index_data.news_playlists.forEach(function (playlist, index) {
            if (visible_news_playlists.indexOf(playlist.id) === -1) {
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
                    result.items.forEach(function (item) {
                        var newsShows, newsShowsTpl;
                        if (item.status.privacyStatus === 'public') {
                            if (ctr > max_items) {
                                return;
                            }
                            if (typeof item.snippet.thumbnails !== 'undefined') {
                                item.thumb = item.snippet.thumbnails.medium.url;
                            }
                            else {
                                item.thumb = null;
                            }
                            item.title = item.snippet.title;
                            item.link = '/news/#!/playlist/' + playlist.id + '/video/' +
                                item.snippet.resourceId.videoId;
                            newsShowsTpl = JST['newsShowsTpl.html']() || '';
                            newsShows = template(newsShowsTpl, item);
                            $('#tab-news-playlist-' + index + ' ul').append(newsShows);
                            ctr++;
                        }
                    });
                }
            });

            html.push('<li><h2><a href="#tab-news-playlist-' + index + '">' +
                playlist.snippet.title +
                '</a></h2></li>');
        });

        index_data.shows_playlists.forEach(function (playlist, index) {
            if (visible_shows_playlists.indexOf(playlist.id) === -1) {
                return;
            }

            blocks = '<div id="tab-shows-playlist-' +
                index + '"><ul class="list clearFix">';
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
                    result.items.forEach(function (item) {
                        if (item.status.privacyStatus === 'public') {
                            if (ctr > max_items) {
                                return;
                            }
                            if (typeof item.snippet.thumbnails !== 'undefined') {
                                item.thumb = item.snippet.thumbnails.medium.url;
                            }
                            else {
                                item.thumb = null;
                            }
                            item.title = item.snippet.title;
                            item.link = '/shows/#!/playlist/' +
                                playlist.id + '/video/' +
                                item.snippet.resourceId.videoId;
                            $('#tab-shows-playlist-' + index + ' ul').
                                append(template(JST['newsShowsTpl.html'](), item));
                            ctr++;
                        }
                    });
                }
            });

            html.push(
                '<li><h2><a href="#tab-shows-playlist-' + index + '">' +
                playlist.snippet.title +
                '</a></h2></li>'
            );
        });

        $('#news_shows_playlists').html(html.join(''));

        $('.sf-menu').superfish();
        $('.tabs').tabslet({
            animation: true,
        }).on('_before', function () {
            slider.most_viewed.reloadSlider();
            slider.featured_video.reloadSlider();
            slider.latest_video.reloadSlider();
            slider.featured_games.reloadSlider();
            slider.latest_games.reloadSlider();
        });
    },

    init_doc_listeners = function() {
        
        slider.most_viewed = $('#mostViewed').bxSlider({
            startSlide: 0,
            infiniteLoop: false,
            hideControlOnEnd: true
        });

        slider.latest_video = $('#latestVideos').bxSlider({
            startSlide: 0,
            infiniteLoop: false,
            hideControlOnEnd: true
        });

        slider.featured_video = $('#featuredVideos').bxSlider({
            startSlide: 0,
            infiniteLoop: false,
            hideControlOnEnd: true
        });

        slider.featured_games = $('#featuredGames').bxSlider({
            startSlide: 0,
            infiniteLoop: false,
            hideControlOnEnd: true
        });

        slider.latest_games = $('#latestGames').bxSlider({
            startSlide: 0,
            infiniteLoop: false,
            hideControlOnEnd: true
        });

        $(document).ready(function () {
            $.ajax({
                async: false,
                type: 'GET',
                dataType: 'json',
                url: server + 'index?console=all',
            }).done(function (data) {
                index_data = data;
                update_index(index_data);
            });

            $(document).on('click', '.slider-item .play', function () {
                var vid = $(this).attr('data-vid');
                if (vid.trim().length) {
                    vid = vid.split('?')[1].split('=');
                    vid = vid[vid.indexOf('v') + 1].split('#')[0];
                    var html = template(JST['playerTpl.html'](), {
                        video: '//www.youtube.com/embed/' + vid + '?autoplay=1'
                    });
                    $('#container .bx-wrapper:first').prepend(html).promise().done(function () {
                        $('.bx-wrapper .video-player iframe').css('margin-top',(
                            $(window).height() - $('.bx-wrapper iframe').height()) / 2
                        );
                        $('.bx-wrapper .video-player .close').css('margin-top', (
                            $(window).height() - $('.bx-wrapper iframe').height()) / 2
                        );
                    });
                }
            });

            $(document).on('click', '.bx-wrapper .close', function () {
                $('#container .bx-wrapper .video-player').remove();
            });

            

            $('html').on('click', '.load-more', function () {
                var e = $(this);
                var selector = e.attr('data-selector');
                var page = e.attr('data-page');
                var per_page = e.attr('data-per-page');
                load_more(selector, page, per_page);
            });

            $(window).on('hashchange', function () {
                hash = window.location.hash.replace('#!/', '');
                hash = hash.split('/');
                filterAction(hash.shift());
            });

            news_shows_playlists();
        });
    },

    start = function() {
            init_doc_listeners();
    };

start();
