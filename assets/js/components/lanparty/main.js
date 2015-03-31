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
    'text!common/templates/lanparty-tab-nav.html',
    'text!common/templates/lanparty-sidetab-nav.html',
    'text!components/lanparty/templates/tab1.html',
    'text!components/lanparty/templates/tab2.html',
    'text!components/lanparty/templates/tab3.html',
    'text!components/lanparty/templates/tab4.html',
], function(Tabs, tab_nav_tpl, side_tab_nav_tpl, tab1_tpl, tab2_tpl, tab3_tpl, tab4_tpl) {

    // lanparty page
    var main_tab = new Tabs({
        className: 'lanparty_type1',
        template: tab_nav_tpl 
    });

    var side_tab = new Tabs ({
        className: 'lanparty_type2',
        template: side_tab_nav_tpl
    });

    side_tab
        .init()
        .addTab('/lanparty_stream_multi', '直播', '直播')
        .addTab('/lanparty/videos', 'LAN PARTY影片頻道', 'LAN PARTY影片頻道')
        .mount($('#container_lanparty'))

    main_tab
        .init()
        .addTab('tab-4-1', '什麼是Lan party', 'AboutLanParty', tab1_tpl)
        .addTab('tab-4-2', 'Lan party時刻表', 'LanPartySchedule', tab2_tpl)
        .addTab('tab-4-3', '活動內容', 'LanPartyActivities', tab3_tpl)
        .addTab('tab-4-4', 'Lan Party活動紀錄', 'Lan Party活動紀錄', tab3_tpl)
        .mount($('#container_lanparty'))

});