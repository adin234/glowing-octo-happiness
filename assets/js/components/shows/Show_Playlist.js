define (
    [
        'components/shows/Filter_Action',
        'components/shows/Get_Playlist',
        'components/shows/Update_Videos',
        'components/shows/Get_Playlist_Next'
    ],
	function (
        Filter_Action,
        Get_Playlist,
        Update_Videos,
        Get_Playlist_Next
    ) {
		return function Show_Playlist () {
            return {
                init: function(playlistId, next) {

                    var filterAction = new Filter_Action(),
                        getPlaylist = new Get_Playlist(),
                        update_videos = new Update_Videos(),
                        getPlaylistNext = new Get_Playlist_Next();

                    activeVideos = [];
                    $('.playlistItem').removeClass('current');
                    $('#playlist-' + playlistId).addClass('current');
                    var playlist = getPlaylist.init(playlistId);
                    $('li.ytVideo.videoItem').remove();

                    if (next !== 'continue') {
                        update_videos.init(playlist.items);
                    }

                    if (playlist.nextPageToken) {
                        activeVideos = activeVideos.concat(playlist.items);
                        getPlaylistNext.init(playlist);
                    }
                    if (!next) {
                        if ((typeof playlist.items[0].status !== 'undefined') && (playlist.items[0].status === 'public')) {
                            return show;
                        }
                        else {
                            return showVideo.init(playlist.items[1].snippet.resourceId.videoId);
                        }
                    }

                    filterAction.init(next);

                }
            };
		};
	}
);