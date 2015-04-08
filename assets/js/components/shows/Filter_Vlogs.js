define (
	[
		'components/shows/Update_Videos',
	],
	function (
		Update_Videos
	) {
		return function Filter_Vlogs () {
            return {
                init: function(page_data) {

                	var update_videos = new Update_Videos();

			        var videos = page_data.videos.filter(function (e) {
			            return !!~e.snippet.meta.tags.indexOf('anytv_console_vlogs');
			        });
			        $('li.ytVideo.videoItem').remove();
			        update_videos.init(videos);

                }
            };
		};
	}
);