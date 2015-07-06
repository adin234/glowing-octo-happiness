/* jshint unused: false */
/* global
    Masonry,
    server,
    page_maintenance,
    page_data : true,
    twitch,
    template,
    JST,
    sched_template,
    utilCookie,
    XBBCODE,
    community,
    params
*/
'use strict';
var streamType = '',
    streamId = '',
    viewers,

    information_masonry = function() {
        $('#tab-2').width($('#streamArea aside').width() - $('.streamer').width() - 40);

        var msnry = new Masonry(
            '#tab-2',
            {
                columnWidth: 350,
                itemSelector: '.panel'
            }
        );
    },

    resize_video_stream = function () {
        var size = $('#view-resize').val();
        if (size === 'x3') {
            $('embed').height($('#streamView').height());
            $('object').height($('#streamView').height());
        } else {
            $('embed').height('100%');
            $('object').height('100%');
        }
    },

    getViewersCount = function (url) {
        $.getJSON(url, function(e) {
            if (e && e.stream && e.stream.viewers) {
                viewers = e.stream.viewers;
                $('#twitchStream .views').html(e.stream.viewers + ' Views');
            }
        });
    };

$.ajax(server + 'streamers', function(data) {
    }).fail(function() {
      window.location.assign(page_maintenance);
});

page_data = JSON.parse(page_data);

$('.bxslider').bxSlider({
    infiniteLoop: false,
    hideControlOnEnd: true,
    minSlides: 4,
    maxSlides: 4,
    slideWidth: 298,
});

$('.tabs').tabslet({
    animation: true,
}).on('_after', function(e) {
    if (e.target.id === 'tab-2' && streamType !== 'YT') {
        information_masonry();
    }
});

$('body').on('change', '#view-resize', function(e) {
    var size = $('#view-resize').val();
    $('body').removeClass('x1 x2 x3').addClass(size);
    resize_video_stream();
});

$(window).on('resize', function() {
    resize_video_stream();
});

streamType = twitch.substr(0,2);
streamId = twitch.substr(2);

if (streamType === 'TW') {
    getViewersCount(server + 'get_views/' + twitch);

    $('#twitchStream').replaceWith(template(
        JST['twitch-stream-tpl.html'](), {twitchid: streamId, number: viewers})
    );
    $('#twitchTalk').html(template(
        JST['twitch-chat-tpl.html'](),
        {
            twitchid: streamId,
            advert: page_data.custom_fields &&
                page_data.custom_fields.advertisement
        }
    ));
    $('object').height(
        $('#streamView').height()
    );
}

if (streamType === 'HB') {
    getViewersCount(server + 'get_hitbox_views/' + streamId);
    $('#twitchStream').replaceWith(template(
        JST['hitbox-stream-tpl.html'](), {twitchid: streamId, number: viewers})
    );
    $('#twitchTalk').html(template(
        JST['hitbox-chat-tpl.html'](),
        {
            twitchid: streamId,
            advert: page_data.custom_fields &&
                page_data.custom_fields.advertisement
        }
    ));

    $('object').height($('#streamView').height());
    $.getJSON(server + 'scrape/' + streamId, function(e) {
        e.forEach(function(item) {
            item.data.html = item.html_description;
            item.data.link = item.data.link || '';
            $('#tab-2').append(template(JST['panelTpl.html'](), item.data));
        });
        setTimeout(function() {
            $('img[src=""]').hide();
        },100);
    });
}

if (streamType === 'YT') {
    getViewersCount(server + 'get_views/' + twitch);
    var found = false,
        userId = params.user.replace('/', '');

    $.getJSON(server + 'streamers/youtube/?user=' + userId, function(e) {
        var streamerId = '';
        e.streamers.forEach(function(item) {
            found = true;
            streamerId = item.youtube.id;

            $('.streamer #about-streamer').html(
                item.youtube.snippet.description.replace(/(?:\r\n|\r|\n)/g, '<br />')
            );
            $('embed').height($('#streamView').height());
        });

        if (found) {
            $('#twitchStream')
                .replaceWith(template(
                    JST['youtube-stream-tpl.html'](), {youtubeid: streamerId})
                );
        } else {
            $('#twitchStream')
                .replaceWith('<div id="twitchStream"><img class="offline-placeholder" ' +
                    'src="/assets/images/streamer-offline.png"/></div>');
        }

        if (!found) {
            $('aside .streamer').hide();
        }

        $('#tab-2').html(page_data.custom_fields.youtube_activity);
    });

    var userinfo = '',
        channelinfo = {'id':twitch, 'title' : twitch};

    if (utilCookie.get('user').length > 0) {
        userinfo = $.parseJSON(utilCookie.get('user'));
        $('#twitchTalk').initChatBox(channelinfo, userinfo, 'gamers-stream');
    } else {
        $('#twitchTalk').initChatBox(channelinfo, userinfo, 'gamers-stream');
    }
}

if (typeof page_data.about === 'undefined' || !page_data.about.trim().length) {
    $('aside .streamer').hide();
}
else {
    var result = XBBCODE.process({
        text: page_data.about,
        removeMisalignedTags: false,
        addInLineBreaks: false
    });

    $('#about-streamer').html(result.html.replace(/[\n\r]/, '<br/>'));
}

$('.streamer .streamer-name').html(page_data.custom_title);

var countEmpty = 0;

$('#monSched').html(sched_template(page_data.custom_fields.mondaySchedule))
    .promise().done(function(e) {
    if (!page_data.custom_fields.mondaySchedule ||
            !page_data.custom_fields.mondaySchedule.trim().length) {
        countEmpty++;
        $(this).parent().hide();
    }
});

$('#tueSched').html(sched_template(page_data.custom_fields.tuesdaySchedule))
    .promise().done(function(e) {
    if (!page_data.custom_fields.tuesdaySchedule ||
        !page_data.custom_fields.tuesdaySchedule.trim().length) {
        countEmpty++;
        $(this).parent().hide();
    }
});

$('#wedSched').html(sched_template(page_data.custom_fields.wednesdaySchedule))
    .promise().done(function(e) {
    if (!page_data.custom_fields.wednesdaySchedule ||
        !page_data.custom_fields.wednesdaySchedule.trim().length) {
        countEmpty++;
        $(this).parent().hide();
    }
});

$('#thuSched').html(sched_template(page_data.custom_fields.thursdaySchedule))
    .promise().done(function(e) {
    if (!page_data.custom_fields.thursdaySchedule ||
            !page_data.custom_fields.thursdaySchedule.trim().length) {
        countEmpty++;
        $(this).parent().hide();
    }
});

$('#friSched').html(sched_template(page_data.custom_fields.fridaySchedule))
    .promise().done(function(e) {
    if (!page_data.custom_fields.fridaySchedule ||
        !page_data.custom_fields.fridaySchedule.trim().length) {
        countEmpty++;
        $(this).parent().hide();
    }
});

$('#satSched').html(sched_template(page_data.custom_fields.saturdaySchedule))
    .promise().done(function(e) {
    if (!page_data.custom_fields.saturdaySchedule ||
        !page_data.custom_fields.saturdaySchedule.trim().length) {
        countEmpty++;
        $(this).parent().hide();
    }
});

$('#sunSched').html(sched_template(page_data.custom_fields.sundaySchedule ))
    .promise().done(function(e) {
    if (!page_data.custom_fields.sundaySchedule ||
        !page_data.custom_fields.sundaySchedule.trim().length) {
        countEmpty++;
        $(this).parent().hide();
    }
});

if (countEmpty === 7) {
    $('a[href=#tab-1]').parents('li').hide();
    $('a[href=#tab-2]').trigger('click');
}
$('#youtuber-link').attr('href', '/youtuber/?user=' + page_data.user_id);
    $('#streamArea').mCustomScrollbar({
        theme:'inset-2',
});

if (typeof page_data.custom_fields !== 'undefined' &&
    typeof page_data.custom_fields.streamingImage !== 'undefined' &&
    page_data.custom_fields.streamingImage !== '') {
    $('meta[property=\'og\\:image\']')
        .attr('content', community +
            'data/streaming/' +
            page_data.user_id +
            '/' +
            page_data.custom_fields.streamingImage
        );
    $('meta[name=\'twitter\\:image\\:src\']')
        .attr('content', community +
            'data/streaming/' +
            page_data.user_id +
            '/' +
            page_data.custom_fields.streamingImage
        );
}

$(document).ready(function() {
    $('.sf-menu').superfish();
});
