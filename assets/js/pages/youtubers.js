/*global
    attachments_server,
    page_data:true,
    gamesAutocompleteArray,
    server
*/

'use strict';

define('youtubers', function(require) {

    var Tabs = require('../components/Tabs/index'),
        List_Slider = require('../components/List_Slider/index'),
        Global_Filter = require('../components/Global_Filter/index'),
        Search_Box = require('../components/Search_Box/index'),
        Item_Selector = require('../components/Item_Selector/index'),
        game_tpl = require('./templates/youtubers-game.html'),
        video_tpl = require('./templates/youtubers-video.html'),
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
        featured_games_slider   = new List_Slider({
            per_slider: 12,
            item_template: game_tpl,
            $list_container: $('<ul class="game clearFix"/>'),
            after_mount: function() {
                featured_games_slider.$el.find('.tooltip').tooltipster({contentAsHTML: true});
            }
        }),
        popular_members_slider  = new List_Slider({
            per_slider: 16,
            item_template: video_tpl,
            $list_container: $('<ul class="list clearFix"/>')
        }),
        new_members_slider  = new List_Slider({
            per_slider: 16,
            item_template: video_tpl,
            $list_container: $('<ul class="list clearFix"/>')
        }),
        all_members_slider  = new List_Slider({
            per_slider: 16,
            item_template: video_tpl,
            $list_container: $('<ul class="list clearFix"/>')
        }),
        global_filter = new Global_Filter({
            onChange: function(filter) {
                $.getJSON(server + 'youtubers?' + $.param({
                    console: filter.id
                }), function(result) {
                    page_data = result;
                    latest_games_slider.reload(transform_games(result.games));
                    featured_games_slider.reload(transform_games(result.featured_games));
                    game_selector.refresh_active();
                    games_search.reset();
                    videos_search.reset();

                    popular_members_slider.reload(
                      transform_youtubers(
                        page_data.popular_youtubers
                      )
                    );

                    new_members_slider.reload(
                      transform_youtubers(
                        page_data.new_youtubers
                      )
                    );

                    all_members_slider.reload(
                      transform_youtubers(
                        page_data.youtubers
                      )
                    );

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
            },
            onResetInput: function() {
                latest_games_slider.reload(
                    transform_games(
                        page_data.games
                    )
                );
                featured_games_slider.reload(
                    transform_games(
                        page_data.featured_games
                    )
                );
                game_selector.refresh_active();
            },
        }),
        videos_search = new Search_Box({
            serviceUrl: server + 'youtubers/search_youtubers',
            onSelect: function(item) {
                popular_members_slider.reload(
                    transform_youtubers(
                        filter_youtubers(page_data.popular_youtubers, item.value)
                    )
                );

                new_members_slider.reload(
                    transform_youtubers(
                        filter_youtubers(page_data.new_youtubers, item.value)
                    )
                );

                all_members_slider.reload(
                    transform_youtubers(
                        filter_youtubers(page_data.youtubers, item.value)
                    )
                );
            },
            onResetInput: function() {
                popular_members_slider.reload(
                    transform_youtubers(
                        page_data.popular_youtubers
                    )
                );

                new_members_slider.reload(
                    transform_youtubers(
                        page_data.new_youtubers
                    )
                );

                all_members_slider.reload(
                    transform_youtubers(
                        page_data.youtubers
                    )
                );
            }
        }),
        game_selector = new Item_Selector({
            onSelect: function(game) {
                $.getJSON(server + 'youtubers?' + $.param({
                    game: game
                }), function(result) {
                    page_data.popular_youtubers = result.popular_youtubers;
                    page_data.new_youtubers = result.new_youtubers;
                    page_data.youtubers = result.youtubers;
                    popular_members_slider.reload(
                      filter_youtubers(
                        transform_youtubers(page_data.popular_youtubers), videos_search.get_active()
                      )
                    );
                    new_members_slider.reload(
                      filter_youtubers(
                        transform_youtubers(page_data.new_youtubers), videos_search.get_active()
                      )
                    );
                    all_members_slider.reload(
                      filter_youtubers(
                        transform_youtubers(page_data.youtubers), videos_search.get_active()
                      )
                    );
                });
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
                          youtuber.video.snippet.channelTitle.search(filter) !== -1 ||
                          youtuber.video.username.search(filter) !== -1
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
                item.user_id    = item.userId;
                item.username    = item.video.username;
                item.title      = item.video.snippet.title;
                item.thumb      = item.video.snippet.thumbnails.medium.url;
                item.views       = item.video.snippet.meta.statistics.viewCount;
                item.anytv_comments    = item.video.snippet.meta.statistics.commentCount;
                item.channelid  = item.youtube_id;
                item.live       = '';
                item.provider   = attachments_server;
                item.videoid    = item.video.snippet.resourceId.videoId;
                item.bust       = 1;
                return item;
            });
        };

        global_filter
            .init()
            .mount($('#global-filter'));

        games_search
            .init(gamesAutocompleteArray)
            .applyTo($('#txtbox-search-games'));

        videos_search
            .init()
            .applyTo($('#txtbox-search-videos'));

        games_tab
            .init()
            .addTab('tab-2-1', '最新遊戲', 'tab-2-1', $('<div id="latestGames" class="collection"/>'))
            .addTab('tab-2-2', '精選遊戲', 'tab-2-2', $('<div id="featuredGames" class="collection"/>'))
            .mount($('#games-tabs'));

        videos_tab
            .init()
            .addTab('tab-2-1', '熱門YouTuber', '熱門YouTuber', $('<div id="container-popular-member"/>'))
            .addTab('tab-2-2', '新實況咖成員', '新實況咖成員', $('<div id="container-new-member"/>'))
            .addTab('tab-2-3', 'All', 'All', $('<div id="container-all-member"/>'))
            .mount($('#video-tabs'));

        latest_games_slider
            .init(transform_games(page_data.games))
            .mount($('#latestGames'));

        featured_games_slider
            .init(transform_games(page_data.featured_games))
            .mount($('#featuredGames'));

        popular_members_slider
            .init(transform_youtubers(page_data.popular_youtubers))
            .mount($('#container-popular-member'));

        new_members_slider
            .init(transform_youtubers(page_data.new_youtubers))
            .mount($('#container-new-member'));

        all_members_slider
            .init(transform_youtubers(page_data.youtubers))
            .mount($('#container-all-member'));

        game_selector
            .applyTo($('#featuredGames, #latestGames'));

    require('../components/Footer/index');
    require('../components/Sub_Nav/index');
});

require(['youtubers']);
