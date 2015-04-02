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
    'text!common/templates/tab-nav.html',
    'common/Global_Filter',
    'text!common/templates/sub-nav.html',
    'text!common/templates/sub-nav-no-filters.html',
    'text!common/templates/footer.html',
    'less!css/less/footer',
    'less!css/less/outcontainer',
    'less!css/less/main'
], function(Tabs, tab_nav_tpl, Global_Filter, SubNavTpl, SubNavNoFilters, FooterTpl) {

    // streamers page
    var main_tab = new Tabs({
        template: tab_nav_tpl 
    });

    var global_filter = new Global_Filter();

    main_tab
        .init()
        .addTab('tab-2-1', '直播', 'game-title')
        .addTab('tab-2-2', 'Lan Party', 'game-title')
        .addTab('tab-2-3', '活動內容', 'game-title')
        .mount($('#video-stream-tabs'))

    global_filter
        .init()
        .mount($('#global-filter'))

    $('#footer-container').html(FooterTpl);
    $('#sub-nav').html(SubNavTpl);

});