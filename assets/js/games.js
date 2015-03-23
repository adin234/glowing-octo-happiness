/* jshint unused: false */
/* global
    page_data: true,
    template,
    JST,
    server,
    attachments_server,
    gamesAutocompleteArray,
    utilHash
*/

'use strict';

var slider = {}, 
    con = 'all',
    currentPage = 1,
    hash,
    filterConsole = '',
    filterGame = '',
    gameNames = [],

    get_hash = function() {
        var _hash = window.location.hash.replace('#!/', '').replace(/#tab-\d-\d/i, '');
        _hash = _hash.split('/');
        return _hash;
    },

    get_game = function() {
        var game = ~get_hash().indexOf('game') ?
            get_hash()[get_hash().indexOf('game') + 1] : 0;

        return game === '' ? 'all' : game;
    },

    render_featured_games = function (filter) {
        var html = [],
            items = [];

        filter =  new RegExp(filter, 'i');
        page_data.featured_games.forEach(function(item, i) {
            if (item.name.search(filter) === -1 &&
                item.chinese.search(filter) === -1) {
                return;
            }

            if (item.id === filterGame) {
                item.class = 'active';
            }

            item.game = item.name;
             item.id = item.id.trim();
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
                        {'items' : items.join('')}
                    )
                );
                items = [];
            }
        });

        if (items.length !== 0) {
            html.push(
                template(
                    JST['gameContainerTpl.html'](),
                    {'items' : items.join('')}
                )
            );
        }
        if (!html.length) {
            html.push('目前沒有遊戲');
        }

        $('#container-featured-games').html(html.join(''));

        slider.featured_games.reloadSlider({
            startSlide: 0,
            infiniteLoop: false,
            hideControlOnEnd: true
        });
    },

    render_latest_games = function(filter) {
        var html = [],
            items = [];
        filter =  new RegExp(filter, 'i');

        page_data.games.forEach(function(item, i) {
            if (item.name.search(filter) === -1 &&
                item.chinese.search(filter) === -1) {
                    return;
            } 

            if (item.id === filterGame) {
                item.class = 'active';
            }

            items.push(
                template(
                    JST['gameTpl.html'](),
                    item
                )
            );

            item.id = item.id.trim();
            if (items.length === 12) {
                html.push(
                    template(
                        JST['gameContainerTpl.html'](),
                        {'items' : items.join('')}
                    )
                );
                items = [];
            }
        });

        if (items.length !== 0) {
            html.push(
                template(
                    JST['gameContainerTpl.html'](),
                    {'items' : items.join('')}
                )
            );
        }

        if (!html.length) { html.push('目前沒有遊戲'); }
        $('#container-latest-games').html(
            html.join('')
        );

        slider.latest_games.reloadSlider({
            startSlide: 0,
            infiniteLoop: false,
            hideControlOnEnd: true
        });
    },

    load_game_videos_next_page = function() {
        var html = [],
            items = [],
            page = Math.floor(slider.container_videos.getSlideCount() / 2),
            nextPage = page + 1,
            tplVideo = JST['videoTpl.html'](),
            tplVideoContainer = JST['videoContainerTpl.html'](),
            game = get_game(),
            filter = $('#txtbox-search-videos').val(),
            currentSlide = slider.container_videos.getCurrentSlide();

        if (nextPage <= currentPage) {
            return;
        }

        currentPage = nextPage;
        $.getJSON(server + 'games/' + game +
            '/videos?limit=32&console=' + con +
            '&page=' + nextPage +
            '&search=' + filter,
            function(result) {
            page_data.videos.concat(result);
            result.forEach(function (item, i) {
                item.anytv_comments = item.anytv_comment || 0;
                item.provider = attachments_server;
                item.thumb = item.snippet.thumbnails.medium.url;
                item.title = item.snippet.title;
                item.bust = 1;
                item.comments = item.snippet.meta.statistics.commentCount;
                item.views = item.snippet.meta.statistics.viewCount;
                item.link = '/youtuber/?user=' + item.user_id +
                    '#!/video/' + item.snippet.resourceId.videoId;

                items.push(template(tplVideo, item));

                if (items.length === 16) {
                    html.push(
                        template(
                            tplVideoContainer,
                            {'items' : items.join('')}
                        )
                    );
                    items = [];
                }
            });

            if (items.length !== 0) {
               html.push(
                    template(
                        tplVideoContainer,
                        {'items' : items.join('')}
                    )
                );
            }

            $('#container-videos').append(html.join(''));

            slider.container_videos.reloadSlider({
                startSlide: currentSlide,
                onSlideAfter: load_game_videos_next_page,
                infiniteLoop: false,
                hideControlOnEnd: true
            });

            if (currentSlide !== (slider.container_videos.getSlideCount() - 1)) {
                $('.video .bx-next.disabled, .video .bx-prev.disabled').each(function(i, item) {
                    $(this).removeClass('disabled');
                });
            }

            if (slider.container_videos.getCurrentSlide() === 0) {
                $('.video .bx-prev').addClass('disabled');
            }
        });
    },

    render_videos = function() {
        var html = [],
            items = [],
            ids = [],
            tplVideo = JST['videoTpl.html'](),
            tplVideoContainer = JST['videoContainerTpl.html']();

        page_data.videos.forEach(function (item, i) {
            item.anytv_comments = item.anytv_comment || 0;
            item.provider = attachments_server;
            item.thumb = item.snippet.thumbnails.medium.url;
            item.title = item.snippet.title;
            item.bust = 1;
            item.comments = item.snippet.meta.statistics.commentCount;
            item.views = item.snippet.meta.statistics.viewCount;
            item.link = '/youtuber/?user=' + item.user_id +
                '#!/video/' + item.snippet.resourceId.videoId;

            items.push(template(tplVideo, item));
            ids.push(item.youtube_id);
            if (items.length === 16) {
                html.push(
                    template(
                        tplVideoContainer, {'items' : items.join('')}
                    )
                );
                items = [];
            }
        });

        if (items.length !== 0) {
            html.push(
                template(
                    tplVideoContainer, {'items' : items.join('')}
                )
            );
        }

        if (!html.length) {
            html.push('目前沒有影片');
        }

        $('#container-videos').html(html.join(''));
        $('.video .bx-next.disabled, .video .bx-prev.disabled').each(function(i, item) {
                $(this).removeClass('disabled');
            });

        slider.container_videos.reloadSlider({
            onSlideAfter: load_game_videos_next_page,
            infiniteLoop: false,
            hideControlOnEnd: true
        });
    },

    render_game_videos = function(game, page) {
        var parameters = {
            limit: 32
        };

        filterGame = game;

        if (filterConsole.length) {
            parameters.console = filterConsole;
        }

        if (filterGame.length) {
            parameters.game = filterGame;
        }

        page = typeof page !== 'undefined' ? '&page=' + page : '';
        var searchString = $('#txtbox-search-videos').val();
        if (searchString.trim()) {
            page += '&search=' + searchString;
        }
        $.getJSON(server + 'games/' + game + '/videos?' +
            $.param(parameters) + page, function(result) {
                page_data.videos = result;
                render_videos();
            }
        );
    },

    categorize_game = function(game) {
        if (game.trim().length) {
            var id = game;

            $('.game-item').each(function(i, item) {
                $(item).removeClass('active');
            });

            if (id.trim() === '' || id.trim() === '#!') {
                filterGame = '';
                $.getJSON(server+'games/all/videos', function(result) {
                    console.log(result);
                    page_data.videos = result;
                    render_videos();
                });
                return;
            }

            $('[data-id='+id+']').parent().addClass('active');
            $('#game-title').html($('[data-id='+id+']').attr('data-chi'));
            render_game_videos(id);
        } else {
            render_videos();
        }
    },

    filter_game = function(input) {
        var $this = $(input),
            filterString = $this.val();
        render_featured_games(filterString);
        render_latest_games(filterString);
        $('.tooltip').tooltipster({contentAsHTML: true});
    },

    render_page = function() {
        var search = $('#txtbox-search-games');
        filter_game(search);
        $('.tooltip').tooltipster({contentAsHTML: true});
    },

    filter_category = function(cons) {
        var parameters = {};

        if (cons === filterConsole) {
            return;
        }

        filterConsole = cons;

        if (filterConsole.length) {
            parameters.console = filterConsole;
        }
        if (filterGame.length) {
            parameters.game = filterGame;
        }

        $.getJSON(server + 'gamesdata?' + $.param(parameters), function(results) {
            page_data = results;
            render_page();
        }).done(function() {
            var context = $('.species a[data-console=' + cons + ']');
            context.parent().siblings().removeClass('current');
            context.parent().addClass('current');
        });
    },

    filterAction = function(action) {
        switch (action) {
            case 'console':
                filter_category(hash.shift());
                filterAction(hash.shift());
                break;
            case 'game':
                categorize_game(hash.shift());
                filterAction(hash.shift());
        }
    },

    add_filter_category = function(string, context) {
        window.location.hash = '!/console/' + string + '/game/all';
        $('#game-title').html('遊戲分類');
    },

    filter_videos = function(input) {
        var $this = $(input),
            filterString = $this.val(),
            game = get_game();
        $.getJSON(server + 'games/' + game + '/videos?limit=32&console=' +
            con + '&search=' + filterString,
            function(result) {
                page_data.videos = result;
                render_videos();
            }
        );
    },

    init_page = function () {
        page_data = $.parseJSON(page_data);

        page_data.games.forEach(function(item) {
            gamesAutocompleteArray.push({value: item.name, data: item});
            gameNames.push(item.name);
            if (!~gameNames.indexOf(item.chinese)) {
                gamesAutocompleteArray.push({value: item.chinese, data: item});
            }
        });
    },

    init_slider = function () {
        slider.featured_games = $('#container-featured-games').bxSlider();
        slider.latest_games = $('#container-latest-games').bxSlider();
        slider.container_videos = $('#container-videos').bxSlider({
            infiniteLoop: false,
            hideControlOnEnd: true
        });
    },

    add_textbox_listener = function () {
        $('#txtbox-search-games').on('keydown', function(e) {
            if (e.keyCode === 13) {
                filter_game(this);
                console.log('games');
            }
        });

        $('#txtbox-search-videos').on('keydown', function(e) {
            if (e.keyCode === 13) {
                filter_videos(this);
                console.log('vids');
            }
        });
    },

    start = function () {
        init_page();
        init_slider();
        add_textbox_listener();
        $(window).on('hashchange', function() {
            hash = window.location.hash.replace('#!/', '');
            hash = hash.split('/');
            if (!~hash.indexOf('game')) {
                render_videos();
            }
            filterAction(hash.shift());
        });

        $(function() {
            $('.sf-menu').superfish();
            $('.tabs').tabslet({ animation: true });
            $('.games .tab li a').on('click', function() {
                var search = $('#txtbox-search-games');
                search.val('');
                filter_game(search);
                utilHash.changeHashVal('console', filterConsole || 'all');
                $('.video ul li h2 a').html('遊戲分類');
            });
            $(window).trigger('hashchange');
        });

        render_page();
    };

start();
