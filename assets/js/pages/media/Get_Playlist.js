/*global
	active_playlist: true,
	server
*/

'use strict';

define(function() {

    var data_cache = {
        playlist: {},
        video: {}
    };

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
