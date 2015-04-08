define (
	[
		'components/shows/Update_Videos',
		'components/shows/Update_Playlists'
	],
	function (
		Update_Videos,
		Update_Playlists
	) {
		return function Filter_Game () {
            return {
                init: function(filterString, page_data) {

                	var update_videos = new Update_Videos(),
                		update_playlists = new Update_Playlists();

			        $('.game-item').each(function (i, item) {
			            $(item).removeClass('active');
			        });
			        $('[data-id=' + filterString + ']').parent().addClass('active');

			        var videos = [];
			        page_data.playlists.forEach(function (item) {
			            if (typeof item.snippet.meta !== 'undefined' &&
			                (~item.snippet.meta.tags.indexOf('anytv_' + filterString) ||
			                ~item.snippet.meta.tags.indexOf(filterString))) {
			                videos.push(item);
			            }
			        });
			        update_playlists.init(videos);

			        videos = [];
			        page_data.videos.forEach(function (item) {
			            if (typeof item.snippet.meta !== 'undefined' &&
			                (~item.snippet.meta.tags.indexOf('anytv_' + filterString) ||
			                    ~item.snippet.meta.tags.indexOf(filterString))) {
			                videos.push(item);
			            }
			        });
			        $('li.ytVideo.videoItem').remove();
			        update_videos.init(videos);

                }
            };
		};
	}
);