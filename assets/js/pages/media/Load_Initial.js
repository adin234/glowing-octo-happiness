/*global
    activeVideos: true
*/

'use strict';

define(function() {

    var update_videos = require('./Update_Videos');

    return function Load_Initial(page_data) {
        activeVideos = page_data.videos;
        update_videos(page_data.videos, null, 1);
    };
});
