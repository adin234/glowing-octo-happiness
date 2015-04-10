/*global
    attachments_server,
    page_data:true,
    gamesAutocompleteArray,
    server
*/

'use strict';

define('youtubers', function(require) {

    var Tabs = require('Tabs/index'),
        List_Slider = require('List_Slider/index'),
        Global_Filter = require('Global_Filter/index'),
        Search_Box = require('Search_Box/index'),
        Item_Selector = require('Item_Selector/index'),
        game_tpl = require('text!./templates/youtubers-game.html'),
        video_tpl = require('text!./templates/youtubers-video.html'),
        games_tab = new Tabs({hash_change: false}),
        videos_tab = new Tabs({hash_change: false}),
        latest_games_slider = new List_Slider({
            per_slider: 12,
            item_template: game_tpl,
            $list_container: $('<ul class="game clearFix"/>'),
            after_mount: function() {
                latest_games_slider.$el.find('.tooltip').tooltipster({contentAsHTML: true});
            }
        }),
        featured_games_slider = new List_Slider({
            per_slider: 12,
            item_template: game_tpl,
            $list_container: $('<ul class="game clearFix"/>'),
            after_mount: function() {
                featured_games_slider.$el.find('.tooltip').tooltipster({contentAsHTML: true});
            }
        }),
        youtubers_slider = new List_Slider({
            per_slider: 16,
            item_template: video_tpl,
            $list_container: $('<ul class="list clearFix"/>'),
            onSlideNext: function($slideElement, oldIndex, newIndex) {
                if (newIndex%2) {
                    $.getJSON(server + ['games', game_selector.get_active(), 'videos' ].join('/') + '?' +
                        $.param({
                            limit: 32,
                            console: global_filter.get_active().id,
                            page: (youtubers_slider.get_slide_count() / 2) + 1,
                            search: ''
                        }),
                        function(result) {
                            page_data.videos.concat(result);
                            youtubers_slider.push(transform_youtubers(result));
                        }
                    );
                }
            }
        }),
        global_filter = new Global_Filter({
            onChange: function(filter) {
                $.getJSON(server + 'gamesdata?' + $.param({
                    console: filter.id,
                    game: 'all'
                }), function(result) {
                    page_data.games = result.games;
                    page_data.featured_games = result.featured_games;
                    latest_games_slider.reload(transform_games(result.games));
                    featured_games_slider.reload(transform_games(result.featured_games));
                    game_selector.refresh_active();
                });
            }
        }),
        games_search = new Search_Box({
            onSelect: function(item) {
                latest_games_slider.reload(
                    transform_games(
                        filter_games(page_data.games, item.value)
                    )
                );
                featured_games_slider.reload(
                    transform_games(
                        filter_games(page_data.featured_games, item.value)
                    )
                );
                game_selector.refresh_active();
            }
        }),
        youtubers_search = new Search_Box({
            serviceUrl: server + 'youtubers/search_youtubers',
            onSelect: function(item) {
                var con = global_filter.get_active().id;
                $.getJSON(server + ['games', con, 'videos' ].join('/') + '?' +
                    $.param({
                        console: con,
                        search: item.value
                    }),
                    function(result) {
                        page_data.videos = result;
                        youtubers_slider.reload(transform_youtubers(result));
                    }
                );

                youtubers_slider.reload(
                    transform_youtubers(
                        filter_youtubers(page_data.videos, item.value)
                    )
                );
            }
        }),
        game_selector = new Item_Selector({
            onSelect: function(game) {
                $.getJSON(server + ['games', game, 'videos'].join('/') + '?' +
                    $.param({
                        limit: 32,
                        game: game
                    }),
                    function(result) {
                        page_data.videos = result;
                        youtubers_slider.reload(transform_youtubers(page_data.videos));
                    }
                );
            }
        }),
        filter_games = function(games, filter) {
            return games.filter(function(game) {
                return game.name.search(filter) !== -1 || game.chinese.search(filter) !== -1;
            });
        },
        filter_youtubers = function(youtubers, filter) {
            return youtubers.filter(function(youtuber) {
                return typeof youtuber.video !== 'undefined' &&
                    (
                        youtuber.video.snippet.title.search(filter) !== -1 ||
                        youtuber.video.snippet.channelTitle.search(filter) !== -1
                    );
            });
        },
        transform_games = function(data) {
            return data.map(function(item) {
                item.game = item.name;
                item.id = item.id.trim();
                item.link = (
                    ~window.location.hash.indexOf('console') ?
                    window.location.hash.split('/')
                        .slice(0, 3)
                        .concat(['game', item.id])
                        .join('/') :
                    '#!/game/' + item.id
                );
                return item;
            });
        },
        transform_youtubers = function(data) {
            return data.map(function(item) {
                item.user_id    = item.user_id;
                item.username    = item.username;
                item.title      = item.snippet.title;
                item.thumb      = item.snippet.thumbnails.medium.url;
                item.views       = item.snippet.meta.statistics.viewCount;
                item.comment    = item.snippet.meta.statistics.commentCount;
                item.channelid  = item.youtube_id;
                item.live       = '';
                item.provider   = attachments_server;
                item.videoid    = item.snippet.resourceId.videoId;
                item.bust       = 1;
                item.anytv_comments = item.anytv_comment || 0;
                return item;
            });
        };

        global_filter
            .init()
            .mount($('#global-filter'));

        games_search
            .init(gamesAutocompleteArray)
            .applyTo($('#txtbox-search-games'));

        youtubers_search
            .init()
            .applyTo($('#txtbox-search-videos'));

        games_tab
            .init()
            .addTab('tab-2-1', '最新遊戲', 'tab-2-1', $('<div id="latestGames" class="collection"/>'))
            .addTab('tab-2-2', '精選遊戲', 'tab-2-2', $('<div id="featuredGames" class="collection"/>'))
            .mount($('#games-tabs'));

        videos_tab
            .init()
            .addTab('tab-2-1', '遊戲分類', 'tab-2-1', $('<div id="youtubers_slider"/>'))
            .mount($('#video-tabs'));

        latest_games_slider
            .init(transform_games(page_data.games))
            .mount($('#latestGames'));

        featured_games_slider
            .init(transform_games(page_data.featured_games))
            .mount($('#featuredGames'));

        youtubers_slider
            .init(transform_youtubers(page_data.videos))
            .mount($('#youtubers_slider'));

        game_selector
            .applyTo($('#featuredGames, #latestGames'));

    require('Footer/index');
});

require(['youtubers']);