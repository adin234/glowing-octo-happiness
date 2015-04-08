define (
	[
		'components/shows/Get_Video_Data',
		'components/shows/Get_Playlist_Index'
	],
	function (
		Get_Video_Data,
		Get_Playlist_Index
	) {
		return function On_Player_State_Change () {
            return {
                init: function() {

                	var getVideoData = new Get_Video_Data(),
                		getPlaylistIndex = new Get_Playlist_Index();

			        if (event.data === YT.PlayerState.UNSTARTED) {
			            var videoId = event.target.getVideoData.init().video_id,
			                index = event.target.getPlaylistIndex.init(),
			                context = $('img[data-index=' + index + ']');
			        }

                }
            };
		};
	}
);