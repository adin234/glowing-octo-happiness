/*global
    requirejs,
    index_data,
    shuffle
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
        'text': 'libs/text',
        'css': '../css',
        'common': 'components/common'
    },
    shim: {
        'util'                                      : ['jquery'],
        'function'                                  : ['jquery'],
        'libs/jquery.gritter.min'                   : ['jquery'],
        'libs/hoverIntent'                          : ['jquery'],
        'libs/superfish'                            : ['jquery'],
        'libs/jquery.fixed.menu'                    : ['jquery'],
        'libs/jquery.autocomplete.min'              : ['jquery'],
        'libs/jquery.bxslider.min'                  : ['jquery'],
        'libs/jquery.mCustomScrollbar.concat.min'   : ['jquery'],
        'libs/jquery.tabslet.min'                   : ['jquery'],
        'libs/jquery.tooltipster.min'               : ['jquery'],
        'libs/socketio'                             : ['jquery']
    }
});

requirejs([
    'common/Tabs',
    'components/index/scroller',
    'components/index/Main_Slider',
    'common/Videos_Slider',
    'common/nav-header',
    'less!css/less/main',
    'less!css/less/footer',
    'less!css/less/outcontainer'
    'components/index/viewer',
    'components/index/streamers'
], function(Tabs, scroller, Main_Slider, Videos_Slider) {

    var main_slider     = new Main_Slider(),
        main_tab        = new Tabs({hash_change: false}),
        games_tab       = new Tabs({hash_change: false}),
        // news_shows_tabs = new Tabs({hash_change: false}),

        featured_videos = new Videos_Slider(),
        latest_videos   = new Videos_Slider(),
        most_viewed     = new Videos_Slider();
        // featured_games  = new Videos_Slider(),
        // latest_games    = new Videos_Slider();


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

    featured_videos
        .init(shuffle(index_data.featured_videos))
        .mount( $('#featuredVideos') );

    latest_videos
        .init(shuffle(index_data.latest_videos))
        .mount( $('#latestVideos') );

    most_viewed
        .init(shuffle(index_data.most_viewed))
        .mount( $('#mostViewed') );


});