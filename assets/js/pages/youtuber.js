/* global
    page_data,
    twttr,
    gapi
*/


'use strict';

define('youtuber', function(require) {

    window.filterGame = require('./media/Filter_Game');
    window.update_videos = require('./media/Update_Videos');
    window.filterConsole = 'all';

    var renderGame = require('./media/Render_Game'),
        Global_Filter = require('../components/Global_Filter/index'),
        global_filter = new Global_Filter({
            onChange: function(filter) {
                window.filterConsole = filter.id;
                renderGame();
            }
        });

    global_filter
        .init()
        .mount($('#global-filter'));

    var add_buttons = function () {
        var inner = '',
            youtube_channel = page_data.config.channel,
            facebook = page_data.user.custom_fields.facebook,
            twitter = page_data.user.custom_fields.twitter;

        if (youtube_channel) {
            inner = '<div class="g-ytsubscribe" data-channelid="' + youtube_channel +
                '" data-layout="default" data-theme="dark" ' + 'data-count="hidden" data-onytevent="onYtEvent"></div>';
            $('#youtube-subscribe').html(inner);
            gapi.ytsubscribe.go('youtube-subscribe');
        }
        else {
            $('youtube-subscribe').remove();
        }

        if (facebook) {
            inner = '<div class="fb-like" ' + 'data-href="https://www.facebook.com/' + facebook +
                '" data-layout="button" ' + ' data-action="like" </div>';
            $('#facebook-like').html(inner);
        }
        else {
            $('a.facebook-like-button').remove();
        }

        if (twitter) {
            inner = '<a href="https://twitter.com/' + twitter + '" class="twitter-follow-button" ' +
                'data-show-count="false" data-size="large"></a>';
            $('#twitter-follow').html(inner);
            if (twitter.widgets) {
                twttr.widgets.load();
            }
        }
        else {
            $('#twitter-follow').remove();
        }
    };

    $(document).on('data-loaded', function() {
        add_buttons();
        renderGame();
    });
});


require(['youtuber']);