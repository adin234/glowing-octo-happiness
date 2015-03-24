/* global
    filter_game,
    filter_videos
*/

'use strict';

$('body').on('keydown', '#txtbox-search-games', function(e) {
    if (e.keyCode === 13) {
        filter_game(this);
    }
});

$('body').on('keydown', '#txtbox-search-videos', function(e) {
    if (e.keyCode === 13) {
        filter_videos(this);
    }
});
