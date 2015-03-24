/* global
    page_data,
    server,
    liveStreamLink: true
*/

'use strict';

$.get(server + 'streamers?user=' + page_data.user.user_id, function (result) {
    if (result.streamers.length) {
        liveStreamLink = '/gamer_stream/?user=' + page_data.user.user_id + '/#!/' + 'TW' + result.streamers[0].twitch
            .channel.name;
    }

    if (liveStreamLink) {
        $('.live-button').attr('href', liveStreamLink).show();
    }
});
