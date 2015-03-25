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
    'common/tabs',
    'components/index/scroller',
    'components/index/Main_Slider',
    'common/Videos_Slider',
    'common/nav-header'
], function(tabs, scroller, index_slider, Videos_Slider) {
    var featured_videos = new Videos_Slider();


    featured_videos
        .init(shuffle(index_data.featured_videos))
        .mount($('<div id="featuredVideos"/>'));

    index_slider
        .init(index_data.slider)
        .mount($('#imageSlider'));

    tabs
        .init()
        .addTab('tab-1-2', '精選影片', featured_videos.$el)
        .addTab('tab-1-3', '最新影片', $('<div id="latestVideos"/>'))
        .addTab('tab-1-1', '最多觀賞', $('<div id="mostViewed"/>'))
        .mount($('#main-videos'));
});