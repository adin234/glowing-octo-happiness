/*global
    page_data: true,
    server
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
    'common/Global_Filter',
    'text!common/templates/footer.html',


    'components/shows/Cache_Video',
    'components/shows/Delete_Comment',
    'components/shows/Filter',
    'components/shows/Filter_Action',
    'components/shows/Filter_Game',
    'components/shows/Filter_Vlogs',
    'components/shows/First_Load',
    'components/shows/Format_Date',
    'components/shows/Get_Comments',
    'components/shows/Get_Photo',
    'components/shows/Get_Playlist',
    'components/shows/Get_Playlist_Index',
    'components/shows/Get_Playlist_Next',
    'components/shows/Get_Video',
    'components/shows/Get_Video_Data',
    'components/shows/Hash_Change',
    'components/shows/Load_Initial',
    'components/shows/On_Player_State_Change',
    'components/shows/Show_Playlist',
    'components/shows/Show_Video',
    'components/shows/Update_Playlists',
    'components/shows/Update_Prev_Next',
    'components/shows/Update_Suggestions',
    'components/shows/Update_Videos',
    'components/shows/Will_Play'
], function(
        Tabs,
        tab_nav_tpl,
        tab_nav_tpl_2,
        Global_Filter,
        FooterTpl,
        
        Cache_Video,
        Delete_Comment,
        Filter,
        Filter_Action,
        Filter_Game,
        Filter_Vlogs,
        first_load,
        Format_Date,
        Get_Comments,
        Get_Photo,
        Get_Playlist,
        Get_Playlist_Index,
        Get_Playlist_Next,
        Get_Video_Data,
        Hash_Change,
        Load_Initial,
        On_Player_State_Change,
        Show_Playlist,
        Show_Video,
        Update_Playlists,
        Update_Prev_Next,
        Update_Suggestions,
        Update_Videos,
        Will_Play

    ) {

    $.ajax({
        async: false,
        type: 'GET',
        dataType: 'json',
        url: server + 'shows'
    }).done(function (data) {
        page_data = data;
    });

    // shows page
    var main_tab_2 = new Tabs({
        template: tab_nav_tpl_2
    }),
    global_filter                   = new Global_Filter(),
    hash_change                     = new Hash_Change({
        onChange: function(type) {
            console.log('changed');
            filter_action.execute(type);
        }
    }),
    filter_action                   = new Filter_Action({
        show_playlist: Show_Playlist,
        show_video: Show_Video
    });

    hash_change
        .init(page_data);

    main_tab_2
        .init()
        .addTab('#tab-1', '現在播放')
        .addTab('#tab-2', '評論')
        .mount($('#video-related-tabs'));

    first_load(page_data);

    $('#footer-container').html(FooterTpl);

    $(function() {
        $('.sf-menu').superfish();
    });

});