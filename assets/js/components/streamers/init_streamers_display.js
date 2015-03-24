/* jshint unused: false */
/* global
    page_data :true,
    server,
    socket_server,
    render_videos,
    filter_videos,
    slider,
    streamersSearch,
    io
*/

'use strict';
var YTStreamers = [],
    TWStreamers = [],
    HBStreamers = [],
    onlineStreamers = [],
    streamCount = 0,
    con = 'all',

    displayStreamers = function () {
        YTStreamers.forEach(function (item) {
            onlineStreamers.push(item);
        });

        TWStreamers.forEach(function (item) {
            onlineStreamers.push(item);
        });

        HBStreamers.forEach(function (item) {
            onlineStreamers.push(item);
        });

        if ($('a[href$="/streamers"] > sup').text().length > 0) {
            streamCount = parseInt($('a[href$="/streamers"] > sup').text());
        }
        else {
            streamCount = 0;
        }

        if (onlineStreamers.length > 0) {
            $('a[href$="/streamers"] > sup').text(onlineStreamers.length);
            page_data.streamers = onlineStreamers;
            render_videos();
        }
        else {
            if (onlineStreamers.length === 0 &&
                $('a[href$="/streamers"] > sup').text() === '') {
                $('a[href$="/streamers"] > sup').text('');
                $('#container-videos > ul').remove().fadeOut();
            }
        }
    },

    checker = function () {
        var socket = io.connect(socket_server);
        socket.on('message', function(e) {
            YTStreamers = e.streamers.youtube;
            TWStreamers = e.streamers.twitch;
            HBStreamers = e.streamers.hitbox;
            onlineStreamers = [];
            displayStreamers();
        });
    },

    render_page = function () {
        $('.tooltip').tooltipster({
            contentAsHTML: true
        });
        $(window).trigger('hashchange');
    },

    filter_category = function (_console, context) {
        con = _console;
        $.getJSON(server + 'streamersdata?console=' + _console, function (results) {
            page_data = results;
            render_page();
        }).done(function () {
            $(context).parent().siblings().removeClass('current');
            $(context).parent().addClass('current');
        });
    };

page_data = $.parseJSON(page_data);

$.getJSON(server + 'streamers?lanparty=1', function (e) {
    page_data.lanparty = e.streamers;
    render_videos(undefined, undefined, true);
    $.getJSON(server + 'streamers/youtube?lanparty=1', function (result) {
        result.streamers.forEach(function (item) {
            page_data.lanparty.push(item);
        });
        render_videos(undefined, undefined, 1);
    });
});

$(window).on('hashChange', function () {
    filter_videos();
});

$('.tabs').tabslet({
    animation: true
});
$('.sf-menu').superfish();

slider.container_videos = $('#container-videos').bxSlider({
    infiniteLoop: false,
    hideControlOnEnd: true
});

slider.container_lanparty = $('#container-lanparty').bxSlider({
    infiniteLoop: false,
    hideControlOnEnd: true
});

streamersSearch();
checker();
render_page();
