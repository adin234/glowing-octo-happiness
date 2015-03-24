/*global
    hash,
    update_videos,
    activeVideos
*/

'use strict';

$('.playList').mCustomScrollbar({
    theme: 'inset-2',
    callbacks: {
        onScroll: function () {
            if (this.mcs.topPct >= 75) {
                update_videos(activeVideos, true);
            }
        }
    }
});

$(function() {
    $('.listSwitch li').click(function () {
        if (!$(this).hasClass('current')) {
            $('.listSwitch li').toggleClass('current');
            $('.playList.toggleList').toggleClass('current');
        }
        else if ($(this).attr('id') === 'videosToggle' && !hash.length) {
        }
    });

    $('li#playlistsToggle').on('click', function () {
        $('.playFunctionBtn li').css({
            'visibility': 'hidden'
        });
    });

    $('li#videosToggle').on('click', function () {
        $('.playFunctionBtn li').css({
            'visibility': 'visible'
        });
    });

});