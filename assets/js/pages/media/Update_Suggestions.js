/*global
	html: true,
	filterTags,
	utilArray,
	tempdata: true,
	template
*/

'use strict';

define(function(require) {

    var recommended_tpl = require('./../templates/media-recommended-item.html');

    return function Update_Suggestions(suggestions) {

        html = [];
        suggestions.forEach(function(item) {
            if (filterTags && (typeof item.snippet.meta === 'undefined' ||
                    typeof item.snippet.meta.tags === 'undefined' ||
                    utilArray.intersect(filterTags, item.snippet.meta.tags).length === 0)) {
                return;
            }

            if (item.snippet.thumbnails) {
                tempdata = {
                    id: 'video-' + item.snippet.resourceId.videoId,
                    link: '/youtuber/?user=' + item.user_id +
                        '#!/video/' + item.snippet.resourceId.videoId,
                    title: item.snippet.title,
                    thumb: item.snippet.thumbnails.default.url,
                    desc: item.snippet.description,
                    username: item.username,
                    views: item.snippet.meta.statistics.viewCount
                };
                html.push(
                    template(
                        recommended_tpl,
                        tempdata
                    )
                );
            }
        });
        $('aside.recommend > ul .mCSB_container').html(html.join(''));
    };
});
