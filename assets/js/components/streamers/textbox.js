/* global
    filter_game,
    filter_videos,
    streamersSearch
*/

'use strict';

$('#txtbox-search-games').on('keydown', function (e) {
    if (e.keyCode === 13) {
        filter_game(this);
    }
});

$('#txtbox-search-videos').on('keydown', function (e) {
    if (e.keyCode === 13) {
        filter_videos(this);
    }
});

$('#txtbox-search-videos').on('keypress', function (e) {
    if (e.keyCode === 13) {
        filter_videos(this);
    }
    else {
        streamersSearch();
    }
});
