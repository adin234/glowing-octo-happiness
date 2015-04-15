/*global
    searchBoxInit,
    socketConnect
*/

'use strict';

define(function() {

    var socket = socketConnect();

    $('.sf-menu').superfish();

    searchBoxInit();

    socket.on('message', function(e) {
        var count = e.streamers.youtube.length
                + e.streamers.twitch.length
                + e.streamers.hitbox.length,
            streamerCount = $('#number-of-streamers');
        if (streamerCount) {
            streamerCount.html(count);
        }
    });
});