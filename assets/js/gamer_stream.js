/* jshint unused: false */
/* global
    server,
    streamerId: true,
    template,
    twitch,
    page_data: true,
    JST,
    page_maintenance,
    Masonry,
    params,
    utilCookie,
    XBBCODE,
    community
*/

'use strict';

var check_if_online = function (userId) {
        var found = false;
        $.getJSON(server + 'streamers/youtube/?user=' + userId, function(e) {
            e.streamers.forEach(function(item) {
                    found = true;
                    streamerId = item.youtube.id;
            });

            if (found) {
                $('#twitchStream')
                    .replaceWith(template($('#youtube-stream-tpl')
                    .html(),{youtubeid: streamerId}));
                setTimeout(function() {
                    check_if_online(userId);
                }, 30000);
            }
            else {
                $('#twitchStream')
                    .replaceWith('<div id="twitchStream">' +
                        '<img class="offline-placeholder" ' +
                        'src="/assets/images/streamer-offline.png"/></div>');
                setTimeout(function() {
                    check_if_online(userId);
                }, 30000);
            }

        });
    },

    sched_template = function(string) {
        var list = string.split(/<br ?\/?>/).filter(function(e) {
            return e.trim().length;
        }).map(function(e) {
            return e + '<br/>';
        });
        return $('<li/>', {html : list.join('')})[0].outerHTML;
    },

    toggleChat = function () {
        var advertisementContainer = $('#advertisement-container'),
            twitchContainer = $('#twitch-container'),
            size = advertisementContainer.attr('data-status'),
            toggleButton = advertisementContainer.children('.minify-advert');

        if (size !== 'full') {
            twitchContainer.height(twitchContainer.parent().height() - 250);

            advertisementContainer
                .css('overflow', 'auto')
                .css('height', '')
                .attr('data-status', 'full');

            twitchContainer.height(
                twitchContainer.parent().height() - 250
            );

            toggleButton.html('縮小');

        }
        else {
            advertisementContainer
                .css('overflow', 'hidden')
                .css('height', '100')
                .attr('data-status', 'minified');

            twitchContainer.height(
                twitchContainer.parent().height() - 50
            );

            toggleButton.html('增大');
        }

        advertisementContainer.show();
    },

    checker = setInterval(function() {
        var found = false;
        if (twitch.substr(0,2) === 'YT') {
            $.getJSON(server + 'streamers/youtube/?user=' + page_data.user_id, function(e) {
                e.streamers.forEach(function(item) {
                        found = true;
                        streamerId = item.youtube.id;
                        $('.streamer #about-streamer').html(
                            item.youtube.snippet.description.
                                replace(/(?:\r\n|\r|\n)/g, '<br />')
                        );
                        $('embed').height($('#streamView').height());
                });

                if (!found) {
                    if ($('div .videoWrapper').length > 0) {
                        $('#twitchStream').replaceWith(
                            '<div id="twitchStream">' +
                            '<img class="offline-placeholder" ' +
                            'src="/assets/images/streamer-offline.png"/>' +
                            '</div>').fadeTo('slow');
                    } 
                } else {
                    if ($('div .videoWrapper').length === 0) {
                        $('#twitchStream').replaceWith(
                            template(
                                JST['youtube-stream-tpl.html'](),
                                    {youtubeid: streamerId}
                            )
                        ).fadeIn('slow');
                    }
                }
            });        
        }
    }, 5000);
