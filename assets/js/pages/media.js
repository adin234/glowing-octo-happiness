/*global
    page_data: true
*/

'use strict';

define('shows', function(require) {

    window.html = [];
    window.activelist = [];
    window.active_playlist = null;
    window.hash = [];
    window.player = null;
    window.activeVideos = [];
    window.filterTags = false;
    window.playlistIds = [];
    window.active_comments = false;
    window.videoIds = [];
    window.isPlaying = false;
    window.tag = document.createElement('script');
    window.firstScriptTag = document.getElementsByTagName('script')[0];
    window.showComment = false;
    window.indices = null;
    window.data_cache = {
        playlist: {},
        video: {}
    };
    window.tempdata = null;
    window.showVideo = null;
    window.showPlaylist = null;
    window.show = null;
    window.data_cache = {
        playlist: {},
        video: {}
    };

    if (typeof page_data === 'string') {
        page_data = $.parseJSON(page_data);
    }

    var Tabs = require('Tabs/index'),
        Hash_Change = require('./media/Hash_Change'),
        Filter_Action = require('./media/Filter_Action'),
        show_playlist = require('./media/Show_Playlist'),
        show_video = require('./media/Show_Video'),
        first_load = require('./media/First_Load'),
        filter_category = require('./media/Filter_Category');

    // shows page
    var main_tab_2 = new Tabs(),
        hash_change = new Hash_Change({
            onChange: function(type) {
                console.log('changed', type);
                filter_action.execute(type);
            }
        }),
        filter_action = new Filter_Action({
            show_playlist: show_playlist,
            show_video: show_video,
            filter_category: filter_category
        });

    hash_change
        .init(page_data);

    first_load(page_data);

    main_tab_2
        .init()
        .addTab('#tab-1', '現在播放')
        .addTab('#tab-2', '評論')
        .mount($('#video-related-tabs'));

    require('Footer/index');
    require('Sub_Nav/index');
});

require(['shows']);