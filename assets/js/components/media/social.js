/*global
    utilUser,
    utilLogin,
    server,
    page_data
*/

'use strict';

$(function() {
    $('body').on('click', 'button#like', function () {
        if (utilUser.get() === null) {
            utilLogin.show();
            return;
        }

        var $elem = $('button#like');
        var isActive = $elem.hasClass('active');
        var videoId = $elem.attr('data-id');

        var url = server + 'fav/' + videoId;
        if (isActive) {
            $elem.removeClass('active');
            $elem.html('加入至我的最愛');
            url = server + 'unfav/' + videoId;
            page_data.favorites = page_data.favorites.filter(function (item_inner) {
                return item_inner !== videoId;
            });
            if ($('body').hasClass('favorites')) {
                $('li[id=video-' + videoId + ']').hide();
            }
        }
        else {
            $elem.addClass('active');
            $elem.html('從我的最愛移除');
            page_data.favorites.push(videoId);
            $('li[id=video-' + videoId + ']').show();
        }

        $.ajax({
            dataType: 'jsonp',
            url: url,
            crossDomain: true,
            type: 'get'
        });
    });
});