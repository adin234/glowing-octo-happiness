define (
	function () {
		return function Get_Playlist_Next () {
            return {
                init: function(playlist) {
      
		        	$.getJSON(server + 'news', {
		                playlist: active_playlist,
		                pageToken: playlist.nextPageToken
		            },
		            function (e) {
		                if (e.items[0].snippet.playlistId === active_playlist) {
		                    playlist.nextPageToken = e.nextPageToken;
		                    activeVideos = activeVideos.concat(e.items);
		                    if (e.nextPageToken) {
		                        this.init(e);
		                    }
		                }
		            });

                }
            };
		};
	}
);