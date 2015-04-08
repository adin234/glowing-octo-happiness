define (
	[
		'components/shows/Update_Videos',
	],
	function (
		Update_Videos
	) {
		return function Filter () {
            return {
                init: function(value, page_data) {

                	var update_videos = new Update_Videos();

			        var filterObj = page_data.categories.filter(function (item) {
			            return item.id === value;
			        });
			        if (typeof filterObj[0] !== 'undefined') {
			            filterTags = $.map(filterObj[0].tags.split(','), $.trim);
			        }
			        $('li.ytVideo.videoItem').remove();
			        update_videos.init(page_data.videos);

                }
            };
		};
	}
);