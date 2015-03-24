/* global
    page_data,
    twttr
*/

'use strict';

var add_buttons = function () {
        var inner = '',
            youtube_channel = page_data.config.channel,
            facebook = page_data.user.custom_fields.facebook,
            twitter = page_data.user.custom_fields.twitter;

        if (youtube_channel) {
            inner = '<div class="g-ytsubscribe" data-channelid="' + youtube_channel +
                '" data-layout="default" data-theme="dark" ' + 'data-count="hidden" data-onytevent="onYtEvent"></div>';
            $('#youtube-subscribe').html(inner);
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

add_buttons();
