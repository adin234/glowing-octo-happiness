/*global
    requirejs  
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
        First_Load,
        Format_Date,
        Get_Comments,
        Get_Photo,
        Get_Playlist,
        Get_Playlist_Index,
        Get_Playlist_Next,
        Get_Video,
        Get_Video_Data,
        Hash_Change,
        Load_Initial,
        On_Player_State_Change,
        Show_Playlist,
        Update_Playlists,
        Update_Prev_Next,
        Update_Suggestions,
        Update_Videos,
        Will_Play

    ) {

    var page_data;
    $.ajax({
        async: false,
        type: 'GET',
        dataType: 'json',
        url: server + 'shows'
    }).done(function (data) {
        page_data = data;
    });
    console.log('all data', page_data);

    // shows page
    var main_tab_1 = new Tabs({
        className: 'listSwitch clearFix',
        template: tab_nav_tpl
    });

    var main_tab_2 = new Tabs({
        template: tab_nav_tpl_2
    });

    var global_filter                   = new Global_Filter(),
        first_load                      = new First_Load(),
        hash_change                     = new Hash_Change({
            onChange: function(type, id) {
                filter_action.execute(type, id);
            }
        }),
        show_playlist                   = new Show_Playlist(),
        filter_action                   = new Filter_Action({
            show_playlist: show_playlist
        }),
        Update_Playlists                 = new Update_Playlists();
        // on_player_state_change          = new On_Player_State_Change(),
        // load_initial                    = new Load_Initial(),
        // filter                          = new Filter(),
        // filter_vlogs                    = new Filter_Vlogs(),
        // filter_game                     = new Filter_Game(),
        // delete_comment                  = new Delete_Comment();


    // first_load
    //     .init(page_data);

    hash_change
        .init(page_data);

    // update_playlists
    //     .init(page_data);

    // show_playlist
    //     .init();

    // on_player_state_change
    //     .init();

    // load_initial
    //     .init(page_data);

    // // di ko alam san nanggaling yung 'value'
    // filter
    //     .init(value, page_data);

    // filter_vlogs
    //     .init(page_data);

    // // di ko alam san nanggaling yung 'filterString'
    // filter_game
    //     .init(filterString, page_data);

    // delete_comment
    //     .init(data, context);


    main_tab_2
        .init()
        .addTab('#tab-1', '現在播放')
        .addTab('#tab-2', '評論')
        .mount($('#video-related-tabs'))

    $('#footer-container').html(FooterTpl);

    $(function() {
        $('.sf-menu').superfish();
    });

});