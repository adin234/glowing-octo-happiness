/* jshint unused: false */
/* global
    utilHash,
    render_stream_video,
    get_streamers
*/

'use strict';

var stream_ids = utilHash.getHashArr();

stream_ids.forEach(function (item) {
    render_stream_video(item);
});

$('.tabs').tabslet({
    animation: true,
});

$('body').on('change', '#view-resize', function (e) {
    var size = $(this).val();
    $('body').removeClass('x1 x2 x3').addClass(size);
});

$('body').on('click', '.remove-stream', function (e) {
    var id = $(this).attr('data-id'),
        tabContainer = $('#twitch-chat-frame-container'),
        currentTabList = tabContainer.find('li.chat-' + id.substr(2)),
        chatTab = $('.chat-' + id.substr(2));


    if (currentTabList.next().length) {
        currentTabList.next().find('a').trigger('click');
    } else {
        currentTabList.prev().find('a').trigger('click');
    }

    currentTabList.remove();
    tabContainer.find('div#gchat-' + id.substr(2)).remove();
    tabContainer.find('div#tab-chat-' + id.substr(2)).remove();

    $('#streamContainer > li > a[data-id='+id+']').removeClass('current');

    utilHash.removeHash(id);
    $(this).parent().parent().remove();
});

$('#streamContainer').on('click', 'li a:not(.current)', function (e) {
    $(this).addClass('current');
    var id = $(this).attr('data-id');
    utilHash.addHash(id);
    render_stream_video(id);
});

$('.watchList').css('visibility', 'visible');

$('#streamArea').mCustomScrollbar({
    theme: 'inset-2',
});

get_streamers();
