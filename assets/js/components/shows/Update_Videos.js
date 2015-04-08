define (
	function () {
		return function Update_Videos () {
            return {
                init: function(videos, append, initial) {


			        var link = '#!/',
			            cons = '',
			            start = $('li.ytVideo.videoItem').length;

			        html = [];
			        playlistIds = [],
			        filterConsole;

			        if (typeof filterConsole !== 'undefined' && filterConsole.trim().length) {
			            cons = 'console/' + filterConsole + '/';
			        }

			        if (!append || typeof append === 'undefined') {
			            if (!initial) {
			                activeVideos = [];
			            }
			            start = 0;
			            videoIds = [];
			        }

			        for (var k = start; k < start + 20; k++) {
			            var item = videos[k];

			            if (!item) {
			                continue;
			            }

			            if (!~videoIds.indexOf(item.snippet.resourceId.videoId)) {
			                videoIds.push(item.snippet.resourceId.videoId);
			            }
			            else {
			                continue;
			            }
			            if (filterTags && (typeof item.snippet.meta === 'undefined' ||
			                typeof item.snippet.meta.tags === 'undefined' ||
			                utilArray.intersect(filterTags, item.snippet.meta.tags).length === 0)) {
			                return;
			            }

			            playlistIds.push(item.snippet.playlistId);

			            if (item.snippet.thumbnails) {
			                item = getVideo(item.snippet.resourceId.videoId) || item;
			                if (typeof item.snippet.thumbnails !== 'undefined') {
			                    tempdata = {
			                        id: 'video-' + item.snippet.resourceId.videoId,
			                        link: link + cons + 'video/' + item.snippet.resourceId.videoId,
			                        link_user: '/youtuber/?user=' + item.user_id +
			                            '/#!/video/' + item.snippet.resourceId.videoId || '',
			                        user: item.username || '',
			                        title: item.snippet.title,
			                        thumb: item.snippet.thumbnails.default.url,
			                        desc: item.snippet.description
			                    };

			                    html.push(
			                        template(
			                            JST['videosTpl.html'](),
			                            tempdata
			                        )
			                    );
			                }
			            }
			        }

			        if (!html.length && !append) {
			            html.push('目前沒有影片');
			        }

			        if (append) {
			            $('#videos .mCSB_container').append(html.join(''));
			        }
			        else {
			            $('#videos .mCSB_container').html(html.join(''));
			        }



                }
            };
		};
	}
);