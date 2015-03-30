/*global
    page_data
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
    'common/Tabs',
    'components/youtubers/List_Slider',
    'common/nav-header'
], function(Tabs, List_Slider) {

    var games_tab       = new Tabs({hash_change: false}),
        games_slider    = new List_Slider();

    games_tab
        .init()
        .addTab('tab-2-1', '最新遊戲', 'tab-2-1', $('<div id="latestGames" class="collection"/>'))
        .addTab('tab-2-2', '精選遊戲', 'tab-2-2', $('<div id="featuredGames" class="collection"/>'))
        .mount($('#games-tabs'));

    games_slider
        .init(page_data.games)
        .mount($('#latestGames'));
});