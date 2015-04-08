define (
	[
		'components/shows/Show_Playlist',
		'components/shows/Show_Video',
	],
	function (
		Show_Playlist,
		Show_Video
	) {
		return function Filter_Action () {
            return {
                init: function(action, hash) {

                	var showPlaylist = new Show_Playlist(),
                		showVideo = new Show_Video(),
                		showComment;

				    switch (action) {
				        case 'playlist':
				            showPlaylist.init(hash.shift(), hash.shift());
				            $('#videosToggle a').trigger('click');
				            break;
				        case 'video':
				            isPlaying = true;
				            showVideo.init(hash.shift());
				            break;
				        case 'comments':
				            $('a[href="#tab-2"]').click();
				            active_comments = true;
				            this.init(hash.shift());
				            break;
				        case 'comment':
				            $('a[href="#tab-2"]').click();
				            active_comments = true;
				            showComment = 'comment' + hash.shift();
				            this.init(hash.shift());
				            break;
				        case 'console':
				            // filter_category.init(hash.shift());
				            this.init(hash.shift());
				            break;
				    }

                }
            };
		};
	}
);