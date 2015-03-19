/*global requirejs*/

'use strict';

requirejs.config({
    baseUrl: '/assets/js',
    paths: {
        'jquery': 'libs/jquery.min'
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
    'jquery',
    'libs/jquery.autocomplete.min',
    'components/index/scroller',
    'components/index/streamers_counter'
]);