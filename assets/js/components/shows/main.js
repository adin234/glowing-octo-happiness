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
    'text!common/templates/playlist-tab-nav.html',
    'text!common/templates/tab-nav.html',
    'text!common/templates/footer.html',
    'less!css/less/footer',
    'less!css/less/outcontainer',
    'less!css/less/main',
], function(Tabs, tab_nav_tpl, tab_nav_tpl_2, FooterTpl) {

    // shows page
    var main_tab_1 = new Tabs({
        className: 'listSwitch clearFix',
        template: tab_nav_tpl
    });

    var main_tab_2 = new Tabs({
        template: tab_nav_tpl_2
    });

    main_tab_1
        .init()
        .addTab('javascript:;', '播放清單', 'playlistsToggle')
        .addTab('javascript:;', '影片', 'videosToggle')
        .mount($('#videolist'))

    main_tab_2
        .init()
        .addTab('#tab-1', '現在播放')
        .addTab('#tab-2', '評論')
        .mount($('#video-related-tabs'))

    $('#footer-container').html(FooterTpl);

});