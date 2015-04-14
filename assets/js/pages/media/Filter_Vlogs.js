'use strict';

define(function(require) {
    var update_videos = require('./Update_Videos');

    return function Filter_Vlogs(page_data) {
        var videos = page_data.videos.filter(function(e) {
            return !!~e.snippet.meta.tags.indexOf('anytv_console_vlogs');
        });
        $('li.ytVideo.videoItem').remove();
        update_videos(videos);
    };
});
