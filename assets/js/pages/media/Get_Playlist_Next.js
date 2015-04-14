/*global
	server,
	active_playlist,
	activeVideos: true
*/

'use strict';

define(function() { 
    var Get_Playlist_Next = function(playlist) {

        $.getJSON(server + 'news', {
                playlist: active_playlist,
                pageToken: playlist.nextPageToken
            },
            function(e) {
                if (e.items[0].snippet.playlistId === active_playlist) {
                    playlist.nextPageToken = e.nextPageToken;
                    activeVideos = activeVideos.concat(e.items);
                    if (e.nextPageToken) {
                        Get_Playlist_Next(e);
                    }
                }
            });
    };

    return Get_Playlist_Next;
});
