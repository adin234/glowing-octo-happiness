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
        'util'                                          : ['jquery'],
        'function'                                      : ['jquery'],
        'libs/jquery.gritter.min'                       : ['jquery'],
        'libs/hoverIntent'                              : ['jquery'],
        'libs/superfish'                                : ['jquery'],
        'libs/jquery.fixed.menu'                        : ['jquery'],
        'libs/jquery.autocomplete.min'                  : ['jquery'],
        'libs/jquery.bxslider.min'                      : ['jquery'],
        'libs/jquery.mCustomScrollbar.concat.min'       : ['jquery'],
        'libs/jquery.tabslet.min'                       : ['jquery'],
        'libs/jquery.tooltipster.min'                   : ['jquery'],
        'libs/socketio'                                 : ['jquery']
    }
});

requirejs([
    'less!css/less/footer',
    'less!css/less/main',
    'less!css/less/outcontainer',
    'common/Tabs',
    'text!common/templates/freedom-tab-nav.html',
    'text!components/freedom_activities/templates/tab1.html',
    'text!components/freedom_activities/templates/tab2.html',
    'text!components/freedom_activities/templates/tab3.html',
    'text!common/templates/footer.html'
], function(Tabs, tab_nav_tpl, tab1_tpl, tab2_tpl, tab3_tpl, FooterTpl) {

    var main_tab = new Tabs({
        className: 'lanparty_type1 adjust_line_green',
        template: tab_nav_tpl 
    });

    // freedom activity page
    main_tab
        .init()
        .addTab('tab-4-1', 'Freedom! 活動時間', 'FreedomSchedule', tab1_tpl)
        .addTab('tab-4-2', '最新發文', 'FreedomEvents', tab2_tpl)
        .addTab('tab-4-3', 'Freedom!活動紀錄', 'FreedomArchive', tab3_tpl)
        .mount($('#freedom-tabs'));

    $('#footer-container').html(FooterTpl);


});