$(window).load(function(){
    $("#streamArea").mCustomScrollbar({
        theme:"inset-2",
    });

    $(".bxslider").bxSlider({
        infiniteLoop: false,
        hideControlOnEnd: true,
        minSlides: 4,
        maxSlides: 4,
        slideWidth: 329.5,
    });
});

$(function() {
    var stream_ids = utilHash.getHashArr();

    stream_ids.forEach(function(item) {
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
        $('body').removeClass('x1 x2 x3').addClass(size);
    });

      $('body').on('click', '.remove-stream', function(e) {
            console.log($(this).parent('.stream-item'));
            $(this).parent('.stream-item').remove();
      });
});

