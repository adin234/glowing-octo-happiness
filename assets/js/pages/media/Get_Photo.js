'use strict';

define(
    function() {
        return function Get_Photo(id, context) {

            if (page_data.user && page_data.user.user_id) {
                return context.attr('src', attachments_server + 'avatar.php?userid=' + page_data.user.user_id + '.jpg');
            }

            return context.attr('src', 'https://yt3.ggpht.com/-Ad_spiIVhY0/AAAAAAAAAAI/AAAAAAAAAAA/EQ19ZP2mVyU/s100-c-k-no/photo.jpg');

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
