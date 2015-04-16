'use strict';

define(function(require) {
    var update_videos = require('./Update_Videos'),
        update_playlists = require('./Update_Playlists');

    return function Filter_Game(filterString, page_data) {

        $('.game-item').each(function(i, item) {
            $(item).removeClass('active');
        });
        $('[data-id=' + filterString + ']').parent().addClass('active');

        var videos = [];
        page_data.playlists.forEach(function(item) {
            if (typeof item.snippet.meta !== 'undefined' &&
                (~item.snippet.meta.tags.indexOf('anytv_' + filterString) ||
                    ~item.snippet.meta.tags.indexOf(filterString))) {
                videos.push(item);
            }
        });
        update_playlists(videos);

        videos = [];
        page_data.videos.forEach(function(item) {
            if (typeof item.snippet.meta !== 'undefined' &&
                (~item.snippet.meta.tags.indexOf('anytv_' + filterString) ||
                    ~item.snippet.meta.tags.indexOf(filterString))) {
                videos.push(item);
            }
        });
        $('li.ytVideo.videoItem').remove();
        update_videos(videos);
    };
});
