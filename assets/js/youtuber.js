/* jshint unused: false */
/* global
    utilHash,
    page_data,
    template,
    JST,
    filter_vlogs,
    update_videos,
    twttr,
    community,
    attachments_server,
    server
*/

'use strict';

var liveStreamLink = false,
    filterConsole = 'all',
    twitchId = page_data.user.custom_fields.twitchStreams || null,
    youtubeId = page_data.user.custom_fields.youtube_id || null,

    add_filter_category = function (string, context) {
        utilHash.changeHashVal('console', string);
    },

    renderGame = function () {
        var html = [];
        page_data.games_cast.forEach(function (item) {
            item.consoles = item.consoles || [];
            if (!~item.consoles.indexOf(filterConsole)) {
                return;
            }
            html.push(template(
                JST['gamesCastTpl.html'](), item));
        });
        $('#tab-4').mCustomScrollbar({
            theme: 'inset-2'
        });

        if (!html.length) {
            html.push('目前沒有遊戲');
        }

        $('#tab-4 .mCSB_container ul').html(html.join(''));
        $('.tooltip').tooltipster({
            contentAsHTML: true
        });
    },

    filter_category = function (gameConsole) {
        var videos = [],
            context = $('.species a[data-console=' + gameConsole + ']');

        if (gameConsole === filterConsole) {
            return;
        }

        context.parent().siblings().removeClass('current');
        context.parent().addClass('current');

        filterConsole = gameConsole;

        if (gameConsole !== 'vlogs') {
            renderGame();
        }
        else {
            filter_vlogs();
        }

        videos = page_data.videos.filter(function (item) {
            return ~(item.snippet.meta.tags.indexOf('anytv_console_' + filterConsole));
        });

        $('#videosToggle').trigger('click');

        update_videos(videos);
    };
