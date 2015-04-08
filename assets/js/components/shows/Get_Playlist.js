define (
	[
		'components/shows/Filter_Action',
	],
	function (
		Filter_Action
	) {
		return function Show_Playlist () {
            return {
                init: function(playlistId) {

                	var data_cache = {
						    playlist: {},
						    video: {}
						};
			        active_playlist = playlistId;

			        if (!data_cache.playlist[playlistId]) {
			            $.ajax({
			                url: server + 'news',
			                dataType: 'json',
			                async: false,
			                data: {
			                    playlist: playlistId
			                },
			                success: function (e) {
			                    data_cache.playlist[playlistId] = e;
			                }
			            });
			        }

			        return data_cache.playlist[playlistId];

                }
            };
		};
	}
);