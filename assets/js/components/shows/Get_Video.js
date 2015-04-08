define (
	[
		'components/shows/Cache_Video'
	],
	function (
		Cache_Video
	) {
		return function Get_Video () {
            return {
                init: function(videoId, list) {

                	var cacheVideo = new Cache_Video(),
                	data_cache = {
					    playlist: {},
					    video: {}
					};

			        var i = 0;

			        if (!list) {
						$.ajax({
					        async: false,
					        type: 'GET',
					        dataType: 'json',
					        url: server + 'shows'
					    }).done(function (data) {
					        list = data.videos;
					    });
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

			        return cacheVideo.init(videoId);

                }
            };
		};
	}
);