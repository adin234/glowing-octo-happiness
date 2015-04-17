/*global
	active_playlist: true,
    data_cache: true,
    server
*/

'use strict';

define(function() {

    return function Get_Playlist(playlistId) {

        active_playlist = playlistId;

        if (!data_cache.playlist[playlistId]) {
            $.ajax({
                url: server + 'news',
                dataType: 'json',
                async: false,
                data: {
                    playlist: playlistId
                },
                success: function(e) {
                    data_cache.playlist[playlistId] = e;
                }
            });
        }

        return data_cache.playlist[playlistId];
    };
});
