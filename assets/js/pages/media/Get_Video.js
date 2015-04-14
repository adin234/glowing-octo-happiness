/*global
    page_data,
	data_cache,
	indices:true
*/

'use strict';

define(function() {

    return function Get_Video(videoId, list) {
        var i = 0;

        if (!list) {
            list = page_data.videos;
        }

        for (i = 0; i < list.length; i++) {
            if (list[i].snippet.resourceId.videoId === videoId) {
                return list[i];
            }
        }


        list = data_cache.playlist;
        indices = Object.keys(list);
        for (i = 0; i < indices.length; i++) {
            list = data_cache.playlist[indices[i]].items;
            for (var ii = 0; ii < list.length; ii++) {
                if (list[ii].snippet.resourceId.videoId === videoId) {
                    return list[ii];
                }
            }
        }
    };
});
