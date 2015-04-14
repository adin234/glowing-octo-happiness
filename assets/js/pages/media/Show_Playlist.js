/*global
    activeVideos: true,
    show,
    hash
*/

'use strict';

define(function(require) {

    var getPlaylist = require('./Get_Playlist'),
        update_videos = require('./Update_Videos'),
        getPlaylistNext = require('./Get_Playlist_Next'),
        showVideo = require('./Show_Video');

    return function Show_Playlist(playlistId, next, filterAction) {

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
            } else {
                showVideo(playlist.items[1].snippet.resourceId.videoId, playlist.items);
                filterAction(hash.shift());
                return;
            }
        }

        filterAction(next);

    };
});
