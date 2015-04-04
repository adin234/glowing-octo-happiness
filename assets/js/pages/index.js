/*global
    index_data,
    shuffle,
    attachments_server
*/

'use strict';


define(function(require) {

    // require('components/index/viewer');
    // require('components/index/streamers');
    // require('components/index/scroller');

    var Tabs        = require('components/Tabs/index'),
        Footer      = require('components/Footer'),
        List_Slider = require('components/List_Slider'),
        Main_Slider = require('components/Main_Slider'),
        Global_Filter = require('components/Global_Filter'),
        video_tpl   = require('text!components/templates/video-slide.html'),
        game_tpl    = require('text!components/templates/game-tpl.html'),
        footer_tpl  = require('text!components/templates/footer.html'),
        sub_nav_tpl = require('text!components/templates/sub-nav.html'),
        main_slider = new Main_Slider(),
        main_tab    = new Tabs({hash_change: false}),
        games_tab   = new Tabs({hash_change: false}),
        // news_shows_tabs = new Tabs({hash_change: false}),
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
        shuffle = function (o) {
            o = o.slice(0);
            for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x) {}
            return o;
        },
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
            $list_container: $('<ul class="game clearFix"/>')
        }),
        latest_game_slider = new List_Slider({
            per_slider: 12,
            item_template: game_tpl,
            $list_container: $('<ul class="game clearFix"/>')
        }),

        page_footer     = new Footer(),
        global_filter   = new Global_Filter();

    main_slider
        .init( index_data.slider )
        .mount( $('#imageSlider') );

    // index main page 1
    main_tab
        .init()
        .addTab('tab-1-2', '精選影片', 'tab-1-2', $('<div id="featuredVideos"/>'))
        .addTab('tab-1-3', '最新影片', 'tab-1-3', $('<div id="latestVideos"/>'))
        .addTab('tab-1-1', '最多觀賞', 'tab-1-1', $('<div id="mostViewed"/>'))
        .mount($('#main-videos'));

    // index main page 2
    games_tab
        .init()
        .addTab('tab-2-1', '精選遊戲', 'tab-2-1', $('<div id="featuredGames"/>'))
        .addTab('tab-2-2', '最新遊戲', 'tab-2-2', $('<div id="latestGames"/>'))
        .mount($('#games-tabs'));



    // news_shows_tabs
    //     .init()
    //     .addTab('tab-news-playlist-1', '實況咖NEWS', 'tab-news-playlist-1', $('<ul/>'))
    //     .addTab('tab-news-playlist-2', 'Freedom!NEWS', 'tab-news-playlist-2', $('<ul/>'))
    //     .addTab('tab-shows-playlist-0', 'YouTube教學', 'tab-news-playlist-0', $('<ul/>'))
    //     .addTab('tab-shows-playlist-3', 'Freedom!教學', 'tab-news-playlist-3', $('<ul/>'))
    //     .mount($('#news_shows_playlists_block'));

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
        .init(get_per_category(index_data.games))
        .mount( $('#latestGames') );

    global_filter
        .init()
        .mount($('#global-filter'));


    $('#footer-container').html(footer_tpl);
    $('#sub-nav').html(sub_nav_tpl);


});