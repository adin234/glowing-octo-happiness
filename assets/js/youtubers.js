/* jshint unused: false */
/* global
    JST,
    page_data: true,
    attachments_server,
    template,
    server,
    gamesAutocompleteArray,
    utilHash,
    youtuberUserSearch
*/

'use strict';

var newSlider,
    gamesSlider,
    slider = {},
    filterConsole = '',
    filterGame = '',
    gameNames = [],
    hash,

    popularSlider = $('.bxslider.videos.popular').bxSlider({
        infiniteLoop: false,
        hideControlOnEnd: true
    }),

    newSlider = $('.bxslider.videos.new').bxSlider({
        infiniteLoop: false,
        hideControlOnEnd: true
    }),

    allSlider = $('.bxslider.videos.all').bxSlider({
        infiniteLoop: false,
        hideControlOnEnd: true
    }),

    get_hash = function() {
        var _hash = window.location.hash.replace('#!/', '').replace(/#tab-\d-\d/i, '');
        _hash = _hash.split('/');
        return _hash;
    },

    get_game = function() {
        var game = get_hash()[0];
         return game === '' ? 'all' : game;
    },

    render_featured_games = function (filter) {
        var html = [];
        var items = [];
        filter =  new RegExp(filter, 'i');

        page_data.featured_games.forEach(function(item, i){
            if(item.name.search(filter) === -1 &&
                item.chinese.search(filter) === -1) {
                return;
            }
            if(item.id === filterGame) {
                item.class = 'active';
            }
            item.game = item.name;
            item.id = item.id.trim();
            items.push(template(JST['gameTpl.html'](), item));
            if(items.length === 12) {
                html.push(
                    template(
                        JST['gameContainerTpl.html'](), {'items' : items.join('')}
                    )
                );
                items = [];
            }
        });

        if(items.length !== 0) {
            html.push(
                template(
                    JST['gameContainerTpl.html'](), {'items' : items.join('')}
                )
            );
        }
        if(!html.length) { html.push('目前沒有遊戲'); }
        $('#container-featured-games').html(html.join(''));

        // slider.featured_games.reloadSlider({
        //     startSlide: 0,
        //     infiniteLoop: false,
        //     hideControlOnEnd: true
        // });
    },

    render_latest_games = function(filter) {
        var html = [];
        var items = [];
        filter =  new RegExp(filter, 'i');

        page_data.games.forEach(function(item, i){
            if(item.name.search(filter) === -1 &&
                item.chinese.search(filter) === -1) {
                return;
            }
            if(item.id === filterGame) {
                item.class = 'active';
            }
            item.id = item.id.trim();

            items.push(template(JST['gameTpl.html'](), item));
            if(items.length === 12) {
                html.push(
                    template(
                        JST['gameContainerTpl.html'](), {'items' : items.join('')}
                    )
                );
                items = [];
            }
        });

        if(items.length !== 0) {
            html.push(
                template(
                    JST['gameContainerTpl.html'](), {'items' : items.join('')}
                )
            );
        }

        if(!html.length) { html.push('目前沒有遊戲'); }
        $('#container-latest-games').html(html.join(''));

        // slider.latest_games.reloadSlider({
        //     startSlide: 0,
        //     infiniteLoop: false,
        //     hideControlOnEnd: true
        // });
    },

    filter_game = function(input) {
        var $this = $(input),
            filterString = $this.val();

        render_featured_games(filterString);
        render_latest_games(filterString);
    },

    render_new_members = function(filter) {
        // var html = [],
        //     items = [],
        //     ids = [],
        //     tplVideo = JST['videoTpl.html'](),
        //     tplVideoContainer = JST['videoContainerTpl.html']();

        // filter =  new RegExp(filter, 'i');

        // page_data.new_youtubers.forEach(function (item, i) {
        //     if(typeof item.video === 'undefined') {
        //         return;
        //     }
        //     if(item.video.snippet.title.search(filter) === -1 &&
        //        item.video.snippet.channelTitle.search(filter) === -1) {
        //         return;
        //     }
        //     item.user_id = item.userId;
        //     item.title = item.video.snippet.title;
        //     item.thumb = item.video.snippet.thumbnails.medium.url;
        //     item.view = item.video.snippet.meta.statistics.viewCount;
        //     item.comment = item.video.snippet.meta.statistics.commentCount;
        //     item.channelid = item.youtube_id;
        //     item.live = '';

        //     item.provider = attachments_server;
        //     item.videoid = item.video.snippet.resourceId.videoId;
        //     item.bust = 1;

        //     items.push(template(tplVideo, item));
        //     ids.push(item.youtube_id);
        //     if(items.length === 16) {
        //         html.push(template(tplVideoContainer, {'items' : items.join('')}));
        //         items = [];
        //     }
        // });

        // if(items.length !== 0) {
        //     html.push(template(tplVideoContainer, {'items' : items.join('')}));
        // }

        // if(!html.length) { html.push('沒有此實況主'); }
        // $('#container-new-member').html(html.join(''));
        // // allSlider.reloadSlider();
    },

    render_all_members = function(filter) {
        // var html = [],
        //     items = [],
        //     ids = [],
        //     tplVideo = JST['videoTpl.html'](),
        //     tplVideoContainer = JST['videoContainerTpl.html']();

        // filter =  new RegExp(filter, 'i');

        // page_data.youtubers.forEach(function (item, i) {
        //     if(typeof item.video === 'undefined') {
        //         return;
        //     }
        //     if(item.video.snippet.title.search(filter) === -1 &&
        //         item.video.snippet.channelTitle.search(filter) === -1 &&
        //         item.video.username.search(filter) === -1) {
        //         return;
        //     }
        //     item.user_id = item.userId;
        //     item.title = item.video.snippet.title;
        //     item.thumb = item.video.snippet.thumbnails.medium.url;
        //     item.view = item.video.snippet.meta.statistics.viewCount;
        //     item.comment = item.video.snippet.meta.statistics.commentCount;
        //     item.channelid = item.youtube_id;
        //     item.live = '';

        //     item.provider = attachments_server;
        //     item.videoid = item.video.snippet.resourceId.videoId;
        //     item.bust = 1;

        //     items.push(template(tplVideo, item));
        //     ids.push(item.youtube_id);
        //     if(items.length === 16) {
        //         html.push(template(tplVideoContainer, {'items' : items.join('')}));
        //         items = [];
        //     }
        // });

        // if(items.length !== 0) {
        //     html.push(template(tplVideoContainer, {'items' : items.join('')}));
        // }

        // if(!html.length) { html.push('沒有此實況主'); }
        // $('#container-all-member').html(html.join(''));
        // // allSlider.reloadSlider();
    },

    render_popular_members = function(filter) {
        // var html = [],
        //     items = [],
        //     ids = [],
        //     tplVideo = JST['videoTpl.html'](),
        //     tplVideoContainer = JST['videoContainerTpl.html']();

        // filter =  new RegExp(filter, 'i');

        // page_data.popular_youtubers.forEach(function (item, i) {
        //     if(typeof item.video === 'undefined') {
        //         return;
        //     }
        //     if(item.video.snippet.title.search(filter) === -1 &&
        //        item.video.snippet.channelTitle.search(filter) === -1 &&
        //        item.video.username.search(filter) === -1) {
        //         return;
        //     }
        //     item.user_id = item.userId;
        //     item.title = item.video.snippet.title;
        //     item.thumb = item.video.snippet.thumbnails.medium.url;
        //     item.view = item.video.snippet.meta.statistics.viewCount;
        //     item.comment = item.video.snippet.meta.statistics.commentCount;
        //     item.channelid = item.youtube_id;
        //     item.live = '';

        //     item.provider = attachments_server;
        //     item.videoid = item.video.snippet.resourceId.videoId;
        //     item.bust = 1;

        //     items.push(template(tplVideo, item));
        //     ids.push(item.youtube_id);
        //     if(items.length === 16) {
        //         html.push(
        //             template(
        //                 tplVideoContainer, {'items' : items.join('')}
        //             )
        //         );
        //         items = [];
        //     }
        // });

        // if(items.length !== 0) {
        //     html.push(
        //         template(
        //             tplVideoContainer, {'items' : items.join('')}
        //         )
        //     );
        // }

        // if(!html.length) {
        //     html.push('沒有此實況主');
        // }
        // $('#container-popular-member').html(html.join(''));

        // popularSlider.reloadSlider();
    },

    render_page = function() {
        var search = $('#txtbox-search-games');
        filter_game(search);
        render_new_members();
        render_all_members();
        render_popular_members();
    },

    filter_category = function(con) {
        var parameters = {};

        if(con === filterConsole) {
            return;
        }

        filterConsole = con;

        if(filterConsole.length) {
            parameters.console = filterConsole;
        }
        if(filterGame.length) {
            parameters.game = filterGame;
        }

        $.getJSON(server + 'youtubers?' + $.param(parameters), function(results) {
            page_data = results;
            if(con === 'vlogs') {
                $('.game-container').css('display', 'none');
            } else {
                $('.game-container').css('display', 'block');
            }
            render_page();
        }).done(function() {
            var context = $('.species a[data-console=' + con + ']');
            context.parent().siblings().removeClass('current');
            context.parent().addClass('current');
        });
    },

    categorize_game = function(game) {
        console.log(game);
        var parameters = {};

        if(game.length && game !== 'all') {
            var id = game;

            filterGame = id = id.replace('#!', '');
            $('.game-item').each(function(i, item) {
                $(item).removeClass('active');
            });

            if(id.trim() === '' || id.trim() === '#!') {

                filterGame = '';
                $.getJSON(server + 'youtubers', function(result) {
                    page_data.new_youtubers = result.new_youtubers;
                    page_data.popular_youtubers = result.popular_youtubers;
                    page_data.youtubers = result.youtubers;
                    render_new_members();
                    render_all_members();
                    render_popular_members();
                });
                return;
            }

            $('[data-id=' + id + ']').parent().addClass('active');
            $('#game-title').html(
                $('[data-id=' + id + ']').attr('data-name')
            );

            if(filterConsole.length) {
                parameters.console = filterConsole;
            }
            if(filterGame.length) {
                parameters.game = filterGame;
            }

            $.getJSON(server + 'youtubers?' + $.param(parameters), function(result) {
                page_data = result;
                render_new_members();
                render_all_members();
                render_popular_members();
            });
        } else {
            render_new_members();
            render_all_members();
            render_popular_members();
        }
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
        window.location.hash = '!/console/' + string;
    },

    filter_videos = function(input) {
        var $this = $(input);
        var filterString = $this.val();
        render_new_members(filterString);
        render_all_members(filterString);
        render_popular_members(filterString);
    };
