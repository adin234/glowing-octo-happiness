$(window).load(function(){
    $("#streamArea").mCustomScrollbar({
        theme:"inset-2",
    });
});

$(function() {
    var twitch_ids = utilHash.getHashArr();
    twitch_ids.forEach(function(item) {
        var streamType = item.substr(0,2);
        var streamId = item.substr(2);
        if(streamType == 'TW') {
            $('#twitchStream').append(template($('#twitch-stream-tpl').html(),{twitchid: streamId}));
            $('#twitch-chat-frame-container').append(template($('#twitch-chat-tpl').html(),{twitchid: streamId}));
            $('#twitch-chat-tab-container').append(template($('#twitch-chat-tab-tpl').html(),{twitchid: streamId}));
        }
        if(streamType == 'YT') {
            $('#twitchStream').append(template($('#youtube-stream-tpl').html(),{youtubeid: streamId}));
        }
    });
    $(".tabs").tabslet({
        animation: true,
    });
      $('body').on('change', '#view-resize', function(e) {
        var size = $(this).val();
        $('body').removeClass('x1');
        $('body').removeClass('x2');
        $('body').removeClass('x3');
        $('body').addClass(size);
    });
});

