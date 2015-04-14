/*global
    filterTags: true
*/

'use strict';

define(function(require) {
    return function Filter(value, page_data) {
        var update_videos = require('./Update_Videos');

        var filterObj = page_data.categories.filter(function(item) {
            return item.id === value;
        });
        if (typeof filterObj[0] !== 'undefined') {
            filterTags = $.map(filterObj[0].tags.split(','), $.trim);
        }
        $('li.ytVideo.videoItem').remove();
        update_videos.init(page_data.videos);
    };
});
