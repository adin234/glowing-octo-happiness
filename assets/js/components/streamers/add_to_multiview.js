/* global
    JST,
    page_data,
    origin,
    attachments_server,
    template,
    multiview_items,
    utilHash,
    get_active_for_multiview
*/

'use strict';

var update_watch_multiview = function () {
        var ids = get_active_for_multiview(),
            stream_link = '/gamer_stream_multi/',
            watch_now_button = $('#watch-now-link'),
            videos = $('#container-multiview ul.list > li');

        if (videos.length) {
            watch_now_button.removeClass('disabled');
        }
        else {
            watch_now_button.addClass('disabled');
        }

        $('#multiview-count').html(videos.length);

        watch_now_button.attr('href', stream_link + utilHash.buildHash(ids));
    },

    add_to_multiview = function () {
        var id = $(this).attr('data-streamidraw'),
            tplVideo = JST['videoMultiTpl.html'](),
            multiview_item,
            streamer = page_data.streamers.filter(function (item) {
                if (typeof item.twitchid !== 'undefined' && item.twitchid === id) {
                    return true;
                }
                if (typeof item.youtube !== 'undefined' && item.youtube.id === id) {
                    return true;
                }
                if (typeof item.hitbox !== 'undefined' && item.hitboxid === id) {
                    return true;
                }
                return false;
            })[0],
            item = streamer;

        multiview_items.push(id);

        $('#container-videos a[data-streamidraw=' + id + ']').parent('li').hide();

        if (typeof item.twitch !== 'undefined') {
            item.twitchid = item.field_value[item.field_value.length - 1];
            // dont render if already active
            item.id = 'TW' + item.twitchid;
            item.idraw = item.twitchid;
            item.live = 'live';
            item.link = origin + 'gamer_stream/?user=' + item.user_id + '#!/' + item.id;
            item.provider = attachments_server;
            item.thumb = item.twitch.preview.large;
            item.title = item.twitch.channel.status;
            item.bust = 1;
            item.type = 'TW';
            item.views = item.twitch.viewers;
        }
        else if (typeof item.hitbox !== 'undefined') {
            var hitboxData = item.hitbox.livestream[0];

            item.hitboxid = hitboxData.media_name;
            // dont render if already active
            item.id = 'HB' + item.hitboxid;
            item.username = item.user.username;
            item.user_id = item.user.user_id;
            item.idraw = item.hitboxid;
            item.live = 'live';
            item.link = origin + 'gamer_stream/?user=' + item.user.user_id + '/#!/' + item.id;
            item.provider = attachments_server;
            item.thumb = 'http://edge.sf.hitbox.tv/' + hitboxData.media_thumbnail_large;
            item.title = hitboxData.media_status;
            item.bust = 1;
            item.type = 'HB';
            item.views = hitboxData.media_views;
            item.provider = attachments_server;
        }
        else {
            item.id = 'YT' + item.username;
            item.idraw = item.youtube.id;
            item.live = 'live';
            item.link = origin + 'gamer_stream/?user=' + item.user_id + '#!/' + item.id;
            item.provider = attachments_server;
            item.thumb = item.youtube.snippet.thumbnails.high.url;
            item.title = item.youtube.snippet.title;
            item.bust = 1;
            item.type = 'YT';
            item.views = '0';
        }

        multiview_item = template(tplVideo, item);

        $('#container-multiview ul.list').append(multiview_item);
        if (($('#tab-2-1').css('display') === 'block' && !$('#container-videos li.live:visible').length) || ($(
                '#tab-2-2').css('display') === 'block' && !$('#container-lanparty li.live:visible').length)) {
            $('.video.stream a[href=#tab-2-3]').trigger('click');
        }


        update_watch_multiview();
    };

$('#container-videos').on('click', '.addToMultiview', add_to_multiview);
