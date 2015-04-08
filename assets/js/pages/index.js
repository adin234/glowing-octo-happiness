/*global
    attachments_server,
    server,
    showSocialButtons,
    origin
*/

'use strict';

define('index', function(require) {
    var index_data = {},
        Tabs        = require('Tabs/index'),
        List_Slider = require('List_Slider/index'),
        Main_Slider = require('Main_Slider/index'),
        Thread_List = require('Thread_List/index'),
        Global_Filter = require('Global_Filter/index'),
        Featured_Users = require('Featured_Users/index'),
        video_tpl   = require('text!./templates/video-slide.html'),
        game_tpl    = require('text!./templates/game-tpl.html'),
        main_slider = new Main_Slider(),
        main_tab    = new Tabs({hash_change: false}),
        games_tab   = new Tabs({hash_change: false}),
        news_shows_tabs = new Tabs({hash_change: false}),
        threads_tabs = new Tabs({hash_change: false}),
        featured_videos_slider = new List_Slider({
            per_slider: 9,
            item_template: video_tpl,
            $list_container: $('<ul class="list clearFix"/>')
        }),
        latest_videos_slider = new List_Slider({
            per_slider: 9,
            item_template: video_tpl,
            $list_container: $('<ul class="list clearFix"/>')
        }),
        most_viewed_slider = new List_Slider({
            per_slider: 9,
            item_template: video_tpl,
            $list_container: $('<ul class="list clearFix"/>')
        }),
        featured_game_slider = new List_Slider({
            per_slider: 12,
            item_template: game_tpl,
            $list_container: $('<ul class="game clearFix"/>'),
            after_mount: function() {
                featured_game_slider.$el.find('.tooltip').tooltipster({contentAsHTML: true});
            }
        }),
        latest_game_slider = new List_Slider({
            per_slider: 12,
            item_template: game_tpl,
            $list_container: $('<ul class="game clearFix"/>'),
            after_mount: function() {
                latest_game_slider.$el.find('.tooltip').tooltipster({contentAsHTML: true});
            }
        }),
        latest_threads = new Thread_List(),
        top_threads = new Thread_List(),
        has_init = false,
        global_filter   = new Global_Filter({
            onChange: function(filter) {
                $.ajax({
                    async: false,
                    type: 'GET',
                    dataType: 'json',
                    url: server + 'index?console=' + filter.id
                }).done(function (data) {
                    index_data = data;

                    if (!has_init) {
                        init();
                        has_init = true;
                    } else {
                        featured_videos_slider.reload(transform_videos(index_data.featured_videos));
                        latest_videos_slider.reload(transform_videos(index_data.latest_videos));
                        most_viewed_slider.reload(transform_videos(index_data.most_viewed));
                        featured_game_slider.reload(shuffle(limit_category(filter.id, index_data.games)));
                        latest_game_slider.reload(shuffle(limit_latest(index_data.games)));
                    }
                });
            }
        }),
        transform_videos = function(data) {
            return data.map(function(item) {
                item.provider = attachments_server;
                item.thumb = item.snippet.thumbnails.medium.url;
                item.title = item.snippet.title;
                item.bust = 1;
                item.anytv_comment = item.anytv_comment || 0;
                item.comments = item.snippet.meta.statistics.commentCount;
                item.views = item.snippet.meta.statistics.viewCount;
                item.link = '/youtuber/?user=' + item.user_id + '#!/video/' + item.snippet.resourceId.videoId;
                return item;
            });
        },
        get_per_category = function(games) {
            var categories = {},
                filteredGames = [],
                category;
            games.forEach(function(game) {
                if (typeof game.consoles === 'undefined') {
                    return;
                }
                category = game.consoles[1];
                categories[category] = categories[category] || [];
                if (categories[category].length < 6 && !~filteredGames.indexOf(game)) {
                    categories[category].push(game);
                    filteredGames.push(game);
                }
            });
            return filteredGames;
        },
        limit_latest = function (games) {
            return games.slice(0, 30);
        },
        limit_category = function (category, data) {
            var collection = data.filter(function(item) {
                return item.consoles && ~item.consoles.indexOf(category);
            });
            return collection.slice(0, 6);
        },
        shuffle = function (o) {
            o = o.slice(0);
            for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x) {}
            return o;
        },
        init = function() {

            main_slider
                .init( index_data.slider )
                .mount( $('#imageSlider') );

            latest_threads
                .init(index_data.recent_threads)
                .mount($('<div id="forumSection">'));

            top_threads
                .init(index_data.threads)
                .mount($('<div id="hotForumSection">'));

            threads_tabs
                .init()
                .addTab('tab-3-1', '最新討論', 'tab-3-2', latest_threads.$el)
                .addTab('tab-3-2', '熱門論壇', 'tab-3-2', top_threads.$el)
                .mount($('#threads_tabs'));

            featured_videos_slider
                .init(transform_videos(shuffle(index_data.featured_videos)))
                .mount( $('#featuredVideos') );

            latest_videos_slider
                .init(transform_videos(shuffle(index_data.latest_videos)))
                .mount( $('#latestVideos') );

            most_viewed_slider
                .init(transform_videos(shuffle(index_data.most_viewed)))
                .mount( $('#mostViewed') );

            featured_game_slider
                .init(get_per_category(shuffle(index_data.games)))
                .mount( $('#featuredGames') );

            latest_game_slider
                .init(shuffle(limit_latest(index_data.games)))
                .mount( $('#latestGames') );

            new Featured_Users(index_data); 

            // featured game changer if url has set hash
            // featured_game_slider.reload(shuffle(limit_category(window.location.href.replace(origin+"/#!/console/", ""), index_data.games)));
        };

    main_tab
        .init()
        .addTab('tab-1-2', '精選影片', 'tab-1-2', $('<div id="featuredVideos"/>'))
        .addTab('tab-1-3', '最新影片', 'tab-1-3', $('<div id="latestVideos"/>'))
        .addTab('tab-1-1', '最多觀賞', 'tab-1-1', $('<div id="mostViewed"/>'))
        .mount($('#main-videos'));

    games_tab
        .init()
        .addTab('tab-2-1', '精選遊戲', 'tab-2-1', $('<div id="featuredGames"/>'))
        .addTab('tab-2-2', '最新遊戲', 'tab-2-2', $('<div id="latestGames"/>'))
        .mount($('#games-tabs'));

    news_shows_tabs
        .init()
        .addTab('tab-news-playlist-1', '實況咖NEWS', 'tab-news-playlist-1', $('<ul class="list clearFix"/>'))
        .addTab('tab-news-playlist-2', 'Freedom!NEWS', 'tab-news-playlist-2', $('<ul/>'))
        .addTab('tab-shows-playlist-0', 'YouTube教學', 'tab-news-playlist-0', $('<ul/>'))
        .addTab('tab-shows-playlist-3', 'Freedom!教學', 'tab-news-playlist-3', $('<ul/>'))
        .mount($('#news_shows_playlists_block'));

    global_filter
        .init()
        .mount($('#global-filter'));

    showSocialButtons();
    searchBoxInit();

    require('Streamers_List/index');
    require('Scroller/index');
    require('Footer/index');
    require('Sub_Nav/index');
});


require(['index']);
