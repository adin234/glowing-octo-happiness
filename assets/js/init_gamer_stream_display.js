/* global
    server,
    page_maintenance,
    page_data : true,
    twitch,
    sched_template,
    XBBCODE,
    community,
    io,
    socket_server,
    information_masonry,
    resize_video_stream,
    updateStatus
*/

'use strict';

var streamType = '',
    streamId = '',
    first = true,
    found = false,
    isOnline = false,
    countEmpty = 0;

page_data = JSON.parse(page_data);
streamType = twitch.substr(0,2);
streamId = twitch.substr(2);

$(function() {


    //check if we are on maintenance
    $.ajax(server + 'streamers', function() {
        // no code here
    }).fail(function() {
        window.location.assign(page_maintenance);
    });

    $('.sf-menu').superfish();

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

    $('body').on('change', '#view-resize', function() {
        var size = $('#view-resize').val();
        $('body').removeClass('x1 x2 x3').addClass(size);
        resize_video_stream();
    });

    $(window).on('resize', function() {
        resize_video_stream();
    });

    $('#monSched').html(sched_template(page_data.custom_fields.mondaySchedule))
        .promise().done(function() {
        if (!page_data.custom_fields.mondaySchedule ||
                !page_data.custom_fields.mondaySchedule.trim().length) {
            countEmpty++;
            $(this).parent().hide();
        }
    });

    $('#tueSched').html(sched_template(page_data.custom_fields.tuesdaySchedule))
        .promise().done(function() {
        if (!page_data.custom_fields.tuesdaySchedule ||
            !page_data.custom_fields.tuesdaySchedule.trim().length) {
            countEmpty++;
            $(this).parent().hide();
        }
    });

    $('#wedSched').html(sched_template(page_data.custom_fields.wednesdaySchedule))
        .promise().done(function() {
        if (!page_data.custom_fields.wednesdaySchedule ||
            !page_data.custom_fields.wednesdaySchedule.trim().length) {
            countEmpty++;
            $(this).parent().hide();
        }
    });

    $('#thuSched').html(sched_template(page_data.custom_fields.thursdaySchedule))
        .promise().done(function() {
        if (!page_data.custom_fields.thursdaySchedule ||
                !page_data.custom_fields.thursdaySchedule.trim().length) {
            countEmpty++;
            $(this).parent().hide();
        }
    });

    $('#friSched').html(sched_template(page_data.custom_fields.fridaySchedule))
        .promise().done(function() {
        if (!page_data.custom_fields.fridaySchedule ||
            !page_data.custom_fields.fridaySchedule.trim().length) {
            countEmpty++;
            $(this).parent().hide();
        }
    });

    $('#satSched').html(sched_template(page_data.custom_fields.saturdaySchedule))
        .promise().done(function() {
        if (!page_data.custom_fields.saturdaySchedule ||
            !page_data.custom_fields.saturdaySchedule.trim().length) {
            countEmpty++;
            $(this).parent().hide();
        }
    });

    $('#sunSched').html(sched_template(page_data.custom_fields.sundaySchedule ))
        .promise().done(function() {
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

    if (
            typeof page_data.custom_fields !== 'undefined'
            && typeof page_data.custom_fields.streamingImage !== 'undefined'
            && page_data.custom_fields.streamingImage !== ''
    )
    {
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


    var socket = io.connect(socket_server);
    socket.on('message', function(e) {
        var streams_to_check = streamType === 'YT'
                ? e.streamers.youtube
                : streamType === 'HB'
                    ? e.streamers.hitbox
                    : e.streamers.twitch;

        found = false;

        streams_to_check.forEach(function (stream) {
            
            switch (streamType) {

                case 'HB' :
                    if (stream.hitbox.livestream[0].media_name === streamId) {
                        found = 1;
                    }
                    break;

                case 'YT' :
                    if (stream.username === streamId) {
                        found = 1;
                    }
                    break;

                case 'TW' :
                    if (stream.twitch.channel.display_name.toLowerCase().trim() === streamId) {
                        found = 1;
                    }
            }
        });

        if (isOnline !== found || first) {
            first = false;
            updateStatus(streamType, streamId, found);
        }

        isOnline = found;
    });
});
