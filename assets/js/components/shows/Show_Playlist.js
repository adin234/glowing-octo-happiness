/*global
    activeVideos: true
*/

'use strict';

define (function (require) {

		return function Show_Playlist () {

            var getPlaylist = require('components/shows/Get_Playlist');

            return {
                execute: function(playlistId, next) {

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