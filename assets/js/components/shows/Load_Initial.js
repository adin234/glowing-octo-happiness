define (
	[
		'components/shows/Update_Videos',
	],
	function (
		Update_Videos
	) {
		return function Load_Initial () {
            return {
                init: function(page_data) {
                    
                    var update_videos = new Update_Videos();
                    activeVideos = page_data.videos;
        			update_videos.init(page_data.videos, null, 1);

                }
            };
		};
	}
);