requirejs.config({
    baseUrl: 'assets/js/pages',
    map: {
        '*': {
            'less': 'libs/require-less/less'
        }
    },
    paths: {
        'jquery'        : '../libs/jquery.min',
        'components'    : '../temp_components',
        'text'          : '../libs/text',
        'css'           : '../../css',
        'less'          : '../libs/require-less/less',
        'normalize'     : '../libs/require-less/normalize',
        'less-builder'  : '../libs/require-less/less-builder'
    },
    shim: {
        '../util'                                      : ['jquery'],
        '../function'                                  : ['jquery'],
        '../libs/jquery.gritter.min'                   : ['jquery'],
        '../libs/hoverIntent'                          : ['jquery'],
        '../libs/superfish'                            : ['jquery'],
        '../libs/jquery.fixed.menu'                    : ['jquery'],
        '../libs/jquery.autocomplete.min'              : ['jquery'],
        '../libs/jquery.bxslider.min'                  : ['jquery'],
        '../libs/jquery.mCustomScrollbar.concat.min'   : ['jquery'],
        '../libs/jquery.tabslet.min'                   : ['jquery'],
        '../libs/jquery.tooltipster.min'               : ['jquery'],
        '../libs/socketio'                             : ['jquery']
    }
});