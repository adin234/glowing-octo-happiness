/*global
    template,
    JST,
    slider,
    start
*/
'use strict';

$(function() {
    slider.most_viewed = $('#mostViewed').bxSlider({
        startSlide: 0,
        infiniteLoop: false,
        hideControlOnEnd: true
    });

    slider.latest_video = $('#latestVideos').bxSlider({
        startSlide: 0,
        infiniteLoop: false,
        hideControlOnEnd: true
    });

    slider.featured_video = $('#featuredVideos').bxSlider({
        startSlide: 0,
        infiniteLoop: false,
        hideControlOnEnd: true
    });

    slider.featured_games = $('#featuredGames').bxSlider({
        startSlide: 0,
        infiniteLoop: false,
        hideControlOnEnd: true
    });

    slider.latest_games = $('#latestGames').bxSlider({
        startSlide: 0,
        infiniteLoop: false,
        hideControlOnEnd: true
    });


    $(document).on('click', '.slider-item .play', function () {
        var vid = $(this).attr('data-vid');
        if (vid.trim().length) {
            vid = vid.split('?')[1].split('=');
            vid = vid[vid.indexOf('v') + 1].split('#')[0];
            var html = template(JST['playerTpl.html'](), {
                video: '//www.youtube.com/embed/' + vid + '?autoplay=1'
            });
            $('#container .bx-wrapper:first').prepend(html).promise().done(function () {
                $('.bx-wrapper .video-player iframe').css('margin-top',(
                    $(window).height() - $('.bx-wrapper iframe').height()) / 2
                );
                $('.bx-wrapper .video-player .close').css('margin-top', (
                    $(window).height() - $('.bx-wrapper iframe').height()) / 2
                );
            });
        }
    });

    start();
});