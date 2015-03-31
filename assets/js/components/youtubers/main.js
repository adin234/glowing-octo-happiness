/*global
    page_data,
    attachments_server
*/

'use strict';

requirejs.config({
    baseUrl: '/assets/js',
    map: {
        '*': {
            'less': 'libs/require-less/less'
        }
    },
    paths: {
        'jquery': 'libs/jquery.min',
        'text'  : 'libs/text',
        'css'   : '../css',
        'common': 'components/common'
    },
    shim: {
        'util'                          : ['jquery'],
        'function'                      : ['jquery'],
        'libs/jquery.gritter.min'       : ['jquery'],
        'libs/hoverIntent'              : ['jquery'],
        'libs/superfish'                : ['jquery'],
        'libs/jquery.fixed.menu'        : ['jquery'],
        'libs/jquery.autocomplete.min'  : ['jquery'],
        'libs/jquery.bxslider.min'      : ['jquery'],
        'libs/jquery.mCustomScrollbar.concat.min': ['jquery'],
        'libs/jquery.tabslet.min'       : ['jquery'],
        'libs/jquery.tooltipster.min'   : ['jquery'],
        'libs/socketio'                 : ['jquery']
    }
});

requirejs([
    'common/Global_Filter',
    'common/Tabs',
    'components/youtubers/List_Slider',
    'text!components/youtubers/templates/game-tpl.html',
    'text!components/youtubers/templates/video-tpl.html'
], function(Global_Filter, Tabs, List_Slider, game_tpl, video_tpl) {

    var games_tab               = new Tabs({hash_change: false}),
        videos_tab              = new Tabs({hash_change: false}),
        latest_games_slider     = new List_Slider({
            per_slider: 12,
            template : game_tpl,
            $list_container: $('<ul class="game clearFix"/>')
        }),
        featured_games_slider   = new List_Slider({
            per_slider: 12,
            template: game_tpl,
            $list_container: $('<ul class="game clearFix"/>')
        }),
        popular_members_slider  = new List_Slider({
            per_slider: 16,
            template: video_tpl,
            $list_container: $('<ul class="list clearFix"/>')
        }),
        new_members_slider  = new List_Slider({
            per_slider: 16,
            template: video_tpl,
            $list_container: $('<ul class="list clearFix"/>')
        }),
        all_members_slider  = new List_Slider({
            per_slider: 16,
            template: video_tpl,
            $list_container: $('<ul class="list clearFix"/>')
        }),
        transform_games = function(item) {
            item.game   = item.name;
            item.id     = item.id.trim();
            return item;
        },
        transform_youtubers = function(item) {
            item.user_id    = item.userId;
            item.title      = item.video.snippet.title;
            item.thumb      = item.video.snippet.thumbnails.medium.url;
            item.view       = item.video.snippet.meta.statistics.viewCount;
            item.comment    = item.video.snippet.meta.statistics.commentCount;
            item.channelid  = item.youtube_id;
            item.live       = '';
            item.provider   = attachments_server;
            item.videoid    = item.video.snippet.resourceId.videoId;
            item.bust       = 1;
            return item;
        },
        latest_games    = page_data.games.map(transform_games),
        featured_games  = page_data.featured_games.map(transform_games),
        popular_members = page_data.popular_youtubers.map(transform_youtubers),
        new_members     = page_data.new_youtubers.map(transform_youtubers),
        all_members     = page_data.youtubers.map(transform_youtubers),
        filter_data = function(value) {
            console.log(value);
        },
        global_filter = new Global_Filter({onChange: filter_data});


    global_filter
        .init()
        .mount($('#global-filter'));

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
        .init(latest_games)
        .mount($('#latestGames'));

    featured_games_slider
        .init(featured_games)
        .mount($('#featuredGames'));

    popular_members_slider
        .init(popular_members)
        .mount($('#container-popular-member'));

    new_members_slider
        .init(new_members)
        .mount($('#container-new-member'));

    all_members_slider
        .init(all_members)
        .mount($('#container-all-member'));
});