'use strict';

define(
    function() {
        return function Get_Photo(id, context) {
            context.attr('src', attachments_server + 'avatar.php?userid=' + page_data.user.user_id + '.jpg');
            // $.getJSON('http://gdata.youtube.com/feeds/api/users/' + id.substr(2) +
            //     '?fields=yt:username,media:thumbnail,title&alt=json', {},
            //     function(e) {
            //         console.log(e);
            //         context.attr('src', e.entry.media$thumbnail.url);
            //     }
            // );
        };
    }
);
