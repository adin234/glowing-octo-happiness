/*global
    requirejs,
    index_data,
    shuffle
*/

'use strict';

requirejs.config({
    baseUrl: '/assets/js',
    paths: {
        'jquery': 'libs/jquery.min',
        'text': 'libs/text',
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
    'common/Tabs',
    'components/index/scroller',
    'components/index/Main_Slider',
    'common/Videos_Slider',
    'common/nav-header'
], function(Tabs, scroller, Main_Slider, Videos_Slider) {

    var main_slider = new Main_Slider(),
        main_tab = new Tabs(),
        featured_videos = new Videos_Slider(),
        latest_videos = new Videos_Slider(),
        most_viewed = new Videos_Slider();


    main_slider
        .init( index_data.slider )
        .mount( $('#imageSlider') );

    // index main page
    main_tab
        .init()
        .addTab('tab-1-2', '精選影片', $('<div id="featuredVideos"/>'))
        .addTab('tab-1-3', '最新影片', $('<div id="latestVideos"/>'))
        .addTab('tab-1-1', '最多觀賞', $('<div id="mostViewed"/>'))
        .mount($('#main-videos'));

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