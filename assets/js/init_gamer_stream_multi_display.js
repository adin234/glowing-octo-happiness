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
    var id = $(this).attr('data-id');
    $('#streamContainer li a[data-id=' + id + ']').removeClass('current');
    $('.chat-' + id.substr(2)).remove();
    $('#gchat-' + id.substr(2)).remove();
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

$(window).load(function () {
    $('#streamArea').mCustomScrollbar({
        theme: 'inset-2',
    });
});

get_streamers();
