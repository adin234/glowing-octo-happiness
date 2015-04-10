/*global
    activeVideos: true,
    show,
    hash
*/

'use strict';

define (function (require) {

		return function Show_Playlist () {

            var getPlaylist = require('components/shows/Get_Playlist'),
                update_videos = require('components/shows/Update_Videos'),
                getPlaylistNext = require('components/shows/Get_Playlist_Next'),
                showVideo = require('components/shows/Show_Video');

            return {
                execute: function(playlistId, next, filterAction) {

                    activeVideos = [];
                    $('.playlistItem').removeClass('current');
                    $('#playlist-' + playlistId).addClass('current');
                    var playlist = getPlaylist(playlistId);
                    $('li.ytVideo.videoItem').remove();

                    if (next !== 'continue') {
                        update_videos(playlist.items);
                    }
                    if (playlist.nextPageToken) {
                        activeVideos = activeVideos.concat(playlist.items);
                        getPlaylistNext(playlist);
                    }
                    if (!next) {
                        if (
                            (typeof playlist.items[0].status !== 'undefined') &&
                            (playlist.items[0].status === 'public')
                        ) {
                            return show;
                        }
                        else {
                            showVideo(playlist.items[1].snippet.resourceId.videoId);
                            filterAction(hash.shift());
                            return;
                        }
                    }

                    filterAction.init(next);

                }
            };
		};
	}
);