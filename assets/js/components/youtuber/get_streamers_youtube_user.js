/* global
    server,
    page_data,
    liveStreamLink: true
*/

'use strict';

$.get(server + 'streamers/youtube?user=' + page_data.user.user_id, function (result) {
    if (result.streamers.length) {
        liveStreamLink = '/gamer_stream/?user=' + page_data.user.user_id +
            '/#!/' + 'YT' + result.streamers[0].youtube.id;
    }

    if (liveStreamLink) {
        $('.live-button').attr('href', liveStreamLink).show();
    }
});
