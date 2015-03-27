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
    shuffledGames = [],
    shuffledLatest = [],

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
        if (string === 'all') {
            $.ajax({
                url: server + 'gamesdata?console=all'
            }).done(function(res) {
                var axbox360 = [],
                    axbox1 = [],
                    aps3 = [],
                    aps4 = [],
                    apc = [],
                    amobile = [],
                    html = [],
                    group = [];

                if (trigger === 1) {
                    shuffledGames = shuffle(res.games);
                }
                else {
                    shuffledGames = res.games;
                }

                shuffledGames.forEach(function (item, i) {

                    if (axbox360.length <= 5) {
                        if (item.consoles.indexOf('xbox360') > -1) {
                            axbox360.push(item);
                        }
                    }

                    if (axbox1.length <= 5) {
                        if (item.consoles.indexOf('xbox1') > -1) {
                            axbox1.push(item);
                        }
                    }

                    if (aps3.length <= 5) {
                        if (item.consoles.indexOf('ps3') > -1) {
                            aps3.push(item);
                        }
                    }

                    if (aps4.length <= 5) {
                        if (item.consoles.indexOf('ps4') > -1) {
                            aps4.push(item);
                        }
                    }

                    if (apc.length <= 5) {
                        if (item.consoles.indexOf('pc') > -1) {
                            apc.push(item);
                        }
                    }

                    if (amobile.length <= 5) {
                        if (item.consoles.indexOf('mobile_app') > -1) {
                            amobile.push(item);
                        }
                    }
                });

                var sarray = axbox360.concat(axbox1, aps3, aps4, apc, amobile);

                sarray.forEach(function (item, i) {
                    var found_games = sarray.filter(function (game) {
                        return game.id === item.id;
                    });
                    if (found_games.length === 1) {
                        item.imgsrc = found_games[0].image;
                        item.game = found_games[0].name;
                        item.chinese = found_games[0].chinese;
                        group.push(template(JST['gameTpl.html'](), item));
                        if (group.length === 12) {
                            html.push('<ul class="game clearFix">' + group.join('') + '</ul>');
                            group = [];
                        }
                    }
                });
                if (group.length >= 1) {
                    html.push('<ul class="game clearFix">' + group.join('') + '</ul>');
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

                shuffledLatest = shuffle(sarray);

                shuffledLatest.forEach(function (item, i) {
                    item.imgsrc = item.image;
                    item.game = item.name;
                    group2.push(template(JST['gameTpl.html'](), item));
                    if (group2.length === 12) {
                        html2.push('<ul class="game clearFix">' + group2.join('') + '</ul>');
                        group2 = [];
                    }
                });
                if (group2.length >= 1) {
                    html2.push('<ul class="game clearFix">' + group2.join('') + '</ul>');
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

        } else {

            $.ajax({
                url: server + 'gamesdata?console=' + string
            }).done(function(res) {
                var spec_game = [],
                    html = [],
                    group = [];

                if (trigger === 1) {
                    shuffledGames = shuffle(res.games);
                } else {
                    shuffledGames = res.games;
                }

                shuffledGames.forEach(function (item, i) {

                    if (spec_game.length <= 5) {
                        spec_game.push(item);
                    }

                    var found_games = spec_game.filter(function (game) {
                        return game.id === item.id;
                    });

                    if (found_games.length === 1) {
                        item.imgsrc = found_games[0].image;
                        item.game = found_games[0].name;
                        item.chinese = found_games[0].chinese;
                        group.push(
                            template(
                                JST['gameTpl.html'](), item
                            )
                        );
                        if (group.length === 6) {
                            html.push('<ul class="game clearFix">' + group.join('') + '</ul>');
                            group = [];
                        }
                    }
                });

                if (group.length >= 1) {
                    html.push('<ul class="game clearFix">' + group.join('') + '</ul>');
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

                shuffledLatest = shuffle(spec_game);

                shuffledLatest.forEach(function (item, i) {
                    item.imgsrc = item.image;
                    item.game = item.name;
                    group2.push(template(JST['gameTpl.html'](), item));
                    if (group2.length === 6) {
                        html2.push('<ul class="game clearFix">' + group2.join('') + '</ul>');
                        group2 = [];
                    }
                });
                if (group2.length >= 1) {
                    html2.push('<ul class="game clearFix">' + group2.join('') + '</ul>');
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
        var shuffleTrigger = 0,
            tCounterCorrect = 0,
            tCounterWrong = 0,
            html = [];
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
    },

    start = function() {
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
            
            news_shows_playlists();
        });
    };