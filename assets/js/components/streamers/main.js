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
    'text!common/templates/tab-nav.html'
], function(Tabs, tab_nav_tpl) {

    // streamers page
    var main_tab = new Tabs({
        template: tab_nav_tpl 
    });

    main_tab
        .init()
        .addTab('tab-2-1', '直播', 'game-title')
        .addTab('tab-2-2', 'Lan Party', 'game-title')
        .addTab('tab-2-3', '活動內容', 'game-title')
        .mount($('#video-stream-tabs'))

});